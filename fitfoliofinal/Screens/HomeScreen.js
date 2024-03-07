import React, { useState } from "react";

import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "@rneui/base";

const HomeScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    setIsLoggedIn(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: "#1E1E1E" }]}>
      <View style={styles.loginScreenContainer}>
        <View style={styles.loginFormView}>
          {/* <Image style={styles.logo} source={Logo} /> */}
          <TextInput
            placeholder="Email"
            placeholderColor="#c4c3cb"
            style={styles.loginFormTextInput}
          />
          <TextInput
            placeholder="Password"
            placeholderColor="#c4c3cb"
            style={styles.loginFormTextInput}
            secureTextEntry={true}
          />
        </View>
      </View>
      <Text style={styles.textModify}>New to Fitfolio?</Text>
      <Button buttonStyle={styles.buttonSwitch} title="Sign Up" />

      {isLoggedIn ? (
        <>
          <Button
            buttonStyle={styles.loginButton}
            onPress={() => {}}
            title="Login"
          />
          <Button title="Sign Up" onPress={handleSignUp} />
        </>
      ) : (
        <>
          <Button
            buttonStyle={styles.loginButton}
            onPress={() => {}}
            title="Sign Up"
          />
          <Button title="Log In" onPress={handleLogin} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginFormView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginFormTextInput: {
    height: 43,
    width: 250,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#3F9DF3",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  loginScreenContainer: {
    width: 350,
    height: 325,
    backgroundColor: "#000000",
    border: 1,
    margin: 20,
  },
  textModify: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 22,
    marginTop: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  buttonSwitch: {},
});

export default HomeScreen;
