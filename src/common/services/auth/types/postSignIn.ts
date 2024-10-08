import { TAbstract } from '@common/types/abstract';
import { TBasicDataResponse, TRequest } from '../../types';
import { TUser } from './common';

export type TPostUserSignInRequest = TRequest<TPayload, TResponse>;

type TPayload = {
    nickname: string;
    password: string;
};

type TResponse = {
    user: TUser & TAbstract;
    accessToken: string;
};
