import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet } from 'react-native';
import { Hit } from '../hooks/getNearbyRestaurants';
import { colors } from '../util/colors';
import { getCardHeight, getCardWidth } from '../util/dimensions';
import { BASE_API_URL, getToken } from '../util/secureStore';

interface CardImageProps {
    hit: Hit
}

export const CardImage: React.FC<CardImageProps> = ({hit}) => {
    const [token, setToken] = useState('');
    const [fetching, setFetching] = useState(false);

    const source = {
        uri: `${BASE_API_URL}api/location/photo?photo_reference=${hit.photo?.photo_reference}` +
       `&height=${getCardHeight()}&width=${getCardWidth()}` +
       `&token=${token}`
    };
    
    useEffect(() => {
        (async () => {
            setToken(await getToken());
        })();
    }, [hit]);

    return ( 
        token ?
            <ImageBackground 
                resizeMode='cover' 
                style={styles.picture}
                onLoadStart={() => setFetching(true)} 
                onLoadEnd={() => setFetching(false)}
                onError={(error) => console.log(error.nativeEvent.error)}
                source={source}
            >
                {fetching ? <ActivityIndicator style={styles.activityIndicator} size="large" color={colors.steelblue} /> : null }
            </ImageBackground>
            : null
    );
};


const styles = StyleSheet.create({
    activityIndicator: {
        bottom: '50%',
        left: '50%',
        position: 'absolute',
        right: '50%',
        top: '50%'
    },
    picture: {
        height: 200,
        position: 'relative',
        width: '100%',
    },
    shadow: {
        shadowColor: colors.black,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 1,
    }
});