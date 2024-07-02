import React from 'react';
import { ImageSourcePropType } from 'react-native';

export type TButtonRoundProps = {
    onPress: () => void;
    Icon: ImageSourcePropType;
    size: number;
    children?: React.ReactNode;
};
