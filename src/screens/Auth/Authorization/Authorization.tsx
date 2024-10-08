import { useState } from "react";
import { Form } from "./components/Form";
import { BackgroundImage, Row, Title } from "./styles";
import { TForm } from "./components/Form/types";
import { Header, FadeButton, Submit } from "@components/common";
import { Images } from "@assets/Images";
import { useNavigation } from "@react-navigation/native";
import { EScreens } from "@navigation/screens";
import { Service } from "@common/services";
import { Loading } from "@components/common/Loading/Loading";
import { EncryptedStorageService } from "@common/storage/encryptedStorage";
import { useAuth } from "@common/hooks/useAuth";
import { ETab } from "@navigation/tabs";

export const Authorization = () => {
    const { setUserData, setIsAuthed } = useAuth();
    const navigate = useNavigation<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<TForm>({ login: '', password: '' });

    const handleMoveToSignUp = () => {
        navigate.navigate(EScreens.AuthRegistration);
    }

    const handleLogin = () => {
        setIsLoading(true);

        Service.AuthService.postSignIn({ nickname: formData.login, password: formData.password })
        .then(res => {
            setIsLoading(false);
            console.log(res.data);
            // save all data
            EncryptedStorageService.setToken(res.data.accessToken);
            setUserData(res.data.user);
            setIsAuthed(true);

            navigate.navigate(ETab.Main);
        })
        .catch(e => {
            console.log({...e});
            setIsLoading(false);
        })
    }

    return (
        <BackgroundImage source={Images.AuthBackground}>
            { isLoading && <Loading/> }

            <Header/>
            <Row>
                <FadeButton 
                    text="Sign up"
                    onClick={handleMoveToSignUp}
                    direction='rightToLeft'
                    startColor={'#0f3945'}
                    />
                <Title>Login</Title>
            </Row>

            <Form setFormData={setFormData} />

            <Submit
                buttonText="Login"
                onSubmitClick={handleLogin}
                bottomText="Don't have an account?"
                bottomRedirectText="Sign up"
                onRedirectClick={handleMoveToSignUp}
            />
        </BackgroundImage>
    );
}