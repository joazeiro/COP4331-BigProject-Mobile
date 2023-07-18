import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Button } from 'react-native';


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
      <Text style={styles.header}>Forgot Password</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Your Email"
          placeholderTextColor="#116A7B"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEmail}>
        <Text style={styles.buttonText}>Send Email</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Go Back to Login</Text>
      </TouchableOpacity>

      <Text>{errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  inputView: {
    backgroundColor: "#EEE",
    borderRadius: 20,
    width: "100%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  button: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#116A7B",
  },
  buttonText: {
    color: '#FFF'
  },
  linkText: {
    color: '#116A7B',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 20
  },
});
