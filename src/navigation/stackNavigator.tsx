import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CardDetail from "../screens/CardDetail";
import Payments from "../screens/Payments";
import Transactions from "../screens/Transactions";
import LimitUpdate from "../screens/LimitUpdate";

export type RootStackParamList = {
    HomeScreen: undefined
    CardDetail: { itemId: string };
    Payments: { cardId: string, availableBalance: number };
    Transactions: { cardId: string };
    LimitUpdate: { cardId: string, currentLimit: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen">
            <Stack.Screen
                options={{ title: "My Cards" }}
                name="HomeScreen"
                component={HomeScreen} />
            <Stack.Screen
                options={{ title: "Card Detail" }}
                name="CardDetail"
                component={CardDetail} />
            <Stack.Screen
                options={{ title: "Payments" }}
                name="Payments"
                component={Payments} />
            <Stack.Screen
                options={{ title: "Transactions" }}
                name="Transactions"
                component={Transactions} />
            <Stack.Screen
                options={{ title: "Limit Update" }}
                name="LimitUpdate"
                component={LimitUpdate} />
        </Stack.Navigator>
    );
}