import React, { useState } from 'react';
import { TSenderProps } from './types.ts';
import {
  MainView,
  SendButton,
  SenderContainer,
  StyledInput,
  FileButton,
} from './styled.ts';
import { Image, Keyboard, Platform, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Для загрузки изображений
import DocumentPicker from 'react-native-document-picker'; // Для выбора файлов
import { Images } from '@assets/Images.ts';

export const Sender = ({ onSend }: TSenderProps) => {
  const [text, setText] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<any | null>(null);

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleSend = () => {
    if (text.trim().length > 0 || selectedFile) { // Проверяем, что есть текст или файл
      onSend({ text, file: selectedFile });
      setText('');
      setSelectedFile(null); // Очищаем файл после отправки
      Keyboard.dismiss();
    } else {
      Alert.alert('Введите текст или выберите файл.');
    }
  };

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.audio],
      });
      setSelectedFile(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Пользователь отменил выбор файла');
      } else {
        console.error('Ошибка при выборе файла: ', err);
      }
    }
  };

  return (
    <MainView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SenderContainer>
        <StyledInput
          value={text}
          keyboardAppearance="dark"
          onChangeText={handleTextChange}
          placeholder="Введите сообщение"
          placeholderTextColor={'#6d7883'}
        />
        <FileButton onPress={handleFilePicker}>
          <Image
            source={Images.ImagePicker}
            style={{ width: 24, height: 24 }}
          />
        </FileButton>
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
