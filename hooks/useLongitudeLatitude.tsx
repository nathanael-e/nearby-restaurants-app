import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export const useLongitudeLatitude = (): [string, string, string, null | Location.LocationObject] => { 
    const [longitude, setLongitude] = useState<string>('');
    const [latitude, setLatitude] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [locationObject, setLocationObject] = useState<null | Location.LocationObject>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            setLongitude(location.coords.longitude.toString());
            setLatitude(location.coords.latitude.toString());
            setLocationObject(location);
        })();
    }, []);

    return [longitude, latitude, errorMsg, locationObject];
};