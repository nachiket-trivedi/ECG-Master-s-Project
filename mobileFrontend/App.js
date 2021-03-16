import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { enableScreens } from "react-native-screens";
import ProfileNavigator from "./navigation/ECGAppNavigator";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import { createStore, combineReducers, applyMiddleware } from "redux";
import profileReducer from "./store/reducers/profile";
import {Provider} from "react-redux";
import reduxThunk from 'redux-thunk';

enableScreens();

const rootReducer = combineReducers({
  profile: profileReducer
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

export default function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  if (!assetsLoaded) {
    // it should be a function which returns a promise
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setAssetsLoaded(true)}
        onError={error => console.log("This is error:", error)}
      />
    );
  }
  return (
    <Provider store={store}>
      <ProfileNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
