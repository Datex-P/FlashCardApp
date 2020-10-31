import {dataBase} from './dataBase.js'
import createDom from './createDom.js'

let timer = null;
let counter = {};

export default timer = setInterval((item) => {

  if (
    !counter[item]
  ) {
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
