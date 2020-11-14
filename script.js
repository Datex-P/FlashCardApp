import createDom from './createDom.js';
import { dataBase } from './dataBase.js';
import stats from './stats.js';
import settings from './settings.js';
import createNewDeck from './createNewDeck.js'





createDom(dataBase.DeckNames);

let opened = false;
function handleOutsideClick(e) {
  if ( !(document.querySelector('.menuBox').contains(e.target)) ) {
    //alert("Clicked outside Box");
    document.querySelector('.menuBox').style.display = 'none';
    opened = false;
    console.log('window handler still alive')
    window.onclick = ''
  }
  
}


document.querySelector('.menu').onclick = function () {

  if (!opened) {
    document.querySelector('.menuBox').style.display = 'flex';
    document.querySelector('.menuBox').style.justifyContent = 'space-around';
    opened = true;
    setTimeout(()=>{
      window.onclick = handleOutsideClick;
    },10)
  } else {
    document.querySelector('.menuBox').style.display = 'none';
    opened = false;
    window.onclick = ''
  }

};


let boxesInMenu = document.querySelectorAll('.menuBoxesStyling');
boxesInMenu.forEach(button=>{
  button.onclick = function(){
    alert(button.innerText)
  }
})
// for (let i=0; i<boxesInMenu.length; i++) {
//   boxesInMenu[i].onmouseover = function (e) {
//     e.target.style.backgroundColor = 'blue';
//   }
// }











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

