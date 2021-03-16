import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ECGAnalysisStack from "./ECGAnalysisStack";
import DashboardStack from "./DashboardStack";
import ProfileStack from "./ProfileStack";
import MedicalProfileStack from "./MedicalProfileStack";
import { connect } from "react-redux";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

import { logout } from "../store/actions/authentication";

const Tab = createBottomTabNavigator();

const AllTabs = props => {
  return (
    <Tab.Navigator
      initialRouteName="ECG Analysis"
      tabBarOptions={{
        activeTintColor: colors.primary
      }}
    >
      <Tab.Screen
        name="ECG Analysis"
        component={ECGAnalysisStack}
        options={{
          tabBarLabel: "ECG Analysis",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fitness-outline" size={22} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={22} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="MedicalProfile"
        component={MedicalProfileStack}
        options={{
          tabBarLabel: "Medical Details",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="medkit-outline" size={22} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={22} color={color} />
          )
        }}
      />
      {/* <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          tabBarLabel: "Logout",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="power-outline" size={22} color={color} />
          )
        }}
      /> */}
    </Tab.Navigator>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(AllTabs);
