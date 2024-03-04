import React, { useState } from "react";
import styles from "./style";

import { View, Button } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <View style={styles.testBox}></View>
      <Button
        buttonStyle={styles.loginButton}
        onPress={() => {
          navigation.navigate("Home");
        }}
        title="Login"
      />
    </View>
  );
};

export default LoginScreen;
