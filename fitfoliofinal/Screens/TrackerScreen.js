import React, { useState } from "react";
import styles from "./style";
import Calendar from "../Components/Calendar";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { trackerDB } from "../config/firebase.js";
import { fDate } from "../Components/Calendar";
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
  console.log(fDate);
  const data = [
    {
      name: "Achyut Patel",
      age: 15,
      completeapps: true,
      id: 204501,
    },
  ];

  const setDataInFirestore = async () => {
    try {
      // Create a unique document ID for each item (you can use auto-generated IDs or a specific naming convention).
      for (const item of data) {
        const docRef = doc(trackerDB, "user", "date");

        // Set the document data using setDoc for each item in the array.
        await setDoc(docRef, item);
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  setDataInFirestore();

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
