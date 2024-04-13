import React, { useEffect } from 'react'
import CardListItem from './CardListItem'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/stackNavigator'
import { getCards } from '../api/cardApi'
import { Card } from '../types/card.type'

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  const [cards, setCards] = React.useState<Card[]>([]) 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCards();
        setCards(response);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchData();
  }, []); // Pass an empty array as second argument to useEffect to run only once

  const handleItemPress = (id: string) => {
    navigation.navigate('CardDetail', { itemId: id })
  }

  return (
    <FlatList
      data={cards}
      renderItem={({ item }) => (
        <CardListItem
          cardName={item.cardName}
          cardNumber={item.cardNumber}
          validThru={item.validThru}
          userName={item.userName}
          onPress={() => handleItemPress(item._id)}
        />
      )}
      keyExtractor={(item) => item._id}
    />

  )
}
HomeScreen.displayName = 'HomeScreen'
export default HomeScreen