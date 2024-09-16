import React, { useState } from 'react';
import { TSenderProps } from './types.ts';
import {
  MainView,
  SendButton,
  SenderContainer,
  StyledInput,
} from './styled.ts';
import { Images } from '@assets/Images.ts';
import { Image, Keyboard, Platform } from 'react-native';

export const Sender = ({ onSend }: TSenderProps) => {
  const [text, setText] = useState<string>('');

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleSend = () => {
    if (text.trim().length > 0) { // Проверяем, что сообщение не пустое
      onSend(text);
      setText('');
      Keyboard.dismiss();
    }
  };

  return (
    <MainView
      behavior={Platform.OS === 'ios' || 'android' ? 'padding' : 'height'}
    >
      <SenderContainer>
        <StyledInput
          value={text}
          keyboardAppearance="dark"
          onChangeText={handleTextChange}
          placeholder="Type a message"
          placeholderTextColor={'#6d7883'}
        />
        <SendButton onPress={handleSend}>
          <Image
            source={Images.ArrowUp}
            resizeMode="contain"
            style={{ width: 24 }}
          />
        </SendButton>
      </SenderContainer>
    </MainView>
  );
};