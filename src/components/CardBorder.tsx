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
            <View style={styles.leftColumn}>
                <Text style={styles.name}>
                    {hit.name}
                </Text>
                <Text style={styles.vicinity}>
                    {hit.vicinity}
                </Text>
            </View>
            <View style={styles.rightColumn}>
                <View style={styles.stars}>
                    {hit.rating ? createStars(hit.rating) : null}
                </View>
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
        flexDirection: 'row',
        height: getCardHeight() * 1/2,
        padding: 10,
        position: 'relative'
    },
    leftColumn: {
        alignItems: 'flex-start',
        flex: 3,
        flexDirection: 'column',
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
    rightColumn: {
        alignItems: 'flex-end',
        flex: 1,
        flexDirection: 'column',
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