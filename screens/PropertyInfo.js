import { StyleSheet, Text, View } from 'react-native'
import React,{useLayoutEffect} from 'react'
import { useRoute } from '@react-navigation/native';

const PropertyInfo = () => {
     const route = useRoute();
     console.log(route.params);
     useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: true,
          title: "Bookme.in",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "orange",
            height:70,
            borderBottomColor: "transparent",
            shadowColor: "transparent",
          },
          headerRight: () => (
            <MaterialIcons
              name="notifications-none"
              size={24}
              color="white"
              style={{ marginRight: 12 }}
            />
          ),
        });
      }, []);
  return (
    <View>
      <Text>PropertyInfo</Text>
    </View>
  )
}

export default PropertyInfo

const styles = StyleSheet.create({})