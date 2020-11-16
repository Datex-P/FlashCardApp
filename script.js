import createDom from './createDom.js';
import {
  dataBase
} from './dataBase.js';
import stats from './stats.js';
import settings from './settings.js';
import createNewDeck from './createNewDeck.js'





createDom(dataBase.DeckNames);

let opened = false;

function handleOutsideClick(e) {
  if (!(document.querySelector('.menuBox').contains(e.target))) {
    //alert("Clicked outside Box");
    document.querySelector('.menuBox').style.display = 'none';
    opened = false;
    console.log('window handler still alive')
    window.onclick = ''
  }

}



document.querySelector('.menu').onclick = function () {


 document.querySelectorAll('.menuContainer>div')[0].classList.add('transPlus');
 document.querySelectorAll('.menuContainer>div')[2].classList.add('transMinus');
// document.querySelectorAll('.menuContainer>div').removeProperty('margin-bottom');



  document.getElementById('menuIcon2').style.display = 'none';

  if (!opened) {
    document.querySelector('.menuBox').style.display = 'flex';
    document.querySelector('.menuBox').style.justifyContent = 'space-around';
    opened = true;
    setTimeout(() => {
      window.onclick = handleOutsideClick;
    }, 10)





  } else {
    document.querySelector('.menuBox').style.display = 'none';
    opened = false;
    window.onclick = '';
    document.querySelectorAll('.menuContainer>div')[0].classList.remove('transPlus');
    document.querySelectorAll('.menuContainer>div')[2].classList.remove('transMinus');
    document.getElementById('menuIcon2').style.display = 'block';
  }

};


let boxesInMenu = document.querySelectorAll('.menuBoxesStyling');
boxesInMenu.forEach(button => {
  button.onclick = function () {
    if (button.innerText === 'Stats') {
      stats();
      document.querySelector('.menuBox').style.display = 'none';
    }
    if (button.innerText === 'Settings') {
      settings();
      document.querySelector('.menuBox').style.display = 'none';
    }
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
