import { TRequest } from '../../types';

export type TPostSendMessageRequest = TRequest<TPayload, null>;

type TPayload = {
    message: string;
    fromUid: string;
    toRoomUid: string;
};
