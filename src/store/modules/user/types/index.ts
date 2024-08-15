import { Room } from '@common/socket/interface/chat.interface';
import { TAbstract } from '@common/types/abstract';
import { TUser } from '@common/types/user';

export type TInitialState = {
    user: TUser & TAbstract | null;
    chats: Array<Room>;
    isAuthed: boolean;
};
