import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, SafeAreaView } from 'react-native';
import Button from '../components/Button';
import DropdownComponent from '../components/DropdownComponent';
import { RootStackParamList } from '../navigation/stackNavigator';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Payment } from '../types/payment.type';
import { postPayment } from '../api/paymentApi';
import { showMessage } from 'react-native-flash-message';
import { getFormattedAmount } from '../util/stringHelpers/amountFormatter';
import { Transaction } from '../types/transaction.type';
import { StackNavigationProp } from '@react-navigation/stack';

const paymentTypes = [
    { label: 'Receipt', value: 'receipt' },
    { label: 'Other', value: 'other' }
];

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Payments'>;
const Payments = ({ route }: { route: ProfileScreenRouteProp }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
    const [transaction, setTransaction] = useState<Transaction>();

    const makePostPaymentRequest = async (paymentData: Payment) => {
        try {
            const response = await postPayment(paymentData);
            console.log(JSON.stringify(response))
            if (response.status === 201) {
                setPaymentSuccess(true)
                setTransaction(response.data);
                showMessage({
                    message: "Payment Successful",
                    type: "success",
                });
            }
        } catch (error) {
            console.error('Error creating payment:', error);
            showMessage({
                message: "Payment Failed",
                type: "danger",
            });
        }
    }

    const handlePayment = () => {
        const amountNumber = parseInt(amount) * 100;
        if (amountNumber <= route.params.availableBalance) {
            const paymentData: Payment = {
                cardId: route.params.cardId,
                amount: amountNumber, // or any other amount
                paymentType: selectedPaymentMethod, // or "debit", or any other type
            };
            makePostPaymentRequest(paymentData);
        } else {
            Alert.alert('Balance Error', 'Amount exceeds available limit.');
        }
    };

    if (paymentSuccess) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#EEEEEE", margin: 20, justifyContent: 'space-between' }}>
                <View>
                    <Text>Transaction summary</Text>
                    <View style={styles.transactionCard}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 14 }}>Amount:</Text>
                            <Text style={{ color: 'black', fontSize: 14 }}>{getFormattedAmount(transaction?.amount!)}</Text>
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
                    </View>
                </View>
                <View style={{ marginBottom: 40 }}>
                    <Button onPress={() => navigation.navigate("HomeScreen")} text="Go to Home"></Button>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#EEEEEE", margin: 20 }}>

            <DropdownComponent data={paymentTypes} label='Select Payment Type' onchange={setSelectedPaymentMethod}></DropdownComponent>

            <Text style={styles.balanceText}>Active Balance: {getFormattedAmount(route.params.availableBalance)} </Text>

            <TextInput
                placeholder="Amount"
                style={styles.textInput}
                keyboardType="numeric"
                onChangeText={text => setAmount(text)}
                value={amount}
                placeholderTextColor="grey"
            />

            <View>
                <Button onPress={handlePayment} text='Make Payment'></Button>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        height: 48,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        borderColor: 'gray',
        marginBottom: 12,
    },
    balanceText: {
        fontSize: 14,
        color: 'black',
        marginBottom: 8,
        marginTop: 12,
        textAlign: 'right'
    },
    transactionCard: {
        marginTop: 16,
        paddingVertical: 16,
        paddingHorizontal: 12,
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'grey',
    }
})

export default Payments;