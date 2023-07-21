import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from './util/colors';
import { useLongitudeLatitude } from './hooks/useLongitudeLatitude';
import { useEffect } from 'react';

export default function App () {
    const location = useLongitudeLatitude();

    useEffect(() => {}, [location]);

    const getContent = (): React.ReactElement => {
        if (location.status === 'pending') {
            return <ActivityIndicator size="large" color={colors.steelblue} />;
        } else if (location.status === 'denied'){
            return <Text>{'Access denied ...'}</Text>;
        } else {
            return <Text>{'longitude: ' + location.longitude + ' latitude: ' + location.latitude}</Text>;
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
