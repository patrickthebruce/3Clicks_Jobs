import React, { useState, useContext } from 'react'
import {ActivityIndicator, TouchableOpacity, View, Platform, Alert, } from 'react-native'
import { SafeAreaView } from 'react-native';
import { Button, Card, Divider, Paragraph, Subheading, Caption, Headline, Text, Portal } from 'react-native-paper';
import moment, { ISO_8601 } from 'moment';
import { FlatGrid } from 'react-native-super-grid'
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import styles from './styles'
import {Picker} from '@react-native-picker/picker'
import Parse from "parse/react-native.js"
import { initializeParse,useParseQuery } from  '@parse/react-native';
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

export default function HomeScreen() {
 

const [jobs, setJobs] = useState([])


const { user } = useContext(AuthenticatedUserContext);

const [visible, setVisible] = useState(false)

const showDialog = () => setVisible(true);

const hideDialog = () => setVisible(false);



const parseQuery = new Parse.Query('jobs');

parseQuery.equalTo('user', null)
parseQuery.addAscending('installDate');
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

const onClaimPress = async function (id){
  // alert(id)
 
 let jobsclass = Parse.Object.extend('jobs')
 let query = new Parse.Query(jobsclass)
 let job = await query.get(id)
 job.set('assignedUser', Parse.User.current())
 job.set('user', Parse.User.current().get('email'))
 job.set('userName', Parse.User.current().get('fullname'))
 job.save()
 reload()
}


const onConfirmPress  = (id ) => {



  if (confirm("Are you sure you want to claim this job? This action cannot be reversed without calling 3Clicks Corporate")) {
    onClaimPress(id)
  } 

  
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
    const installDate = item.get('installDate')
    const location = item.get('location')
  return(
  <View>  
      <Card >
      <Card.Content>
          <Card.Title title={item.get('name')} subtitle={item.get('address') }/>
            <Paragraph style={styles.footerLink} >Install Date: {moment.utc(installDate).format("MM/DD/YY")} </Paragraph>
            {item.get('user')!=null ? <Caption>Assigned User: {item.get('user') }</Caption>  : <Text style={styles.greenText}>OPEN JOB</Text>}
            <Text>{"\n"}</Text>
          </Card.Content>
          <Card.Cover source={{uri:renderStaticMap(item.get('location'))}} />
       
          <TouchableOpacity>
            <Card.Actions >

            <Button  onPress={()=>onConfirmPress(item.id)}>  <Text style={{color:"#788eec", fontWeight: "bold" }}>Claim Job  -  ${item.get('installPay')} Payout </Text></Button>

            </Card.Actions>
          </TouchableOpacity>
        </Card>
        
    </View>
    )
    }



    return (
       <SafeAreaView style={{backgroundColor:'#efefef'}} >
          <View> 
          {results.length <=0 ?(<View style={styles.container} > <Headline style={styles.textContainer}>No Open Jobs</Headline> </View>):
          <FlatGrid
          contentContainerStyle={styles.flatGrid}
            maxDimension={1100}
            itemDimension={250}
            data={results}
            extraData={results}
            renderItem= {renderCard}            
          />}
          </View>
        </SafeAreaView>
      )
}