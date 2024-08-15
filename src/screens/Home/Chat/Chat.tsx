import { ActivityIndicator, Alert, KeyboardAvoidingView } from "react-native"
import { ActivityIndicatorContainer, MainContainer } from "./styles"
import { TChatMainProps } from "./types"
import { useEffect, useState } from "react"
import { MessageFromDB, MessageFromWS, Room } from "@common/socket/interface/chat.interface"
import { Service } from "@common/services"
import { Header } from "./components/Header"
import { MessageList } from "./components/MessageList"
import { Sender } from "./components/Sender"
import { useUserData } from "@store/tools"
import socket from "@common/socket/connection"

export const Chat = ({ route, navigation }: TChatMainProps) => {
    const { user } = useUserData();
    const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(true);
    const [isChatInfoLoading, setIsChatInfoLoading] = useState<boolean>(true);
    const [messages, setMessages] = useState<MessageFromDB[]>([]); 
    const [chatInfo, setChatInfo] = useState<Room | null>(null);

    useEffect(() => {
        // load messages
        Service.ChatService.loadMessages({ roomUid: route.params.roomUid })
            .then(res => setMessages(res.data))
            .catch(err => Alert.alert('Error while trying to load messages!'))
            .finally(() => setIsMessagesLoading(false));

        // load chat info 
        Service.ChatService.getRoomInfo({ roomUid: route.params.roomUid })
            .then(res => setChatInfo(res.data))
            .catch(err => Alert.alert('Error while trying to load messages!'))
            .finally(() => setIsChatInfoLoading(false));
    }, []);

    useEffect(() => {
        if (!user) return;

        // connect to room as socket client
        socket.emit('join-room', { userUid: user?.uuid, roomUid: route.params.roomUid });

        socket.on('message', (message: MessageFromWS) => {
            setMessages(prevState => [...prevState, message]);
            console.log('New message! => ', message);
        })
    }, [user]);

    const handleSendMessage = (message: string) => {
        if (!message || !chatInfo || !user) return;

        Service.ChatService.sendMessage({ 
            toRoomUid: chatInfo.uuid,
            fromUid: user.uuid,
            message
        });
    }

    return (
        <MainContainer>
            <Header title={chatInfo?.name} avatar_url={chatInfo?.users?.at(0)?.profile_url} />

                {isMessagesLoading ? (
                    <ActivityIndicatorContainer>
                        <ActivityIndicator size={'large'} color={'#fff'} style={{ alignSelf: 'center' }} />
                    </ActivityIndicatorContainer>
                ) : (
                    <MessageList messages={messages} />
                )}

                <Sender onSend={handleSendMessage}/>
        </MainContainer>
    )
}