import {dataBase} from './dataBase.js'

export let timer = null;
let counter = {};

export const startTimer =(item,index)=> {
  timer = setInterval(() => {

    if (!counter[item]) {
      counter[item] = 0;
    }

    //let secondsDeckStudied = (counter[item] += 1);
    dataBase.counter = counter;

    console.log(dataBase);
  }, 1000);
  if(dataBase.DeckNames[item][index].lastOpen){
    let now = new Date().getTime()
    let difference = now - dataBase.DeckNames[item][index].lastOpen
    dataBase.DeckNames[item][index].lastOpen = now
    dataBase.DeckNames[item][index].timeLastOpen = difference
  }else{
    dataBase.DeckNames[item][index].lastOpen = new Date().getTime()
  }
  
}
