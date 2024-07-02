import { Images } from '@assets/index';
import { useAuth } from '@common/hooks/useAuth';
import { Button } from '@components/buttons';
import { Common } from '@components/common';
import { Position } from '@components/positions';
import { ETab } from '@navigation/tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useUserData } from '../../../store/tools';
import { ChatsList as ChatsListComponent } from './components/ChatsList';
import { MainBackgroundImage } from './styled';

export const ChatsList = () => {
    const { clearToken, clearUserData } = useAuth();
    const { chats } = useUserData();
    const navigation = useNavigation<any>();

    console.log('chats => ', chats);

    // TODO: Remove it
    const handleLogIn = () => {
        clearToken();
        clearUserData();

        navigation.navigate(ETab.Auth);
    };

    const handleCreateChat = () => {
        navigation.navigate('ChatsStack', { screen: 'CreateChat' });
    };

    return (
        <MainBackgroundImage source={Images.ScreenBackground}>
            <Position.Main style={{ justifyContent: 'space-around' }}>
                <Button.ButtonRound
                    Icon={Images.ArrowBack}
                    size={35}
                    onPress={handleLogIn}
                />

                <ChatsListComponent data={chats} />

                <TouchableOpacity onPress={handleCreateChat}>
                    <Text style={{ color: 'white' }}>Create chat</Text>
                </TouchableOpacity>

                <Common.Row style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Button.ButtonRound
                        Icon={Images.SmallBlueButton}
                        size={70}
                        onPress={() => console.log('Press button row #1')}
                    />
                    <Button.ButtonRound
                        Icon={Images.ButtonBell}
                        size={70}
                        onPress={() => console.log('Press button row #2')}
                    />
                    <Button.ButtonRound
                        Icon={Images.SmallRedButton}
                        size={70}
                        onPress={() => console.log('Press button row #3')}
                    />
                    <Button.ButtonRound
                        Icon={Images.ButtonPower}
                        size={70}
                        onPress={() => console.log('Press button row #4')}
                    />
                </Common.Row>
            </Position.Main>

            <Position.Footer>
                <Button.ButtonRound
                    Icon={Images.ButtonUp}
                    size={70}
                    onPress={() => console.log('Press button up')}
                />
            </Position.Footer>
        </MainBackgroundImage>
    );
};
