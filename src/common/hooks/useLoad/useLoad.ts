import { useAuth } from '../useAuth';
import { Service } from '@common/services';

export const useLoad = () => {
  const { setUserData, setChats } = useAuth();

  const loadUserAndChats = async () => {
    const user = await Service.UserService.getUserByToken();
    if (!user.data) {
      throw new Error("Can't fetch user!");
    }
    setUserData(user.data);

    //TODO: load chats
    const chatsRes = await Service.UserService.getMyRooms();
    setChats(chatsRes.data[0].chats);
  };

  return { loadUserAndChats };
};
