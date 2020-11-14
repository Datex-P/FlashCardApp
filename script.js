import createDom from './createDom.js';
import {dataBase} from './dataBase.js';
import stats from './stats.js';
import settings from './settings.js';
import createNewDeck from './createNewDeck.js'
import {statsIcon, menuIcon, logoutIcon, settingsIcon, newCards} from './svgs.js';


function createElement(tag = 'div', inner = '', style = {}, className = null, id = null) {

  let element = document.createElement(tag);

  element.innerHTML = inner;
  if (id) {
    element.id = id;
  }
  if (className) {
    element.className = className;
  }
  for (let prop in style) {
    element.style[prop] = style[prop]
  }
  return element
}




let menuIconContainer = createElement('div', menuIcon, {});

document.querySelector('.menu').append(menuIconContainer);


createDom(dataBase.DeckNames);

document.querySelector('.menu').onclick = function () {
  document.querySelector('.menuBox').style.display = 'flex';
  document.querySelector('.menuBox').style.justifyContent = 'space-around';


}


/*
document.getElementById("createDeckButton").onclick = function () {
  createNewDeck()
 
  document.querySelector(".arrowDown").style.display = "none";
  
};*/


//dynamical property

// let obj = {
// 	name: 'John',
// 	'age from birth': 35,
// }

// obj.name
// let key = 'name'
// obj[key]//John

