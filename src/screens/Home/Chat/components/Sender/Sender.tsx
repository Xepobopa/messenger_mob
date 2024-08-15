import React, { useState } from 'react';
import { TSenderProps } from './types.ts';
import { MainView, SendButton, SenderContainer, StyledInput } from './styled.ts';
import { Images } from '@assets/Images.ts';
import { Image, Keyboard } from 'react-native';

export const Sender = ({ onSend }: TSenderProps) => {
    const [text, setText] = useState<string>('');

    const handleTextChange = (newText: string) => {
        setText(newText);
    }

    const handleSend = () => {
        setText('');
        onSend(text);
        Keyboard.dismiss();
    }

    return (
        <MainView behavior='position'>
            <SenderContainer>
                <StyledInput 
                    value={text}
                    keyboardAppearance='dark'
                    onChangeText={handleTextChange}
                    placeholder='Type a message'
                    placeholderTextColor={'rgba(255, 255, 255, 0.5)'}/>
                <SendButton onPress={handleSend}>
                    <Image source={Images.ArrowUp} resizeMode='contain' style={{ width: 24 }}/>
                </SendButton>
            </SenderContainer>
        </MainView>
    );
};
