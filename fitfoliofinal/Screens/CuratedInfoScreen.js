import React, { useState } from "react";

import { View, StyleSheet } from "react-native";

const CuratedInfoScreen = ({ navigation }) => {
  return (
    <View style={[styles.container, { backgroundColor: "#1E1E1E" }]}>
      <View style={styles.testBox}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CuratedInfoScreen;
