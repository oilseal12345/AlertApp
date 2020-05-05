import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, Dimensions, TouchableHighlight, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
    
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

export default function report({ navigation, route }) {    
  const [text, setText] = useState(null);
  const {latitude, longitude} = route.params;  
  console.log(latitude, longitude)
  return (
    <View style={styles.container}>
      <View style={styles.box}>        
        <View style={styles.inBox}>
        <Text style={styles.head}>Report</Text>
          <View style={styles.coverText}>
            <Text style={styles.textInside}>Current location </Text>
          </View>
          <View>
              <TextInput
              style={styles.textInput}
              value={`${latitude}, ${longitude}`}
              editable={false}
              />
          </View>
          <View style={styles.coverText}>
            <Text style={styles.textInside}>Messenger </Text>
          </View>
          <View style={styles.coverText}>
              <TextInput
              multiline={true}
              style={styles.textInput2}
              value={text}
              onChangeText={text=>setText({text})}
              />
          </View>         
        </View>
        <Button
        title="Submit"
        onPress={()=>Alert.alert('Success')}/>
      </View>
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
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
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'#000',
    width:'98%',
    height:'90%',
    marginTop:10
  },
  coverText:{
    flexDirection:'row',
    marginBottom: windowHeight*0.02
  },
  inBox:{
    margin:'10%'
  },
  textInside:{
    fontSize:windowWidth*0.07
  },
  textInput:{
    height: 40,
    fontSize:windowWidth*0.045,
    backgroundColor:'#C0C0C0',
    padding:10
  },
  textInput2:{
    height: windowHeight*0.15,
    width:windowWidth*0.8,
    fontSize:windowWidth*0.038,
    borderColor:'#000',
    borderStyle:'solid',
    padding:10,
    borderWidth:1
  },
  head:{
    fontSize:windowWidth*0.12,
    marginBottom:windowHeight*0.05
  }

});