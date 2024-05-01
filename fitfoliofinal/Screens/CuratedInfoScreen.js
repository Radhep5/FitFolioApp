import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  Image,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import squat from "../assets/squat.jpg";
import lift from "../assets/lift.jpg";
import plank from "../assets/plank.png";
import running from "../assets/running.png";
import pushup from "../assets/pushup.png";

const CuratedInfoScreen = ({ navigation }) => {
  const [selected, setSelected] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const images = [
    { name: "squat", image: squat },
    { name: "lift", image: lift },
    { name: "plank", image: plank },
    { name: "running", image: running },
    { name: "pushup", image: pushup },
  ];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledImages = shuffleArray(images);
  const selectedImages = shuffledImages.slice(0, 2);

  const muscleGroups = [
    "Biceps",
    "Triceps",
    "Chest",
    "Back",
    "Legs",
    "Abs",
    "Lats",
    "Hamstring",
    "Calves",
    "Quadriceps",
    "Trapezius",
    "Shoulders",
    "Glutes",
  ];

  const randomMuscleIndex = Math.floor(Math.random() * muscleGroups.length);
  const randomMuscleGroup = muscleGroups[randomMuscleIndex];

  const data = [
    { key: "1", value: "Workouts" },
    { key: "2", value: "Meals" },
    { key: "3", value: "Equipment" },
    { key: "4", value: "Supplements" },
  ];

  const runSelectTopic = () => {
    console.log("working");
    if (selected == data[0].key) {
      console.log("hi");
      getWorkouts();
      setDisplayText("Workouts");
    }
    if (selected == data[1].key) {
      console.log("hi2");
      //getMeals();
      setDisplayText("Meals");
    }
    if (selected == data[2].key) {
      setDisplayText("Equipment");
    }
    if (selected == data[3].key) {
      setDisplayText("Supplements");
    }
  };

  //API #1
  const getWorkouts = async (event) => {
    const options = {
      method: "GET",
      url: "https://work-out-api1.p.rapidapi.com/search",
      params: { Muscles: randomMuscleGroup },
      headers: {
        "X-RapidAPI-Key": "bc3e44159emsh5388156e6328a5cp159b32jsn42334b02b266",
        "X-RapidAPI-Host": "work-out-api1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      //console.log(response.data);
      const workouts = response.data; // Assuming response.data is an array of workouts
      const randomIndex = Math.floor(Math.random() * workouts.length); // Generate a random index
      const randomWorkout = workouts[randomIndex]; // Select a random workout
      console.log(randomWorkout); // Log the random workout
      const [firstKey, firstValue] = Object.entries(randomWorkout)[3];
      console.log(`${firstKey}: ${firstValue}`);
    } catch (error) {
      console.error(error);
    }
  };

  //API #2
  const getMeals = async (event) => {
    const options = {
      method: "GET",
      url: "https://tasty.p.rapidapi.com/recipes/auto-complete",
      params: {
        prefix: "chicken soup",
      },
      headers: {
        "X-RapidAPI-Key": "bc3e44159emsh5388156e6328a5cp159b32jsn42334b02b266",
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //API #3
  const getSupplement = async (event) => {
    const options = {
      method: "GET",
      url: "https://work-out-api1.p.rapidapi.com/search",
      params: { Muscles: "biceps" },
      headers: {
        "X-RapidAPI-Key": "bc3e44159emsh5388156e6328a5cp159b32jsn42334b02b266",
        "X-RapidAPI-Host": "work-out-api1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //API #4
  const getEquipment = async (event) => {
    const options = {
      method: "GET",
      url: "https://work-out-api1.p.rapidapi.com/search",
      params: { Muscles: "biceps" },
      headers: {
        "X-RapidAPI-Key": "bc3e44159emsh5388156e6328a5cp159b32jsn42334b02b266",
        "X-RapidAPI-Host": "work-out-api1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={[styles.mainContainer, { backgroundColor: "#1E1E1E" }]}>
      <View style={[styles.containerList, { backgroundColor: "#1E1E1E" }]}>
        <SelectList
          data={data}
          setSelected={setSelected}
          style={[styles.selectorBox]}
          dropdownStyles={{ backgroundColor: "gray" }}
          dropdownItemStyles={{ marginHorizontal: 10 }}
          dropdownTextStyles={{ color: "white" }}
          placeholder="Select Topic"
          searchPlaceholder="Choose topic"
          onSelect={runSelectTopic}
        />

        <Text style={styles.header}>{displayText}</Text>
      </View>
      <View style={[styles.container, { backgroundColor: "#1E1E1E" }]}>
        <View style={[styles.infoBox]}>
          <Image style={[styles.imageInBox]} source={selectedImages[0].image} />
          <TouchableOpacity
            style={styles.arrowStyle}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <MaterialCommunityIcons
              name="arrow-right-thin"
              size={70}
              color="#3F9DF3"
            />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 10,
                }}
              >
                <Text>This is a popup modal!</Text>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </View>
        <View style={[styles.infoBox]}>
          <Image style={[styles.imageInBox]} source={selectedImages[1].image} />
          <TouchableOpacity
            style={styles.arrowStyle}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <MaterialCommunityIcons
              name="arrow-right-thin"
              size={70}
              color="#3F9DF3"
            />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 10,
                }}
              >
                <Text>This is a popup modal!</Text>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  containerList: {
    flexDirection: "row",
    justifyContent: "left",
    backgroundColor: "#f0f0f0",
    padding: 20,
    paddingLeft: 30,
  },
  container: {
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  selectorBox: {
    width: 200,
  },
  infoBox: {
    borderWidth: 0.5,
    width: 330,
    height: 250,
    borderRadius: 10,
    borderColor: "white",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 45,
  },
  arrowStyle: {
    paddingTop: 25,
    marginBottom: 10,
    marginLeft: 235,
    // backgroundColor: "lightblue",
    // borderRadius: 5,
  },
  header: {
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    fontSize: 30,
    paddingTop: 4,
  },
  imageInBox: {
    marginTop: -20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default CuratedInfoScreen;
