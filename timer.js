import {dataBase} from './dataBase.js'

export let timer = null;

export const startTimer =(item,index)=> {
  if (!dataBase.studyTime) {
    dataBase.studyTime={};
  }
  if (!dataBase.studyTime[item]) {
    dataBase.studyTime[item] = 0
  }
  timer = setInterval(() => {

   

    dataBase.studyTime[item]++

    console.log(dataBase);
  }, 1000);

  
  if (dataBase.DeckNames[item][index].lastOpen) {
    let now = new Date().getTime();
    let difference = now - dataBase.DeckNames[item][index].lastOpen;
    dataBase.DeckNames[item][index].lastOpen = now;
    dataBase.DeckNames[item][index].timeLastOpen = difference;
  } else {
    dataBase.DeckNames[item][index].lastOpen = (new Date().getTime()).toString()
  }
  
}
