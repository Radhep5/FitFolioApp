import React, { useState } from "react";
import styles from "./style";
import Calendar from "../Components/Calendar";
import AddWorkoutButton from "../Components/AddWorkout";

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";

const TrackerScreen = ({ navigation }) => {
  return (
    <View>
      <View style={styles.box}></View>
      <View style={styles.calendarPad}>
        <Calendar />
      </View>
      <View>
        <AddWorkoutButton
          title="+"
          onPress={() => console.log("Button pressed")}
        />
      </View>
    </View>
  );
};

export default TrackerScreen;
