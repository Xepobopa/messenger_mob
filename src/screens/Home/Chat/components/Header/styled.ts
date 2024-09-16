import { Image, Text, View } from 'react-native';
import styled from 'styled-components';

export const MainView = styled(View)`
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  padding-top: 40px;
  background-color: #17212b;
`;

export const Title = styled(Text)`
  font-size: 18px;
  font-weight: 400px;
  color: white;
`;

export const StyledImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  position: absolute;

  right: 30px;
  background-color: lightblue;
`;
