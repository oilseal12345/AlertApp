import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
// import getLocationAsync from './TestPermissions'
// import axios from 'axios';
// import {handlePlaySound} from "./sound";
// import AppNavigator from './app/app.navigator'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack'
import Index from './app/index'
import Setting from './app/setting'


type RootStackParamList = {
  Home: undefined;
  Setting : undefined
}
const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Index}/>
        <Stack.Screen name="Setting" component={Setting}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

  // const [location, setLocation] = useState(null);
  // const [name, setName] = useState(null);
  // const [change, setChange] = useState(1);
  // const [count, setCount] = useState(0);
  // const [data, setData ] = useState(null);
  // const [warning, setWarning] = useState([]);
  // const [status, setStatus] = useState(0);

  // return (
  //   <RoostStack.Navigator initialRouteName="Home">
  //       <RoostStack.Screen name="Home" component={Index} />
  //   </RoostStack.Navigator>
  // );


// const styles = StyleSheet.create({
//   container: {
//     flex:1,
//     backgroundColor: '#fff',
//     alignItems: 'center'
//   },
//   logo:{    
//     width:'45%',
//     height:'25%',
//     resizeMode: 'stretch',
//     marginTop:'20%'
//   },
//   box:{
//     borderStyle:'solid',
//     borderWidth:1,
//     borderColor:'#000',
//     width:'98%',
//     height:'50%',
//     marginTop:10
//   },
//   coverText:{
//     flexDirection:'row',
//     marginBottom:'15%'
//   },
//   inBox:{
//     margin:'10%'
//   },
//   textInside:{
//     fontSize:25
//   }

// });
