import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { getFormattedAmount } from '../util/stringHelpers/amountFormatter';

interface PaymentSummaryProps {
    remainingDebt: number;
    currentDebt: number;
    totalCardLimit: number;
}

const PaymentSummary = (props: PaymentSummaryProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.text}>{"Remaining Debt From Last Extract"}</Text>
                <Text style={styles.date}>{getFormattedAmount(props.remainingDebt)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>{"Current Debt"}</Text>
                <Text style={styles.date}>{getFormattedAmount(props.currentDebt)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>{"Total Card Limit"}</Text>
                <Text style={styles.date}>{getFormattedAmount(props.totalCardLimit)}</Text>
            </View>
        </View>
    )
}

export default PaymentSummary

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        marginHorizontal: 20,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderWidth: 2,
        borderColor: '#555555',
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 6,
    },
    text: {
        fontSize: 12,
        color: '#555555',
    },
    date: {
        fontSize: 14,
        color: '#333333',
    },
})