import React, { useContext, useState, useRef } from "react";
import {
  Alert,
  Image,
  TouchableOpacity,
  View,
  Linking,
  Button,
  SafeAreaView
} from "react-native";
import {
  Text,
  TextInput,
} from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from './styles';
import '../back4app/config'
import Parse from "parse/react-native.js"
import { initializeParse } from  '@parse/react-native';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';


initializeParse(
  'https://3clicks.b4a.io/',
  '8QWbdgHWm7wKnjXXLATKSkFi2KZMoGJ6hlYgILKV',
  'iT8e2buob7NQTaQAr1SIy5XC6w15Ez0z1ZCqNIES'
);

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const passwordRef = useRef();
  
  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };
  const onResetLinkPress = () => {
    navigation.navigate("ForgotPassword");
  };

  const onLoginPress = () => {
    doUserLogIn()
   
   
  };


  const doUserPasswordReset = async function () {
    // Note that this value come from state variables linked to your text input
    const usernameValue = username;
    return await Parse.User.requestPasswordReset(usernameValue)
      .then(() => {
        // logIn returns the corresponding ParseUser object
        alert(
          'Success! Please check your email to proceed with password reset',
        );
        return true;
      })
      .catch((error) => {
        // Error can be caused by lack of Internet connection
        alert(error.message)
        return false;
      });
  };

  const doUserLogIn = async function () {
    const usernameValue = username;
    const passwordValue = password;
  
    return await Parse.User.logIn(usernameValue, passwordValue)
      .then(async (loggedInUser) => {
        // logIn returns the corresponding ParseUser object
        // alert('Success!')
          // alert(`User ${loggedInUser.get('username')} has successfully signed in!`,);

        // To verify that this is in fact the current user, currentAsync can be used
        const currentUser = await Parse.User.currentAsync();
        setUser(currentUser)        
        return true;
      })
      .catch((error) => {
        // Error can be caused by wrong parameters or lack of Internet connection
        alert('Error!')
        alert( error.message);
        return false;
      });
  };
  return (
  
       <KeyboardAwareScrollView
    style={{ flex: 1, width: "100%", paddingTop:150, backgroundColor:'#ffffff' }}
    
    >
      
        <Image
          style={styles.logo}
          source={require('../../assets/icon.png')}
        />
        <TextInput
          style={styles.input}
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current.focus();
          }}
          blurOnSubmit={false}
          placeholder="E-mail"
          placeholderTextColor="black"
          onChangeText={(text) => setUsername(text)}
          value={username}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          ref={passwordRef}
          placeholderTextColor="black"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onSubmitEditing={() => onLoginPress()}
        />
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text
              style={styles.footerLink}
              onPress={() => Linking.openURL("tel:918-346-6000")}
            >
              Call us
            </Text>
          </Text>
          <Text style={styles.footerText}>
            Forgot password?{" "}
            <Text onPress={doUserPasswordReset} style={styles.footerLink}>
              Reset
            </Text>
          </Text>
        </View>
        
        </KeyboardAwareScrollView>
   
  );
}
