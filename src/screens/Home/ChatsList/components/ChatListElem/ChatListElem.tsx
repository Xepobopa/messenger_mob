import React from 'react';
import { TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Button } from '@components/buttons';
import {
  ElemDateText,
  ElemNameText,
  MainBackgroundImage,
  NormalText,
} from './styled';
import { TChatListElemProps } from './types';
import { Images } from '@assets/Images.ts';
import { Row } from '@components/common';
import { useNavigation } from '@react-navigation/native';
import { EScreens } from '@navigation/screens';

export const ChatListElem = ({ chat }: TChatListElemProps) => {
  const navigation = useNavigation<any>();

  const handleMoveToChat = () => {
    navigation.navigate(EScreens.ChatMain, { roomUid: chat.uuid });
  };

  return (
    <TouchableOpacity onPress={handleMoveToChat}>
      <MainBackgroundImage source={Images.PanelHalfdown}>
        <Row
          style={{
            height: 75,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button.ButtonRound
            Icon={Images.ButtonBack}
            size={75}
            onPress={() => console.log('Press back from chats list pressed!')}
          />

          {/* <FullNameBlock
                        firstName={chat.title}
                        lastName={chat.lastName}
                    /> */}
          <ElemNameText>{chat.name}</ElemNameText>

          <View style={{ alignSelf: 'flex-end' }}>
            <ElemDateText>
              {new Date(chat.updated_at).toLocaleTimeString()}
            </ElemDateText>
          </View>

          <Button.ButtonRound
            Icon={Images.ButtonUp}
            size={70}
            onPress={() => console.log('Hello from ', chat.name)}
          >
            {/* <NormalText>{chat.unreadedMessages}</NormalText> */}
            <NormalText>0</NormalText>
          </Button.ButtonRound>
        </Row>
      </MainBackgroundImage>
    </TouchableOpacity>
  );
};

// type TFullNameBlockProps = {
//     firstName: string;
//     lastName: string;
// };

// const FullNameBlock = ({ firstName, lastName }: TFullNameBlockProps) => {
//     return (
//         <View>
//             <ElemNameText>{firstName}</ElemNameText>
//             <ElemNameText>{lastName}</ElemNameText>
//         </View>
//     );
// };
