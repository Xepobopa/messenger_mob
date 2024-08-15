import { Images } from '@assets/Images.ts';
import { useAuth } from '@common/hooks/useAuth';
import { Button } from '@components/buttons';
import { Position } from '@components/positions';
import { ETab } from '@navigation/tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useUserData } from '../../../store/tools';
import { ChatsList as ChatsListComponent } from './components/ChatsList';
import { LoadingChatsContainer, MainBackgroundImage } from './styled';
import { Row } from '@components/common';
import { useLoad } from '@common/hooks/useLoad';

export const ChatsList = () => {
    const { clearToken, clearUserData } = useAuth();
    const navigation = useNavigation<any>();
    const { loadUserAndChats } = useLoad();
    const { chats } = useUserData();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        loadUserAndChats().then(() => console.log('user and chats loaded')).finally(() => setIsLoading(false));
    }, []);

    // TODO: Remove it
    const handleLogIn = () => {
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

                {isLoading ? (
                        <LoadingChatsContainer>
                            <ActivityIndicator size={'large'} color={'#fff'} />
                        </LoadingChatsContainer>
                    ) : ( 
                        <ChatsListComponent data={chats} />
                    )}

                <TouchableOpacity onPress={handleCreateChat}>
                    <Text style={{ color: 'white' }}>Create chat</Text>
                </TouchableOpacity>

                <Row style={{ paddingLeft: 20, paddingRight: 20 }}>
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
                </Row>
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
