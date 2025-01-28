import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Booking from "./screens/Booking";
import Profiles from "./screens/Profiles";
import Saved from "./screens/Saved";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ModalPortal } from "react-native-modals";
import Search from "./screens/Search";
import Places from "./screens/Places";
import Map from "./screens/Map";


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTab() {
    return (
      <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "orange", // Text color when active
        tabBarInactiveTintColor: "black", // Text color when inactive
   
      }}
    >
      
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="orange" />
               
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Saved"
          component={Saved}
          options={{
            tabBarLabel: "Saved",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="heart" size={24} color="orange" />
              ) : (
                <AntDesign name="hearto" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Booking"
          component={Booking}
          options={{
            tabBarLabel: "Booking",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="notifications" size={24} color="orange" />
              ) : (
                <MaterialIcons name="notifications-none" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Profiles"
          component={Profiles}
          options={{
            tabBarLabel: "Profiles",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person-sharp" size={24} color="orange" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
      
    );
  }

  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={BottomTab}  options={{headerShown:false}} />
        <Stack.Screen name="search" component={Search} options={{headerShown:false}} />
        <Stack.Screen name="places" component={Places}  />
        <Stack.Screen name="map" component={Map}  />
      </Stack.Navigator>
    </NavigationContainer>
    <ModalPortal />
    </>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
