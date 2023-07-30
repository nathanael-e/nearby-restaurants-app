import { useEffect, useState } from 'react';
import * as Location from 'expo-location';



interface Token {
    token: string
}
export interface ILocation {
    status: 'success' | 'denied' | 'pending',
    longitude: number,
    latitude: number,
}

const defaults:Pick<ILocation, 'longitude' | 'latitude'> = {
    longitude: 0,
    latitude: 0
};


export const useLongitudeLatitude = (): ILocation => {
    const [location, setLocation] = useState<ILocation>({...defaults, status: 'pending'});
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocation({
                    ...defaults,
                    status: 'denied',
                });
                return;
            }
            const location = await Location.getCurrentPositionAsync({accuracy: Location.LocationAccuracy.Balanced});
            setLocation({
                status: 'success',
                longitude: location.coords.longitude,
                latitude: location.coords.latitude
            });
        })();
    }, []);
    return location;
};