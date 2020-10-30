let dataBase = {
  DeckNames: {
    /*Literature: [{
        question: 'gggg',
        answer: 'answer1'
      },
      {
        question: 'question2',
        answer: 'answer2'
      }
    ]*/
  }
};

let edit = `<svg 
aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
>
  <path 
    fill="currentColor" 
    d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z">
  </path>
</svg>`

let save = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="save" class="svg-inline--fa fa-save fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"></path></svg>`
let addQuestionsToDeck = document.getElementById("addQuestionsToDeck");

let listOfDecks = document.getElementById("listOfDecks");
let questAnswerTrainOverv = document.getElementById("questAnswerTrainOverv");
let pageNameforNewDeck = document.getElementById("pageNameforNewDeck");
createDom(dataBase.DeckNames)

/*when createDeck Button is clicked the current page display gets put to none*/

let arrowDown = document.querySelector('.arrowDown');
document.getElementById("createDeckButton").onclick = function () {

  pageNameforNewDeck.style.display = "flex";
  pageNameforNewDeck.style.flexDirection = "column";
  document.getElementById('createYourFirstDeckPrompt').style.display = 'none'

  listOfDecks.style.display = "none";
  this.style.display = "none";
  
  arrowDown.style.display = 'none';
};

/*when Ok button is pressed the name that is put into the input field  
after create deck is clickedis made a new data set in the database if it does 
not already exist*/

document.getElementById("okButton").onclick = function () {
  let inputNameOfNewDeck =
    document.getElementById("inputNameOfNewDeck");

  if (inputNameOfNewDeck
    .value === '') {
    alert("Input needed");
  } else {

    dataBase.DeckNames[inputNameOfNewDeck
      .value] = [];
    createDom(dataBase.DeckNames);
    inputNameOfNewDeck
      .value = "";
  }
};

function createDom(obj, length = 'long') {

  listOfDecks.innerHTML = "";
  let arr = Object.keys(obj);
  arr.forEach((item,key,arr) => {
    let newDeck = document.createElement("div");
    let newDeckText = document.createElement("div");
    newDeckText.innerText = item;
    newDeck.style.marginTop = "10px";
    newDeck.style.marginLeft = "20px";

    /*this part works-->*/
    newDeckText.onclick = function () {
      pageNameforNewDeck.style.display = "flex";
      document.getElementById("chooseDeckToAdd").style.display = "none";
      document.getElementById("nameOfDeckInAddQuestion").innerHTML = this.innerText;
    };
    /*<-------*/

    let trashIcon = document.createElement("img");
    let editIcon = document.createElement("div");

    let edited = false;
    editIcon.innerHTML = edit;
    trashIcon.onclick = () => {
      newDeck.parentNode.removeChild(newDeck)
      delete dataBase.DeckNames[item]
      if (!Object.keys(dataBase.DeckNames).length){
        arrowDown.style.display = 'block'
      }
    };
    let newDeckInput = document.createElement("input");


    /*changes the color and cursor when mouse is moved over deck name in the click and train overview --->*/

    newDeckText.onmouseover = function () {
      newDeckText.style.color = "blue";
      newDeckText.style.cursor = "pointer";
    };

    newDeckText.addEventListener("mouseleave", () => {
      newDeckText.style.color = "black";
    });

    /*<--------------------------------------*/

    /*when the edit icon in the click and train overview is clicked the name of the deck can be changed and the edit icon changes to a save icon that must be clicked--->*/

    editIcon.onclick = function () {
      let oldInput = newDeckText.innerText;
      if (!edited) {
        this.innerHTML = save;
        newDeck.replaceChild(newDeckInput, newDeckText);
        newDeckInput.value = newDeckText.innerText;
        edited = true;
      } else {
        this.innerHTML = edit;
        newDeck.replaceChild(newDeckText, newDeckInput);

        edited = false;
        //send fetch=>saveToDataBase
        // if ok
        newDeckText.innerText = newDeckInput.value;
        // if not
        // newDeckText.innerText = oldInput
        // alert('smth wrong with server, try again later, sorry, free hugs')
      }
    };

    /*<--------------------------------------*/

    trashIcon.src = "trash.svg";
    trashIcon.style.width = "16px";
    trashIcon.style.height = "16px";
    editIcon.style.width = "16px";
    editIcon.style.height = "16px";
    editIcon.style.marginRight = "5px";
    trashIcon.style.right = "5px";

    let addIcon = document.createElement('span');
    addIcon.innerText = '+'
    addIcon.onclick = function () {
      //pageNameforNewDeck.style.display = "flex";

      document.getElementById('nameOfDeckInAddQuestion').innerText = item;
      addQuestionsToDeck.style.display = 'flex';
    }

    newDeckText.onclick = function () {
      questAnswerTrainOverv.style.display = "flex";
      createEditDeleteDeckPage.style.display = "none";
      /* not sure why this line does not work*/
      document.getElementById("nameOfDeckInTrainOverv").innerHTML = this.innerHTML;


      // event
      timer = setInterval(() => {
        if (!counter[document.getElementById("nameOfDeckInTrainOverv").innerHTML]) {
          counter[document.getElementById("nameOfDeckInTrainOverv").innerHTML] = 0;
        }
        counter[document.getElementById("nameOfDeckInTrainOverv").innerHTML] += 1;

        /*method below logs the seconds that passed while studiying a specific deck to the counter*/

        //console.log(counter)
      }, 1000);
    };

    let container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'space-around';
    container.style.width = '100px';
    container.style.alignItems = 'center';
    newDeck.appendChild(newDeckText);
    if (length == 'long') {
      container.appendChild(addIcon);
      container.appendChild(editIcon);
      container.appendChild(trashIcon);

    }
    newDeck.appendChild(container);
    newDeck.style.display = 'flex';
    newDeck.style.justifyContent = 'space-between';


    listOfDecks.appendChild(newDeck);



    pageNameforNewDeck.style.display = "none";
    listOfDecks.style.display = "block";
    let navOverview = document.getElementById("navOverview");
    navOverview.style.display = "flex";
    document.getElementById("createDeckButton").style.display = "block";
    document.getElementById("navLine").style.display = 'flex';

  });
};


let statsInNavBar = document.getElementById("stats");

document.getElementById("decks").onclick = function () {
  document.getElementById("createEditDeleteDeckPage").style.display =
    "block";
  this.style.color = "blue";
  statsInNavBar.style.color = "black";
  questAnswerTrainOverv.style.display = "none";
  pageNameforNewDeck.style.display = "none";
  createDom(dataBase.DeckNames)
};







let login = document.getElementById("login");
let playFlashCards = document.getElementById("playFlashcards");
let addQuestions = document.getElementById("addQuestions");
let answerTemplate = document.getElementById("answerTemplate");




let createEditDeleteDeckPage = document.getElementById(
  "createEditDeleteDeckPage"
);


let question = document.getElementById("questionFieldAddQuestion");
let answer = document.getElementById("answerFieldAddQuestion");



let timer = null;
let counter = {};
let key = null;

/*when the button showORHideButton is clicked the answer to the corresponding question is displayed*/
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

document.getElementById("shuffleButton").onclick = function () {
  let nameOfDeckInTrainOverv = document.getElementById("nameOfDeckInTrainOverv").innerHTML;

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
};
/*<-------*/

/*when stats in the nav bar is clicked all the other menu view displays are set to none --->*/

statsInNavBar.onclick = function () {
  document.getElementById("createEditDeleteDeckPage").style.display = "none";
  this.style.color = "blue";

  document.getElementById("decks").style.color = "black";
  questAnswerTrainOverv.style.display = "none";
 
  addQuestionsToDeck.style.display = "none";
};
/*<-------------*/

/*when add in the nav bar is clicked all the other menu view displays are set to none --->*/



/*<-----*/



//counter still needs to be implemented

/*when the redCross in the game menu is pressed you get back to the main menu ----->*/

document.getElementById("redCross").onclick = function () {
  questAnswerTrainOverv.style.display = "none";
  createEditDeleteDeckPage.style.display = "block";
  







  clearInterval(timer);
  //	console.log('your current total is:',counter)
};

/*<-----*/

/*when you click cancel in the  Name for new deck section in 
Decks-->Click and train*/

document.getElementById("cancelButton").onclick = function () {

  
  listOfDecks.style.display = "block";
  pageNameforNewDeck.style.display = "none";
  inputNameOfNewDeck.value = "";
  /*deckOverview.style.display = "flex";*/
  document.getElementById('createYourFirstDeckPrompt').style.display = "block";
  document.getElementById('createDeckButton').style.display='block'
  document.getElementById("createDeckButtonContainer").style.display = "flex";
  document.getElementById("createDeckButtonContainer").style.justifyContent = 'center';
  document.getElementById("navLine").style.display = "flex";
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
  let name = document.getElementById('nameOfDeckInAddQuestion').innerText;

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
  addQuestionsToDeck.style.display = "none";
};

document.querySelector('#closeAddWindowButton').onclick = function () {
  addQuestionsToDeck.style.display = "none";
  question.value = "";
  answer.value = "";
}




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