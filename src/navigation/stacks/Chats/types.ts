
import { TChatMainParamList } from 'src/screens/Home/Chat/types';
import { EScreens } from '../../screens';

export type TChatsStack = {
    [EScreens.ChatsList]: undefined;
    [EScreens.CreateChat]: undefined;
    [EScreens.ChatMain]: TChatMainParamList;
};
