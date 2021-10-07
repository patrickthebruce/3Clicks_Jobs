import React, { useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, 
} from '@react-navigation/drawer';


import HomeScreen from '../screens/HomeScreen';
import MyJobsScreen from '../screens/MyjobsScreen';

import '../back4app/config'
import Parse from "parse/react-native.js"

import  {AuthenticatedUserContext}  from './AuthenticatedUserProvider';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();





export default function HomeStack() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Sign Out" onPress={() => doUserLogOut()} />
      </DrawerContentScrollView>
    );
  }
  
  function MyDrawer() {
    return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        
        <Drawer.Screen name="Home - Open Jobs" component={HomeScreen}  />
        <Drawer.Screen name="My Jobs" component={MyJobsScreen} />
  
      </Drawer.Navigator>
    );
  }
  
  
  const doUserLogOut = async function () {
    
    return await Parse.User.logOut()
      .then(async () => {
        // To verify that current user is now empty, currentAsync can be used
        const currentUser = await Parse.User.currentAsync();
        setUser(currentUser);
        if (currentUser === null) {
          alert('Success! You have logged out');
        }
        // Navigation dispatch calls a navigation action, and popToTop will take
        // the user back to the very first screen of the stack
        
        return true;
      })
      .catch((error) => {
        alert('Error!')
        alert(error.message);
        return false;
      });
  };

  return (
      <MyDrawer />  
  );
}