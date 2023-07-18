import React from 'react';
import FormTitle from 'cop4331-bigproject-mobile/components/FormTitle.js'; // Make sure these paths are correct
import RegisterForm from 'cop4331-bigproject-mobile/components/RegisterForm.js';

export default function RegisterPage({ navigation }) {
  return (
    <>
      <FormTitle />
      <RegisterForm navigation={navigation} /> 
    </>
  )
}