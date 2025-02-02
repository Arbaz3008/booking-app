import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { auth } from "../firebase";
  import { signInWithEmailAndPassword } from "firebase/auth";
  
  const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
  
    const login = () => {
      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }
  
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User credential:", userCredential);
          const user = userCredential.user;
          console.log("User details:", user);
          navigation.replace("Main");

        })
        .catch((error) => {
          alert(error.message);
        });
    };
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          navigation.replace("Main");
        }
      });
  
      return unsubscribe;
    }, []);
  
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView>
          <View style={styles.header}>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.subtitle}>Sign In to Your Account</Text>
          </View>
  
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="gray"
              style={styles.input}
            />
  
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="gray"
              style={styles.input}
            />
          </View>
  
          {/* Login Button */}
          <TouchableOpacity onPress={login} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
  
          {/* Sign Up Navigation */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={styles.signUpContainer}
          >
            <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      padding: 10,
      alignItems: "center",
    },
    header: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 100,
    },
    title: {
      color: "orange",
      fontSize: 17,
      fontWeight: "700",
    },
    subtitle: {
      marginTop: 15,
      fontSize: 18,
      fontWeight: "500",
    },
    inputContainer: {
      marginTop: 50,
    },
    label: {
      fontSize: 18,
      fontWeight: "600",
      color: "gray",
    },
    input: {
      fontSize: 18,
      borderBottomColor: "gray",
      borderBottomWidth: 1,
      marginVertical: 10,
      width: 300,
      color: "black",
    },
    button: {
      width: 200,
      backgroundColor: "orange",
      padding: 15,
      borderRadius: 7,
      marginTop: 50,
      alignSelf: "center",
    },
    buttonText: {
      textAlign: "center",
      color: "white",
      fontSize: 17,
      fontWeight: "bold",
    },
    signUpContainer: {
      marginTop: 20,
    },
    signUpText: {
      textAlign: "center",
      color: "gray",
      fontSize: 17,
    },
  });
  