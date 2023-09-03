import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, RefreshControl, StyleSheet, View } from 'react-native';
import { Hit } from '../hooks/getNearbyRestaurants';
import { colors } from '../util/colors';
import { getCardHeight, getMainWindowPadding } from '../util/dimensions';
import { CardBorder } from './CardBorder';
import { CardImage } from './CardImage';


interface ItemFlatListProps {
  hits: Array<Hit>,
  refreshCallback: () => Promise<void>
}


const ItemSeparatorView = () => {
    return (
    //Item Separator
        <View
            style={styles.itemSeparator}
        />
    );
};

export const ItemFlatList: React.FC<ItemFlatListProps>  = ({hits, refreshCallback}) => {
    const [listItems, setListItems] = useState<Array<Hit>>(hits);
    const [refresh, setRefresh] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            setRefresh(false);
            setListItems(hits);
        })();
    }, [hits]);

    const onPullDown = async () => {
        setRefresh(true);
        await refreshCallback();
    };

    const itemView: ListRenderItem<Hit> = ( {item} ) => {
        return (
            <View style={styles.box}>
                <View style={styles.card}>
                    <CardImage hit={item}/>
                </View>
                <CardBorder hit={item}></CardBorder>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={listItems}
                renderItem={itemView}
                ItemSeparatorComponent={ItemSeparatorView}
                keyExtractor={(item) => item.place_id}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refresh} onRefresh={onPullDown}></RefreshControl>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        backgroundColor: colors.lightgray,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.80,
        shadowRadius: 4.65,
    },
    card: {
        backgroundColor: colors.lightgray,
        flex: 1,
        height: getCardHeight(),
        position: 'relative',
    },
    container: {
        display: 'flex',
        flex: 1,
        ... getMainWindowPadding(),
    },
    flatList: {
        overflow: 'visible'
    },
    itemSeparator: {
        height: 15, 
        width: '100%'
    }
});