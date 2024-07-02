import { TUser } from '@common/types/user';
import { apiPrivate } from '../../api';
import { TResponse } from '../types';

export class UserService {
    static async getUserByToken(): Promise<TResponse<TUser>> {
        return apiPrivate.get('/user');
    }

    static async getAllUsers(): TResponse<Array<TUser>> {
        return apiPrivate.get('/user/findAll');
    }
}
