import React, { useState } from "react";
import AddWorkoutButton from "../Components/AddComment";

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Image,
  StyleSheet,
} from "react-native";
import AddCommentButton from "../Components/AddComment";

const CommunityScreen = ({ navigation }) => {
  return (
    <View style={[styles.container, { backgroundColor: "#1E1E1E" }]}>
      <View>
        <Text style={styles.title}>🍴Meals</Text>
      </View>
      <View style={styles.underline}>
        <AddCommentButton
          title="+ Create Post"
          onPress={() => console.log("Button pressed")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    top: 50,
    left: 30,
    alignSelf: "left",
    fontSize: 32,
    color: "white",
    zIndex: 2,
  },
});

export default CommunityScreen;
