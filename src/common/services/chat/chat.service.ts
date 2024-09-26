import { apiFormData, apiPrivate } from '../../api';
import { TGetMessages } from './types/getMessages';
import { TGetRoomInfo } from './types/getRoomInfo';
import { TPostCreateRoom } from './types/postCreateRoom';
import { TPostSendMessageRequest } from './types/postSendMessage';
 

export class ChatService {
  static async postCreateRoom(
    data: FormData // Ensure this is of type FormData
  ): Promise<TPostCreateRoom['response']> {
    return apiFormData.post('/chat/create-room', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  
  static async getRoomInfo(
    data: TGetRoomInfo['payload']
  ): Promise<TGetRoomInfo['response']> {
    return apiPrivate.get(`/chat/${data.roomUid}`);
  }

  static async loadMessages(
    data: TGetMessages['payload']
  ): Promise<TGetMessages['response']> {
    return apiPrivate.get(`/chat/load-messages/${data.roomUid}`);
  }

  static async sendMessage(
    data: TPostSendMessageRequest['payload']
  ): Promise<TPostSendMessageRequest['response']> {
    return apiPrivate.post(`/chat/message`, data);
  }
}
