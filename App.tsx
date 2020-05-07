import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack'
import Index from './app/index'
import Setting from './app/setting'
import Report from './app/report'

const Stack = createStackNavigator()

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
          name="Home" 
          component={Index}
          initialParams={{ radius:300, isPlay:true }}
          />
          <Stack.Screen 
          name="Setting" 
          component={Setting}          
          />
          <Stack.Screen
            name="Report"
            component={Report}
            initialParams={{latitude:0, longitude:0}}
          />
        </Stack.Navigator>
      </NavigationContainer>
  )
}
