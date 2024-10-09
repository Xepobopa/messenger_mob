import React from 'react';
import { THeaderProps } from './types.ts';
import { MainView, StyledImage, Title } from './styled.ts';
import { ActivityIndicator } from 'react-native';

export const Header = ({ avatar_url, title }: THeaderProps) => {
  return (
    <MainView>
      {avatar_url ? (
        <StyledImage source={{ uri: avatar_url }} resizeMode="contain" />
      ) : (
        <ActivityIndicator size="small" color={'#fff'} />
      )}
      <Title>{title}</Title>
    </MainView>
  );
};
