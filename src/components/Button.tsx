import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ButtonProps {
    onPress: () => void;
    text: string;
}

const Button: React.FC<ButtonProps> = ({ onPress, text }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center',
    },
    buttonText: {
        flex: 1,
        color: '#1762EF',
        fontSize: 16,
    },
});
