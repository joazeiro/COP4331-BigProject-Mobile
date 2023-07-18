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
      <Image style={styles.image} source={require("cop4331-bigproject-mobile/assets/geobook-logo.png")} />
      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#116A7B"
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#116A7B"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity onPress={login}>
        <Text style={styles.login_button}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.linkText}>Forgot your password?</Text>
      </TouchableOpacity>

      <Text>Don't have an account yet?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Sign Up Here!</Text>
      </TouchableOpacity>

      <Text>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... your existing styles ...

  linkText: {
    color: '#116A7B', 
    textDecorationLine: 'underline',
  },
});
