import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { userSliceActions } from '../../../store/modules/user/reducer';
import * as Keychain from 'react-native-keychain';
import { TUser } from '@common/types/user';

export const useAuth = () => {
    const dispatch = useDispatch();

    const setToken = async (token: string) => {
        Keychain.setGenericPassword('token', token).catch(err =>
            console.log('[ERROR] Failed to store token in Keychain. ', err),
        );
        console.log(`token ${token} saved successful!`);
    };

    const getToken = async () => {
        try {
            const token = await Keychain.getGenericPassword();
            if (!token) {
                return null;
            }

            return token;
        } catch (error) {
            console.log('[ERROR] Failed to retrieve the token. ', error);
        }
    };

    const clearToken = async () => {
        try {
            console.log('Token deleted');
            return await Keychain.resetGenericPassword();
        } catch (error) {
            console.error(
                'Error deleting credentials for service Token',
                error,
            );
        }
    };

    const setUserData = useCallback(
        (user: TUser) => {
            dispatch(userSliceActions.setUser(user));
        },
        [dispatch],
    );

    const clearUserData = useCallback(() => {
        console.log('User data deleted');
        dispatch(userSliceActions.clearUser());
    }, [dispatch]);

    return { setUserData, clearUserData, setToken, getToken, clearToken };
};
