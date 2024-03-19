import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";

const AccountScreen = ({ navigation }) => {
  return (
    <View style={[styles.container, { backgroundColor: "#1E1E1E" }]}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Name</Text>
        <TouchableOpacity style={styles.accountButtons}>
          <Text style={styles.accountButtonsText}>
            Edit Info. {"                                ＞"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountButtons}>
          <Text style={styles.accountButtonsText}>
            Notifications {"                         ＞"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountButtons}>
          <Text style={styles.accountButtonsText}>
            Help / Contact {"                      ＞"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountButtons}>
          <Text style={styles.accountButtonsText}>
            Log Out {"                                 ＞"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
  },
  infoContainer: {
    width: 306,
    height: 315,
    backgroundColor: "#2D2D2D",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#7A7A7A",
    alignItems: "center",
  },
  name: {
    position: "absolute",
    top: 25,
    left: 20,
    fontSize: 32,
    color: "white",
  },
  accountButtons: {
    top: 100,
    borderColor: "#7A7A7A",
    borderTopWidth: 1,
    width: 306,
    height: 53,
    borderColor: "#7A7A7A",
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  accountButtonsText: {
    left: 30,
    fontSize: 20,
    color: "white",
  },
});

export default AccountScreen;
