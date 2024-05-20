import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native'
import React, { useEffect } from 'react'
import CardListItem from './CardListItem'
import { RootStackParamList } from '../navigation/stackNavigator';
import { useNavigation, type RouteProp } from '@react-navigation/native';
import { Card } from '../types/card.type';
import { getCard } from '../api/cardApi';
import Button from '../components/Button';
import DateSection from '../components/DateSection';
import PaymentSummary from '../components/PaymentSummary';
import { StackNavigationProp } from '@react-navigation/stack';
import { RefreshControl } from 'react-native-gesture-handler';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'CardDetail'>;
const CardDetail = ({ route }: { route: ProfileScreenRouteProp }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [card, setCard] = React.useState<Card>();
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getCard(route.params.itemId);
      setCard(response);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator />
  }

  const debitDate = new Date(card!.debitDate)
  const lastPaymentDate = new Date(debitDate);
  // Add 10 days to the lastPaymentDate
  lastPaymentDate.setDate(lastPaymentDate.getDate() + 10);
  const nextDebitDate = new Date(debitDate);
  nextDebitDate.setMonth(nextDebitDate.getMonth() + 1);

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >

      <CardListItem
        cardName={card!.cardName}
        cardNumber={card!.cardNumber}
        validThru={card!.validThru}
        userName={card!.userName}
        onPress={() => console.log(card?._id)} // Optionally pass onPress handler with cardNumber
      />

      <View style={styles.spacer}></View>

      <DateSection text="Debit Date" date={debitDate} />
      <DateSection text="Last Payment Date" date={lastPaymentDate} />
      <DateSection text="Next Debit Date" date={nextDebitDate} />

      <View style={styles.spacer}></View>

      <PaymentSummary currentDebt={card!.currentDebt} totalCardLimit={card!.limit} remainingDebt={card!.remainingDebt} />

      <View style={styles.spacer}></View>


      <View style={styles.row}>
      <Button onPress={() =>
          navigation.navigate("PayDebt", {
            cardId: card!._id,
            currentDebt: card!.currentDebt
          })
          } text="Pay Debt"></Button>
        <View style={styles.rowSpacer}></View>
        <Button
          onPress={() =>
            navigation.navigate("Payments", {
              cardId: card!._id,
              availableBalance: card!.limit - card!.remainingDebt - card!.currentDebt
            })
          }
          text="Make Payment"
        />

      </View>

      <View style={styles.row}>
        <Button
          onPress={() =>
            navigation.navigate("Transactions", {
              cardId: card!._id,
            })
          }
          text="Transactions"
        />
        <View style={styles.rowSpacer}></View>
        <Button onPress={() =>
          navigation.navigate("LimitUpdate", {
            cardId: card!._id,
            currentLimit: card!.limit
          })
          } text="Limit Update"></Button>
      </View>

    </ScrollView >
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    flex: 1,
  },
  rowSpacer: {
    width: 10,
  },
  spacer: {
    height: 20,
  }
})
export default CardDetail