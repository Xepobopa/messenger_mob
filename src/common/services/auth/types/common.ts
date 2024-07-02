import { EUserStatus } from '../../types';

export type TUser = {
    id: string;
    uuid: string;
    username: string;
    real_name: string;
    profile_url: string;
    phone: string;
    email: string;
    password: string;
    is_activated: boolean;
    status: EUserStatus;
};
