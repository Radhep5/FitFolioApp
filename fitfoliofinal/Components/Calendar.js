import React from "react";
import { View, StyleSheet } from "react-native";

const Calendar = () => {
  return <View style={styles.container}>{/* Your content goes here */}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F9DF3",
    borderRadius: 11, // Adjust the value to change the curvature
    padding: 20,
    margin: 10,
    width: 300,
    alignSelf: "center",
  },
});

export default Calendar;
