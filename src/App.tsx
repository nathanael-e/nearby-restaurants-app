import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ItemFlatList } from './components/ItemFlatList';
import { Hits, getNearbyRestaurants } from './hooks/getNearbyRestaurants';
import { ILocation, useLongitudeLatitude } from './hooks/useLongitudeLatitude';
import { colors } from './util/colors';

export default function App () {
    const location: ILocation = useLongitudeLatitude();
    const response: Hits = getNearbyRestaurants(location);

    useEffect(() => {}, [response]);

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
            <ItemFlatList hits={response.results} />
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
