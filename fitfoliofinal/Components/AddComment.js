import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { trackerDB } from "../config/firebase.js";
import CurrentDateComponent from "./CurrentDate.js";
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
  Dimensions,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const AddCommentButton = ({ title, onPress }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [paragraph, setParagraph] = useState("");
  const dateString = CurrentDateComponent();
  const [forceUpdate, setForceUpdate] = useState(false);

  const [commentHistory, setCommentHistory] = useState([]);

  const handleSaveComment = async () => {
    const comment = {
      text: paragraph,
      date: dateString,
    };
    setCommentHistory([...commentHistory, comment]);
    console.log("Comment:", paragraph);
    console.log("Date:", dateString);

    const updatedCommentHistory = [...commentHistory, comment];
    setCommentHistory(updatedCommentHistory);

    try {
      const userDocRef = doc(trackerDB, "user", "userdocID");
      const commentsCollectionRef = collection(userDocRef, "comments");
      const commentDocRef = doc(commentsCollectionRef, dateString);

      const commentDocSnapshot = await getDoc(commentDocRef);
      const existingComments = commentDocSnapshot.exists()
        ? commentDocSnapshot.data().comments || []
        : [];

      const updatedComments = [...existingComments, comment];
      await setDoc(commentDocRef, { comments: updatedComments });
      console.log("Stored comment successfully:", comment);
      setForceUpdate(!forceUpdate);
    } catch (error) {
      console.error("Error storing comment:", error);
    }
  };

  const handleSaveCommentAndCloseModal = () => {
    handleSaveComment();
    setIsVisible(false);
    setParagraph("");
  };

  const handleDeleteComment = async (index) => {
    const updatedCommentHistory = [...commentHistory];
    updatedCommentHistory.splice(index, 1);
    setCommentHistory(updatedCommentHistory);

    try {
      const userDocRef = doc(trackerDB, "user", "userdocID");
      const commentsCollectionRef = collection(userDocRef, "comments");
      const commentDocRef = doc(commentsCollectionRef, dateString);

      const commentDocSnapshot = await getDoc(commentDocRef);
      const commentsData = commentDocSnapshot.data()?.comments || [];
      commentsData.splice(index, 1);

      await setDoc(commentDocRef, { comments: commentsData });
      setForceUpdate(!forceUpdate);
      console.log("Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const [fetchedComments, setFetchedComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const userDocRef = doc(trackerDB, "user", "userdocID");
        const commentsCollectionRef = collection(userDocRef, "comments");
        const commentDocRef = doc(commentsCollectionRef, dateString);

        const commentDocSnapshot = await getDoc(commentDocRef);
        const commentsData = commentDocSnapshot.data()?.comments || [];

        setFetchedComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [forceUpdate]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonClear}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.buttonTextClear}>{title}</Text>
      </TouchableOpacity>
      <View style={styles.underline}></View>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.commentHistoryContainer}>
          {fetchedComments.map((fetchedComment, index) => (
            <View key={index} style={styles.commentBox}>
              <Text style={styles.historyTitle}>User Name Here</Text>
              <Text style={styles.historyComment}>"{fetchedComment.text}"</Text>
              <Text style={styles.historyDate}>{fetchedComment.date}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteComment(index)}
              >
                <Text style={styles.deleteIcon}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal visible={isVisible} animationType="slide">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.modalContainer}>
            <Text style={styles.heading}>Add Comment</Text>
            <TextInput
              style={styles.input}
              placeholder="Comment Here"
              placeholderTextColor="#7A7A7A"
              value={paragraph}
              onChangeText={(text) => setParagraph(text)}
            />
            <Button
              title="Save Comment"
              color="#3F9DF3"
              onPress={handleSaveCommentAndCloseModal}
              style={styles.addButton}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonClear: {
    borderWidth: 1,
    width: 101,
    height: 25,
    position: "absolute",
    borderRadius: 25,
    borderColor: "white",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "left",
    left: 40,
    top: 65,
    zIndex: 2,
  },
  underline: {
    borderColor: "white",
    borderBottomWidth: 1,
    top: 120,
  },
  buttonTextClear: {
    color: "white",
    fontSize: 13,
  },
  container: {
    position: "relative",
  },
  scrollContent: {
    borderColor: "white",
    paddingTop: 130,
    height: 600,
  },
  button: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  temp: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  addButton: {
    fontSize: 40,
    paddingBottom: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 30,
    color: "white",
  },
  historyTitle: {
    fontSize: 22,
    color: "white",
    marginLeft: 20,
    marginTop: 5,
    marginBottom: -10,
    alignSelf: "flex-start",
  },
  historyComment: {
    fontSize: 15,
    color: "white",
    marginBottom: 5,
    width: screenWidth - 80,
    left: 30,
    top: 20,
    alignSelf: "flex-start",
  },
  historyDate: {
    position: "absolute",
    fontSize: 13,
    color: "white",
    opacity: 0.7,
    marginBottom: 5,
    right: 20,
    top: 85,
    alignSelf: "flex-end",
  },
  historyHeading: {
    fontSize: 18,
    color: "white",
    marginBottom: 5,
    marginRight: 20,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputBigContainer: {
    marginTop: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: "white",
  },
  workoutHistoryContainer: {
    marginTop: 20,
  },
  commentBox: {
    width: screenWidth,
    height: 120,
    borderColor: "white",
    borderBottomWidth: 1,
    backgroundColor: "transparent",
    alignSelf: "center",
    marginBottom: 25,
  },
  deleteButton: {
    position: "absolute",
    left: 340,
    top: 5,
    padding: 5,
    borderRadius: 5,
  },
  deleteIcon: {
    fontSize: 20,
  },
});

export default AddCommentButton;
