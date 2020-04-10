
import * as Speech from 'expo-speech';

export async function handlePlaySound(event, name) {
    let ThingToSay = '';
   try{
     switch(event){
       case 'front':
           ThingToSay = 'ระวัง ข้างหน้ามีอุบัติเหตุ' + name + 'เกิดขึ้นบ่อย';
           Speech.speak(ThingToSay);
          break;
       case 'left':
           ThingToSay = 'ระวัง ด้านซ้ายมีอุบัติเหตุ' + name + 'เกิดขึ้นบ่อย';
           Speech.speak(ThingToSay);
          break;
       case 'right':
           ThingToSay = 'ระวัง ข้างหน้ามีอุบัติเหตุ' + name + 'เกิดขึ้นบ่อย';
           Speech.speak(ThingToSay);
          break;
       case 'pass':
           ThingToSay = 'คุณได้ออกจากเขตอันตรายแล้ว';
           Speech.speak(ThingToSay);
          break;
     }

   }catch (error) {
     console.log(error)
   }
 }