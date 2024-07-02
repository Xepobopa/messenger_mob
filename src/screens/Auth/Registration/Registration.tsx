import axios from 'axios';
import React, { useState } from 'react';
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { useAuth } from '@common/hooks/useAuth/useAuth';
import { useNavigation } from '@common/hooks/useNavigation';
import { Service } from '@common/services';
import { EScreens } from '@navigation/screens';
import {
    InfoLink,
    Input,
    MainView,
    NextButton,
    RegistrationFormView,
    Title,
} from './styled';

// -------------------
// WATCH JIRA!!!!!!!!!
// -------------------

export const Registration = () => {
    const { setUserData } = useAuth();
    // TODO: set types on useNavigation
    const { navigate } = useNavigation();
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [realName, setRealName] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [userImageUri, setUserImageUri] = useState<string | undefined>();

    const moveToLogInScreen = () => {
        // redirect to log in screen
        navigate(EScreens.AuthAuthorization);
    };

    const onNext = async () => {
        if (password1 !== password2) {
            Alert.alert('Passwords do not match!');
            return;
        }

        if (!userImageUri) {
            Alert.alert('Set your avatar!');
            return;
        }

        try {
            Service.AuthService.postSignUp({
                avatar: userImageUri,
                real_name: realName,
                password: password1,
                username: nickname,
                phone,
                email,
            })
                .then(res => {
                    console.log(res.data);

                    setUserData(res.data);
                    navigate(EScreens.AuthAuthorization);
                })
                .catch(err => {
                    if (axios.isAxiosError(err)) {
                        console.log('[AXIOS ERROR]: ', err);
                    }
                });
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.error(e.toJSON());
                if (e.response) {
                    console.error(e?.response.data.message);
                }
            }
        }
    };

    const onPickPhotoPressed = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                console.log('Image selected: ', response.assets);
                if (response.assets) setUserImageUri(response.assets[0].uri);
            }
        });
    };

    return (
        <MainView>
            <Title>Auth Reg</Title>
            <RegistrationFormView>
                <View style={{ gap: 20, alignItems: 'center' }}>
                    <Image
                        source={{
                            uri:
                                userImageUri ||
                                'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                        }}
                        style={styles.avatar}
                    />
                    <Button
                        title="Pick profile photo"
                        onPress={onPickPhotoPressed}
                    />
                    <Input
                        placeholder={'Email...'}
                        placeholderTextColor={'lightgray'}
                        onChangeText={text => setEmail(text)}
                    />
                    <Input
                        placeholder={'Phone... (+380971234567)'}
                        placeholderTextColor={'lightgray'}
                        onChangeText={text => setPhone(text)}
                    />
                    <Input
                        placeholder={'Nickname...'}
                        placeholderTextColor={'lightgray'}
                        onChangeText={text => setNickname(text)}
                    />
                    <Input
                        placeholder={'Real name...'}
                        placeholderTextColor={'lightgray'}
                        onChangeText={text => setRealName(text)}
                    />
                    <Input
                        secureTextEntry
                        placeholder={'Password'}
                        placeholderTextColor={'lightgray'}
                        onChangeText={text => setPassword1(text)}
                    />
                    <Input
                        secureTextEntry
                        placeholder={'Copy password'}
                        placeholderTextColor={'lightgray'}
                        onChangeText={text => setPassword2(text)}
                    />
                    <TouchableOpacity onPress={moveToLogInScreen}>
                        <InfoLink>
                            Already has account? Click here to log in!
                        </InfoLink>
                    </TouchableOpacity>
                </View>
                <NextButton onPress={onNext}>
                    <Text>Next</Text>
                </NextButton>
            </RegistrationFormView>
        </MainView>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: 60,
        height: 60,
        backgroundColor: 'grey',
        borderRadius: 50,
    },
});
