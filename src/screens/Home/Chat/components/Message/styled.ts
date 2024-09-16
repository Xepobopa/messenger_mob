import { Text, View } from 'react-native';
import styled from 'styled-components';

export const MessageContainer = styled(View)<{ $type: 'my' | 'other' }>`
  align-self: ${(props) => (props.$type === 'my' ? 'flex-end' : 'flex-start')};
  max-width: 70%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 15px;
  background-color: ${(props) => (props.$type === 'my' ? '#2b5278' : '#182533')}; /* Цвета фонов сообщений */
  border-bottom-right-radius: ${(props) => (props.$type === 'my' ? '0' : '15px')};
  border-bottom-left-radius: ${(props) => (props.$type === 'my' ? '15px' : '0')};
`;

export const MessageInfo = styled(Text)`
  display: block;
  font-size: 14px; /* 14px */
  line-height: 20px; /* 20px */
  color: rgb(0, 0, 0);
`;

export const MessageText = styled(Text)`
  font-size: 16px;
  color: #e1e1e1; /* Светлый цвет текста */
`;
