import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socket from '../../socket/connection';  // Adjust the path to your socket instance
import { userSliceActions } from '@store/modules/user/reducer';
import { Room } from '@common/socket/interface/chat.interface';

const useSocketEvents = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('rooms', (newRoom: Room) => { // TypeScript will now recognize 'rooms'
      console.log('New room received: ', newRoom);
      dispatch(userSliceActions.pushChat(newRoom));
    });

    return () => {
      socket.off('rooms');
    };
  }, [dispatch]);
};

export default useSocketEvents;