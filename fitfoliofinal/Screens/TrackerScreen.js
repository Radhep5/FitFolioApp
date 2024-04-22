import React, { useState, useEffect } from "react";
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
  StyleSheet,
} from "react-native";

const TrackerScreen = ({ navigation }) => {
  const [dateSend, setDateSend] = useState("");

  return (
    <View style={[styles.container, { backgroundColor: "#1E1E1E" }]}>
      <View style={styles.calendarPad}>
        <Calendar setDateSend={setDateSend} />
      </View>
      <View>
        <AddWorkoutButton
          title="+"
          onPress={() => console.log("Button pressed")}
          dateSend={dateSend}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarPad: {
    paddingTop: 100,
  },
});

export default TrackerScreen;
