import { TAbstract } from './abstract';
import { TChat } from './chat';

export type TUser = {
    username: string;
    real_name: string;
    profile_url: string;
    phone: string;
    email: string;
    status: string;
    is_activated: boolean;
    chats: Array<TChat>;
} & TAbstract;
