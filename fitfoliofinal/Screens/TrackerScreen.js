import React, { useState } from "react";
import styles from "./style";
import Calendar from "../Components/Calendar";
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

const TrackerScreen = () => {
  return (
    <View>
      <View style={styles.box}></View>
      <View>
        <Calendar />
      </View>
    </View>
  );
};

export default TrackerScreen;
