import React, { useState } from "react";
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
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <View style={[styles.container, { backgroundColor: "#1E1E1E" }]}>
      <View style={styles.calendarPad}>
        <Calendar onSelectDate={(date) => setSelectedDate(date)} />
      </View>
      <View>
        <AddWorkoutButton
          title="+"
          date={selectedDate}
          onPress={() => console.log("Date" + date)}
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
