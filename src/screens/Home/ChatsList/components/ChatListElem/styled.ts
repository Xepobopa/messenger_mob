import { ImageBackground, Text } from 'react-native';
import styled from 'styled-components';

export const MainBackgroundImage = styled(ImageBackground)`
    height: 75px;
`;

export const ElemNameText = styled(Text)`
    font-size: 22px;
    color: white;
    font-weight: 400;
`;

export const ElemDateText = styled(Text)`
    font-size: 14px;
    color: white;
    font-weight: 300;
    align-self: flex-end;
    padding-bottom: 5px;
`;

export const NormalText = styled(Text)`
    font-size: 18px;
    color: white;
    font-weight: 600;
`;
