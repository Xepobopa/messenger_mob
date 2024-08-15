import { TRequest } from '../../types';

export type TPostCreateRoom = TRequest<TPayload, any>;

type TPayload = {
    name: string;
    users: Array<string>
};
