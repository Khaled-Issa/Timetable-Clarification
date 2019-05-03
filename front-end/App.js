import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from './screens/Home';
import Alarm from './screens/Alarm';
import About from './screens/About';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Alarm: {
    screen: Alarm
  },
  About: {
    screen: About
  },
});

export default createAppContainer(AppNavigator);