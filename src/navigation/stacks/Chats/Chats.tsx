import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TChatsStack } from './types';
import { EScreens } from '../../screens';
import { ScreenNavigationOptions } from '../options';
import { ChatsScreens } from '../../../screens/Home';

const Stack = createNativeStackNavigator<TChatsStack>();

const ChatsStack = () => {
    return (
        <Stack.Navigator screenOptions={ScreenNavigationOptions}>
            <Stack.Screen
                name={EScreens.ChatsList}
                component={ChatsScreens.ChatsList}
            />
            <Stack.Screen
                name={EScreens.CreateChat}
                component={ChatsScreens.CreateChat}
            />
        </Stack.Navigator>
    );
};

export default ChatsStack;
