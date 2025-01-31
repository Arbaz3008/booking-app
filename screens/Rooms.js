import { Pressable, ScrollView, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Facilities from "../components/Facilities";

const Rooms = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Available Rooms",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "orange",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, []);

  return (
    <>
      <FlatList
        data={route.params.rooms}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Pressable style={styles.roomContainer} key={index}>
            <View style={styles.roomHeader}>
              <Text style={styles.roomName}>{item.name}</Text>
              <AntDesign name="infocirlceo" size={24} color="orange" />
            </View>
            <Text style={styles.paymentInfo}>Pay at the Property</Text>
            <Text style={styles.cancellationInfo}>Free Cancellation Available</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.oldPrice}>{route.params.oldPrice}</Text>
              <Text style={styles.newPrice}>Rs:{route.params.newPrice}</Text>
            </View>
            <Facilities />
            {selected === item.name ? (
              <Pressable style={styles.selectedButton}>
                <Text style={styles.selectedButtonText}>SELECTED</Text>
                <Entypo
                  onPress={() => setSelected(null)}
                  name="circle-with-cross"
                  size={24}
                  color="red"
                />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => setSelected(item.name)}
                style={styles.selectButton}
              >
                <Text style={styles.selectButtonText}>SELECT</Text>
              </Pressable>
            )}
          </Pressable>
        )}
      />
      {selected !== null ? (
        <Pressable
          onPress={() =>
            navigation.navigate("User", {
              oldPrice: route.params.oldPrice,
              newPrice: route.params.newPrice,
              name: route.params.name,
              children: route.params.children,
              adults: route.params.adults,
              rating: route.params.rating,
              startDate: route.params.startDate,
              endDate: route.params.endDate,
            })
          }
          style={styles.reserveButton}
        >
          <Text style={styles.reserveButtonText}>Reserve</Text>
        </Pressable>
      ) : null}
    </>
  );
};

export default Rooms;

const styles = StyleSheet.create({
  roomContainer: {
    margin: 10,
    backgroundColor: "white",
    padding: 10,
    elevation:5
  },
  roomHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  roomName: {
    color: "orange",
    fontSize: 17,
    fontWeight: "500",
  },
  paymentInfo: {
    marginTop: 3,
    fontSize: 16,
  },
  cancellationInfo: {
    marginTop: 3,
    color: "green",
    fontSize: 16,
  },
  priceContainer: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  oldPrice: {
    fontSize: 18,
    color: "red",
    textDecorationLine: "line-through",
  },
  newPrice: {
    fontSize: 18,
  },
  selectedButton: {
    borderColor: "orange",
    backgroundColor: "#F0F8FF",
    borderWidth: 2,
    width: "100%",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedButtonText: {
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    color: "orange",
    fontWeight: "bold",
    fontSize: 16,
  },
  selectButton: {
    borderColor: "orange",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
  },
  selectButtonText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "orange",
  },
  reserveButton: {
    backgroundColor: "orange",
    padding: 8,
    marginBottom: 10,
    borderRadius: 3,
    marginHorizontal: 15,
  },
  reserveButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
});