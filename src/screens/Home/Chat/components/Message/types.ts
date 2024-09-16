import { MessageFromDB } from '@common/socket/interface/chat.interface';

export type TMessageProps = {
  message: MessageFromDB;
  type: 'my' | 'other';
};
