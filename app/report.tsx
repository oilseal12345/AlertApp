import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, Dimensions, TouchableHighlight, Button, Alert } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'
    
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

export default function report({ navigation, route }) {    
  const [report, setReport] = useState({
    name:'',
    latitude:0,
    longitude:0,
    type:""
  });
  const [text, setText] = useState(null);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const {latitude, longitude} = route.params;  
  console.log(latitude, longitude)

  const handleSubmit = () => {
    console.log('submit')
    setReport({
      name:name,
      latitude:latitude,
      longitude:longitude,
      type:type
    })
    axios.post('https://us-central1-project-base-74c62.cloudfunctions.net/api/report/add', report)
      .then(function (response) {
          navigation.navigate('Home')
          console.log(response)
      })
      .catch(function (error) {
          console.log(error)
      }) 
}
  
  return (
    <View style={styles.container}>
    <ScrollView>
      <View style={styles.box}>        
        <View style={styles.inBox}>
        <Text style={styles.head}>Report</Text>
        <View style={styles.coverText}>
            <Text style={styles.textInside}>Name </Text>
          </View>
          <View>
              <TextInput
              style={styles.textInput2}
              value={name}
              onChangeText={name=>setName({name})}
              />
          </View>
          <View style={styles.coverText}>
            <Text style={styles.textInside}>Type </Text>
          </View>
          <View>
              <TextInput
              style={styles.textInput2}
              value={type}
              onChangeText={type=>setType({type})}
              />
          </View>
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
              style={styles.textInput3}
              value={text}
              onChangeText={text=>setText({text})}
              />
          </View> 
          <View style={{width:'50%', marginLeft:'25%'}}>
          <Button
          color='#00CC00'
          title="Submit"
          onPress={handleSubmit}/>
          </View>        
        </View>
      </View>
      </ScrollView>
    </View>
    
  );

}


const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    backgroundColor: '#a4a4a4'
  },
  box:{
    backgroundColor:'#fff',
    width:'99%',
    height:'90%',
    marginTop:windowHeight*0.08
  },
  coverText:{
    flexDirection:'row',
    marginBottom: windowHeight*0.02
  },
  inBox:{
    margin:'10%'
  },
  textInside:{
    fontSize:windowWidth*0.05
  },
  textInput:{
    height: 40,
    fontSize:windowWidth*0.040,
    backgroundColor:'#C0C0C0',
    padding:10
  },
  textInput2:{
    height: 40,
    fontSize:windowWidth*0.035,
    borderWidth:1,
    borderColor:'#000',
    padding:10
  },
  textInput3:{
    height: windowHeight*0.10,
    width:windowWidth*0.78,
    fontSize:windowWidth*0.035,
    borderColor:'#000',
    borderStyle:'solid',
    padding:10,
    borderWidth:1
  },
  head:{
    fontSize:windowWidth*0.12,
    marginBottom:windowHeight*0.02
  }

});