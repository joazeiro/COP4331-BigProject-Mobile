import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from 'cop4331-bigproject-mobile/login/pages.js'; // Ensure this path is correct for your project structure
import RegisterPage from 'cop4331-bigproject-mobile/register/pages.js'; // Adjust the path as needed
import ForgotPasswordPage from './login/forgot-password/pages';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
        {/* Add other screens as needed */}
        {/* <Stack.Screen name="OtherScreen" component={OtherScreen} /> */} 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
