import React from 'react';
import { MessageContainer, MessageInfo, MessageText, Triangle } from './styled';
import { TMessageProps } from './types';

export const Message = ({ type, message }: TMessageProps) => {
  return (
    <MessageContainer $type={type}>
      {/* Отображаем текст сообщения */}
      <MessageText>{message.message}</MessageText>
      {/* Отображаем время в правом нижнем углу */}
      <MessageInfo $type={type}>
        {new Date(message.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </MessageInfo>
      {/* Треугольник для сообщений */}
      <Triangle $type={type} />
    </MessageContainer>
  );
};
