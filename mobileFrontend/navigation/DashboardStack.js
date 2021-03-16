import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "../constants/colors";

import Dashboard from "../screens/DashboardScreen";
const Stack = createStackNavigator();

function DashboardStack() {
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
        name="DashboardScreen"
        component={Dashboard}
        options={{
          title: "Dashboard"
        }}
      />
    </Stack.Navigator>
  );
}

export default DashboardStack ;