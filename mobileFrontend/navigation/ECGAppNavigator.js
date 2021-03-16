import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// you can also import from @react-navigation/native

import EditMedicalProfileScreen from "../screens/EditMedicalProfileScreen";
import EditPersonalProfileScreen from "../screens/EditPersonalProfileScreen";
import PersonalProfileScreen from "../screens/PersonalProfileScreen";
import MedicalProfileScreen from "../screens/MedicalProfileScreen";

import colors from "../constants/colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import ECGAnalysisScreen from "../screens/ECGAnalysisScreen";
import Dashboard from "../screens/DashboardScreen";

import { Ionicons } from "@expo/vector-icons";

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
      <Stack.Screen
        name="EditPersonalProfileScreen"
        component={EditPersonalProfileScreen}
        options={{
          title: "Edit"
        }}
      />
    </Stack.Navigator>
  );
}

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

const Tab = createBottomTabNavigator();

function AllTabs() {
  return (
    <Tab.Navigator
      initialRouteName="ECG Analysis"
      tabBarOptions={{
        activeTintColor: colors.primary ,
      }}
    >
      <Tab.Screen name="ECG Analysis" component={ECGAnalysisStack} options={{
          tabBarLabel: 'ECG Analysis',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fitness-outline" size={22} color={color} />
          )
        }}/>
      <Tab.Screen name="Dashboard" component={DashboardStack} options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={22} color={color} />
          )
        }}/>
      <Tab.Screen name="Profile" component={ProfileStack} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={22} color={color} />
          )
        }}/>
      <Tab.Screen name="Logout" component={ProfileStack}options={{
          tabBarLabel: 'Logout',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="power-outline" size={22} color={color} />
          )
        }}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AllTabs />
    </NavigationContainer>
  );
}
