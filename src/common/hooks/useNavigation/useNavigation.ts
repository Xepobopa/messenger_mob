import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation as useOriginalNavigation } from '@react-navigation/native';
import { TScreens } from '@navigation/types';

type ExtendedNavigationProp = StackNavigationProp<TScreens>;

export const useNavigation = (): ExtendedNavigationProp => {
    const navigation = useOriginalNavigation<ExtendedNavigationProp>();

    const push = (
        screen: keyof TScreens,
        params?: TScreens[keyof TScreens],
    ) => {
        navigation.push(screen, params);
    };

    return { ...navigation, push };
};
