import { Service } from '@common/services';
import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { FormView, Input, MainView, NextButton, Title } from './styled';
import { Alert, Text } from 'react-native';
import { useUserData } from '../../../store/tools';

type TItem = {
    label: string;
    value: string;
};

export const CreateChat = () => {
    const { user } = useUserData();
    const [users, setUsers] = useState<Array<TItem>>([]);
    const [chatName, setChatName] = useState<string>('');
    const [dropdownValue, setDropdownValue] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        Service.UserService.getAllUsers().then(res =>
            setUsers(
                res.data.map(user => ({
                    label: user.nickname,
                    value: user.uuid,
                })),
            ),
        );
    }, []);

    const handleCreateChat = () => {
        if (!user?.uuid) {
            Alert.alert("Can't create room, because User UUID is not found!");
            return;
        }
        if (!dropdownValue) {
            Alert.alert("Can't create room, because you didn't pick user!");
            return;
        }

        const payload = {
            title: chatName,
            members: [dropdownValue, user?.uuid],
            type: 'private',
            photo_url:
                'https://i.pinimg.com/736x/73/db/e8/73dbe82d7d38694249c6f0f94c56327d.jpg',
        };

        console.log('payload: ', payload);

        Service.ChatService.postCreateRoom({
            name: chatName,
            users: [user.uuid, dropdownValue]
        })
        .then(res => {
            console.log(res.data);
            Alert.alert(`Chat ${chatName} created successful`);
        })
        .catch(e => {
            console.log({...e});
            console.log(e.response);
        })
        // socket.emit('join-room', payload, (res: TChat) => {
        //     console.log('res => ', res);
        // });
    };

    // const toggleDropdown = () => {
    //     setDropdownOpen(!dropdownOpen);
    // };

    return (
        <MainView>
            <Title>Create Chat</Title>

            <FormView>
                <Input
                    placeholder="Chat name"
                    value={chatName}
                    onChangeText={setChatName}
                />

                <DropDownPicker
                    multiple={false}
                    open={dropdownOpen}
                    value={dropdownValue}
                    items={users}
                    setOpen={setDropdownOpen}
                    setValue={setDropdownValue}
                    setItems={setUsers}
                />

                <NextButton onPress={handleCreateChat}>
                    <Text>Create</Text>
                </NextButton>
            </FormView>
        </MainView>
    );
};
