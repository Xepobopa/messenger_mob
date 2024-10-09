import React from 'react';
import { MessageContainer, MessageInfo, MessageText, Triangle } from './styled';
import { TMessageProps } from './types';
import CheckmarkIcon from '@assets/icons/CheckMarkIcon/CheckMarkIcon'; // Импорт SVG компонента
import { TouchableOpacity, Image, Text, Linking, View, StyleSheet } from 'react-native';

// Функция для открытия файла по URL
const openFile = (fileUrl: string) => {
  Linking.openURL(fileUrl).catch((err) => {
    console.error('Failed to open file:', err);
  });
};

// Основной компонент Message
export const Message = ({ type, message }: TMessageProps) => {
  const isSentByUser = type === 'my';

  // Определение типа файла по расширению
  const getFileType = (fileUrl: string): string => {
    const extension = fileUrl.split('.').pop()?.toLowerCase();
    if (!extension) return 'unknown';

    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'image';
      case 'pdf':
        return 'pdf';
      case 'mp4':
        return 'video';
      default:
        return 'unknown';
    }
  };

  // Рендер файла
  const renderFile = (fileUrl: string) => {
    const fileType = getFileType(fileUrl);

    switch (fileType) {
      case 'image':
        return (
          <TouchableOpacity onPress={() => openFile(fileUrl)}>
            {/* Оформляем изображение с фиксированным размером и соблюдением пропорций */}
            <Image source={{ uri: fileUrl }} style={styles.image} resizeMode="contain" />
          </TouchableOpacity>
        );
      case 'pdf':
        return (
          <TouchableOpacity onPress={() => openFile(fileUrl)}>
            <Text style={{ color: 'blue', textDecorationLine: 'underline', marginTop: 10 }}>
              Open PDF
            </Text>
          </TouchableOpacity>
        );
      case 'video':
        return (
          <TouchableOpacity onPress={() => openFile(fileUrl)}>
            <Text style={{ color: 'blue', textDecorationLine: 'underline', marginTop: 10 }}>
              Open Video
            </Text>
          </TouchableOpacity>
        );
      default:
        return (
          <TouchableOpacity onPress={() => openFile(fileUrl)}>
            <Text style={{ color: 'blue', textDecorationLine: 'underline', marginTop: 10 }}>
              Open File
            </Text>
          </TouchableOpacity>
        );
    }
  };

  return (
    <MessageContainer $type={type}>
      {/* Текст сообщения */}
      

      {/* Если есть файл, рендерим его */}
      {message.file_url && renderFile(message.file_url)}

      <MessageText>{message.message}</MessageText>

      <MessageInfo $type={type}>
        {/* Время сообщения */}
        {new Date(message.date).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}
        {/* Рендер галочки для отправленных сообщений */}
        {isSentByUser && <CheckmarkIcon width={20} height={15} />}
      </MessageInfo>

      {/* Треугольник под сообщением */}
      <Triangle $type={type} />
    </MessageContainer>
  );
};

// Стили для изображения и компонента
const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    marginTop: 10,
    borderRadius: 10,
    flex: 0,
    marginBottom: 10, 
  },
});
