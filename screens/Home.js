import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "../components/Header";
import Feather from "@expo/vector-icons/Feather";
import DatePicker from "react-native-date-ranges";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  BottomModal,
  ModalFooter,
  ModalButton,
  ModalTitle,
  SlideAnimation,
  ModalContent,
} from "react-native-modals";

const Home = () => {
  const navigation = useNavigation();
  const [dates, setDates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [rooms, setRooms] = useState(0);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const route= useRoute();

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
  console.log(route.params)
  const searchPlaces =(place)=>{
    if(!route.params || !dates){
      Alert.alert('Invalid Details', 'please enter all details', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    if(route.params && dates){
      navigation.navigate('places',{
        rooms:rooms,
        adults:adults,
        children:children,
        dates:dates,
        place:place
      })
    }
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="orange" />
        <Header />
        <ScrollView>
          <View style={styles.searchContainer}>
            <Pressable style={styles.inputContainer}
            onPress={()=>navigation.navigate('search')}>

              <Feather name="search" size={24} color="black" />
              <TextInput
                placeholder={route?.params ? route.params.input  : "Enter Your Destination"}
                style={styles.input}
                placeholderTextColor="#888"
              />
            </Pressable>
            <View style={styles.inputContainer}>
              <Feather name="calendar" size={24} color="black" />
              <DatePicker
                style={styles.datePicker}
                customStyles={{
                  placeholderText: { fontSize: 14 },
                  headerStyle: { backgroundColor: "orange" },
                  contentText: { fontSize: 14 },
                  stageStyle: { backgroundColor: "#fff" },
                  footerStyle: {
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 20,
                  },
                }}
                centerAlign
                selectedBgColor="orange"
                allowFontScaling={false}
                placeholder="Select Your  Dates"
                mode="range"
                onConfirm={(range) => {
                  setDates(`${range.startDate} - ${range.endDate}`);
                }}
                customButton={(onConfirm) => (
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={onConfirm}
                  >
                    <Text style={styles.submitButtonText}>Submit</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.roomSelection}
            >
              <Ionicons name="person-outline" size={24} color="black" />
              <Text style={styles.text}>{`${rooms} room · ${adults} adults · ${children} children`}</Text>
            </Pressable>
            <Pressable 
            onPress={()=>searchPlaces(route?.params.input)}
            style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Search</Text>
            </Pressable>
          </View>
          <Text
            style={{ marginHorizontal: 20, fontSize: 17, fontWeight: "500" }}
          >
            Travel More Spend Less
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                backgroundColor: "orange",
                borderRadius: 10,
                padding: 20,
                marginHorizontal: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                Genius
              </Text>
              <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
                You are at Genius level 1 in our Loyalty Programm!{" "}
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                backgroundColor: "#E0E0E0",
                borderWidth:2,
                borderRadius: 10,
                padding: 20,
                marginHorizontal: 15,
              }}
            >
              <Text
                style={{
                  
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                10% Discount
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Enjoy Your Discount at participating at worldwide properties!
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                backgroundColor: "#e8e8e8",
                borderWidth:2,
                borderRadius: 10,
                padding: 20,
                marginHorizontal: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                15% Discount
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Complete stays 5 days to unlock level 2!
              </Text>
            </Pressable>
           
          </ScrollView>
          <Pressable style={{marginTop:40,justifyContent:"center",alignItems:"center"
            }}>
             <Image style={{
              width:400,height:250, resizeMode:"cover"
             }} 
             source={require('../assets/Bookmee.in.png')}
             />
            </Pressable>
        </ScrollView>
      </SafeAreaView>
      <BottomModal
        swipeThreshold={200}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        footer={
          <ModalFooter>
            <ModalButton
              text="Apply"
              style={styles.modalButton}
              textStyle={styles.modalButtonText}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Select Rooms and Guests" />}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        onHardwareBackPress={() => {
          setModalVisible(false);
          return true;
        }}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={styles.modalContent}>
          <View style={styles.modalRow}>
            <Text>Rooms</Text>
            <View style={styles.counter}>
              <TouchableOpacity
                onPress={() => setRooms(Math.max(1, rooms - 1))}
              >
                <Text style={styles.counterButton}>-</Text>
              </TouchableOpacity>
              <Text>{rooms}</Text>
              <TouchableOpacity onPress={() => setRooms(rooms + 1)}>
                <Text style={styles.counterButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.modalRow}>
            <Text>Adults</Text>
            <View style={styles.counter}>
              <TouchableOpacity
                onPress={() => setAdults(Math.max(1, adults - 1))}
              >
                <Text style={styles.counterButton}>-</Text>
              </TouchableOpacity>
              <Text>{adults}</Text>
              <TouchableOpacity onPress={() => setAdults(adults + 1)}>
                <Text style={styles.counterButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.modalRow}>
            <Text>Children</Text>
            <View style={styles.counter}>
              <TouchableOpacity
                onPress={() => setChildren(Math.max(0, children - 1))}
              >
                <Text style={styles.counterButton}>-</Text>
              </TouchableOpacity>
              <Text>{children}</Text>
              <TouchableOpacity onPress={() => setChildren(children + 1)}>
                <Text style={styles.counterButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    margin: 20,
    borderColor: "#FFC72C",
    borderWidth: 3,
    borderRadius: 6,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: "#FFC72C",
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  datePicker: {
    flex: 1,
    borderWidth: 0,
  },
  submitButton: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  roomSelection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderColor: "#FFC72C",
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchButton: {
    marginTop: 2,
    paddingHorizontal: 10,
    borderColor: "yellow",
    borderWidth: 2,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "orange",
  },
  searchButtonText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    color: "white",
  },
  modalContent: {
    width: "100%",
    height: 310,
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  counterButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: "#BEBEBE",
    backgroundColor: "#E0E0E0",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  modalButton: {
    marginBottom: 20,
    backgroundColor: "orange",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  text:{
    color:"red"
  }
});
