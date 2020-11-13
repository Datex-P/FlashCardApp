import createDom from './createDom.js';
import {dataBase} from './dataBase.js';
import stats from './stats.js';
import createNewDeck from './createNewDeck.js'
import {statsIcon, menuIcon, logoutIcon } from './svgs.js';


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

let logoutIconContainer = createElement('div', logoutIcon, {}, 'flexColumnAlignCenter');



  

document.getElementById('logout').append(logoutIconContainer);
//logoutIconContainer.innerHTML = logoutIcon;


let menuIconContainer = document.createElement('div');
    menuIconContainer.innerHTML = menuIcon

document.getElementById('menu').append(menuIconContainer);
//menuIconContainer.innerHTML = menuIcon;

createDom(dataBase.DeckNames);


document.getElementById("createDeckButton").onclick = function () {
  createNewDeck()
 
  document.querySelector(".arrowDown").style.display = "none";
  
};

let menuBox = document.createElement('div');
   // menuBox.style.display = 'flex';
    menuBox.style.backgroundColor = 'yellow';
    menuBox.style.height = '100px';
    menuBox.style.width = '100px';
    menuBox.style.display = 'none'
    menuBox.style.zIndex = '2';



document.getElementById("menu").onclick = function () {
        //menuBox.style.display = 'block'

        this.append(menuBox)
        menuBox.style.display = 'block';
      //stats(dataBase.deckNames);
    }


//dynamical property

// let obj = {
// 	name: 'John',
// 	'age from birth': 35,
// }

// obj.name
// let key = 'name'
// obj[key]//John

