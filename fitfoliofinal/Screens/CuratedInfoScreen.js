import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";

const CuratedInfoScreen = ({ navigation }) => {
  const [selected, setSelected] = useState();
  const [modalVisible, setModalVisible] = useState(false);
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
    }
    if (selected == data[1].key) {
      console.log("hi2");
      getMeals();
    }
    if (selected == data[2].key) {
    }
    if (selected == data[3].key) {
    }
  };

  //API #1
  const getWorkouts = async (event) => {
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
        <Text>HI</Text>
      </View>
      <View style={[styles.container, { backgroundColor: "#1E1E1E" }]}>
        <View style={[styles.infoBox]}>
          <TouchableOpacity
            style={styles.arrowStyle}
            onPress={() => {
              getWorkouts();
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
          <TouchableOpacity
            style={styles.arrowStyle}
            onPress={() => {
              getWorkouts();
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
          <TouchableOpacity
            style={styles.arrowStyle}
            onPress={() => {
              getWorkouts();
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
          <TouchableOpacity
            style={styles.arrowStyle}
            onPress={() => {
              getWorkouts();
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
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
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
    height: 120,
    borderRadius: 10,
    borderColor: "white",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 25,
  },
  arrowStyle: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 235,
    // backgroundColor: "lightblue",
    // borderRadius: 5,
  },
});

export default CuratedInfoScreen;
