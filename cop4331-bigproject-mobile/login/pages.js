import React from "react";
import FormContainer from "cop4331-bigproject-mobile/components/FormContainer.js";
import LoginForm from "cop4331-bigproject-mobile/components/LoginForm.js";
import FormTitle from "cop4331-bigproject-mobile/components/FormTitle.js";

export default function LoginPage({ navigation }) { // Add navigation prop here
  return (
    <FormContainer>
      <FormTitle />
      <LoginForm navigation={navigation} />  
    </FormContainer>
  );
}
