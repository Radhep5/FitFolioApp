import React, { useState } from "react";
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

  const handleAddRepetitions = () => {
    const newRepetitions = [...repetitions, ""];
    setRepetitions(newRepetitions);
  };

  const handleSaveWorkout = () => {
    console.log("Workout Name:", workoutName);
    console.log("Sets:", sets);
    console.log("Repetitions:", repetitions);
  };

  const handleSaveWorkoutAndCloseModal = () => {
    handleSaveWorkout();
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonClear}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.buttonTextClear}>{title}</Text>
      </TouchableOpacity>

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
          <Button title="Add Repetitions" onPress={handleAddRepetitions} />
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
    paddingTop: 70,
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
});

export default AddWorkoutButton;
