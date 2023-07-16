import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Login(){

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[errorMessage, setErrorMessage] = useState("");

  const login = async () => {
      try
      {
          const response = await fetch('https://geobooks-e802c07bfa62.herokuapp.com/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ username: email, password })
          });

          if(response.ok)
          {
              const { token } = await response.json();
              console.log('Got token: ', token);
              // TODO: you should now store the token and use it to make authenticated requests to your API
          }
          else
          {
              const { message } = await response.json();
              setErrorMessage(message);
          }
      }
      catch (error)
      {
          console.error('You have an error in your code or there are Network issues.', error);
          setErrorMessage(error.message);
      }
  };

  return(
    <View style = {styles.container}>
      <Image style={styles.image} source = {require("cop4331-bigproject-mobile/assets/geobook-logo.png")} />
      <StatusBar style = "auto" />
      <View style = {styles.inputView}>
        <TextInput
          style = {styles.TextInput}
          placeholder = "Email"
          placeholderTextColor = "#116A7B"
          onChangeText = {(email) => setEmail(email)}
        />
      </View>
      <View style = {styles.inputView}>
        <TextInput
          style = {styles.TextInput}
          placeholder = "Password"
          placeholderTextColor = "#116A7B"
          secureTextEntry = {true}
          onChangeText = {(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity onPress={login}>
        <Text style = {styles.login_button}>LOGIN</Text>
      </TouchableOpacity>
      <Text>{errorMessage}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#116A7B",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    width: "70%",
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
  login_button: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#116A7B",
  },
});
