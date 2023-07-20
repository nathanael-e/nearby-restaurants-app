import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from './util/colors';
import { useLongitudeLatitude } from './hooks/useLongitudeLatitude';
import { useEffect, useState } from 'react';

export default function App() {
    const [longitude, latitude, errorMsg] = useLongitudeLatitude();
    const [text, setText] = useState('Waiting ...');

    useEffect(() => {
        if(longitude && latitude) {
            setText(longitude + ' ' + latitude);
        } else if (errorMsg) {
            setText(errorMsg);
        }
    }, [longitude, latitude, errorMsg]);

    return (
        <View style={styles.container}>
            <Text>{text}</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: 'center',
    },
});
