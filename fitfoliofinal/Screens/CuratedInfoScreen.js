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

  const recipePhrases = [
    "Unlock Deliciousness Inside: Click to Discover a Mouthwatering Recipe!",
    "Unleash Culinary Magic: Click for a Taste Sensation!",
    "Open for Flavor: Click Here for Your Next Favorite Recipe!",
    "Crack Open for Kitchen Inspiration: Click to Cook up Something Special!",
    "Click for a Gastronomic Adventure: Dive into a Irresistible Recipe!",
    "Tap into Taste: Click to Reveal the Secret to a Scrumptious Dish!",
    "Curiosity Meets Flavor: Click to Explore a Must-Try Recipe!",
    "Indulge Your Senses: Click Here for a Recipe That Will Wow!",
    "Click to Elevate Your Cooking Game: Discover the Recipe Everyone's Talking About!",
    "Unbox Delight: Click Here to Unveil the Recipe That'll Make Your Day!",
    "Satisfy Your Cravings: Click for a Recipe That's Simply Irresistible!",
  ];

  const exercisePhrases = [
    "Unlock Your Full Potential: Discover a New Exercise for a Healthier, Stronger You!",
    "Revolutionize Your Workout Routine: Try This Exciting New Exercise!",
    "Transform Your Fitness Journey: Dive into the Ultimate Exercise Innovation!",
    "Elevate Your Fitness Game: Unveiling a Fresh Exercise for Maximum Results!",
    "Ignite Your Passion for Fitness: Explore a New Exercise Adventure!",
    "Upgrade Your Workouts Today: Introducing a Game-Changing Exercise Technique!",
    "Discover Your Body's Potential: Step into a New Exercise Experience!",
    "Unleash Your Inner Athlete: Embrace a New Exercise Challenge!",
    "Get Ready to Sweat: Uncover a Cutting-Edge Exercise Move!",
    "Say Hello to a Fitter You: Try This Exciting New Exercise Today!",
    "Break the Mold: Embrace a New Exercise for Total Body Transformation!",
  ];

  const equipmentPhrases = [
    "Maximize Your Gains: Unleash the Power of Gym Equipment!",
    "Sculpt Your Muscles: Conquer the Gym for Ultimate Strength!",
    "Boost Your Endurance: Harness the Power of Fitness Equipment!",
    "Define Your Physique: Take on Gym Tools for Total Body Transformation!",
    "Build Core Strength: Master the Equipment for a Rock-Solid Midsection!",
    "Enhance Flexibility: Embrace Gym Gear for Inner Peace and Balance!",
    "Elevate Your Cardio: Dominate the Gym Machines for Heart-Pumping Workouts!",
    "Challenge Your Limits: Explore Gym Equipment for Intense Workouts!",
    "Achieve Balance and Stability: Utilize Gym Tools for Core Activation!",
    "Unleash Explosive Power: Power Up with Gym Equipment for Dynamic Workouts!",
    "Push Your Limits: Harness the Tools for Fitness Gains!",
  ];

  const shuffledEquipmentPhrases = shuffleArray(equipmentPhrases);
  const selectedEquipmentPhrases = shuffledEquipmentPhrases.slice(0, 2);

  const shuffledExercisePhrases = shuffleArray(exercisePhrases);
  const selectedExercisePhrases = shuffledExercisePhrases.slice(0, 2);

  const shuffledFoodPhrases = shuffleArray(recipePhrases);
  const selectedFoodPhrases = shuffledFoodPhrases.slice(0, 2);
  let meal1;
  let meal2;
  const [firstWorkoutLabel, setFirstWorkoutLabel] = useState();
  const [secondWorkoutLabel, setSecondWorkoutLabel] = useState();
  const [thirdWorkoutLabel, setThirdWorkoutLabel] = useState();

  const [firstWorkoutLabel2, setFirstWorkoutLabel2] = useState();
  const [secondWorkoutLabel2, setSecondWorkoutLabel2] = useState();
  const [thirdWorkoutLabel2, setThirdWorkoutLabel2] = useState();

  const [mealOneDesc, setMealOneDesc] = useState();
  const [mealTwoDesc, setMealTwoDesc] = useState();
  const [mealOneVid, setMealOneVid] = useState();
  const [mealTwoVid, setMealTwoVid] = useState();

  const data = [
    { key: "1", value: "Meals" },
    { key: "2", value: "Workouts" },
    { key: "3", value: "Equipment" },
  ];

  const runSelectTopic = () => {
    console.log("working");
    if (selected == data[0].key) {
      console.log("hi");
      getMeals();
      setDisplayText("Meals");
    }
    if (selected == data[1].key) {
      console.log("hi2");
      getWorkouts();
      setDisplayText("Workouts");
    }
    if (selected == data[2].key) {
      setDisplayText("Equipment");
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
      const randomIndex1 = Math.floor(Math.random() * workouts.length);
      const randomIndex2 = Math.floor(Math.random() * workouts.length);
      while (randomIndex2 === randomIndex1) {
        randomIndex2 = Math.floor(Math.random() * meals.length);
      } // Generate a random index
      const randomWorkout1 = workouts[randomIndex1]; // Select a random workout
      console.log(randomWorkout1); // Log the random workout
      const randomWorkout2 = workouts[randomIndex2];
      console.log(randomWorkout2);
      //3 is beginner sets
      //1 is workout
      //6 is equipment
      //8 is long explanation
      //9 is video
      const [firstKey, firstValue] = Object.entries(randomWorkout1)[1];
      setFirstWorkoutLabel(`${firstKey}: ${firstValue}`);
      const [secondKey, secondValue] = Object.entries(randomWorkout1)[3];
      setSecondWorkoutLabel(`${secondKey}: ${secondValue}`);
      const [thirdKey, thirdValue] = Object.entries(randomWorkout1)[8];
      setThirdWorkoutLabel(`${thirdKey}: ${thirdValue}`);

      const [firstKey2, firstValue2] = Object.entries(randomWorkout2)[1];
      setFirstWorkoutLabel2(`${firstKey2}: ${firstValue2}`);
      const [secondKey2, secondValue2] = Object.entries(randomWorkout2)[3];
      setSecondWorkoutLabel2(`${secondKey2}: ${secondValue2}`);
      const [thirdKey2, thirdValue2] = Object.entries(randomWorkout2)[8];
      setThirdWorkoutLabel2(`${thirdKey2}: ${thirdValue2}`);
    } catch (error) {
      console.error(error);
    }
  };

  //API #2
  const getMeals = async (event) => {
    const options = {
      method: "GET",
      url: "https://tasty.p.rapidapi.com/recipes/list",
      params: {
        from: "0",
        size: "20",
        tags: "under_30_minutes",
      },
      headers: {
        "X-RapidAPI-Key": "bc3e44159emsh5388156e6328a5cp159b32jsn42334b02b266",
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const meals = response.data.results;
      let randomIndex1 = Math.floor(Math.random() * meals.length);
      let randomIndex2 = Math.floor(Math.random() * meals.length);
      while (randomIndex2 === randomIndex1) {
        randomIndex2 = Math.floor(Math.random() * meals.length);
      }

      meal1 = meals[randomIndex1];
      meal2 = meals[randomIndex2];

      setMealOneDesc("Meal Description:", meal1.description);
      setMealTwoDesc("Meal Description:", meal2.description);
      setMealOneVid("Meal Video:", meal1.video_url);
      setMealTwoVid("Meal Video:", meal2.video_url);
    } catch (error) {
      console.error(error);
    }
  };

  //API #3
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
          defaultOption={data[0]}
        />

        <Text style={styles.header}>{displayText}</Text>
      </View>
      <View style={[styles.container, { backgroundColor: "#1E1E1E" }]}>
        <View style={[styles.infoBox]}>
          <Image style={[styles.imageInBox]} source={selectedImages[0].image} />
          <View style={[styles.textView]}>
            {selected === data[0].key && (
              <Text style={[styles.arrowText]}>{selectedFoodPhrases[0]}</Text>
            )}
            {selected === data[1].key && (
              <Text style={[styles.arrowText]}>
                {selectedExercisePhrases[0]}
              </Text>
            )}
            {selected === data[2].key && (
              <Text style={[styles.arrowText]}>
                {selectedEquipmentPhrases[0]}
              </Text>
            )}
          </View>
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
        </View>
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
              {selected === data[0].key && (
                <>
                  <Text>{mealOneDesc}</Text>
                  <Text>{mealOneVid}</Text>
                </>
              )}
              {selected === data[1].key && (
                <>
                  <Text>{firstWorkoutLabel}</Text>
                  <Text>{secondWorkoutLabel}</Text>
                  <Text>{thirdWorkoutLabel}</Text>
                </>
              )}
              {selected === data[2].key && (
                <Text>{selectedEquipmentPhrases[0]}</Text>
              )}

              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
        <View style={[styles.infoBox]}>
          <Image style={[styles.imageInBox]} source={selectedImages[1].image} />
          <View style={[styles.textView]}>
            {selected === data[0].key && (
              <Text style={[styles.arrowText]}>{selectedFoodPhrases[1]}</Text>
            )}
            {selected === data[1].key && (
              <Text style={[styles.arrowText]}>
                {selectedExercisePhrases[1]}
              </Text>
            )}
            {selected === data[2].key && (
              <Text style={[styles.arrowText]}>
                {selectedExercisePhrases[1]}
              </Text>
            )}
          </View>
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
        </View>
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
              {selected === data[0].key && (
                <>
                  <Text>{mealTwoDesc}</Text>
                  <Text>{mealTwoVid}</Text>
                </>
              )}
              {selected === data[1].key && (
                <>
                  <Text>{firstWorkoutLabel2}</Text>
                  <Text>{secondWorkoutLabel2}</Text>
                  <Text>{thirdWorkoutLabel2}</Text>
                </>
              )}
              {selected === data[2].key && (
                <Text>{selectedEquipmentPhrases[0]}</Text>
              )}

              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
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
    position: "absolute",
    marginLeft: 235,
    top: 160,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
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
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    bottom: 21,
  },
  arrowText: {
    color: "white",
    fontSize: 20,
    marginStart: 10,
    marginTop: 10,
    marginRight: 100,
  },
  textView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CuratedInfoScreen;
