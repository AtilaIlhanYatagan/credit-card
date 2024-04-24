import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from './src/navigation/stackNavigator';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <StackNavigator/>
        <FlashMessage position="top" />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
