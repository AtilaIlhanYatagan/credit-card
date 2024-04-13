import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import CardListItem from './CardListItem'
import { RootStackParamList } from '../navigation/stackNavigator';
import type { RouteProp } from '@react-navigation/native';
import { Card } from '../types/card.type';
import { getCard } from '../api/cardApi';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'CardDetail'>;
const CardDetail = ({ route }: { route: ProfileScreenRouteProp }) => {

  const [card, setCard] = React.useState<Card | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCard(route.params.itemId);
        setCard(response);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchData();
  }, []);
  
  
  return (
    <ScrollView style={styles.container}>
      {card ? (
        <CardListItem
          cardName={card.cardName}
          cardNumber={card.cardNumber}
          validThru={card.validThru}
          userName={card.userName}
          onPress={() => console.log(card?._id)} // Optionally pass onPress handler with cardNumber
        />
      ) : (
        <ActivityIndicator/>
      )}
    </ScrollView>
    
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
export default CardDetail