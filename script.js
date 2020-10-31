import createDom from './createDom.js'

let dataBase = {
  DeckNames: {
    Literature: [{
        question: 'gggg',
        answer: 'answer1'
      },
      {
        question: 'question2',
        answer: 'answer2'
      }
    ]
  },
};

let addQuestionsToDeck = document.getElementById("addQuestionsToDeck");

let question = document.getElementById("questionFieldAddQuestion");
let answer = document.getElementById("answerFieldAddQuestion");

let timer = null;
let counter = {};
let key = null;

let listOfDecks = document.getElementById("listOfDecks");
let questAnswerTrainOverv = document.getElementById("questAnswerTrainOverv");
let pageNameforNewDeck = document.getElementById("pageNameforNewDeck");
createDom(dataBase.DeckNames);

/*when createDeck Button is clicked the current page display gets put to none*/

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
};

function handleOutsideClick(e) {
  if (addQuestionsToDeck.contains(e.target)) {
    alert("Clicked in Box");
  } else {
    alert("Clicked outside Box");
  }
}



let statsInNavBar = document.getElementById("stats");

document.getElementById("decks").onclick = function () {
  document.getElementById("studyStat").style.display = "none";
  document.getElementById("createEditDeleteDeckPage").style.display = "block";
  this.style.color = "rgb(200, 168, 115)";
  statsInNavBar.style.color = "black";
  questAnswerTrainOverv.style.display = "none";
  pageNameforNewDeck.style.display = "none";
  //createDom(dataBase.DeckNames);

  /*
    childShuffleButton.parentNode.removeChild(childShuffleButton);
    childShowOrHideButton.parentNode.removeChild(childShowOrHideButton);
    .parentNode.removeChild(this);
  */
};

/*
        let cardsStudied = 0;

        document.getElementById("shuffleButton").onclick = function () {
          let nameOfDeckInTrainOverv = document.getElementById("nameOfDeckInTrainOverv").innerHTML;
         
          cardsStudied ++ ;
          dataBase.DeckNames[document.getElementById("nameOfDeckInTrainOverv").innerHTML].cardsStudied = cardsStudied;
        
          function questionNumber(random) {
            let questionField = document.getElementById("questionField");
            questionField.value = `${dataBase.DeckNames[nameOfDeckInTrainOverv][random].question}`;
            key = random;
          };
        
          let randomInScope = random();
        
          function answerNumber(random) {
            let answerField = document.getElementById("answerField");
        
            answerField.value = `${dataBase.DeckNames[nameOfDeckInTrainOverv][random].answer}`;
            key = random;
          }
        
          function random() {
            return Math.floor(Math.random() * dataBase.DeckNames[nameOfDeckInTrainOverv].length);
          }
          questionNumber(randomInScope);
          answerNumber(randomInScope);
        }

*/

let login = document.getElementById("login");
let playFlashCards = document.getElementById("playFlashcards");
let addQuestions = document.getElementById("addQuestions");
let answerTemplate = document.getElementById("answerTemplate");

let createEditDeleteDeckPage = document.getElementById(
  "createEditDeleteDeckPage"
);

/*when the button showORHideButton is clicked the answer to the corresponding question is displayed*/
/*
document.getElementById("showOrHideButton").onclick = function () {
  let answerBox = document.getElementById("answers");
  this.style.cursor = "pointer";
  //changes pointer when moved over shorOrHide Button
  //answerField.value = dataBase.DeckNames[nameOfdeck.innerText][key].answer;

  if (answerBox.style.display === "none") {
    answerBox.style.display = "flex";
    answerBox.style.justifyContent = "center";
    answerBox.style.flexDirection = "column";
  } else {
    answerBox.style.display = "none";
  }
};
*/

/*<-------*/

/*when stats in the nav bar is clicked all the other menu view displays are set to none --->*/

statsInNavBar.onclick = function () {
  document.getElementById("createEditDeleteDeckPage").style.display = "none";
  this.style.color = "rgb(200, 168, 115)";
  document.getElementById("studyStat").style.display = "flex";

  document.getElementById("decks").style.color = "black";
  questAnswerTrainOverv.style.display = "none";

  addQuestionsToDeck.style.display = "none";
  console.log(counter);

  const counterSecStudied = Object.values(counter);

  let secStudied = document.getElementById("secondsStudied");
  secStudied.innerHTML = counterSecStudied.reduce((acc, cur) => acc + cur);

  //dataBase.DeckNames[document.getElementById("nameOfDeckInTrainOverv").innerHTML].cardsStudied
};
/*<-------------*/

/*when add in the nav bar is clicked all the other menu view displays are set to none --->*/

/*<-----*/

//counter still needs to be implemented

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

  //document.getElementById('createYourFirstDeckPrompt').style.display = "block";
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

/*<---*/

/*<------*/

//dataBase.nameOfDeckInTrainOverv.innerHTM

/*here every deck that is created by clicking the ok button is also added to the filter-add section -->*/

// let itemOfAddList = document.createElement("div");
// itemOfAddList.style.marginTop = "3px";
// itemOfAddList.innerHTML = newDeckText.innerText;
// document
//   .querySelector("#filtListofDecksInAdd ul")
//   .appendChild(itemOfAddList);

/*<---*/

/*clickAndTrainDecksOverview get filtered in the add section based on the input name of the deck -->*/

// document.getElementById("filterDecks").onkeyup = function (e) {
//   let enterKey = 13; //Key Code for Enter Key
//   if (e.which === enterKey) {
//     /when enter is pressed Add Question to deck section is activated*/;

//     chooseDeckToAdd.style.display = "none";
//     addQuestionsToDeck.style.display = "flex";
//     nameOfDeck.innerHTML = document.querySelector("ul >div").innerHTML;
//     //name of the choosen deck appears in the chooseDeclToAdd overview
//     this.value = "";
//     //input field gets set back to zero
//   }
// };

/*<----*/

/*when clicking the savQuestion button it is checked whether there are already questions linked to the name of the deck in the database, if so, they get pushed to it, otherwise a new property gets initialsed.  ---->*/

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

document.querySelector("#closeAddWindowButton").onclick = function () {
  addQuestionsToDeck.style.display = "none";
  question.value = "";
  answer.value = "";

  window.removeEventListener("click", handleOutsideClick);
};

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

/*
document.getElementById("add").onclick = function () {
  //createEditDeleteDeckPage.style.display = "none";
  document.getElementById("chooseDeckToAdd").style.display = "flex";
  document.getElementById("chooseDeckToAdd").style.flexDirection = "column";

  //clickAndTrainDecksOverview.style.display = "none";
  this.style.color = "blue";
  statsInNavBar.style.color = "black";
  document.getElementById("Decks").style.color = "black";
  //questAnswerTrainOverv.style.display = "none";
  //pageNameforNewDeck.style.display = "none";
  createDom(dataBase.DeckNames,'short')
};

*/

/*
document.querySelector("#filterDecks").oninput = function () {
  let filtered = {}
  for(let key in dataBase.DeckNames){
    if(key.includes(this.value)){
      filtered[key] = dataBase.DeckNames[key]
    }
  }
  createDom(filtered,'short');
};

*/
