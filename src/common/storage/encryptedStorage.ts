import EncryptedStorage from 'react-native-encrypted-storage';

//TODO: get keys for storage from .env
export class EncryptedStorageService {
    static async setToken(token: string) {
        try {
            await EncryptedStorage.setItem('token', token);
        } catch (error) {
            console.error('Error while trying to save token to EncryptedStorageService!');
        }
    }

    static async getToken() {
        try {
            const token = await EncryptedStorage.getItem('token');
            if (!token) {
                console.error('Token from EncryptedStorageService is undefined!'); 
                return null;   
            }

            return token;
        } catch (error) {
            console.error('Error while trying to get token from EncryptedStorageService!');
        }
    }

    static async clearAll() {
        try {
            await EncryptedStorage.clear();
        } catch (error) {
            console.error('Error while trying to clear EncryptedStorageService!');
        }
    }
}