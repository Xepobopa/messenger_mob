import { Text, View } from 'react-native';
import styled from 'styled-components';

export const MessageContainer = styled(View)<{ $type: 'my' | 'other' }>`
    display: block;
    min-width: 50%;
    max-width: 70%;
    align-self: ${ props => props.$type === 'my' ? 'flex-end' : 'flex-start' };
    padding: 15px;
    border-radius: 7px;
    border-bottom-right-radius: ${ props => props.$type === 'my' ? '0' : '7px' };
    border-bottom-left-radius: ${ props => props.$type === 'my' ? '7px' : '0' };
    background-color: ${ props => props.$type === 'my' ? 'lightblue' : 'darkblue' };
    margin-top: 7px;
`;

export const MessageInfo = styled(Text)`
    display: block;
    font-size: 0.875rem; /* 14px */
    line-height: 1.25rem; /* 20px */
    color: rgb(156, 163, 175);
`

export const MessageText = styled(Text)`
    color: white;
    font-size: 16px;
`