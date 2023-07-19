import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar, Image } from 'react-native';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmail = async () => {
    try {
      const response = await fetch('https://geobooks-e802c07bfa62.herokuapp.com/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage(data.message);
      } else if (response.status === 401) {
        // An error has occured
        setErrorMessage(data.error);
      } else {
        console.log('An Error Occurred');
      }
    } catch (error) {
      console.log('An Error Occurred', error);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image style={styles.image} source={require("cop4331-bigproject-mobile/assets/geobook-logo.png")} />

      <View style={styles.whiteBox}>
        <Text style={styles.title}>Forgot Password</Text>

        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your email"
            placeholderTextColor="#116A7B66"
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleEmail}>
          <Text style={styles.loginButtonText}>Send Email</Text>
        </TouchableOpacity>

        <View style={styles.linkText}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Go Back to Login</Text>
          </TouchableOpacity>
        </View>

        <Text>{errorMessage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -200,
  },
  image: {
    marginTop: 25,
    marginBottom: 25,
    width: 300,
    height: 81,
  },
  whiteBox: {
    backgroundColor: '#ECE5C7',
    borderRadius: 20,
    padding: 7,
    alignItems: 'center',
    width: '90%', 
    maxWidth: 400,
    borderColor: '#116A7B',
    borderWidth: 3,
  },
  title: {
    fontSize: 20,
    color: '#116A7B',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  linkText: {
    marginTop: 3,
    marginBottom: 6,
    color: '#116A7B',
    textDecorationLine: 'underline',
  },
  inputView: {
    width: "90%", 
    backgroundColor: "#fff",
    borderRadius: 11,
    height: 40,
    marginBottom: 4,
    justifyContent: "center",
    padding: 20,
  },
  TextInput: {
    height: 50,
    flex: 0,
    padding: 10,
    marginLeft: -14,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginTop: 5,
    marginBottom: 5,
    color: '#116A7B',
    fontSize: 14,
  },
  loginButton: {
    width: "90%",
    backgroundColor: '#116A7B',
    borderRadius: 11,
    height: 40,
    marginTop: 7,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  loginButtonText: {
    color: '#ffffff'
  },
});
