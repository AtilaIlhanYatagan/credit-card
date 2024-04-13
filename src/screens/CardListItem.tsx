import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

interface CardListItemProps {
    cardName: string;
    cardNumber: string;
    validThru: string;
    userName: string;
    onPress: () => void;
}
const CardListItem = (props: CardListItemProps) => {
    return (
     
        <TouchableOpacity  onPress={props.onPress}>
            <View style={styles.cardContainer}>

                <View style={styles.sectionContainer}>
                    <Text style={styles.cardName}>{props.cardName}</Text>
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.cardNumber}>{props.cardNumber}</Text>
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.validThru}>Valid Thru: {props.validThru}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.userName}>{props.userName}</Text>
                        <Text style={{ flex: 0.3, textAlign: 'right', fontWeight: "500", color: "white", fontSize: 24, fontStyle: 'italic' }}>VISA</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>

    );
}

export default CardListItem
const styles = StyleSheet.create({
    cardContainer: {
        marginTop: 16,
        paddingVertical: 12,
        backgroundColor: '#2259a1',
        borderRadius: 24,
        marginHorizontal: 16,

    },
    cardName: {
        color: '#f6f6f6',
        fontSize: 16,
    },
    cardNumber: {
        color: '#f6f6f6',
        fontSize: 28,
        textAlignVertical: 'bottom'
    },
    validThru: {
        color: '#f6f6f6',
        fontSize: 12,
        alignSelf: 'center',
    },
    userName: {
        color: '#f6f6f6',
        fontSize: 20,
        flex: 0.7
    },
    sectionContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
})