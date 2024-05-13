import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { trackerDB } from "../config/firebase.js";
import CurrentDateComponent from "./CurrentDate.js";
import { SelectList } from "react-native-dropdown-select-list";
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

const AddCommentButton = ({ title, onPress, username }) => {
  const [selected, setSelected] = useState();

  const [isVisible, setIsVisible] = useState(false);
  const [paragraph, setParagraph] = useState("");
  const name = username;
  const dateString = CurrentDateComponent();
  const [forceUpdate, setForceUpdate] = useState(false);
  const likeBoolean = false;
  const [selectedCategory, setSelectedCategory] = useState("🍴Meals");
  const [displayText, setDisplayText] = useState("");

  const [commentHistory, setCommentHistory] = useState([]);

  const data = [
    { key: "1", value: "🍴Meals" },
    { key: "2", value: "🏋🏼Workouts" },
    { key: "3", value: "🛠️Equipment" },
    { key: "4", value: "🥛Supplements" },
  ];

  const runSelectTopic = () => {
    console.log("working");
    if (selected == data[0].key) {
      console.log("hi");
      setDisplayText("🍴Meals");
      setSelectedCategory("🍴Meals");
    }
    if (selected == data[1].key) {
      console.log("hi2");
      setDisplayText("🏋🏼Workouts");
      setSelectedCategory("🏋🏼Workouts");
    }
    if (selected == data[2].key) {
      setDisplayText("🛠️Equipment");
      setSelectedCategory("🛠️Equipment");
    }
    if (selected == data[3].key) {
      setDisplayText("🥛Supplements");
      setSelectedCategory("🥛Supplements");
    }
    console.log(selectedCategory);
    setForceUpdate(!forceUpdate);
  };

  const handleSaveComment = async () => {
    const comment = {
      title: name,
      text: paragraph,
      date: dateString,
      category: selectedCategory,
      favorite: likeBoolean,
    };
    setCommentHistory([...commentHistory, comment]);
    console.log("Name:", name);
    console.log("Comment:", paragraph);
    console.log("Date:", dateString);
    console.log("Category:", selectedCategory);
    console.log("Favorite:", likeBoolean);

    const updatedCommentHistory = [...commentHistory, comment];
    setCommentHistory(updatedCommentHistory);

    try {
      const userDocRef = doc(trackerDB, "Users", username);
      const commentsCollectionRef = collection(userDocRef, "comments");
      const commentDocRef = doc(commentsCollectionRef, selectedCategory);

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
      const userDocRef = doc(trackerDB, "Users", username);
      const commentsCollectionRef = collection(userDocRef, "comments");
      const commentDocRef = doc(commentsCollectionRef, selectedCategory);

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

  const handleAddFavorite = async (index) => {
    try {
      let moveUp = true;
      const updatedComments = fetchedComments.map((comment, i) => {
        if (i === index) {
          if (comment.favorite) {
            moveUp = false;
          }
          return {
            ...comment,
            favorite: !comment.favorite,
          };
        }
        return comment;
      });
      const commentToMove = updatedComments[index];
      updatedComments.splice(index, 1);
      if (moveUp) {
        updatedComments.unshift(commentToMove);
      } else {
        updatedComments.push(commentToMove);
      }

      const userDocRef = doc(trackerDB, "Users", username);
      const commentsCollectionRef = collection(userDocRef, "comments");
      const commentDocRef = doc(commentsCollectionRef, selectedCategory);

      await setDoc(commentDocRef, { comments: updatedComments });
      console.log("Comment favorited successfully");
      setForceUpdate(!forceUpdate);
    } catch (error) {
      console.error("Error favoriting comment:", error);
    }
  };

  const [fetchedComments, setFetchedComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const userDocRef = doc(trackerDB, "Users", username);
        const commentsCollectionRef = collection(userDocRef, "comments");
        const commentDocRef = doc(commentsCollectionRef, selectedCategory);

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
      <View style={[styles.containerList, { backgroundColor: "#1E1E1E" }]}>
        <Text style={styles.title}>{displayText}</Text>
        <SelectList
          data={data}
          setSelected={setSelected}
          style={[styles.selectorBox, { left: 40 }]}
          dropdownStyles={{ backgroundColor: "transparent" }}
          dropdownItemStyles={{ marginHorizontal: 10 }}
          dropdownTextStyles={{ color: "white" }}
          placeholderTextColor="white"
          placeholder="Select Topic"
          searchPlaceholder="Choose topic"
          onSelect={runSelectTopic}
        />
      </View>
      <View style={styles.spacing}>
        <TouchableOpacity
          style={styles.buttonClear}
          onPress={() => setIsVisible(true)}
        >
          <Text style={styles.buttonTextClear}>{title}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.underline}></View>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.commentHistoryContainer}>
          {fetchedComments.map((fetchedComment, index) => (
            <View key={index} style={styles.commentBox}>
              <Text style={styles.historyTitle}>{fetchedComment.title}</Text>
              <Text style={styles.historyComment}>"{fetchedComment.text}"</Text>
              <Text style={styles.historyDate}>{fetchedComment.date}</Text>
              <TouchableOpacity
                style={styles.heartButton}
                onPress={() => handleAddFavorite(index)}
              >
                <Text
                  style={[
                    styles.heartIcon,
                    fetchedComment.favorite ? styles.heartIconFavorited : null,
                  ]}
                >
                  ♡
                </Text>
              </TouchableOpacity>
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
  title: {
    top: 2,
    alignSelf: "left",
    fontSize: 32,
    color: "white",
    marginRight: 20,
    zIndex: 2,
  },
  buttonClear: {
    borderWidth: 1,
    width: 101,
    height: 25,
    borderRadius: 25,
    borderColor: "white",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "left",
    left: 35,
    zIndex: 2,
  },
  underline: {
    borderColor: "white",
    borderBottomWidth: 1,
  },
  buttonTextClear: {
    color: "white",
    fontSize: 13,
  },
  container: {
    position: "relative",
    paddingTop: 10,
  },
  scrollContent: {
    borderColor: "white",
    paddingTop: 15,
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
    marginBottom: 15,
  },
  heartButton: {
    position: "absolute",
    left: 338,
    top: 3,
    padding: 5,
    borderRadius: 5,
  },
  heartIcon: {
    color: "white",
    fontSize: 24,
  },
  heartIconFavorited: {
    color: "#ff3333",
    fontSize: 24,
  },
  deleteButton: {
    position: "absolute",
    left: 380,
    top: 3,
    padding: 5,
    borderRadius: 5,
  },
  deleteIcon: {
    fontSize: 20,
  },
  containerList: {
    flexDirection: "row",
    justifyContent: "left",
    backgroundColor: "#f0f0f0",
    padding: 20,
    paddingLeft: 30,
  },
  selectorBox: {
    top: 50,
  },
  spacing: {
    paddingBottom: 40,
  },
});

export default AddCommentButton;
