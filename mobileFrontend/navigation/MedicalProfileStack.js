import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditMedicalProfileScreen from "../screens/EditMedicalProfileScreen";
import MedicalProfileScreen from "../screens/MedicalProfileScreen";

import colors from "../constants/colors";

const Stack = createStackNavigator();

function MedicalProfileStack() {
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
        name="MedicalProfileScreen"
        component={MedicalProfileScreen}
        options={{
          title: "Medical Profile"
        }}
      />

      <Stack.Screen
        name="EditMedicalProfileScreen"
        component={EditMedicalProfileScreen}
        options={{
          title: "Edit"
        }}
      />
    </Stack.Navigator>
  );
}

export default MedicalProfileStack ;