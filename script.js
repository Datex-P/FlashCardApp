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

let logoutIc = createElement('div', logoutIcon, {}, 'flexColumnAlignCenter');

let theWordLogout = createElement('div', 'Logout', {
  display: 'flex',
  alignItems: 'center'
});

let logoutIconContainer = createElement('div', '', {display: 'flex', 
width: '100%', justifyContent: 'space-around', marginTop: '15px', border: '1px black solid'});



let menuIconContainer = createElement('div', menuIcon, {});

document.getElementById('menu').append(menuIconContainer);


createDom(dataBase.DeckNames);


/*
document.getElementById("createDeckButton").onclick = function () {
  createNewDeck()
 
  document.querySelector(".arrowDown").style.display = "none";
  
};*/



let menuBox = createElement('div', '', {
  backgroundColor: 'grey',
  color: 'white',
  borderRadius: '5px',
  height: '411px',
  width: '130px',
  display: 'none',
  position: 'absolute',
  zIndex: '2',
  border: '1px black solid',
  top: '0px',
  left: '0px'
})



let statsIconContainer = createElement('div', '', {
  display: 'flex',
  width: '100%', 
  justifyContent: 'space-around',
  marginTop: '20px',
  marginBottom: '10px',
  border: '1px black solid'
});

let statsIconBox = createElement('div', statsIcon, {
  border: '1px black solid'

});
let theWordStats = createElement('div', 'Stats', {
  border: '1px black solid',
  display: 'flex',
  alignItems: 'center'
});

let settingsIconContainer = createElement('div', '', {
  display: 'flex', 
  width: '100%', 
  justifyContent: 'space-around',
  border: '1px black solid',
  marginTop: '15px'
});

let settingsIconBox = createElement('div', settingsIcon, {});
let theWordSettings = createElement('div', 'Settings', {
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold'
});

let cardIconContainer = createElement('div', '', {
  display: 'flex', 
  width: '100%', 
  justifyContent: 'space-around',
  border: '1px black solid',
  marginTop: '15px'
}, '', );

//'createDeckButton'


let newCardBox = createElement('div', newCards, {});
let theWordnewDeck = createElement('div', 'New Deck', {
  //fontSize: '13px',
  //fontWeight: 'bold'
});






document.getElementById("menu").onclick = function () {
      

        this.append(menuBox)

      menuBox.style.display = 'flex';
      menuBox.style.flexDirection = 'column';
 
        menuBox.append(cardIconContainer);
        cardIconContainer.append(newCardBox);
        cardIconContainer.append(theWordnewDeck);
        newCardBox.append(theWordnewDeck);
        menuBox.append(statsIconContainer);
        statsIconContainer.append(statsIconBox);
        statsIconContainer.append(theWordStats);
        menuBox.append(settingsIconContainer);
        settingsIconContainer.append(settingsIconBox);
        settingsIconContainer.append(theWordSettings);
        menuBox.append(logoutIconContainer);
        logoutIconContainer.append(logoutIc);
        logoutIconContainer.append(theWordLogout);


        setTimeout(function () {
          window.onclick = function handleOutsideClick(e) {
            if (menuBox.contains(e.target)) {
              //alert("Clicked in Box");
            } else {
              //alert("Clicked outside Box");
             menuBox.style.display = 'none';
             menuBox.remove(statsIconContainer);
             menuBox.remove(settingsIconContainer);
             menuBox.remove(logoutIconContainer);
            }
          };
        }, 10);


    

        statsIconContainer.onclick = function () {  
      stats(dataBase.deckNames);
    }

      settingsIconContainer.onclick = function () {
       // settings(dataBase.deckNames);
       settings()
      }


      let listOfDecks =  cument.getElementById('listOfDecks')

     listOfDecks.removeAttribute('id');
     listOfDecks.setAttribute("width: 60%", 
      "height:250px",
      "left: 100px",
      "position: relative",
      "overflow: auto" )

  }


cardIconContainer.onclick = function () {
  createNewDeck();
  menuBox.style.display = 'none';
  menuBox.remove(statsIconContainer);
  menuBox.remove(settingsIconContainer);
  menuBox.remove(logoutIconContainer);
 
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

