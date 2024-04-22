import React, { useState, useEffect } from "react";

import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "@rneui/base";
import logoClear from "../assets/logoClear.png";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebase, trackerDB } from "../config/firebase.js";

const HomeScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [homeScreenOn, setHomeScreen] = useState(true);
  const [navBarVisible, setNavBar] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    setIsLoggedIn(false);
  };

  const handleHomeScreenOn = () => {
    setHomeScreen(false);
  };

  const handleHomeScreenOff = () => {
    setHomeScreen(true);
  };

  const handleNavBarOn = () => {
    setNavBar(true);
  };

  const handleNavBarOff = () => {
    setNavBar(false);
  };

  const onSignUpPress = async () => {
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.log("got error: ", err.message);
      }
    }
  };

  const AuthListener = async () => {
    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in
          const userEmail = user.email;

          // Create a document in Firestore under "users" collection with the email
          trackerDB
            .collection("user")
            .doc(user.uid)
            .set({
              email: userEmail,
            })
            .then(() => {
              console.log("User document created in Firestore");
            })
            .catch((error) => {
              console.error("Error creating user document: ", error);
            });
        } else {
          // No user is signed in
          console.log("No user signed in");
        }
      });

      return () => unsubscribe(); // Unsubscribe from the auth state listener when the component unmounts
    }, []);

    return null; // This component doesn't render anything
  };

  // const onLoginPress = async () => {
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((userCredential) => {
  //       // Signed up successfully
  //       const user = userCredential.user;

  //       // Create a document in Firestore for the user
  //       trackerDB
  //         .collection("user")
  //         .doc(user.uid)
  //         .set({
  //           email: user.email,
  //           // You can add more user information here if needed
  //         })
  //         .then(() => {
  //           console.log("User data added to Firestore");
  //         })
  //         .catch((error) => {
  //           console.error("Error adding user data to Firestore: ", error);
  //         });
  //     })
  //     .catch((error) => {
  //       // Handle errors here
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       Alert.alert("Error", errorMessage);
  //     });
  // };

  return (
    <View style={[styles.container, { backgroundColor: "#1E1E1E" }]}>
      {homeScreenOn ? (
        <>
          {isLoggedIn ? (
            <>
              {/* <Image style={styles.logo} source={logoClear} /> */}
              <View style={styles.loginScreenContainer}>
                <View style={styles.loginFormView}>
                  <TextInput
                    placeholder="Email"
                    placeholderColor="#c4c3cb"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    style={styles.loginFormTextInput}
                  />
                  <TextInput
                    placeholder="Password"
                    placeholderColor="#c4c3cb"
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    style={styles.loginFormTextInput}
                    secureTextEntry={true}
                  />
                  <Button
                    buttonStyle={styles.loginButton}
                    title="Login"
                    onPress={() => {
                      handleHomeScreenOn();
                    }}
                  />
                </View>
              </View>
              <Text style={styles.textModify}>New to Fitfolio?</Text>
              <Button title="Sign Up" onPress={handleSignUp} />
            </>
          ) : (
            <>
              {/* <Image style={styles.logo} source={logoClear} /> */}
              <View style={styles.loginScreenContainer}>
                <View style={styles.loginFormView}>
                  <TextInput
                    placeholder="Email 2"
                    placeholderColor="#c4c3cb"
                    style={styles.loginFormTextInput}
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                  />
                  <TextInput
                    placeholder="Password 2"
                    placeholderColor="#c4c3cb"
                    style={styles.loginFormTextInput}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    secureTextEntry={true}
                  />
                  <Button
                    buttonStyle={styles.loginButton}
                    title="Sign Up"
                    onPress={() => {
                      onSignUpPress(), handleHomeScreenOn(), AuthListener();
                    }}
                  />
                </View>
              </View>
              <Text style={styles.textModify}>Already a User?</Text>
              <Button title="Log In" onPress={handleLogin} />
            </>
          )}
        </>
      ) : (
        <>
          <View>
            <View style={styles.navigationBox}>
              <MaterialCommunityIcons
                style={styles.iconStyle}
                name="calendar-plus"
                size={45}
                color="white"
              />
              <TouchableOpacity
                style={styles.arrowStyle}
                onPress={() => {
                  navigation.navigate("Tracker");
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-right-thin"
                  size={70}
                  color="#3F9DF3"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.navigationBox}>
              <MaterialCommunityIcons
                style={styles.iconStyle}
                name="dumbbell"
                size={45}
                color="white"
              />
              <TouchableOpacity
                style={styles.arrowStyle}
                onPress={() => {
                  navigation.navigate("CuratedInfo");
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-right-thin"
                  size={70}
                  color="#3F9DF3"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.navigationBox}>
              <MaterialCommunityIcons
                style={styles.iconStyle}
                name="food-apple"
                size={45}
                color="white"
              />
              <TouchableOpacity
                style={styles.arrowStyle}
                onPress={() => {
                  navigation.navigate("Community");
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
  logo: {
    width: 325,
    height: 325,
    marginStart: 13,
    marginTop: 60,
    marginBottom: 100,
  },
  navigationBox: {
    borderWidth: 2,
    width: 330,
    height: 150,
    borderRadius: 10,
    borderColor: "white",
    backgroundColor: "#2F2F2F",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  arrowStyle: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 235,
    // backgroundColor: "lightblue",
    // borderRadius: 5,
  },
  iconStyle: {
    marginTop: 30,
    marginLeft: 235,
  },
  header: {},
});

export default HomeScreen;
