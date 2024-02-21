const React = require("react-native");

const { StyleSheet } = React;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginScreenContainer: {
    flex: 1,
  },
  searchText: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "800",
    marginTop: 100,
    marginBottom: 30,
    textAlign: "center",
    alignItems: "center",
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  searchTextInput: {
    height: 50,
    width: "80%",
    fontSize: 20,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 15,
    marginBottom: 10,
    alignSelf: "center",
  },
  searchButton: {
    backgroundColor: "#015c56",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  searchButtonText: {
    color: "white",
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: "#015c56",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    alignItems: "center",
  },
  logo: {
    width: 325,
    height: 325,
    marginStart: 13,
    marginTop: 60,
    marginBottom: 100,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    alignItems: "center",
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    paddingTop: 10,
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  starUnselected: {
    color: "#aaa",
  },
  starSelected: {
    color: "#ffb300",
  },
  mainButtons: {
    backgroundColor: "#015c56",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    alignItems: "center",
    alignSelf: "center",
  },

  weatherInfoSection: {
    backgroundColor: "rgba(1, 92, 86, 1)", // Opacity added to the background color
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
  },
  weatherInfoItem: {
    flex: 1,
    alignItems: "center",
  },
  weatherInfoLabel: {
    paddingTop: 10,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  weatherInfoValue: {
    paddingBottom: 10,
    color: "white",
    fontSize: 20,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },
});
export default styles;
