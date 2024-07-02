import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
// import { useAuth } from '@common/hooks/useAuth';
import { useAuth } from '@common/hooks/useAuth';
import { Service } from '@common/services';
import socket from '@common/socket/socket';
import { TChat } from '@common/types/chat';
import MainTab from '../../tabs/Main/Main';
import { ETab } from '../../tabs/tabs';
import { AuthStack } from '../Auth';
import { ScreenNavigationOptions } from '../options';
import { TCheckUserLogIn, TMainStack } from './types';
import { useDispatch } from 'react-redux';
import { userSliceActions } from '../../../store/modules/user/reducer';

const Stack = createNativeStackNavigator<TMainStack>();

const MainStack = () => {
    // const { user } = useTypedSelector(getUserSelector);
    const dispatch = useDispatch();
    const { getToken, setUserData } = useAuth();
    const [isUserAuth, setIsUserAuth] = useState<TCheckUserLogIn>({
        isAuth: false,
        isLoading: true,
    });

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to the webSocker Server!');
        });
    });

    useEffect(() => {
        getToken().then(async res => {
            if (res?.password) {
                console.log('Token found! Navigate to the MainTab.');
                setIsUserAuth({ isAuth: true, isLoading: false });

                // get all data
                const userUid = await loadUser();
                loadChats(userUid);
            } else {
                console.log('Failed to retreive token! Please, log in!');
                setIsUserAuth({ isAuth: false, isLoading: false });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadUser = async () => {
        const user = await Service.UserService.getUserByToken();
        setUserData(user.data);

        console.log('Loaded user => ', user.data);

        return user.data.uuid;
    };

    // load chats
    const loadChats = (userUid: string) => {
        socket.emit('findAllChats', { userUid }, (res: TChat[]) => {
            console.log('loadChats => ', res);
            dispatch(userSliceActions.setChats(res));
        });
    };

    // const user = true;
    const currentTab = isUserAuth.isAuth ? ETab.Main : ETab.Auth;
    return isUserAuth.isLoading ? (
        <></>
    ) : (
        <Stack.Navigator
            screenOptions={ScreenNavigationOptions}
            initialRouteName={currentTab}
        >
            <Stack.Screen name={ETab.Main} component={MainTab} />
            <Stack.Screen name={ETab.Auth} component={AuthStack} />
        </Stack.Navigator>
    );
};

export default MainStack;
