import React, { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { trackerDB } from "../config/firebase.js";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const AddWorkoutButton = ({ title, onPress }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [sets, setSets] = useState(1);
  const [repetitions, setRepetitions] = useState([]);
  const [lbs, setLBS] = useState([]);

  const [workoutHistory, setWorkoutHistory] = useState([]);

  const handleAddRepetitionsSets = () => {
    const newRepetitions = [...repetitions, ""];
    setRepetitions(newRepetitions);
    const newLBS = [...lbs, ""];
    setLBS(newLBS);
    setSets(newRepetitions.length);
  };

  const handleSaveWorkout = () => {
    const repetitionsWithLabel = repetitions.map((rep) => `${rep} Reps`);
    const lbsWithLabel = repetitions.map((rep) => `${rep} LBS`);

    const workout = {
      name: workoutName,
      sets: sets,
      repetitions: repetitionsWithLabel,
      lbs: lbsWithLabel,
    };
    setWorkoutHistory([...workoutHistory, workout]);
    console.log("Workout Name:", workoutName);
    console.log("Sets:", sets);
    console.log("Repetitions:", repetitions);
    console.log("LBS:", lbs);

    const setDataInFirestore = async () => {
      try {
        workoutHistory.forEach(async (workout, index) => {
          const docRef = doc(trackerDB, "user", "date");
          await setDoc(docRef, workout);
        });
      } catch (error) {
        console.error("error", error);
      }
    };
    setDataInFirestore();
  };

  const handleSaveWorkoutAndCloseModal = () => {
    handleSaveWorkout();
    setIsVisible(false);
    setWorkoutName("");
    setSets(1);
    setRepetitions([]);
    setLBS([]);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.workoutHistoryContainer}>
          {workoutHistory.map((workout, index) => (
            <View key={index} style={styles.workoutBox}>
              <Text style={styles.historyTitle}>{workout.name}</Text>
              <Text style={styles.historyHeading}>{workout.sets} Set(s)</Text>
              <Text style={styles.historyHeading}>
                {workout.repetitions.join("  | |  ")}
              </Text>
              <Text style={styles.historyHeading}>
                {workout.lbs.join("  | |  ")}
              </Text>
            </View>
          ))}
          <TouchableOpacity
            style={styles.buttonClear}
            onPress={() => setIsVisible(true)}
          >
            <Text style={styles.buttonTextClear}>{title}</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={isVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.heading}>Add Workout</Text>
            <TextInput
              style={styles.input}
              placeholder="Workout Name"
              placeholderTextColor="#7A7A7A"
              value={workoutName}
              onChangeText={(text) => setWorkoutName(text)}
            />
            <Button
              title="Add Sets"
              color="#3F9DF3"
              onPress={handleAddRepetitionsSets}
              style={styles.addButton}
            />
            <View style={styles.inputBigContainer}>
              {repetitions.map((item, index) => (
                <View key={index} style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputSets}
                    placeholder={`Reps for Set ${index + 1}`}
                    placeholderTextColor="#7A7A7A"
                    keyboardType="numeric"
                    value={item}
                    onChangeText={(text) => {
                      const newRepetitions = [...repetitions];
                      newRepetitions[index] = text;
                      setRepetitions(newRepetitions);
                    }}
                  />
                  <TextInput
                    style={styles.inputSets}
                    placeholder={`LBS for Set ${index + 1}`}
                    placeholderTextColor="#7A7A7A"
                    keyboardType="numeric"
                    value={lbs[index] || ""}
                    onChangeText={(text) => {
                      const newLBS = [...lbs];
                      newLBS[index] = text;
                      setLBS(newLBS);
                    }}
                  />
                </View>
              ))}
            </View>
            <Button
              title="Save Workout"
              color="#3F9DF3"
              onPress={handleSaveWorkoutAndCloseModal}
              style={styles.addButton}
            />
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonClear: {
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
  buttonTextClear: {
    color: "#7A7A7A",
    fontSize: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    backgroundColor: "#007AFF", // Adjust button color as needed
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff", // Adjust text color as needed
    fontSize: 16,
  },
  addButton: {
    fontSize: 40,
    paddingBottom: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 30,
    color: "white",
  },
  historyTitle: {
    fontSize: 25,
    color: "white",
    marginLeft: 20,
    marginTop: 12,
    marginBottom: -20,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  historyHeading: {
    fontSize: 18,
    color: "white",
    marginBottom: 5,
    marginRight: 20,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputBigContainer: {
    marginTop: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: "white",
  },
  inputSets: {
    width: "45%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: "white",
    marginHorizontal: 6,
  },
  workoutHistoryContainer: {
    marginTop: 20,
  },
  workoutBox: {
    borderWidth: 0.5,
    width: 330,
    height: 120,
    borderRadius: 10,
    borderColor: "white",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 25,
  },
});

export default AddWorkoutButton;
