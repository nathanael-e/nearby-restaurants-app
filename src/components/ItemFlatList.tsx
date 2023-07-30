import React, { useEffect, useState } from 'react';
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
import { Hit } from '../hooks/getNearbyRestaurants';

interface ItemFlatListProps {
  hits: Array<Hit>;
}

interface ItemViewProps {
    item: Hit
}

const ItemSeparatorView = () => {
    return (
    //Item Separator
        <View
            style={{ height: 0.5, width: '100%', backgroundColor: 'black' }}
        />
    );
};

export const ItemFlatList: React.FC<ItemFlatListProps>  = ({hits}) => {

    const [listItems, setListItems] = useState<Array<Hit>>(hits);
    //const translateX = useRef(new Animated.Value(Dimensions.get('window').height)).current; 
    useEffect(() => {
        //Animated.timing(translateX,{toValue:0, duration:2000, useNativeDriver: true}).start();
    });

    useEffect(() => {
        setListItems(hits);
    }, [hits]);

    const ItemView: React.FC<ItemViewProps> = ( {item} ) => {
        return (
        // Single Comes here which will be repeatative for the FlatListItems
            <Animated.View >
                <Text style={styles.item} onPress={() => getItem(item)}>
                    {item.name}
                </Text>
            </Animated.View>
        );
    };

    const getItem = (item:Hit) => {
        //Function for click on an item
        alert('Id : ' + item.name + ' Value : ' + item.vicinity);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={listItems}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 0,
    
    },
    item: {
        fontSize: 18,
        height: 44,
        padding: 10,
    },
});