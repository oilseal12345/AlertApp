
import { Audio } from 'expo-av';

export async function handlePlaySound(event) {
   const soundObject = new Audio.Sound()
   let source = null
   try{
     switch(event){
       case 'front':
          source = require('./assets/sounds/1.mp3')
          break
       case 'left':
          source = require('./assets/sounds/2.mp3')
          break
       case 'right':
          source = require('./assets/sounds/3.mp3')
          break
       case 'pass':
          source = require('./assets/sounds/4.mp3')
          break
     }
      await soundObject.loadAsync(source)
      return soundObject
            .playAsync()
            .then(async playbackStatus => {
              setTimeout(() => {
                soundObject.unloadAsync()
              }, playbackStatus.playableDurationMillis)
            })
            .catch(error => {
              console.log(error)
            })
       
   }catch (error) {
     console.log(error)
   }
 };