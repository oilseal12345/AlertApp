import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, Dimensions, TouchableHighlight, Button } from 'react-native';
    
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

export default function setting({ navigation, route }) {    
  const [isNotification, setIsNotification] = useState(false);
  const [isPlay, setIsPlay] = useState(route.params.isPlay);
  const [radius, setRadius] = useState(route.params.radius);
  const [pressed300, setPressed300] = useState(false);
  const [pressed500, setPressed500] = useState(false); 
  const [pressed800, setPressed800] = useState(false); 
  const [pressed1000, setPressed1000] = useState(false); 
  const toggleSwitch = () => setIsNotification(previousState => !previousState);
  const toggleSwitch2 = () => setIsPlay(previousState => !previousState);
  console.log(isPlay)
  // const radiusParams = route.params.radius
  
  useEffect(()=>{
    if(radius == 300){
      console.log('Hi1')
      setPressed300(true)
      setPressed500(false)
      setPressed800(false)
      setPressed1000(false)
    }else if(radius == 500){
      console.log('Hi2')
      setPressed300(false)
      setPressed500(true)
      setPressed800(false)
      setPressed1000(false)
    }else if(radius == 800){
      console.log('Hi3')
      setPressed300(false)
      setPressed500(false)
      setPressed800(true)
      setPressed1000(false)
    }else if(radius == 1000){
      console.log('Hi4')
      setPressed300(false)
      setPressed500(false)
      setPressed800(false)
      setPressed1000(true)
    }
    
  },[radius])
  
  
  return (
    <View style={styles.container}>
      <View style={styles.box}>        
        <View style={styles.inBox}>
        <Text style={styles.head}>Setting</Text>
          <View style={styles.coverText}>
            <Text style={styles.textInside}>Notification </Text>
            <Switch
                style={styles.switch}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isNotification ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isNotification}
            />
          </View>
          <View style={styles.coverText}>
            <Text style={styles.textInside}>Sound </Text>
            <Switch
                style={styles.switch}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isPlay ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch2}
                value={isPlay}
            />
          </View>
          <View style={styles.coverText}>
            <Text style={styles.textInside}>Length</Text>
          </View>
          <View style={styles.coverText}>
            <TouchableHighlight            
            style={[styles.bLength, pressed300 ? styles.bPLength : {}]}
            onPress={()=>setRadius(300)}
            ><Text style={styles.textLength}>300</Text>
            </TouchableHighlight>
            <TouchableHighlight
            style={[styles.bLength, pressed500 ? styles.bPLength : {}]}
            onPress={()=>setRadius(500)}
            ><Text style={styles.textLength}>500</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.coverText}>
            <TouchableHighlight
            style={[styles.bLength, pressed800 ? styles.bPLength : {}]}
            onPress={()=>setRadius(800)}
            ><Text style={styles.textLength}>800</Text>
            </TouchableHighlight>
            <TouchableHighlight
            style={[styles.bLength, pressed1000 ? styles.bPLength : {}]}
            onPress={()=>setRadius(1000)}
            ><Text style={styles.textLength}>1000</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{width:'50%', marginLeft:'25%'}}>
          <Button
          color='#00CC00'
          title="Submit"
        onPress={()=>{
          navigation.navigate('Home', {
            radius:radius,
            isPlay:isPlay
          })
        }}
        /></View>
      </View>
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#a4a4a4',
    alignItems: 'center'
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.3 }],
    position:'absolute',
    right:0
  },
  logo:{    
    width:'45%',
    height:'25%',
    resizeMode: 'stretch',
    marginTop:'20%'
  },
  box:{
    backgroundColor:'#fff',
    width:'99%',
    height:'80%',
    marginTop:windowHeight*0.08
  },
  coverText:{
    flexDirection:'row',
    marginBottom: windowHeight*0.03
  },
  inBox:{
    margin:'10%'
  },
  textInside:{
    fontSize:windowWidth*0.07
  },
  bLength:{
    flex:1,
    backgroundColor:'#3498DB',
    height: windowHeight*0.06,
    marginRight:'3%'
  },
  bPLength:{
    flex:1,
    backgroundColor:'#F1C40F',
    height: windowHeight*0.06,
    marginRight:'3%'
  },
  textLength:{
    fontSize:windowWidth*0.04,
    margin:windowWidth*0.028,
    textAlign:'center',
    textAlignVertical:'center',
    color:'#fff'
  },
  head:{
    fontSize:windowWidth*0.12,
    marginBottom:windowHeight*0.02
  }

});