import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Animated } from "react-native";
import TrackerScreen from "./Screens/TrackerScreen";
import LoginScreen from "./Screens/LoginScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import HomeScreen from "./Screens/HomeScreen";
import CuratedInfoScreen from "./Screens/CuratedInfoScreen";
import CommunityScreen from "./Screens/CommunityScreen";
import AccountScreen from "./Screens/AccountScreen";
import Logo from "./assets/logoClear.png";
import {
  CurrentRenderContext,
  NavigationContainer,
} from "@react-navigation/native";
import { trackerDB } from "./config/firebase";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const SplashScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image source={Logo} style={styles.logo} />
    </Animated.View>
  );
};

export const TabNavigator = () => {
  return (
    // <Animated.View style={[{ opacity: fadeAnim }]}>
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarLabelStyle: {
          color: "#FFFFFF",
        },
        headerTitleStyle: {
          color: "#FFFFFF",
        },
        headerStyle: {
          backgroundColor: "#2F2F2F",
        },
        tabBarStyle: {
          backgroundColor: "#2F2F2F",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tracker"
        component={TrackerScreen}
        options={{
          tabBarLabel: "Tracker",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="arm-flex" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CuratedInfo"
        component={CuratedInfoScreen}
        options={{
          tabBarLabel: "Curated Info",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="information"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarLabel: "Community",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="hand-wave"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
    // </Animated.View>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showTabs, setShowTabs] = useState(false);
  const [fadeIn] = useState(new Animated.Value(1));

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1700);
  }, []);

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <NavigationContainer>
      {/* <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} setShowTabs={setShowTabs} />}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} setShowTabs={setShowTabs} />}
        </Stack.Screen>
        {showTabs && <Stack.Screen name="Tabs" component={TabNavigator} />}
      </Stack.Navigator> */}
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          {/* Your navigation stack */}
          <Animated.View style={[styles.container2, { opacity: fadeIn }]}>
            <View style={styles.tempRect} />
          </Animated.View>
          <TabNavigator />
        </>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2F2F2F",
    justifyContent: "center",
  },
  container2: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
  },
  logo: {
    left: 12,
    width: 400,
    height: 400,
    resizeMode: "contain",
  },
  tempRect: {
    alignSelf: "center",
    backgroundColor: "#1E1E1E",
    width: 10000,
    height: 10000,
  },
});
