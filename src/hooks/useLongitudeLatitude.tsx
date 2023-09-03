import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export interface ILocation {
    status: 'success' | 'denied' | 'pending' | 'timeout',
    longitude: number,
    latitude: number
}

const defaults:Pick<ILocation, 'longitude' | 'latitude' > = {
    longitude: 0,
    latitude: 0,
};


export const useLongitudeLatitude = (): [ILocation, () => Promise<void>] => {
    const [location, setLocation] = useState<ILocation>({...defaults, status: 'pending'});
    
    const locationPromise = Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.Balanced,
    });

    const timeout = async (timeoutMs:number): Promise<Location.LocationObject> => (await new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Timeout exceeded'));
        }, timeoutMs);
    }));

    const refresh = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setLocation({
                ...defaults,
                status: 'denied'
            });
            return;
        }
        try {
            const location:Location.LocationObject = await Promise.race([locationPromise, timeout(5000)]);
            setLocation({
                status: 'success',
                longitude: location.coords.longitude,
                latitude: location.coords.latitude
            });
        } catch (error) {
            setLocation({
                ... defaults,
                status: 'timeout',
            });
        }
    };

    useEffect(() => {
        refresh();
    }, []);
    return [location, refresh];
};