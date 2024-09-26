import { Images } from '@assets/Images.ts';
import { useAuth } from '@common/hooks/useAuth';
import { Button } from '@components/buttons';
import { Position } from '@components/positions';
import { ETab } from '@navigation/tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { useUserData } from '../../../store/tools';
import { ChatsList as ChatsListComponent } from './components/ChatsList';
import { LoadingChatsContainer, MainBackgroundImage } from './styled';
import { Row } from '@components/common';
import { useLoad } from '@common/hooks/useLoad';
import RoundButton from '@components/telegramStaff/RoundButton/RoundButton';
import MenuIcon from '@assets/icons/Menu/MenuIcon';
import PencilIcon from '@assets/icons/Pencil/PencilIcon';

export const ChatsList = () => {
  const { clearToken, clearUserData } = useAuth();
  const navigation = useNavigation<any>();
  const { loadUserAndChats } = useLoad();
  const { chats } = useUserData();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Функция для обновления списка чатов
  const refreshChats = useCallback(() => {
    if (isRefreshing) return; // Предотвращаем повторное обновление
    setIsRefreshing(true); // Устанавливаем состояние рефреша в true
    loadUserAndChats()
      .then(() => console.log('user and chats loaded'))
      .finally(() => setIsRefreshing(false)); // Устанавливаем состояние рефреша в false
  }, [isRefreshing, loadUserAndChats]);

  useEffect(() => {
    if (!isLoading) return; // Если уже загружается, то выходим из эффекта
    loadUserAndChats()
      .then(() => console.log('user and chats loaded'))
      .finally(() => setIsLoading(false)); // Скрываем индикатор загрузки после завершения загрузки
  }, [isLoading, loadUserAndChats]);

  // TODO: Remove it
  const handleLogIn = () => {
    navigation.navigate(ETab.Auth);
  };

  const handleCreateChat = () => {
    navigation.navigate('ChatsStack', { screen: 'CreateChat' });
  };

  return (
    <MainBackgroundImage>
      <Row
        style={{
          alignItems: 'center',
          height: 50,
          backgroundColor: '#222e3e',
          shadowColor: '#000', // Цвет тени
          shadowOffset: { width: 0, height: 50 }, // Смещение тени
          shadowOpacity: 0.25, // Прозрачность тени
          shadowRadius: 5.84, // Радиус тени
        }}
      >
        {/* <Button.ButtonRound Icon={MenuIcon} size={35} onPress={handleLogIn} /> */}
        <TouchableOpacity
          onPress={handleLogIn}
          style={{
            marginLeft: 20,
          }}
        >
          <MenuIcon></MenuIcon>
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
          }}
        >
          сообщения
        </Text>
        <View style={{ width: 35 }} />
        {/* Добавляем пустое пространство, чтобы выровнять с кнопкой назад */}
      </Row>

      {isLoading ? (
        <LoadingChatsContainer>
          <ActivityIndicator size={'large'} color={'#fff'} />
        </LoadingChatsContainer>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshChats}
            />
          }
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <ChatsListComponent data={chats} />
        </ScrollView>
      )}

      {/* <TouchableOpacity onPress={handleCreateChat}>
        <Text style={{ color: 'white' }}>Create chat</Text>
      </TouchableOpacity> */}
      <View
        style={{
          position: 'absolute',
          bottom: 20, // отступ от нижнего края экрана
          right: 20, // отступ от правого края экрана
          zIndex: 10, // высокий zIndex для отображения поверх других элементов
        }}
      >
        <RoundButton
          Icon={PencilIcon}
          size={50}
          onPress={handleCreateChat}
          backgroundColor="#639fd8"
          iconColor="#ffffff"
        />
      </View>

      {/* <Row style={{ paddingLeft: 20, paddingRight: 20 }}>
          <Button.ButtonRound
            Icon={Images.SmallBlueButton}
            size={70}
            onPress={() => console.log('Press button row #1')}
          />
          <Button.ButtonRound
            Icon={Images.ButtonBell}
            size={70}
            onPress={() => console.log('Press button row #2')}
          />
          <Button.ButtonRound
            Icon={Images.SmallRedButton}
            size={70}
            onPress={() => console.log('Press button row #3')}
          />
          <Button.ButtonRound
            Icon={Images.ButtonPower}
            size={70}
            onPress={() => console.log('Press button row #4')}
          />
        </Row> */}

      {/* <Position.Footer>
        <Button.ButtonRound
          Icon={Images.ButtonUp}
          size={70}
          onPress={() => console.log('Press button up')}
        />
      </Position.Footer> */}
    </MainBackgroundImage>
  );
};
