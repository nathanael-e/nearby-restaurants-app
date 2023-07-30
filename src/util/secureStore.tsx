import * as SecureStore from 'expo-secure-store';

export const saveValue = async (key:string, value:string) => (
    await SecureStore.setItemAsync(key, value)
);

export const getValue = async (key: string):Promise<string|null> => {
    const result:string | null = await SecureStore.getItemAsync(key);
    return result;
};