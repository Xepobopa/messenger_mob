import { apiPrivate } from '../../api';
import { TPostUserSignInRequest } from './types/postSignIn';
import { TPostUserSignUpRequest } from './types/postSignUp';

export class AuthService {
    static async postSignUp(
        data: TPostUserSignUpRequest['payload'],
    ): Promise<TPostUserSignUpRequest['response']> {
        const formDataPayload = new FormData();
        formDataPayload.append('username', data.username);
        formDataPayload.append('real_name', data.real_name);
        formDataPayload.append('phone', data.phone);
        formDataPayload.append('email', data.email);
        formDataPayload.append('password', data.password);
        formDataPayload.append('avatar', {
            uri: data.avatar,
            name: data.avatar?.split('/')?.[
                data.avatar?.split('/')?.length - 1
            ],
            type: `image/${data.avatar?.split('.').pop()}`,
        });

        return apiPrivate.post('/auth/sign-up', formDataPayload, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    static async postSignIn(
        data: TPostUserSignInRequest['payload'],
    ): Promise<TPostUserSignInRequest['response']> {
        return apiPrivate.post('/auth/sign-in', data);
    }
}
