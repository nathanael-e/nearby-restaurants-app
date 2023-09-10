import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ItemFlatList } from './components/ItemFlatList';
import { Hits, getNearbyRestaurants } from './hooks/getNearbyRestaurants';
import { ILocation, useLongitudeLatitude } from './hooks/useLongitudeLatitude';
import { colors } from './util/colors';

export const RestFinder = () => {
    const [location, refresh]:[ILocation, () => Promise<void>] = useLongitudeLatitude();
    const response: Hits = getNearbyRestaurants(location);

    useEffect((
    ) => {
        console.log(response);
    }, [response]);

    const render = () => {
        if (response.error) {
            return ( 
                <View style={styles.container}>
                    <Text>An error occurred ... Please try again</Text>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <ItemFlatList hits={response.results} refreshCallback={refresh} />
                <StatusBar style="auto" />
            </View>
        );
    };

    return render();
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightgray,
        flex: 1,
        justifyContent:'center',
    },
});