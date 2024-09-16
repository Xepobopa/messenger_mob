import React from 'react';
import { TMessageListProps } from './types.ts';
import { StyledScrollView } from './styled.ts';
import { useUserData } from '@store/tools.ts';
import { Message } from '../Message/Message.tsx';

export const MessageList = ({ messages }: TMessageListProps) => {
  const { user } = useUserData();

  return (
    <StyledScrollView>
      {messages.map((message) => {
        return (
          <Message
            key={message.uuid}
            message={message}
            type={message.from.uuid === user?.uuid ? 'my' : 'other'}
          />
        );
      })}
    </StyledScrollView>
  );
};
