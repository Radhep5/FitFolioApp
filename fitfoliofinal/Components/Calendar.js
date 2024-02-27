import React, { useState } from "react";
import { View, StyleSheet, Text, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [text, setText] = useState("Empty");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.os === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getMonth() +
      1 +
      "/" +
      tempDate.getDate() +
      "/" +
      tempDate.getFullYear();
    setText(fDate);

    console.log(fDate);
    module.exports = fDate;
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
