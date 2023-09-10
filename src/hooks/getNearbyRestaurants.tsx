import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { BASE_API_URL, getHeader } from '../util/secureStore';
import { ILocation } from './useLongitudeLatitude';

export interface Photo {
    height: number,
    width: number,
    photo_reference: string
}

export interface Hit {
    name: string,
    vicinity: string,
    place_id: string,
    rating?: number,
    photo: Photo,
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
    const [response, setResponse] = useState<Hits>(defaults);

    const fetchData = async ():Promise<Hits> => {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `${BASE_API_URL}api/location/restaurants?longitude=${location.longitude}&latitude=${location.latitude}`,
            headers: {
                Authorization: await getHeader(),
            },
        };
        const response: AxiosResponse = await axios<Hits>(config);
        return response.data;
    };

    useEffect(() => {
        (async () => { 
            if (location.status !== 'success') {
                setResponse({
                    results: [],
                    error: 'An error occurred ...'
                });
                return;
            }
            try {
                const hits:Hits = await fetchData();
                setResponse({
                    ...hits,
                    error: ''
                });
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error.response);
                }
                setResponse({
                    ...defaults,
                    error: 'An error occured... Please try again.'
                });
            }
        })();
    }, [location]);

    return response;

};