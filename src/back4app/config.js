import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native.js';

//Before using the SDK...
Parse.setAsyncStorage(AsyncStorage);
//Paste below the Back4App Application ID AND the JavaScript KEY
Parse.initialize('8QWbdgHWm7wKnjXXLATKSkFi2KZMoGJ6hlYgILKV', 'iT8e2buob7NQTaQAr1SIy5XC6w15Ez0z1ZCqNIES');
//Point to Back4App Parse API address 
Parse.serverURL = 'https://parseapi.back4app.com/'