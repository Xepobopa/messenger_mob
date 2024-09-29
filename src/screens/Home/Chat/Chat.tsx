import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { ActivityIndicatorContainer, MainContainer } from './styles';
import { TChatMainProps } from './types';
import {
  MessageFromDB,
  MessageFromWS,
  Room,
} from '@common/socket/interface/chat.interface';
import { Service } from '@common/services';
import { Header } from './components/Header';
import { MessageList } from './components/MessageList';
import { Sender } from './components/Sender';
import { useUserData } from '@store/tools';
import socket from '@common/socket/connection';

export const Chat = ({ route, navigation }: TChatMainProps) => {
  const { user } = useUserData();
  const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(true);
  const [isChatInfoLoading, setIsChatInfoLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<MessageFromDB[]>([]);
  const [chatInfo, setChatInfo] = useState<Room | null>(null);

  useEffect(() => {
    // Функция для загрузки сообщений
    const loadMessages = async () => {
      try {
        console.log('Loading messages...');
        const res = await Service.ChatService.loadMessages({
          roomUid: route.params.roomUid,
        });
        setMessages(res.data);
      } catch (err) {
        Alert.alert('Error while trying to load messages!');
      } finally {
        setIsMessagesLoading(false);
      }
    };

    // Функция для загрузки информации о чате
    const loadChatInfo = async () => {
      try {
        console.log('Loading chat info...');
        const res = await Service.ChatService.getRoomInfo({
          roomUid: route.params.roomUid,
        });
        setChatInfo(res.data);
      } catch (err) {
        Alert.alert('Error while trying to load chat info!');
      } finally {
        setIsChatInfoLoading(false);
      }
    };

    // Вызов функций для загрузки данных
    loadMessages();
    loadChatInfo();
  }, [route.params.roomUid]);

  useEffect(() => {
    if (!user) return;

    // Подключение к комнате в качестве клиента сокета
    socket.emit('join-room', {
      userUid: user?.uuid,
      roomUid: route.params.roomUid,
    });

    // Обработчик получения нового сообщения
    const handleNewMessage = (message: MessageFromWS) => {
      setMessages((prevState) => {
        // Проверяем, чтобы не добавлять дубликаты сообщений
        if (prevState.some((msg) => msg.uuid === message.uuid)) {
          return prevState;
        }
        return [...prevState, message];
      });
      console.log('New message! => ', message);
    };

    socket.on('message', handleNewMessage);

    return () => {
      // Отключение обработчиков событий при размонтировании компонента
      socket.off('message', handleNewMessage);
    };
  }, [user, route.params.roomUid]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !chatInfo || !user) return; // Проверка на пустое сообщение и наличие пользователя

    try {
      const res = await Service.ChatService.sendMessage({
        toRoomUid: chatInfo.uuid,
        fromUid: user.uuid,
        message,
      });

      // Проверяем, чтобы не добавить дубликаты сообщений
      const newMessage: MessageFromDB = {
        id: res.data.id,
        uuid: res.data.uuid,
        date: new Date().toISOString(),
        from: {
          nickname: user.nickname,
          profile_url: user.profile_url,
          uuid: user.uuid,
        },
        message,
      };

      setMessages((prevMessages) => {
        if (prevMessages.some((msg) => msg.uuid === newMessage.uuid)) {
          return prevMessages;
        }
        return [...prevMessages, newMessage];
      });
    } catch (err) {
      console.error('Failed to send message:', err);
      Alert.alert('Error', 'Failed to send message');
    }
  };

  return (
    <MainContainer>
      <Header
        title={chatInfo?.name || 'Chat'}
        avatar_url={chatInfo?.users?.[0]?.profile_url}
      />

      {isMessagesLoading ? (
        <ActivityIndicatorContainer>
          <ActivityIndicator size={'large'} color={'#fff'} />
        </ActivityIndicatorContainer>
      ) : (
        <MessageList messages={messages} />
      )}

      <Sender onSend={handleSendMessage} />
    </MainContainer>
  );
};
