import React, { useEffect, useState, useContext } from 'react'
import {ActivityIndicator, TouchableOpacity, View, Platform, Alert, Linking, Image} from 'react-native'
// import getFirebase  from '../firebase/config'
import { SafeAreaView } from 'react-native';
import { Button, Card, Divider, Paragraph, Subheading, Caption, Headline, Text } from 'react-native-paper';
import moment from 'moment';
import { FlatGrid } from 'react-native-super-grid'
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import styles from './styles'
import '../back4app/config'


// import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from "parse/react-native.js"
import { color } from 'react-native-reanimated';
import { style } from 'dom-helpers';

import { initializeParse, useParseQuery } from  '@parse/react-native';
import { staticMapUrl } from 'static-google-map'

initializeParse(
  'https://3clicks.b4a.io/',
  '8QWbdgHWm7wKnjXXLATKSkFi2KZMoGJ6hlYgILKV',
  'iT8e2buob7NQTaQAr1SIy5XC6w15Ez0z1ZCqNIES'
);

let formatPhoneNumber = (str) => {
  //Filter only numbers from the input
  let cleaned = ('' + str).replace(/\D/g, '');
  
  //Check if the input is of correct length
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  };

  return null
};



export default function MyJobsScreen() {
 
const [jobs, setJobs] = useState([])


const { user } = useContext(AuthenticatedUserContext);


const parseQuery = new Parse.Query('jobs');
// alert(Parse.User.current().get('email'))
Parse.User.current().id!='uqIWUZaotn'? parseQuery.contains('userName', Parse.User.current().get('fullname')):console.log('not admin')
parseQuery.addAscending('installDate')
 const {
  isLive,
  isLoading,
  isSyncing,
  results,
  count,
  error,
  reload
 } = useParseQuery(parseQuery);

if (isLoading) {
  return <ActivityIndicator/>;
}

const renderStaticMap  = (point ) => {
  const url = staticMapUrl({
    key: 'AIzaSyAunVXgYpVQal-3k5X5S5Ed4t4JlYHErsE',
    scale: 1,
    size: '500x500',
    format: 'png',
    maptype: 'roadmap',
    zoom: 12,
    markers: [
    
      {
        location:  { lat: point.latitude, lng: point.longitude },
        color: 'green',
        size: 'small'
      }
    ],
})
return url
}




  const renderCard  = ({ item }) => {
    const point = item.get('location')
    // alert(point.latitude)
    const map =  Platform.select({ ios: 'maps:', android: 'geo:' });
    const locationURL= map+point.latitude+","+point.longitude
    const installDate = item.get('installDate')
    

    const onMapLinkPress = () => {
      if (Platform.OS === 'android') {
        Linking.openURL(`geo:0,0?q=${point.latitude},${point.longitude}`)
  .catch(err => console.error('An error occurred', err));
      } else {
        Linking.openURL(`http://maps.apple.com/?ll=${point.latitude},${point.longitude}&q=${item.get('name')}`)
  .catch(err => console.error('An error occurred', err));
      }
    }
    
  return(
  <View>
      <Card >
      <Card.Content>
          <Card.Title title={item.get('name')} subtitle={item.get('address') }/>
            <Paragraph style={styles.footerLink}>Install Date: {moment.utc(installDate).format("MM/DD/YY")}  </Paragraph>
            <Caption style={styles.footerLink} >Color Chosen: {item.get('colorChoice')}</Caption> 
            <Text style={styles.footerLink} onPress={() => Linking.openURL(`sms:${item.get('phone')}`)}>Phone: {formatPhoneNumber(item.get('phone'))} </Text>
            {item.get('assignedUser')!=null ? <Caption>Assigned User: {item.get('userName')}</Caption>  : <Text style={styles.greenText}>OPEN JOB</Text>}
            <Text>{"\n"}</Text>
          </Card.Content>
          <TouchableOpacity onPress={onMapLinkPress}>
          <Card.Cover  
          
          source={{uri:renderStaticMap(item.get('location'))}} 
          />
          </TouchableOpacity>
          <Card.Content>Notes: {item.get('notes')}</Card.Content>
          <Card.Content>
          {item.get('image')!=null ? 
          <><Text>Diagram: </Text><Image 
          // sytle={{ width: 100, height: 100 }}
          source={ { uri: item.get('image').url() } } />
          {console.log(item.get('image').url())}</>
        :
        <Text>No Diagram</Text>}
        
            </Card.Content>
          <TouchableOpacity>
           
            <Card.Actions>

            <Button onPress={onMapLinkPress}> <Text style={{color:"#788eec"}}>Directions </Text></Button>

            </Card.Actions>
          </TouchableOpacity>
        </Card>
    </View>
)
}
    return (
       <SafeAreaView style={{backgroundColor:'#efefef'}}  >
          <View> 
          <FlatGrid
          contentContainerStyle={styles.flatGrid}
            maxDimension={1100}
            itemDimension={250}
            data={results}
            extraData={results}
            renderItem= {renderCard}            
          />
          </View>
        </SafeAreaView>
      )
}