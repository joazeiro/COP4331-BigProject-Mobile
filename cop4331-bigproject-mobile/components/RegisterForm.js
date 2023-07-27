import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const RegisterForm = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // New state for success message

  const handleRegister = async () => {
    if (confirmPassword !== password) {
      console.log("Passwords Do Not Match");
      return;
    }

    try {
      const response = await fetch('https://geobooks-e802c07bfa62.herokuapp.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
          first_name: firstName,
          last_name: lastName,
          email: email
        })
      });

      if (response.ok) {
        // Instead of navigating, set success message and clear inputs
        setSuccessMessage('Success. Check your email to verify.');
        setUsername('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setConfirmPassword('');
      } else if (response.status === 401) {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log('An error occurred', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.whiteBox}>
        
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>First Name</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="First Name"
              placeholderTextColor="#116A7B66"
              onChangeText={(text) => setFirstName(text)}
              value={firstName}
            />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Last Name</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Last Name"
              placeholderTextColor="#116A7B66"
              onChangeText={(text) => setLastName(text)}
              value={lastName}
            />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Username"
              placeholderTextColor="#116A7B66"
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#116A7B66"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#116A7B66"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password"
              placeholderTextColor="#116A7B66"
              secureTextEntry={true}
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>

        {successMessage && <Text>{successMessage}</Text>} 

        <View style={styles.centerText}>
          <Text style={styles.accountText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Login Here!</Text>
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
    marginTop: -130,
  },
  title: {
    fontSize: 24,
    color: '#116A7B',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  whiteBox: {
    backgroundColor: '#ECE5C7',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center', 
    width: '84%',
    marginTop: 40,
    maxWidth: 400,
    borderColor: '#116A7B',
    borderWidth: 3, 
  },
  fieldContainer: {
    width: '90%',
    alignItems: 'flex-start', 
  },
  linkText: {
    marginTop: 3,
    marginBottom: 6,
    color: '#116A7B',
    textDecorationLine: 'underline',
  },
  inputView: {
    width: "100%", 
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
    textAlign: 'left', 
  },
  label: {
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
    marginTop: 8,
    marginBottom: 5,
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

export default RegisterForm;