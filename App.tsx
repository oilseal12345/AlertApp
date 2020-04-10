import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import getLocationAsync from './TestPermissions'
import axios from 'axios';
import {handlePlaySound} from "./sound";

export default function App() {
  const [location, setLocation] = useState(null);
  const [name, setName] = useState(null);
  const [change, setChange] = useState(1);
  const [count, setCount] = useState(0);
  const [data, setData ] = useState(null);
  const [warning, setWarning] = useState([]);
  const [status, setStatus] = useState(0);

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
      {/* <Text>{location} hey</Text> */}
      {/* <TouchableOpacity onPress={() => setChange(change+1)}>
        <Text>Click me</Text>
        </TouchableOpacity> */}
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
