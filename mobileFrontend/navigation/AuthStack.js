import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AllTabs from './AllTabs';
import AuthScreen from "../screens/AuthScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen
        name="Home"
        component={AllTabs}
        options={{
          headerLeft: () => {
            return <></>;
          }
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthStack ;