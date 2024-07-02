import { TBasicDataResponse, TRequest } from '../../types';
import { TUser } from './common';

export type TPostUserSignUpRequest = TRequest<TPayload, TResponse>;

type TPayload = {
    username: string;
    real_name: string;
    phone: string;
    email: string;
    password: string;
    avatar: string;
};

type TResponse = TUser & TBasicDataResponse;
