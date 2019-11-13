import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FirstScreen from '../screen/FirstScreen';

const AppNavigator =createBottomTabNavigator(
    {
        Home: FirstScreen,
    }
);
const Navigator = createAppContainer(AppNavigator);

export default Navigator;
