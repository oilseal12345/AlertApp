import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import getLocationAsync from '../TestPermissions'
import axios from 'axios';
import {handlePlaySound} from "../sound";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function App({ navigation, route }) {
  const [location, setLocation] = useState(null);
  const [name, setName] = useState(null);
  const [change, setChange] = useState(1);
  const [count, setCount] = useState(0);
  const [data, setData ] = useState(null);
  const [warning, setWarning] = useState([]);
  const [status, setStatus] = useState(0);
  const { radius } = route.params;

  useEffect(() => { 
    async function changeLocation(){
      //ดึง location
      const location = await getLocationAsync();
      //set ค่า location พร้อมที่จะ post ให้ backend
      setLocation({
        location:{
          latitude:location.coords.latitude,
          longitude:location.coords.longitude
        },
        radius:300
      })
    }
    //เรียกฟังชั่น เพื่อ get ค่า location user
    changeLocation();
    //ทุกๆ 6 วิ ทำการ post ข้อมูลให้ฝั่งของ backend
    if(count%2 == 0){      
      setChange(change+1)
    }
    // console.log('count', count);
    const id = setInterval(() => {
      setCount(count + 1);      
    }, 3000);    
    return () => clearInterval(id);

  }, [count]); 
  
  useEffect(() => {
    async function fetchData() {
      const result = await axios.post(`https://us-central1-project-base-74c62.cloudfunctions.net/api/location/near2`, location);
      setData(result.data);
      setWarning(data["warning"]);
      if(data.warning == false && status == 1){
        handlePlaySound('pass', 'ปลอดภัยแล้ว');
        setStatus(0);
        console.log('safe')
      }else{
        if (status == 0){
          handlePlaySound(warning[0].direction, warning[0].name);
          setStatus(1);
          console.log('found')
        }
      }
      console.log(status);
      // console.log(data, warning)
      // console.log('This is warning', warning[0].name);
      // console.log('This is data', data.warning[0].name);
    }
    if(location){
      // console.log(location);
      fetchData()
    }
  }, [change]);
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.setting} onPress={() => navigation.navigate('Setting')}>
        <Image source={require('../assets/img/setting.png')} 
        style={styles.set_img}
        />
      </TouchableOpacity>      
      <Image source={require('../assets/img/marker.png')}
        style={styles.logo}
      />
      <View style={styles.box}>
        <View style={styles.inBox}>
          <View style={styles.coverText}>
            <Text style={styles.textInside}>Type: </Text>
            <Text style={styles.textInside}>Heyyy</Text>
          </View>
          <View style={styles.coverText}>
            <Text style={styles.textInside}>Lengh: </Text>
            <Text style={styles.textInside}>aaaaaa</Text>
          </View>
          <View style={styles.coverText}>
            <Text style={styles.textInside}>Details: </Text>
            <Text style={styles.textInside}>aaaaaa</Text>
          </View>
        </View>
      </View>
      <Button
        title="Report"
        onPress={()=>{
          navigation.navigate('Report',{
            latitude:location.location.latitude,
            longitude:location.location.longitude
          })
        }}
      />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  setting:{
    position:'absolute',
    top:5,
    right: 5,
    width:'10%',
    height:'10%'
  },
  set_img:{
    width:'100%',
    height:'55%',
    
  },
  logo:{    
    width:'45%',
    height:'25%',
    resizeMode: 'stretch',
    marginTop:'20%'
  },
  box:{
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'#000',
    width:'98%',
    height:'50%',
    marginTop:10
  },
  coverText:{
    flexDirection:'row',
    marginBottom:'15%'
  },
  inBox:{
    margin:'10%'
  },
  textInside:{
    fontSize:25
  }

});
