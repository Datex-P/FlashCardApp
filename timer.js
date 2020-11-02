import {dataBase} from './dataBase.js'

export let timer = null;
let counter = {};

export const startTimer =(item)=> {
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
  dataBase.DeckNames[item].seconds = secondsDeckStudied;

  console.log(counter);
}, 1000);
}
