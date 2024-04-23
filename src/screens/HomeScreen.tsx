import React, { useEffect, useState } from 'react'
import CardListItem from './CardListItem'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/stackNavigator'
import { getCards } from '../api/cardApi'
import { Card } from '../types/card.type'

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  const [cards, setCards] = useState<Card[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []); // Pass an empty array as second argument to useEffect to run only once

  const fetchData = async () => {
    try {
      const response = await getCards();
      setCards(response);
    } catch (error) {
      console.error('Error fetching cards:', error);
    } finally {
      setRefreshing(false); // Ensure refreshing state is reset even if there's an error
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

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
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />

  )
}
HomeScreen.displayName = 'HomeScreen'
export default HomeScreen