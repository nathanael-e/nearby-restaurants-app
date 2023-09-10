import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
import jwtVerify, { JwtPayload } from 'jwt-decode';

export const BASE_API_URL = process.env.EXPO_PUBLIC_BASE_API_URL;

const API_REST_FINDER_KEY = 'API_REST_FINDER_KEY';

interface Token {
    token: string
}

const renewToken = async () => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `${BASE_API_URL}api/token/renew`
    };
    const response: AxiosResponse = await axios<Token>(config);
    const token:Token = response.data;
    await saveValue(API_REST_FINDER_KEY, token.token);
    return token.token;
};


const isValid = async (token: string|null): Promise<boolean> => {
    if (!token) {
        return false;
    }
    const payload: JwtPayload = await jwtVerify(token);
    if (payload.exp && Date.now() >= payload.exp * 1000) {
        return false;
    }
    return true;
};

const saveValue = async (key:string, value:string) => (
    await SecureStore.setItemAsync(key, value)
);

const getValue = async ():Promise<string> => {
    const token:string | null = await SecureStore.getItemAsync(API_REST_FINDER_KEY);
    const valid = await isValid(token);
    if (!valid) {
        return await renewToken();
    }
    return token === null ? '' : token;
};

export const getHeader = async () : Promise<string> => {
    try {
        return `Bearer ${await getValue()}`;
    } catch (error) {
        return '';
    }
};

export const getToken = async() : Promise<string> => {
    try {
        return await getValue();
    } catch (error) {
        return '';
    }
};
