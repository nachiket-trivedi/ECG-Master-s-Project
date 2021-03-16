import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "../constants/colors";
import ECGAnalysisScreen from "../screens/ECGAnalysisScreen";

const Stack = createStackNavigator();

function ECGAnalysisStack() {
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
        name="ECGAnalysis"
        component={ECGAnalysisScreen}
        options={{
          title: "ECG Analysis"
        }}
      />
    </Stack.Navigator>
  );
}

export default ECGAnalysisStack ;