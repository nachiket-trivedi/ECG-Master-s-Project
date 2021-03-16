import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import { Ionicons } from "@expo/vector-icons";
import colors from '../constants/colors';

function CustomHeaderButton(props){
    return (<HeaderButton {...props} IconComponent={Ionicons} iconSize={24} color={colors.textInPrimary} />)
}

export default CustomHeaderButton;