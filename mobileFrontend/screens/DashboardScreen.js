import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  Dimensions
} from "react-native";
import Card from "../components/Card";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";

import {webviewAddress, webviewPort} from '../config.js'
const webviewURL = `${webviewAddress}:${webviewPort}`;

function Dashboard(props) {
  const userId = useSelector(state => {
    return state.auth.userId;
  });

  return (
    <ScrollView style={styles.screen}>
      <Card style={styles.chartCard}>
        <Text style={styles.headingTitle} numberOfLines={2}>
          Monthly ECG Uploads
        </Text>
        <WebView
          source={{
            uri: `http://${webviewURL}/patientECGCountDashboard?userId=${userId}`
          }}
          style={styles.graphView}
        />
      </Card>
      <Card style={styles.chartCard}>
        <Text style={styles.headingTitle} numberOfLines={2}>
          ECG for your Age-Group
        </Text>
        <WebView
          source={{
            uri: `http://${webviewURL}/patientECGAgewiseDashboard?userId=${userId}`
          }}
          style={styles.graphView}
        />
      </Card>
      <Card style={styles.chartCard}>
        <Text style={styles.headingTitle} numberOfLines={2}>
          ECG for your Country
        </Text>
        <WebView
          source={{
            uri: `http://${webviewURL}/patientECGCountrywiseDashboard?userId=${userId}`
          }}
          style={styles.graphView}
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
    height: Math.max(Dimensions.get("screen").height / 3, 250),
    overflow: "hidden"
  },
  graphView: {
    height: "100%",
    alignItems: "stretch",
    justifyContent: "center"
  },
  headingTitle: {
    fontSize: 18,
    fontFamily: "open-sans",
    marginBottom: 10
  }
});

export default Dashboard;
