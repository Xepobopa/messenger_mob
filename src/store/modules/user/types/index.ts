import { TChat } from '@common/types/chat';
import { TUser } from '@common/types/user';

export type TInitialState = {
    user: TUser | null;
    chats: Array<TChat>;
};
