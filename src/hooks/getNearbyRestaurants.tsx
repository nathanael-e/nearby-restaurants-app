import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import jwtVerify, { JwtPayload } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { getValue, saveValue } from '../util/secureStore';
import { ILocation } from './useLongitudeLatitude';

interface Token {
    token: string
}

export interface Hit {
    name: string,
    vicinity: string
}

export interface Hits {
    results: Array<Hit>,
    error: string,
}

const defaults:Pick<Hits, 'results' | 'error'> = {
    results: [],
    error: ''
};

export const getNearbyRestaurants = (location: ILocation): Hits => {
    const API_TOKEN:string = 'token';
    const [response, setResponse] = useState<Hits>(defaults);

    const renewToken = async () => {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: 'https://app.restfinder.info/api/token/renew'
        };
        const response: AxiosResponse = await axios<Token>(config);
        const token:Token = response.data;
        await saveValue(API_TOKEN, token.token);
    };

    const fetchData = async ():Promise<Hits> => {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `https://app.restfinder.info/api/location/restaurants?longitude=${location.longitude}&latitude=${location.latitude}`,
            headers: {
                Authorization: `Bearer ${await getValue(API_TOKEN)}`,
            },
        };
        const response: AxiosResponse = await axios<Hits>(config);
        return response.data;
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

    useEffect(() => {
        (async () => { 
            if (location.status === 'success') {
                const valid:boolean = await isValid(await getValue(API_TOKEN));
                if (!valid) {
                    try {
                        await renewToken();
                    } catch (error) {
                        setResponse(
                            {
                                ...defaults,
                                error: 'An error occured... Please try again.'
                            }
                        );
                        return;
                    }
                }
                try {
                    const hits:Hits = await fetchData();
                    setResponse({
                        ...hits,
                        error: ''
                    });
                } catch (error) {
                    setResponse({
                        ...defaults,
                        error: 'An error occured... Please try again.'
                    });
                }
            }})();
    }, [location]);

    return response;

};