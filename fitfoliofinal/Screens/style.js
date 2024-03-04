const React = require("react-native");

const { StyleSheet } = React;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E1E1E",
  },

  box: {
    width: 100,
    height: 100,
    //backgroundColor: "#000000",
    //border: 1,
    margin: 10,
  },

  testBox: {
    width: 100,
    height: 100,
    //backgroundColor: "#000000",
    //border: 1,
    margin: 10,
  },
  loginButton: {
    backgroundColor: "#015c56",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    alignItems: "center",
  },
  calendarPad: {
    paddingBottom: 30,
  },
});
export default styles;
