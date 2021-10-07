import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator  screenOptions={{
      headerShown: false
    }}>

      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Registration' component={RegistrationScreen} />
      <Stack.Screen name='Signup' component={ForgotPasswordScreen} />

    </Stack.Navigator>
  );
}