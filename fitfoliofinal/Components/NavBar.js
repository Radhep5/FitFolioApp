import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import TrackerScreen from "../Screens/TrackerScreen.js";
// import Screen2 from "./screens/Screen2";
// import Screen3 from "./screens/Screen3";
// import Screen4 from "./screens/Screen4";

const Tab = createBottomTabNavigator();

function NavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="TrackerScreen" component={TrackerScreen} />
        {/* <Tab.Screen name="Screen2" component={Screen2} />
        <Tab.Screen name="Screen3" component={Screen3} />
        <Tab.Screen name="Screen4" component={Screen4} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default NavBar;
