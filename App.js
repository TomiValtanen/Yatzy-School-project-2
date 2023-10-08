import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';
import { Styles } from './styles/Styles';
import Gameboard from './components/Gameboard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Home from './components/Home';
import { NavigationContainer } from '@react-navigation/native';
import Scoreboard from './components/Scoreboard';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        //initialRouteName="Home"
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName
            if (route.name === "Home") {
              iconName = focused ?
                "information"
                :
                "information-outline"
            }
            else if (route.name === "Gameboard") {
              iconName = focused ?
                "dice-multiple"
                :
                "dice-multiple-outline"
            }
            else if (route.name === "Scoreboard") {
              iconName = focused ?
                "view-list"
                :
                "view-list-outline"
            }
            return <MaterialCommunityIcons
              name={iconName}
              size={size}
              color={color}

            />
          },
          tabBarActiveTintColor: "steelblue",
          tabBarInactiveTintColor: "gray"
        })}
      >

        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarStyle: {display:"none"}
          }}
        />
        <Tab.Screen
          name="Gameboard"
          component={Gameboard}

      
        />
        <Tab.Screen
          name="Scoreboard"
          component={Scoreboard}
    
        />

      </Tab.Navigator>
    </NavigationContainer>

  );
}