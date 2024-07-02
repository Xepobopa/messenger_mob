import React from 'react';
import { View } from 'react-native';
import { Button } from '@components/buttons';
import { Common } from '@components/common';
import {
    ElemDateText,
    ElemNameText,
    MainBackgroundImage,
    NormalText,
} from './styled';
import { TChatListElemProps } from './types';
import { Images } from '@assets/Images';

export const ChatListElem = ({ chat }: TChatListElemProps) => {
    return (
        <MainBackgroundImage source={Images.PanelHalfdown}>
            <Common.Row
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
                    onPress={() =>
                        console.log('Press back from chats list pressed!')
                    }
                />

                {/* <FullNameBlock
                    firstName={chat.title}
                    lastName={chat.lastName}
                /> */}
                <ElemNameText>{chat.title}</ElemNameText>

                <View style={{ alignSelf: 'flex-end' }}>
                    <ElemDateText>
                        {new Date(chat.updated_at).toLocaleTimeString()}
                    </ElemDateText>
                </View>

                <Button.ButtonRound
                    Icon={Images.ButtonUp}
                    size={70}
                    onPress={() => console.log('Hello from ', chat.title)}
                >
                    {/* <NormalText>{chat.unreadedMessages}</NormalText> */}
                    <NormalText>0</NormalText>
                </Button.ButtonRound>
            </Common.Row>
        </MainBackgroundImage>
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
