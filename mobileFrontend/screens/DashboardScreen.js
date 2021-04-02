import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Web
} from "react-native";
import Card from "../components/Card";
import colors from "../constants/colors";
import { WebView } from "react-native-webview";

function Dashboard(props) {
  return (
    <ScrollView style={styles.screen}>
      <Card style={styles.chartCard}>
        <Text style={styles.headingTitle} numberOfLines={2}>
          Monthly ECG Uploads
        </Text>
        <WebView
          source={{ uri: "http://localhost:3001/patientECGCountDashboard" }}
          style={styles.graphView}
        />
      </Card>
      <Card style={styles.chartCard}>
        <Text style={styles.headingTitle} numberOfLines={2}>
          ECG for your Age-Group
        </Text>
        <WebView
          source={{ uri: "http://localhost:3001/patientECGAgewiseDashboard" }}
          style={styles.graphView}
        />
      </Card>
      <Card style={styles.chartCard}>
        <Text style={styles.headingTitle} numberOfLines={2}>
          ECG for your Country
        </Text>
        <WebView
          source={{
            uri: "http://localhost:3001/patientECGCountrywiseDashboard"
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
    height: 250,
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
