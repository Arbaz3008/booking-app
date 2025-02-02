import { 
    StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, 
    TouchableOpacity, TextInput, Alert 
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigation = useNavigation();

    const Register = async () => {
        if (!email || !password || !phone) {
            Alert.alert("Invalid Details", "Please enter all the credentials");
            return;
        }

        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            const uid = user.uid;

            // Store user data in Firestore
            await setDoc(doc(db, "users", uid), {
                email: user.email,
                phone: phone
            });

            // Save user data locally
            await AsyncStorage.setItem("user", JSON.stringify({ email, phone, uid }));

            Alert.alert("Success", "Account created successfully!");
            navigation.navigate("Login"); // Change to your login/home screen

        } catch (error) {
            Alert.alert("Registration Failed", error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView>
                <View style={styles.header}>
                    <Text style={styles.title}>Register</Text>
                    <Text style={styles.subtitle}>Create an Account</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput 
                        value={email} 
                        onChangeText={setEmail} 
                        placeholder="Enter your email"
                        placeholderTextColor={"gray"}
                        style={styles.input}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput 
                        value={password} 
                        onChangeText={setPassword} 
                        secureTextEntry={true}
                        placeholder="Enter your password"
                        placeholderTextColor={"gray"}
                        style={styles.input}
                    />

                    <Text style={styles.label}>Phone</Text>
                    <TextInput 
                        value={phone} 
                        onChangeText={setPhone} 
                        placeholder="Enter your phone number"
                        placeholderTextColor={"gray"}
                        style={styles.input}
                    />
                </View>

                {/* Register Button */}
                <TouchableOpacity onPress={Register} style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                {/* Already have an account */}
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.signInTextContainer}>
                    <Text style={styles.signInText}>Already have an account? Sign In</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RegisterScreen;

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
    signInTextContainer: {
        marginTop: 20,
    },
    signInText: {
        textAlign: "center",
        color: "gray",
        fontSize: 17,
    },
});
