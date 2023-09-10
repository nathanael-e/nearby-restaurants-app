import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Hit } from '../hooks/getNearbyRestaurants';
import { colors } from '../util/colors';
import { getCardHeight } from '../util/dimensions';

interface CardBorderProps {
    hit: Hit
}


export const CardBorder: React.FC<CardBorderProps> = ({hit}) => {

    const createStars = (rating:number, stars: React.ReactNode[] = []): React.ReactNode[] => {
        if (stars.length === 5) {
            return stars;
        }
        if (rating >= 1) {
            return createStars(rating - 1, [<FontAwesome key={stars.length} name="star" size={24} color="orange" />, ...stars]);
        } else if (rating >= 0.25) {
            return createStars(rating -1 , [<FontAwesome key={stars.length} name="star-half-empty" size={24} color="orange" />, ...stars]);
        }
        return createStars(0, [<FontAwesome key={stars.length} name="star-o" size={24} color="orange" />, ...stars]);
    };

    return ( 
        <View style={styles.border}>
            <View style={styles.row}>
                <Text style={styles.name}>
                    {hit.name}
                </Text>
                <View style={styles.stars}>
                    {hit.rating ? createStars(hit.rating) : null}
                </View>
            </View>
            <View style={styles.row}>
                <Text style={styles.vicinity}>
                    {hit.vicinity}
                </Text>
                <Text style={styles.rating}>
                    {hit.rating ? 'Rating: ' + hit.rating : null }
                </Text>
            </View>
        </View>);
};

const styles = StyleSheet.create({
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
        fontSize: 17  
    },
    rating: {
        color: colors.lightgray,
        fontFamily:'Oswald_400Regular',
        fontSize: 12
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    stars: {
        flexDirection: 'row-reverse'
    },
    vicinity: {
        color: colors.lightgray,
        fontFamily:'Oswald_400Regular',
        fontSize: 12  
    }
});