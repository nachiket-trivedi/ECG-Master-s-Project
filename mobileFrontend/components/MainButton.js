import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from "../constants/colors"


const MainButton = props => {
return (
    <TouchableOpacity onPress={props.onPress}>
        <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
        </View>
    </TouchableOpacity>
)

}

const styles = StyleSheet.create({
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    },
    button: {
       backgroundColor : colors.primary,
       paddingVertical: 10,
       paddingHorizontal:20,
       borderRadius: 20
    }
});

export default MainButton;