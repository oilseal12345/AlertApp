import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import getLocationAsync from '../TestPermissions'
import axios from 'axios';
import {handlePlaySound} from "../sound";
import {headingDistanceTo} from "geolocation-utils"

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
function App({ navigation, route }) {
  const [location, setLocation] = useState(null);
  const [name, setName] = useState('ยังไม่พบจุดอันตราย');
  const [tStatus, setTstatus] = useState('ปลอดภัย');
  const [length, setLength] = useState('');
  const [path, setPath] = useState(require('../assets/img/marker.png'))
  const [change, setChange] = useState(1);
  const [count, setCount] = useState(0);
  const [data, setData ] = useState(null);
  const [warning, setWarning] = useState([]);
  const [locationOld, setLocationOld] = useState(null)
  const [heading, setHeading] = useState(null)
  const [status, setStatus] = useState(0);
  const { radius } = route.params;
  const { isPlay } = route.params;

  useEffect(() => { 
    console.disableYellowBox = true;
    async function changeLocation(){
      //ดึง location
      const location = await getLocationAsync();
      //set ค่า location พร้อมที่จะ post ให้ backend
      if(locationOld){
        setLocation({
          location:{
            latitude:location.coords.latitude,
            longitude:location.coords.longitude
          },
          radius:radius,
          heading:heading
        })
      }else{
        setLocation({
          location:{
            latitude:location.coords.latitude,
            longitude:location.coords.longitude
          },
          radius:radius,
          heading:90
        })
      }
      
    }    
    //เรียกฟังชั่น เพื่อ get ค่า location user
    changeLocation();
    //set heading ให้กับ user
    if(locationOld){
      setHeading(headingDistanceTo({lat:location['location'].latitude, lon:location['location'].longitude}, locationOld).heading)
    }
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
      const result = await axios.post(`https://us-central1-project-base-74c62.cloudfunctions.net/api/location/near`, location);
      setData(result.data);
      if(data){
        setWarning(data["warning"]);
      }
      if(data && data.warning == false && status == 1){
        handlePlaySound('pass', 'ปลอดภัยแล้ว', isPlay);
        setStatus(0);
        setName('ยังไม่พบจุดอันตราย');
        setPath(require('../assets/img/marker.png'));
        setTstatus('ปลอดภัย');
        setLength('');
        console.log('safe')
      }else if(status == 1 && count%4 == 0){
        handlePlaySound(warning[0].direction, warning[0].name, isPlay);
      }else{
        if (data && status == 0 && data.warning !== false){          
          console.log("hi hi hi hi")
          console.log(warning)
          handlePlaySound(warning[0].direction, warning[0].name, isPlay);
          setStatus(1);
          setPath(require('../assets/img/shapes-and-symbols.png'));
          setTstatus('อันตราย');
          setName(warning[0].name);
          setLength(warning[0].distance);
          console.log('found')
        }
      }
    }
    if(location){
      // console.log(location);
      setLocationOld({
          lat:location['location'].latitude,
          lon:location['location'].longitude
      })
      fetchData()
    }
  }, [change]);
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.setting} onPress={() => navigation.navigate('Setting',{
        radius:radius,
        isPlay:isPlay
      })}>
        <Image source={require('../assets/img/setting.png')} 
        style={styles.set_img}
        />
      </TouchableOpacity>
      <View style={styles.frameLogo}>
      <Image source={path}
        style={styles.logo}
      />  
      </View> 
      
      <View style={styles.box}>
        <View style={styles.inBox}>
          <View style={styles.coverText}>
            <Text style={styles.textInside}>Type: </Text>
            <Text style={styles.textInside}>{name}</Text>
          </View>
          <View style={styles.coverText}>
            <Text style={styles.textInside}>Lengh: </Text>
            <Text style={styles.textInside}>{length}</Text>
          </View>
          <View style={styles.coverText}>
            <Text style={styles.textInside}>Status: </Text>
            <Text style={styles.textInside}>{tStatus}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.btnReport}
        onPress={()=>{
          if(location){
            navigation.navigate('Report',{
              latitude:location.location.latitude,
              longitude:location.location.longitude
            })
          }         
        }}
      ><Text>Report</Text> 
      </TouchableOpacity>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#a4a4a4',
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
    height:'55%'    
  },
  frameLogo:{
    marginTop: windowHeight*0.05,
    width:'45%',
    height:'25%',
    alignItems:'center',
    backgroundColor:'#fff',
    borderRadius:100
  },
  logo:{    
    width:'75%',
    height:'70%',    
    resizeMode: 'stretch',
    marginTop:'16%',
  },
  box:{
    backgroundColor:'#fff',
    width:'99%',
    height:'45%',
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
  },
  btnReport:{
    top:'2%',
    backgroundColor:'#fff',
    right:'-30%',
    position:'relative',
    width:'35%',
    height:'6%',
    alignItems:'center',
    borderColor:'#000',
    borderStyle:'solid',
    borderWidth:1.5,
    paddingTop:8,
    borderRadius:10
  }

});
