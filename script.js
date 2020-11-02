import createDom from './createDom.js';
import {dataBase} from './dataBase.js';
import stats from './stats.js';
import createNewDeck from './createNewDeck.js'



let listOfDecks = document.getElementById("listOfDecks");

createDom(dataBase.DeckNames);


let arrowDown = document.querySelector(".arrowDown");
document.getElementById("createDeckButton").onclick = function () {
  createNewDeck()
 
  arrowDown.style.display = "none";
  
 
};


/*
function handleOutsideClick(e) {
  if (addQuestionsToDeck.contains(e.target)) {
    alert("Clicked in Box");
  } else {
    alert("Clicked outside Box");
  }
}
*/


let statsInNavBar = document.getElementById("stats");

    statsInNavBar.onclick = function () {
      stats(dataBase.deckNames);


    }

      /*
function handleOutsideClick(e) {
  if (addQuestionsToDeck.contains(e.target)) {
    alert("Clicked in Box");
  } else {
    alert("Clicked outside Box");
  }
}
*/





/*
document.querySelector("#closeAddWindowButton").onclick = function () {
  addQuestionsToDeck.style.display = "none";
  question.value = "";
  answer.value = "";

  window.removeEventListener("click", handleOutsideClick);
};
*/

//dynamical property

// let obj = {
// 	name: 'John',
// 	'age from birth': 35,
// }

// obj.name
// let key = 'name'
// obj[key]//John

