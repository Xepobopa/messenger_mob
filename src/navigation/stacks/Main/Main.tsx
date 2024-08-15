import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import MainTab from '../../tabs/Main/Main';
import { ETab } from '../../tabs/tabs';
import { AuthStack } from '../Auth';
import { ScreenNavigationOptions } from '../options';
import { TMainStack } from './types';
import { useUserData } from '../../../store/tools';
// import { useLoad } from '@common/hooks/useLoad';
import { useAuth } from '@common/hooks/useAuth';
import { EncryptedStorageService } from '@common/storage/encryptedStorage';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator<TMainStack>();

const MainStack = () => {
    const { setIsAuthed } = useAuth();
    const { isAuthed } = useUserData();
    // const { loadUserAndChats } = useLoad();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    let currentTab;
    useEffect(() => {
        const fetch = async () => {
            const token = await EncryptedStorageService.getToken();
            console.log(token);
            if (token || isAuthed) {
                // loadUserAndChats();
                setIsAuthed(true);
                setIsLoading(false);
                currentTab = ETab.Main;
            } else {
                setIsLoading(false);
                currentTab = ETab.Auth;
            }
        }

        fetch();
    }, [isAuthed]);

    return (
        isLoading ? (
            <View 
                style={{ 
                    height: '100%', 
                    width: '100%', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    backgroundColor: 'black' 
                    }}>
                <Text style={{ color: 'white', fontSize: 30 }}>Loading</Text>
            </View>
        ) : (
            <Stack.Navigator
                screenOptions={ScreenNavigationOptions}
                initialRouteName={currentTab}
            >
                <Stack.Screen name={ETab.Main} component={MainTab} />
                <Stack.Screen name={ETab.Auth} component={AuthStack} />
            </Stack.Navigator>
        )
    );
};

export default MainStack;
