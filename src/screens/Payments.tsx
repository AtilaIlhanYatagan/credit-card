import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';
import DropdownComponent from '../components/DropdownComponent';
import { RootStackParamList } from '../navigation/stackNavigator';
import { RouteProp } from '@react-navigation/native';
import { Payment } from '../types/payment.type';
import { postPayment } from '../api/paymentApi';

const paymentTypes = [
    { label: 'Receipt', value: 'receipt' },
    { label: 'Other', value: 'other' }
];

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Payments'>;
const Payments = ({ route }: { route: ProfileScreenRouteProp }) => {

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
    const [amount, setAmount] = useState<string>('');

    const makePostPaymentRequest = async (paymentData: Payment) => {
        try {
            const response = await postPayment(paymentData);
            console.log(response)
        } catch (error) {
            console.error('Error creating payment:', error);
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

    return (
        <View style={{ flex: 1, backgroundColor: "#EEEEEE", margin: 20 }}>

            <DropdownComponent data={paymentTypes} label='Select Payment Type' onchange={setSelectedPaymentMethod}></DropdownComponent>

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
        marginVertical: 12,

    }
})

export default Payments;