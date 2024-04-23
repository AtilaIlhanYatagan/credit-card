import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CardDetail from "../screens/CardDetail";

export type RootStackParamList = {
    HomeScreen: undefined
    CardDetail: { itemId: string };
  };

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen">
            <Stack.Screen 
            options={{title:"My Cards"}}
            name="HomeScreen" 
            component={HomeScreen} />
             <Stack.Screen 
            options={{title:"Card Detail"}}
            name="CardDetail" 
            component={CardDetail} />

        </Stack.Navigator>
    );
}