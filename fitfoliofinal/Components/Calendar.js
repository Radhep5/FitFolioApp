import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CurrentDateComponent from "./CurrentDate.js";

const Calendar = ({ setDateSend }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [text, setText] = useState("Empty");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setDateSendToCurrentDate();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.os === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getMonth() +
      1 +
      "-" +
      tempDate.getDate() +
      "-" +
      tempDate.getFullYear();
    setText(fDate);
    setDateSend(fDate);
  };

  const setDateSendToCurrentDate = () => {
    const dateString = CurrentDateComponent();
    if (dateString) {
      setDateSend(dateString);
    } else {
      console.error("CurrentDateComponent did not return a valid date string");
    }
  };

  return (
    <View style={styles.container}>
      <DateTimePicker
        testID="dateTimePicker"
        alignSelf="center"
        value={date}
        mode={mode}
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F9DF3",
    borderRadius: 11,
    padding: 7,
    margin: 10,
    width: 300,
    alignSelf: "center",
  },
});

export default Calendar;
