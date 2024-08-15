import React from 'react';
import { MessageContainer, MessageInfo, MessageText } from './styled';
import { TMessageProps } from './types';

export const Message = ({ type, message }: TMessageProps) => {
    return (
        <MessageContainer $type={type}>
            <MessageInfo>{message.from.nickname} • {new Date(message.date).toLocaleTimeString()}</MessageInfo>
            <MessageText>{message.message}</MessageText>
        </MessageContainer>
    );
};
