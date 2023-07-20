import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import LoginPage from 'cop4331-bigproject-mobile/login/pages.js'; // Ensure this path is correct
import RegisterPage from 'cop4331-bigproject-mobile/register/pages.js'; // Adjust the path as needed
import ForgotPasswordPage from './login/forgot-password/pages';
import backgroundImage from 'cop4331-bigproject-mobile/assets/THE-ONE-WE-NEED-YIPPPEEEEEopac3.jpg';

const Stack = createStackNavigator();

const CustomScreen = ({ children }) => (
  <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
    {children}
  </ImageBackground>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {props => <CustomScreen><LoginPage {...props} /></CustomScreen>}
        </Stack.Screen>
        <Stack.Screen name="Register">
          {props => <CustomScreen><RegisterPage {...props} /></CustomScreen>}
        </Stack.Screen>
        <Stack.Screen name="ForgotPassword">
          {props => <CustomScreen><ForgotPasswordPage {...props} /></CustomScreen>}
        </Stack.Screen>
        {/* Add other screens as needed */}
        {/* <Stack.Screen name="OtherScreen" component={OtherScreen} /> */} 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // cover or contain its upto you view look
    justifyContent: 'center',
  },
});