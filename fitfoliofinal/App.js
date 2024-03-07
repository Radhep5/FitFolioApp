import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TrackerScreen from "./Screens/TrackerScreen";
import LoginScreen from "./Screens/LoginScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import HomeScreen from "./Screens/HomeScreen";
import CuratedInfoScreen from "./Screens/CuratedInfoScreen";
import CommunityScreen from "./Screens/CommunityScreen";
import AccountScreen from "./Screens/AccountScreen";
import { createStackNavigator } from "@react-navigation/stack";
import {
  CurrentRenderContext,
  NavigationContainer,
} from "@react-navigation/native";
import { trackerDB } from "./config/firebase";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
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
  );
};

export default function App() {
  const [showTabs, setShowTabs] = useState(false);

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
      <TabNavigator></TabNavigator>
    </NavigationContainer>
  );
}
