import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Button } from '@components/buttons';
import {
  ElemDateText,
  ElemNameText,
  MainBackgroundImage,
  NormalText,
} from './styled';
import { TChatListElemProps } from './types';
import { Images } from '@assets/Images.ts';
import { Row } from '@components/common';
import { useNavigation } from '@react-navigation/native';
import { EScreens } from '@navigation/screens';
import ProfileDefaultIcon from '@assets/icons/ProfileDefault/ProfileDefaultIcon';

export const ChatListElem = ({ chat }: TChatListElemProps) => {
  const navigation = useNavigation<any>();

  const handleMoveToChat = () => {
    navigation.navigate(EScreens.ChatMain, { roomUid: chat.uuid });
  };

  return (
    <TouchableOpacity onPress={handleMoveToChat}>
        <Row
          style={{
            height: 75,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}
      >
        {/* Проверяем наличие аватарки, если её нет, используем SVG по умолчанию */}
        {chat.avatarUrl ? (
          <Image
            source={{ uri: chat.avatarUrl }} // URL для аватара чата
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 10,
            }}
          />
        ) : (
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ProfileDefaultIcon width={50} height={50} />
          </View>
        )}

        {/* Название чата и последнее сообщение */}
        <View style={{ flex: 1, marginLeft: 10 }}>
          <ElemNameText>{chat.name}</ElemNameText>
          <NormalText numberOfLines={1} style={{ color: '#7d8b97' }}>
            {chat.lastMessage}
          </NormalText>
        </View>

        {/* Время последнего сообщения и количество непрочитанных сообщений */}
        <View style={{ alignItems: 'flex-end' }}>
          <ElemDateText>
            {new Date(chat.updated_at).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </ElemDateText>
          {chat.unreadedMessages > 0 && (
            <View
              style={{
                backgroundColor: '#007aff',
                borderRadius: 10,
                padding: 5,
                marginTop: 5,
              }}
            >
              <NormalText style={{ color: '#fff' }}>
                {chat.unreadedMessages}
              </NormalText>
            </View>
          )}
        </View>
      </Row>
      <View
        style={{

              alignItems: 'center',
              justifyContent: 'space-between',
              marginLeft: 60,
              borderBottomWidth: 2,
              borderBottomColor: '#16202c', // Цвет линии
              // Линия начинается с конца изображения
            }}
      />
    </TouchableOpacity>
  );
};
