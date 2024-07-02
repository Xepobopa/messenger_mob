import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TInitialState } from './types';
import { EStoreReducer } from '../../types';
import { TUser } from '@common/types/user';
import { TChat } from '@common/types/chat';

const initialState: TInitialState = {
    user: null,
    chats: [],
};

export const slice = createSlice({
    name: EStoreReducer.user,
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<TUser>) => {
            state.user = action.payload;
        },
        clearUser: state => {
            state.user = null;
        },

        setChats(state, action: PayloadAction<Array<TChat>>) {
            state.chats = action.payload;
        },
        pushChat(state, action: PayloadAction<TChat>) {
            state.chats.push(action.payload);
        },
        removeChat(state, action: PayloadAction<TChat>) {
            state.chats = state.chats.filter(
                chat => chat.uuid !== action.payload.uuid,
            );
        },
    },
});

export const userSliceActions = slice.actions;

export default slice.reducer;
