import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components';

export const MainView = styled(KeyboardAvoidingView)`
  background-color: black;
  width: 100%;
  height: 81px;
  align-items: center;
  justify-content: center;
`;

export const SenderContainer = styled(View)`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #17212b;
`;

export const StyledInput = styled(TextInput)`
  height: 40px;
  width: 85%;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0 20px;
  margin: 10px 0;
  color: white;
  font-size: 16px;
  border-radius: 7px;
`;

export const SendButton = styled(TouchableOpacity)`
  height: 40px;
  width: 40px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background-color: #00f900;
  border-radius: 20px;
`;
