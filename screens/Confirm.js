import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { savedPlaces } from "../SavedReducer";

const Confirm = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Confirmation",
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

  const onConfirmBooking = () => {
    dispatch(savedPlaces(route.params));
    navigation.navigate("Main", { screen: "Home" });
  };

  return (
    <View>
      <Pressable style={{ backgroundColor: "white", margin: 10, elevation: 2, padding: 12 }}>
        {/* Hotel Info Section */}
        <View style={styles.hotelInfoContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.hotelName} numberOfLines={2}>
              {route.params.name}
            </Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="stars" size={24} color="green" />
              <Text>{route.params.rating}</Text>
              <View style={styles.geniusLevel}>
                <Text style={styles.geniusText}>Genius Level</Text>
              </View>
            </View>
          </View>

          {/* Travel Sustainable Badge */}
          <View style={styles.sustainableBadge}>
            <Text style={{ color: "white", fontSize: 13 }}>Travel Sustainable</Text>
          </View>
        </View>

        {/* Check-in & Check-out */}
        <View style={styles.checkContainer}>
          <View>
            <Text style={styles.label}>Check In</Text>
            <Text style={styles.date}>{route.params.startDate}</Text>
          </View>
          <View>
            <Text style={styles.label}>Check Out</Text>
            <Text style={styles.date}>{route.params.endDate}</Text>
          </View>
        </View>

        {/* Rooms & Guests */}
        <View style={{ margin: 12 }}>
          <Text style={styles.label}>Rooms and Guests</Text>
          <Text style={styles.roomsText}>
            {route.params.rooms} rooms {route.params.adults} adults {route.params.children} children
          </Text>
        </View>

        {/* Book Now Button */}
        <Pressable onPress={onConfirmBooking} style={styles.bookNowButton}>
          <Text style={styles.bookNowText}>Book Now</Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  hotelInfoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hotelName: {
    fontSize: 22,
    fontWeight: "bold",
    maxWidth: 200, // Prevents overflow
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 7,
    flexWrap: "wrap",
  },
  geniusLevel: {
    backgroundColor: "orange",
    paddingVertical: 3,
    borderRadius: 5,
    width: 100,
  },
  geniusText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
  sustainableBadge: {
    backgroundColor: "#17B169",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "auto",
    marginTop: 5, 
  },
  checkContainer: {
    margin: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 3,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: "orange",
  },
  roomsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFAF42",
  },
  bookNowButton: {
    backgroundColor: "orange",
    width: 120,
    padding: 8,
    marginHorizontal: 12,
    marginBottom: 20,
    borderRadius: 4,
  },
  bookNowText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
