import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import colors from "../../constants/colors"
const Header = props => {
    return(
        <View style={styles.header}>
            <Text style={styles.headerText}>{props.title}</Text>
            <Button title="logout"></Button>
        </View>
    );
};


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        color: 'white',
        fontSize: 18
    }
});

export default Header;