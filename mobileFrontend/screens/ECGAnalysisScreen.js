import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";
import Card from "../components/Card";
import colors from "../constants/colors";

function ECGAnalysisScreen(props) {
  return (
    <ScrollView style={styles.screen}>
      <Card style={styles.chartCard}>
        <WebView
          source={{ uri: "http://localhost:3001/" }}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  chartCard: {
    marginHorizontal: 10,
    marginTop: 10,
    height: 250,
    overflow: "hidden"
  }
});

export default ECGAnalysisScreen;
