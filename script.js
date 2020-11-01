import createDom from './createDom.js';
import {dataBase} from './dataBase.js';
import stats from './stats.js';




let listOfDecks = document.getElementById("listOfDecks");
let questAnswerTrainOverv = document.getElementById("questAnswerTrainOverv");
let pageNameforNewDeck = document.getElementById("pageNameforNewDeck");
createDom(dataBase.DeckNames);


let arrowDown = document.querySelector(".arrowDown");
document.getElementById("createDeckButton").onclick = function () {
  pageNameforNewDeck.style.display = "flex";
  pageNameforNewDeck.style.flexDirection = "column";
  document.getElementById("createYourFirstDeckPrompt").style.display = "none";

  listOfDecks.style.display = "none";
  this.style.display = "none";
  arrowDown.style.display = "none";
};

/*when Ok button is pressed the name that is put into the input field  
after create deck is clickedis made a new data set in the database if it does 
not already exist*/

document.getElementById("okButton").onclick = function () {
  let inputNameOfNewDeck = document.getElementById("inputNameOfNewDeck");

  if (inputNameOfNewDeck.value === "") {
    alert("Input needed");
  } else {
    dataBase.DeckNames[inputNameOfNewDeck.value] = [];
    createDom(dataBase.DeckNames);
    inputNameOfNewDeck.value = "";
  }
  console.log(dataBase)
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
      stats()
    }


document.getElementById("decks").onclick = function () {
  document.getElementById("studyStat").style.display = "none";
  document.getElementById("createEditDeleteDeckPage").style.display = "block";
  this.style.color = "rgb(200, 168, 115)";
  statsInNavBar.style.color = "black";
  questAnswerTrainOverv.style.display = "none";
  pageNameforNewDeck.style.display = "none";
  //createDom(dataBase.DeckNames);


};



/*when stats in the nav bar is clicked all the other menu view displays are set to none --->*/
/*
statsInNavBar.onclick = function () {
  document.getElementById("createEditDeleteDeckPage").style.display = "none";
  this.style.color = "rgb(200, 168, 115)";
  document.getElementById("studyStat").style.display = "flex";

  document.getElementById("decks").style.color = "black";
  questAnswerTrainOverv.style.display = "none";

  addQuestionsToDeck.style.display = "none";
  console.log(counter);
*/


/*when the redCross in the game menu is pressed you get back to the main menu ----->*/
/*
document.getElementById("redCross").onclick = function () {
  questAnswerTrainOverv.style.display = "none";
  createEditDeleteDeckPage.style.display = "block";

  clearInterval(timer);
  //	console.log('your current total is:',counter)
};
*/
/*<-----*/

/*when you click cancel in the  Name for new deck section in 
Decks-->Click and train*/

document.getElementById("cancelButton").onclick = function () {
  listOfDecks.style.display = "block";
  pageNameforNewDeck.style.display = "none";
  inputNameOfNewDeck.value = "";

  document.getElementById("createDeckButton").style.display = "block";
  document.getElementById("createDeckButtonContainer").style.display = "flex";
  document.getElementById("createDeckButtonContainer").style.justifyContent =
    "center";
  document.getElementById("navLine").style.display = "flex";

  if (!Object.keys(dataBase.DeckNames).length) {
    arrowDown.style.display = "block";
    createYourFirstDeckPrompt.style.display = "block";
  }
};



//dataBase.nameOfDeckInTrainOverv.innerHTM

/*here every deck that is created by clicking the ok button is also added to the filter-add section -->*/

// let itemOfAddList = document.createElement("div");
// itemOfAddList.style.marginTop = "3px";
// itemOfAddList.innerHTML = newDeckText.innerText;
// document
//   .querySelector("#filtListofDecksInAdd ul")
//   .appendChild(itemOfAddList);

/*<---*/


/*when clicking the savQuestion button it is checked whether there are already questions linked to the name of the deck in the database, if so, they get pushed to it, otherwise a new property gets initialsed.  ---->*/
/*
document.getElementById("saveQuestButton").onclick = function () {
  //let name = nameOfDeck.innerText;
  let name = document.getElementById("nameOfDeckInAddQuestion").innerText;

  // if (!dataBase.DeckNames[name]) {
  //   dataBase.DeckNames[name] = [];
  // }

  //here the name of the deck is made a new property of dataBase
  dataBase.DeckNames[name].push({
    question: question.value,
    answer: answer.value,
  });

  question.value = "";
  answer.value = "";
};

*/
/*
document.querySelector("#closeAddWindowButton").onclick = function () {
  addQuestionsToDeck.style.display = "none";
  question.value = "";
  answer.value = "";

  window.removeEventListener("click", handleOutsideClick);
};
*/
/*<----*/

/*when clicking shuffle button the name of the deck that is displayed behind 'Questions of Deck' is fetched.

afterwards a random question of the database is fetched and displayed in the question field, accordingly the corresponding answer is shown in the answer field*/

//dynamical property

// let obj = {
// 	name: 'John',
// 	'age from birth': 35,
// }

// obj.name
// let key = 'name'
// obj[key]//John

