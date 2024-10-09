import { TUser } from '@common/types/user';
import { apiPrivate } from '../../api';
import { TResponse } from '../types';
import { TGetMyRoomsRequest } from './types/getMyRooms';

export class UserService {
  static async getUserByToken(): Promise<TResponse<TUser>> {
    return apiPrivate.get('/user');
  }

  static async getAllUsers(): TResponse<Array<TUser>> {
    return apiPrivate.get('/user/findAll');
  }

  static async getMyRooms(): Promise<TGetMyRoomsRequest['response']> {
    return apiPrivate.get('/user/my-rooms');
  }
}
