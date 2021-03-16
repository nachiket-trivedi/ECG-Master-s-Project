import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditMedicalProfileScreen from "../screens/EditMedicalProfileScreen";
import EditPersonalProfileScreen from "../screens/EditPersonalProfileScreen";
import PersonalProfileScreen from "../screens/PersonalProfileScreen";
import MedicalProfileScreen from "../screens/MedicalProfileScreen";
import AuthStack from './AuthStack'
import colors from "../constants/colors";

const Stack = createStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontFamily: "open-sans-bold",
          fontSize: 20
        }
      }}
    >
      <Stack.Screen
        name="PersonalProfileScreen"
        component={PersonalProfileScreen}
        options={{
          title: "Profile"
        }}
      />
      <Stack.Screen
        name="EditPersonalProfileScreen"
        component={EditPersonalProfileScreen}
        options={{
          title: "Edit"
        }}
      />
      <Stack.Screen
        name="Auth"
        component={AuthStack}
      />
    </Stack.Navigator>
  );
}

export default ProfileStack ;