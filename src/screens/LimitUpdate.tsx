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
import { LimitUpdateRequestBody } from '../types/limitUpdate.type';
import { updateCardLimit } from '../api/cardApi';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'LimitUpdate'>;
const LimitUpdate = ({ route }: { route: ProfileScreenRouteProp }) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [amount, setAmount] = useState<string>('');
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

    const postUpdateCardLimit = async (limit: LimitUpdateRequestBody) => {
        try {
            await updateCardLimit(limit.cardId, limit.amount);
            showMessage({
                message: 'Limit updated successfully',
                type: 'success',
            });
            navigation.goBack();
        } catch (error) {
            console.error('Error updating card limit:', error);
            showMessage({
                message: 'Error updating card limit',
                type: 'danger',
            });
        }
    }

    const handleLimitUpdate = () => {
        const amountNumber = parseInt(amount) * 100;
        if (amountNumber > route.params.currentLimit) {
            const limitData: LimitUpdateRequestBody = {
                cardId: route.params.cardId,
                amount: amountNumber, // or any other amount
            };
            postUpdateCardLimit(limitData);
        } else {
            Alert.alert('', 'Cannot set limit less than current limit');
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#EEEEEE", margin: 20 }}>

            <Text style={styles.balanceText}>Current Limit: {getFormattedAmount(route.params.currentLimit)} </Text>

            <TextInput
                placeholder="Amount"
                style={styles.textInput}
                keyboardType="numeric"
                onChangeText={text => setAmount(text)}
                value={amount}
                placeholderTextColor="grey"
            />

            <View>
                <Button onPress={handleLimitUpdate} text='Update Limit'></Button>
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

export default LimitUpdate;