import {dataBase} from './dataBase.js'

export let timer = null;
let counter = {};

export const startTimer =(item,index)=> {
  timer = setInterval(() => {

    if (!counter[item]) {
      counter[item] = 0;
    }

    counter[item]++
    dataBase.counter = counter;

    console.log(dataBase);
  }, 3000);
  if (dataBase.DeckNames[item][index].lastOpen) {
    let now = new Date().getTime();
    let difference = now - dataBase.DeckNames[item][index].lastOpen;
    dataBase.DeckNames[item][index].lastOpen = now;
    dataBase.DeckNames[item][index].timeLastOpen = difference;
  } else {
    dataBase.DeckNames[item][index].lastOpen = (new Date().getTime()).toString()
  }
  
}
