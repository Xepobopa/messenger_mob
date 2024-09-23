import React from 'react';
import {
  MessageContainer,
  MessageInfo,
  MessageText,
  Triangle,
  CheckmarkContainer,
  CheckmarkIconContainer,
} from './styled';
import { TMessageProps } from './types';
import CheckmarkIcon from '@assets/icons/CheckMarkIcon/CheckMarkIcon'; // Import the SVG as a component
import { View } from 'react-native';

export const Message = ({ type, message }: TMessageProps) => {
  // Define if the message is sent by the user
  const isSentByUser = type === 'my'; // Adjust this condition based on how you determine if a message is outgoing

  return (
    <MessageContainer $type={type}>
      {/* Display the message text */}
      <MessageText>{message.message}</MessageText>

      <MessageInfo $type={type}>
        {/* Display the time */}
        {new Date(message.date).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false, // Removes AM/PM format
        })}
        {/* Conditionally render checkmarks for outgoing messages */}
        {type === 'my' && <CheckmarkIcon width={20} height={15} />}
      </MessageInfo>
      {/* Triangle for messages */}
      <Triangle $type={type} />
    </MessageContainer>
  );
};
