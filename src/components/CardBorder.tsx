import { StyleSheet, Text, View } from 'react-native';
import { Hit } from '../hooks/getNearbyRestaurants';
import { colors } from '../util/colors';
import { getCardHeight } from '../util/dimensions';

interface CardBorderProps {
    hit: Hit
}


export const CardBorder: React.FC<CardBorderProps> = ({hit}) => {
    return ( 
        <View style={styles.border}>
            <Text style={styles.name}>
                {hit.name}
            </Text>
            <Text style={styles.address}>
                {hit.vicinity}
            </Text>
        </View>);
};

const styles = StyleSheet.create({
    address: {
        color: colors.lightgray,
        fontFamily:'Oswald_400Regular',
        fontSize: 12  
    },
    border: {
        backgroundColor: colors.navy,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: colors.steelblue,
        borderWidth: 0,
        bottom: 0,
        height: getCardHeight() * 1/2,
        padding: 10,
        position: 'relative',
    },
    name: {
        color: colors.lightgray,
        fontFamily:'Oswald_400Regular',
        fontSize: 18  
    }
});