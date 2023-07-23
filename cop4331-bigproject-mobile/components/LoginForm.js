import 'react-native-gesture-handler';
import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginForm({ navigation }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem('token', value)
    } catch (e) {
      console.error('Failed to save the data to the storage', e);
    }
  }

  const login = async () => {
    try {
      const response = await fetch('https://geobooks-e802c07bfa62.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password })
      });

      if(response.ok) {
        const { token } = await response.json();
        console.log('Got token: ', token);
        await storeToken(token);
        
        // navigate to 'Home' when login is successful
        navigation.navigate('Home');
      } else {
        const { message } = await response.json();
        setErrorMessage(message);
      }
    } catch (error) {
      console.error('You have an error in your code or there are Network issues.', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image style={styles.image} source={require("cop4331-bigproject-mobile/assets/geobook-logo.png")} />

      <View style={styles.whiteBox}>
        <Text style={styles.label}>Username</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter username"
            placeholderTextColor="#116A7B66"
            onChangeText={(username) => setUsername(username)}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter password"
            placeholderTextColor="#116A7B66"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <View style={styles.linkText}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.linkText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={styles.loginButtonText}>Sign in</Text>
        </TouchableOpacity>

        <View style={styles.centerText}>
          <Text style={styles.accountText}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Sign Up Here!</Text>
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
    position: 'relative',
    left: -104,
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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  loginButtonText: {
    color: '#ffffff'
  },
  centerText: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountText: {
    color: '#116A7B',
  }
});
