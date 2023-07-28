import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from './util/colors';
import { useLongitudeLatitude } from './hooks/useLongitudeLatitude';
import { useEffect, useState } from 'react';
import jwtVerify, {JwtPayload} from 'jwt-decode';

import axios, { AxiosRequestConfig, AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_TOKEN = 'token';

const saveValue = async (key:string, value:string) => (
    await SecureStore.setItemAsync(key, value)
);

const getValue = async (key: string):Promise<string|null> => {
    const result:string | null = await SecureStore.getItemAsync(key);
    return result;
};

interface Token {
    token: string
}

interface Hit {
    name: string,
    vicinity: string
}
interface Hits {
    results: Array<Hit>

}

export default function App () {
    const location = useLongitudeLatitude();
    const [response, setResponse] = useState<Hits>({
        results: []
    });

    useEffect(() => {
        (async () => { 
            if (location.status === 'success') {
                const key = await getValue(API_TOKEN);
                if (key) {
                    try {
                        const payload: JwtPayload = await jwtVerify(key);
                        if (payload.exp && Date.now() >= payload.exp * 1000) {
                            await renewToken();
                        }
                    } catch (error) {
                        console.log('error');
                    }
                } else {
                    await renewToken();
                }

                try {
                    const hits:Hits = await fetchData();
                    setResponse(hits);
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        console.log(error.response?.statusText);
                    }
                }
            }})();
    }, [location]);

    const renewToken = async ():Promise<Token> => {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: 'https://app.restfinder.info/api/token/renew'
        };
        const response: AxiosResponse = await axios<Token>(config);
        const token:Token = response.data;
        await saveValue(API_TOKEN, token.token);
        return response.data;
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

    const getContent = (): React.ReactElement => {
        if (location.status === 'pending') {
            return <ActivityIndicator size="large" color={colors.steelblue} />;
        } else if (location.status === 'denied'){
            return <Text>{'Access denied ...'}</Text>;
        } else {
            return <Text>{'Response: ' + JSON.stringify(response)}</Text>;
        }
    };

    return (
        <View style={styles.container}>
            {getContent()}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.whitesmoke,
        flex: 1,
        justifyContent: 'center',
    },
});
