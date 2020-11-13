import createDom from './createDom.js';
import {dataBase} from './dataBase.js';
import stats from './stats.js';
import settings from './settings.js';
import createNewDeck from './createNewDeck.js'
import {statsIcon, menuIcon, logoutIcon, settingsIcon } from './svgs.js';


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

let logoutIc = createElement('div', logoutIcon, {}, 'flexColumnAlignCenter');

let theWordLogout = createElement('div', 'Logout', {});

let logoutIconContainer = createElement('div', '', {display: 'flex', 
width: '100%', justifyContent: 'space-between'});

//document.getElementById('logout').append(logoutIconContainer);


let menuIconContainer = createElement('div', menuIcon, {});

document.getElementById('menu').append(menuIconContainer);


createDom(dataBase.DeckNames);



document.getElementById("createDeckButton").onclick = function () {
  createNewDeck()
 
  document.querySelector(".arrowDown").style.display = "none";
  
};

let menuBox = createElement('div', '', {
  backgroundColor: '#86A873',
  height: '140px',
  width: '80px',
  display: 'none',
  position: 'absolute',
  zIndex: '2',
  border: '1px black solid'
})



let statsIconContainer = createElement('div', '', {
  display: 'flex',
  width: '100%', 
  justifyContent: 'space-between',
  marginTop: '10px',
  marginBottom: '10px',
  border: '1px black solid'
});

let statsIconBox = createElement('div', statsIcon, {

});
let theWordStats = createElement('div', 'stats', {});

let settingsIconContainer = createElement('div', '', {
  display: 'flex', 
  width: '100%', 
  justifyContent: 'space-between',
  border: '1px black solid'
});

let settingsIconBox = createElement('div', settingsIcon, {});
let theWordSettings = createElement('div', 'Settings', {
  fontSize: '13px',
  fontWeight: 'bold'
});






let opened = false;
document.getElementById("menu").onclick = function () {
        opened = !opened;

        this.append(menuBox)

      //  menuBox.style.display = opened ? 'display: flex, justifyContent: center': 'none';

        menuBox.style.display = opened ? 'block': 'none';
        menuBox.append(statsIconContainer);
        statsIconContainer.append(statsIconBox);
        statsIconContainer.append(theWordStats);
        menuBox.append(settingsIconContainer);
        settingsIconContainer.append(settingsIconBox);
        settingsIconContainer.append(theWordSettings);
        menuBox.append(logoutIconContainer)
        logoutIconContainer.append(logoutIc)
        logoutIconContainer.append(theWordLogout)
    

        statsIconContainer.onclick = function () {  
      stats(dataBase.deckNames);
    }

      settingsIconContainer.onclick = function () {
       // settings(dataBase.deckNames);
       settings()
      }


  }

//dynamical property

// let obj = {
// 	name: 'John',
// 	'age from birth': 35,
// }

// obj.name
// let key = 'name'
// obj[key]//John

