import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import  {AuthenticatedUserContext}  from './AuthenticatedUserProvider';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import '../back4app/config'
import Parse from "parse/react-native.js"





export default function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      backgroundColor: 'rgb(255, 45, 85)',
    },
  };

  useEffect(() => {
    // Since the async method Parse.User.currentAsync is needed to
    // retrieve the current user data, you need to declare an async
    // function here and call it afterwards
    async function getCurrentUser() {
      const currentUser = await Parse.User.currentAsync();
      if(currentUser){
      setUser(currentUser);
      }
    }
    getCurrentUser();
  }, [user]);

  return (
    <NavigationContainer  >
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}