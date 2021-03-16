import React from "react";
import { View, StyleSheet, Text } from "react-native";

function ECGAnalysisScreen(props) {
  return (
    <View style={styles.screen}>
      <Text>ECG Analysis</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default ECGAnalysisScreen;
