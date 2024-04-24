import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import { Transaction } from '../types/transaction.type'
import { getTransactionsWithCardId } from '../api/transactionApi'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../navigation/stackNavigator'
import { getFormattedAmount } from '../util/stringHelpers/amountFormatter'

type TransactionScreenRouteProp = RouteProp<RootStackParamList, 'Transactions'>;
const Transactions = ({ route }: { route: TransactionScreenRouteProp }) => {

    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []); // Pass an empty array as second argument to useEffect to run only once

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const fetchData = async () => {
        try {
            const response = await getTransactionsWithCardId(route.params.cardId);
            console.log(route.params.cardId)
            console.log(response)
            setTransactions(response);
        } catch (error) {
            console.error('Error fetching cards:', error);
        } finally {
            setRefreshing(false); // Ensure refreshing state is reset even if there's an error
        }
    };

    return (
        <SafeAreaView style={{ marginHorizontal: 20, flex: 1 }}>
            {refreshing ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            ) : (
                transactions.length === 0 && !refreshing ? (
                    <Text>No transactions available</Text>
                ) : (
                    <FlatList
                        data={transactions}
                        renderItem={({ item }) => (
                            <TransactionItem
                                _id={item._id}
                                cardId={item.cardId}
                                amount={item.amount}
                                paymentType={item.paymentType}
                                transactionDate={item.transactionDate}
                            />
                        )}
                        keyExtractor={(item) => Math.random().toString()}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    />
                )
            )}
        </SafeAreaView>
    )
}

const TransactionItem = (transaction: Transaction) => {
    return (
        <View style={styles.transactionCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: 'black', fontSize: 14 }}>Amount:</Text>
                <Text style={{ color: 'black', fontSize: 14 }}>{getFormattedAmount(transaction?.amount)}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <Text style={{ color: 'black', fontSize: 14 }}>Payment Type:</Text>
                <Text style={{ color: 'black', fontSize: 14 }}>{transaction?.paymentType}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <Text style={{ color: 'black', fontSize: 14 }}>Date:</Text>
                <Text style={{ color: 'black', fontSize: 14 }}>
                    {new Date(transaction?.transactionDate!).toLocaleDateString('en-GB')}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <Text style={{ color: 'black', fontSize: 14 }}>Time:</Text>
                <Text style={{ color: 'black', fontSize: 14 }}>
                    {new Date(transaction?.transactionDate!).getHours().toString().padStart(2, '0')}:
                    {new Date(transaction?.transactionDate!).getMinutes().toString().padStart(2, '0')}
                </Text>
            </View>
        </View>
    )
}

export default Transactions

const styles = StyleSheet.create({
    transactionCard: {
        marginTop: 16,
        paddingVertical: 16,
        paddingHorizontal: 12,
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'grey',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})