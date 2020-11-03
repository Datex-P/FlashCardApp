import {dataBase} from './dataBase.js'

export let timer = null;
let counter = {};

export const startTimer =(item,index)=> {
  timer = setInterval(() => {

    if (!counter[item]) {
      counter[item] = 0;
    }

    /*
  seconds studied in total
    const counterSecStudied = Object.values(counter);

    let secStudied = document.getElementById("secondsStudied");
    secStudied.innerHTML = counterSecStudied.reduce((acc, cur) => acc + cur);
  */


    let secondsDeckStudied = (counter[item] += 1);
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
