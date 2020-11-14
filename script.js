import createDom from './createDom.js';
import {dataBase} from './dataBase.js';
import stats from './stats.js';
import settings from './settings.js';
import createNewDeck from './createNewDeck.js'





createDom(dataBase.DeckNames);


let opened = false;
document.querySelector('.menu').onclick = function () {
  
   if (!opened)
   {
  document.querySelector('.menuBox').style.display = 'flex';
  document.querySelector('.menuBox').style.justifyContent = 'space-around';
  //opened = true;
   }
  //  if (opened) {
  //    document.querySelector('.menuBox').style.display = 'none';
  //    opened = false;
  //  }
    setTimeout(function () {
    window.onclick = function handleOutsideClick(e) {
      if (document.querySelector('.menuBox').contains(e.target)) {
        //alert("Clicked in Box");
      } else {
        //alert("Clicked outside Box");
      document.querySelector('.menuBox').style.display = 'none';
     opened = false;
      }
    } 
  }, 10);
};

let boxesInMenu = document.getElementsByClassName('menuBoxesStyling');

  for (let i=0; i<boxesInMenu.length; i++) {
    boxesInMenu[i].onmouseover = function (e) {
      e.target.backgroundColor = 'blue';
    }
  }











document.getElementById("createDeckButton").onclick = function () {
  createNewDeck()
 
  document.querySelector(".arrowDown").style.display = "none";
  
};


//dynamical property

// let obj = {
// 	name: 'John',
// 	'age from birth': 35,
// }

// obj.name
// let key = 'name'
// obj[key]//John

