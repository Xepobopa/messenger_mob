import React from 'react';
import uuid from 'react-native-uuid';
import { ChatListElem } from '../ChatListElem';
import { MainScrollView } from './styled';
import { TChatListProps } from './types';

export const ChatsList = ({ data }: TChatListProps) => {
  return (
    <MainScrollView>
      {data.map((elem) => (
        <ChatListElem chat={elem} key={uuid.v4() as string} />
      ))}
    </MainScrollView>
  );
};
