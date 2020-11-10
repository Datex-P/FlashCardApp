import createDom from './createDom.js';
import {dataBase} from './dataBase.js';
import stats from './stats.js';
import createNewDeck from './createNewDeck.js'
import {statsIcon, logoutIcon } from './svgs.js';

let logoutIconContainer = document.createElement('div');
    logoutIconContainer.className = 'flexColumnAlignCenter';
  
let containerStatsIcon = document.createElement('div');

document.getElementById('logout').append(logoutIconContainer);
logoutIconContainer.innerHTML = logoutIcon;


document.getElementById('stats').append(containerStatsIcon);
containerStatsIcon.innerHTML = statsIcon;

createDom(dataBase.DeckNames);


document.getElementById("createDeckButton").onclick = function () {
  createNewDeck()
 
  document.querySelector(".arrowDown").style.display = "none";
  
};


document.getElementById("stats").onclick = function () {
      stats(dataBase.deckNames);
    }


//dynamical property

// let obj = {
// 	name: 'John',
// 	'age from birth': 35,
// }

// obj.name
// let key = 'name'
// obj[key]//John

