import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
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
  ScrollView,
} from "react-native";

const AddWorkoutButton = ({ title, onPress, dateSend }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [sets, setSets] = useState(1);
  const [repetitions, setRepetitions] = useState([]);
  const [lbs, setLBS] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);

  const [workoutHistory, setWorkoutHistory] = useState([]);

  useEffect(() => {
    console.log("Updated: " + dateSend);
  }, [dateSend]);

  const handleAddRepetitionsSets = () => {
    const newRepetitions = [...repetitions, ""];
    setRepetitions(newRepetitions);
    const newLBS = [...lbs, ""];
    setLBS(newLBS);
    setSets(newRepetitions.length);
  };

  const handleSaveWorkout = async () => {
    const repetitionsWithLabel = repetitions.map((rep) => `${rep} Reps`);
    const lbsWithLabel = lbs.map((rep) => `${rep} LBS`);

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
    console.log("Date:", dateSend);

    const updatedWorkoutHistory = [...workoutHistory, workout];
    setWorkoutHistory(updatedWorkoutHistory);

    try {
      const userDocRef = doc(trackerDB, "user", "userdocID");
      const datesCollectionRef = collection(userDocRef, "dates");
      const dateDocRef = doc(datesCollectionRef, dateSend);

      const dateDocSnapshot = await getDoc(dateDocRef);
      const existingWorkouts = dateDocSnapshot.exists()
        ? dateDocSnapshot.data().workouts || []
        : [];

      const updatedWorkouts = [...existingWorkouts, workout];
      await setDoc(dateDocRef, { workouts: updatedWorkouts });
      console.log("Stored workout successfully:", workout);
      setForceUpdate(!forceUpdate);
    } catch (error) {
      console.error("Error storing workout:", error);
    }
  };

  const handleSaveWorkoutAndCloseModal = () => {
    handleSaveWorkout();
    setIsVisible(false);
    setWorkoutName("");
    setSets(1);
    setRepetitions([]);
    setLBS([]);
  };

  const handleDeleteWorkout = async (index) => {
    const updatedWorkoutHistory = [...workoutHistory];
    updatedWorkoutHistory.splice(index, 1);
    setWorkoutHistory(updatedWorkoutHistory);

    try {
      const userDocRef = doc(trackerDB, "user", "userdocID");
      const datesCollectionRef = collection(userDocRef, "dates");
      const dateDocRef = doc(datesCollectionRef, dateSend);

      const dateDocSnapshot = await getDoc(dateDocRef);
      const workoutsData = dateDocSnapshot.data()?.workouts || [];
      workoutsData.splice(index, 1);

      await setDoc(dateDocRef, { workouts: workoutsData });
      setForceUpdate(!forceUpdate);
      console.log("Workout deleted successfully");
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const [fetchedWorkouts, setFetchedWorkouts] = useState([]);
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const userDocRef = doc(trackerDB, "user", "userdocID");
        const datesCollectionRef = collection(userDocRef, "dates");
        const dateDocRef = doc(datesCollectionRef, dateSend);

        const dateDocSnapshot = await getDoc(dateDocRef);
        const workoutsData = dateDocSnapshot.data()?.workouts || [];

        setFetchedWorkouts(workoutsData);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, [dateSend, forceUpdate]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.workoutHistoryContainer}>
          {fetchedWorkouts.map((fetchedWorkout, index) => (
            <View key={index} style={styles.workoutBox}>
              <Text style={styles.historyTitle}>{fetchedWorkout.name}</Text>
              <Text style={styles.historySets}>
                {fetchedWorkout.sets} Set(s)
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteWorkout(index)}
              >
                <Text style={styles.deleteIcon}>🗑️</Text>
              </TouchableOpacity>
              <Text style={styles.historyHeading}>
                {fetchedWorkout.repetitions.join("  | |  ")}
              </Text>
              <Text style={styles.historyHeading}>
                {fetchedWorkout.lbs.join("  | |  ")}
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
      </ScrollView>

      <Modal visible={isVisible} animationType="slide">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
        </TouchableWithoutFeedback>
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
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    borderColor: "white",
    height: 620,
  },
  button: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  temp: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
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
    marginBottom: -10,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  historySets: {
    fontSize: 18,
    color: "white",
    marginBottom: 5,
    marginRight: 20,
    alignSelf: "flex-end",
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
  deleteButton: {
    position: "absolute",
    bottom: 7,
    left: 15,
    padding: 5,
    borderRadius: 5,
  },
  deleteIcon: {
    fontSize: 20,
  },
});

export default AddWorkoutButton;
