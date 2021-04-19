import React from "react";
import {ScrollView, StyleSheet, Text, Dimensions, View } from "react-native";
import { WebView } from "react-native-webview";
import Card from "../components/Card";
import colors from "../constants/colors";
import { useSelector } from "react-redux";

function ECGAnalysisScreen(props) {
  const userId = useSelector(state => {
    return state.auth.userId;
  });

  const token = useSelector(state => {
    return state.auth.userToken;
  });

  return (
    <ScrollView style={styles.screen}>
      <Card style={styles.chartCard}>
        {/* <Text style={styles.headingTitle} numberOfLines={2}>
          Upload ECG Reports to get quick analysis
        </Text> */}
        <WebView source={{ uri: `http://localhost:3001/analysis?userId=${userId}` }} scrollEnabled="false" />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: "scroll"
  },
  chartCard: {
    marginHorizontal: 10,
    marginTop: 10,
    height: 1550,
    // height: Dimensions.get("screen").height,
    overflow: "hidden"
  },
  headingTitle: {
    fontSize: 18,
    fontFamily: "open-sans",
    marginBottom: 10
  }
});

export default ECGAnalysisScreen;
