import React from "react";
import { View, StyleSheet, Text } from "react-native";

function Dashboard(props) {
  return (
    <View style={styles.screen}>
      <Text>Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default Dashboard;
