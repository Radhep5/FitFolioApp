import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";

const CuratedInfoScreen = ({ navigation }) => {
  const [selected, setSelected] = useState();
  const data = [
    { key: "1", value: "Mobiles" },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers" },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];

  const runSelectTopic = () => {
    if (selected == data[0].value) {
      print("hi");
    }
    if (selected == data[0].value) {
      print("hi2");
    }
  };

  const getWorkouts = async (event) => {
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://exercisedb.p.rapidapi.com/exercises",
      params: { limit: "10" },
      headers: {
        "X-RapidAPI-Key": "bc3e44159emsh5388156e6328a5cp159b32jsn42334b02b266",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
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
      </View>
      <View style={[styles.container, { backgroundColor: "#1E1E1E" }]}>
        <View style={[styles.infoBox]}></View>
        <TouchableOpacity
          style={styles.arrowStyle}
          onPress={() => {
            getWorkouts();
          }}
        >
          <MaterialCommunityIcons
            name="arrow-right-thin"
            size={70}
            color="#3F9DF3"
          />
        </TouchableOpacity>
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
});

export default CuratedInfoScreen;
