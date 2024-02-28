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
} from "react-native";

const AddWorkoutButton = ({ title, onPress }) => {
  const [isVisible, setIsVisible] = useState(false); // State to control visibility of the popup
  const [workoutName, setWorkoutName] = useState("");
  const [sets, setSets] = useState(1);
  const [repetitions, setRepetitions] = useState([]);
  const [workoutHistory, setWorkoutHistory] = useState([]);

  const handleAddRepetitions = () => {
    const newRepetitions = [...repetitions, ""];
    setRepetitions(newRepetitions);
  };

  const handleSaveWorkout = () => {
    const workout = {
      name: workoutName,
      sets: sets,
      repetitions: repetitions,
    };
    setWorkoutHistory([...workoutHistory, workout]);
    console.log("Workout Name:", workoutName);
    console.log("Sets:", sets);
    console.log("Repetitions:", repetitions);

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
  };

  return (
    <View style={styles.container}>
      <View style={styles.workoutHistoryContainer}>
        {workoutHistory.map((workout, index) => (
          <View key={index} style={styles.workoutBox}>
            <Text style={styles.historyHeading}>{workout.name}</Text>
            <Text style={styles.historyHeading}>Sets: {workout.sets}</Text>
            <Text style={styles.historyHeading}>
              Repetitions: {workout.repetitions.join(", ")}
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
            value={workoutName}
            onChangeText={(text) => setWorkoutName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Number of Sets"
            keyboardType="numeric"
            value={sets.toString()}
            onChangeText={(text) => setSets(parseInt(text) || 0)}
          />
          <Button
            title="Add Repetitions"
            onPress={handleAddRepetitions}
            style={styles.addButton}
          />
          {repetitions.map((item, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={`Repetitions for Set ${index + 1}`}
              keyboardType="numeric"
              value={item}
              onChangeText={(text) => {
                const newRepetitions = [...repetitions];
                newRepetitions[index] = text;
                setRepetitions(newRepetitions);
              }}
            />
          ))}
          <Button
            title="Save Workout"
            onPress={handleSaveWorkoutAndCloseModal}
            style={styles.addButton}
          />
        </View>
      </Modal>
    </View>
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
    color: "3F9DF3",
    fontSize: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  workoutHistoryContainer: {
    marginTop: 20,
  },
  workoutBox: {
    borderWidth: 2,
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
