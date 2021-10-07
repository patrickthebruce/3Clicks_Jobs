import React, { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Text,
  TextInput,
} from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import '../back4app/config'
import Parse from "parse/react-native.js"


export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  
  // const firebase = getFirebase()
  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };


  const doUserRegistration = async function () {
      // Note that these values come from state variables that we've declared before
      const usernameValue = email;
      const passwordValue = password;
      const emailValue = email;
      const phoneValue = phone;
      const fullNameValue = fullName;

      const user = new Parse.User();
      user.set('username', usernameValue);
      user.set('email', emailValue );
      user.set('phone', phoneValue);
      user.set('password', passwordValue );
      user.set('fullname', fullNameValue );

      // alert(JSON.stringify( user))

    
      return await user.signUp()
        .then((createdUser) => {
         
          Alert.alert(
            'Success!',
            `User ${createdUser.getUsername()} was successfully created!`,
          );
          return true;
        })
        .catch((error) => {
          // signUp can fail if any parameter is blank or failed an uniqueness check on the server
          Alert.alert('Error!', error.message);
          return false;
        });
    };
 

    const onRegisterPress = () => {
      
      if (password !== confirmPassword) {
        alert("Passwords don't match.");
        return;
        } 
        doUserRegistration()
    }
  
  return (
    <View style={styles.authContainer}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require('../../assets/icon.png')}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="black"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="black"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
         <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="black"
          onChangeText={(text) => setPhone(text)}
          value={phone}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="black"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="black"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{" "}
            <Text style={styles.footerLink} onPress={onFooterLinkPress}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
