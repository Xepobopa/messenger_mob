import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TAuthStack } from './types';
import { ScreenNavigationOptions } from '../options';
import { EScreens } from '../../screens';
import { AuthScreens } from '../../../screens/Auth';

const Stack = createNativeStackNavigator<TAuthStack>();

export const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={ScreenNavigationOptions}>
            <Stack.Screen
                name={EScreens.AuthRegistration}
                component={AuthScreens.Registration}
            />
            <Stack.Screen
                name={EScreens.AuthAuthorization}
                component={AuthScreens.Authorization}
            />
        </Stack.Navigator>
    );
};
