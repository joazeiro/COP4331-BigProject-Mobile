import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export default function App(){

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  return(
    <View style = {styles.container}>
      <Image style={styles.image} source = {require("./assets/geobook-logo.png")} /> 
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
      <TouchableOpacity>
        <Text style = {styles.forgot_button}>Forgot Password?</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style = {styles.login_button}>
        <Text style = {styles.loginText}>LOGIN</Text> 
      </TouchableOpacity> 
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
  forgot_button: {
    height: 30,
    marginBottom: 30,
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