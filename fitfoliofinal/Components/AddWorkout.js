import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const AddWorkoutButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    width: 330,
    height: 120,
    borderStyle: "dashed",
    borderRadius: 10,
    borderColor: "#7A7A7A",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#7A7A7A",
    fontSize: 40,
  },
});

export default AddWorkoutButton;
