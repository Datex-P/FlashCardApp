import shuffle from "./shuffleButton.js";
import { startTimer, timer } from "./timer.js";
import { redCross as redCrossIcon, settingsIcon } from "./svgs.js";

export default function questAnswerTrainOverv(item) {
  let anchorElement = document.getElementById("questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let mainWindow = document.createElement("div");
  mainWindow.className = "addQuestionsToDeck";

  let containerForButtons = document.createElement("div");
  containerForButtons.style.display = "flex";
  containerForButtons.style.marginTop = "10px";
  containerForButtons.style.marginBottom = "10px";

  let containerForText1DayEtc = document.createElement("div");
  containerForText1DayEtc.style.display = "none";

  containerForText1DayEtc.style.width = "205px";
  containerForText1DayEtc.style.marginLeft = "20px";
  containerForText1DayEtc.style.marginBottom = "2px";
  containerForText1DayEtc.style.border = '1px black solid';

  let containerForAgainGoodEasyButtons = document.createElement("div");
  containerForAgainGoodEasyButtons.style.display = "none";
  //containerForAgainGoodEasyButtons.style.border = '1px black solid';
  containerForAgainGoodEasyButtons.style.width = "239px";
  containerForAgainGoodEasyButtons.style.marginLeft = "8px";

  let containerForsmallerTwoMinutesEtc = document.createElement("div");
  containerForsmallerTwoMinutesEtc.style.width = "255px";
  containerForsmallerTwoMinutesEtc.className= "flexColumn";


  
['<2m', '<10m', '<2d'].forEach(el=>{
  let smallerThan = document.createElement('div');
      smallerThan.innerText = el;
      containerForText1DayEtc.append(smallerThan);
});

  ["again", "good", "easy"].forEach((el) => {
    let button = document.createElement("button");
    button.innerText = el;
    button.className = "againGoodEasyButton";

    button.onmouseover = function (e) {
      e.target.style.cursor = 'pointer';
    };

    button.addEventListener('click', function(){
    

      if (el ==='again') {
          shuffleLogic(); //different kinds of shuffle logic     

/*
          let randomNum = Math.floor(Math.random() * 120);

          //search for the index somehow based on the value of the field

          //dataBase.DeckNames[deck].some(item => new Date(item.lastOpen).toDateString() == date)) 

          if (randomNum > ((dataBase.DeckNames[item][index].lastOpen ) / 1000  )) {
            button.addEventListener('click', function () {
              //questionFieldTextArea.value = 
                //answerFieldTextArea.value =
            }
          }
*/


          display();
      }
      if (el == 'good') {
        shuffleLogic(); //different kinds of shuffle logic   
      }
      if (el ==='again') {
        shuffleLogic(); //different kinds of shuffle logic     
      }
      display();
    });

    containerForAgainGoodEasyButtons.append(button)
  });

  

  let insideNameofDeckContainer = document.createElement("div");
  insideNameofDeckContainer.style.marginTop = "30px";
  insideNameofDeckContainer.id = "insideNameofDeckContainer";

  let littleModalWindow = document.createElement("div");
  littleModalWindow.classList.add("littleModalWindow");

  let opened = false;
  ["edit", "delete"].forEach((el) => {
    let button = document.createElement("button");
    button.innerText = el;
    button.className = "againGoodEasyButton";
    button.style.width = "100px";
    button.style.marginTop = "10px";
    button.style.marginLeft = "8px";
    button.onclick = function(){
      if (el === 'edit'){
        answerFieldTextArea.removeAttribute("disabled");
        questionFieldTextArea.focus()
        questionFieldTextArea.removeAttribute("disabled");

        console.log('I am edit');
      } else if (el === 'delete'){

       // search for the index of the question 

        //dataBase.DeckNames[item][random].question;
       // delete dataBase.DeckNames[item][random].answer;

        console.log('I am delete');
      }
    }
    littleModalWindow.appendChild(button);
  });

  let settingsIconContainer = document.createElement("div");
  settingsIconContainer.innerHTML = settingsIcon;
  settingsIconContainer.style.marginTop = '5px';
  settingsIconContainer.style.display = "none";
  settingsIconContainer.style.position = "relative";
  settingsIconContainer.onclick = function () {
    opened = !opened;
    littleModalWindow.style.display = opened ? "block" : "none";
  };

  settingsIconContainer.appendChild(littleModalWindow);

  settingsIconContainer.addEventListener('mouseover', function() {
    settingsIconContainer.style.cursor = 'pointer';
  });



  let showAnswerButton = document.createElement("button");
  showAnswerButton.innerHTML = "Show Answer";
  showAnswerButton.id = "showAnswerButton";
  showAnswerButton.style.marginLeft = "8px";

  let theNameOftheDeckAndRedCrossContainer = document.createElement("div");
  theNameOftheDeckAndRedCrossContainer.style.width = "265px";
  theNameOftheDeckAndRedCrossContainer.className = 'flexSpaceBetween'
  theNameOftheDeckAndRedCrossContainer.style.marginLeft = "4px";
  theNameOftheDeckAndRedCrossContainer.style.border = '1px black solid';

  let theNameofTheDeck = document.createElement("div");
  theNameofTheDeck.innerHTML = `Deck: ${item}`;

  let redCross = document.createElement("div");
  redCross.innerHTML = redCrossIcon;
  redCross.className = 'redCross';
 

  let theWordQuestion = document.createElement("div");
  theWordQuestion.className = "theWordQuestionAndAnswer";
  theWordQuestion.innerHTML = "Question";

  let theWordAnswer = document.createElement("div");
  theWordAnswer.innerHTML = "Answer";
  theWordAnswer.className = "theWordQuestionAndAnswer";
  theWordAnswer.style.display = "none";
  theWordAnswer.style.marginTop = '5px';

  let questionFieldTextArea = document.createElement("textarea");
  questionFieldTextArea.className = "textareaStyling";
  questionFieldTextArea.setAttribute("disabled", "true");
  questionFieldTextArea.style.backgroundColor = "white";

  let answerFieldTextArea = document.createElement("textarea");
  answerFieldTextArea.style.display = "none";
  answerFieldTextArea.className = "textareaStyling";
  answerFieldTextArea.setAttribute("disabled", "true");
  answerFieldTextArea.style.backgroundColor = "white";

  let theWordAnswerContainer = document.createElement("div");
  theWordAnswerContainer.className ='flexSpaceBetween'
  //theWordAnswerContainer.style.border = '1px black solid';
  theWordAnswerContainer.style.width = "270px";

  let innerWindow = document.createElement("div");
  innerWindow.style.marginTop = "20px";
  innerWindow.style.marginLeft = "30px";

  let [question, answer, index] = shuffle(item);
  questionFieldTextArea.value = question;
  answerFieldTextArea.innerText = answer;

  function display() {
    answerFieldTextArea.style.display = "none";
    theWordAnswer.style.display = "none";
    containerForText1DayEtc.style.display = "none";
    containerForAgainGoodEasyButtons.style.display = "none";
    showAnswerButton.style.display = "block";
    settingsIconContainer.style.display = "none";
  }

  function shuffleLogic() {
    let [question, answer,index] = shuffle(item);
    questionFieldTextArea.value = question;
    answerFieldTextArea.innerText = answer;
    return index
  }

 
  showAnswerButton.onclick = function () {
    this.style.cursor = "pointer";
    answerFieldTextArea.style.display = "block";
    theWordAnswer.style.display = "block";
    containerForText1DayEtc.style.display = 'flex';
    containerForText1DayEtc.style.justifyContent = 'space-between';
    
    containerForAgainGoodEasyButtons.style.display = 'flex';
    containerForAgainGoodEasyButtons.style.justifyContent = 'space-between';
    
    this.style.display = "none";
    settingsIconContainer.style.display = "block";
  };

  showAnswerButton.addEventListener('mouseover', function() {
    showAnswerButton.style.cursor = 'pointer';
  })




  containerForsmallerTwoMinutesEtc.append(containerForText1DayEtc);
  containerForsmallerTwoMinutesEtc.append(containerForAgainGoodEasyButtons);

  containerForButtons.append(showAnswerButton);
  containerForButtons.append(containerForsmallerTwoMinutesEtc);

  insideNameofDeckContainer.append(containerForButtons);

  insideNameofDeckContainer.append(theWordQuestion);
  insideNameofDeckContainer.append(questionFieldTextArea);
  insideNameofDeckContainer.append(containerForButtons);

  theWordAnswerContainer.append(theWordAnswer);
  theWordAnswerContainer.append(settingsIconContainer);
  insideNameofDeckContainer.append(theWordAnswerContainer);
  insideNameofDeckContainer.append(answerFieldTextArea);

  theNameOftheDeckAndRedCrossContainer.append(theNameofTheDeck);
  theNameOftheDeckAndRedCrossContainer.append(redCross);
  innerWindow.append(theNameOftheDeckAndRedCrossContainer);
  innerWindow.append(insideNameofDeckContainer);

  mainWindow.append(innerWindow);
  anchorElement.append(mainWindow);

  startTimer(item, index);

  setTimeout(function () {
    window.onclick = function handleOutsideClick(e) {
      if (mainWindow.contains(e.target)) {
        //alert("Clicked in Box");
      } else {
        //alert("Clicked outside Box");
        redCross.classList.add("blinkingIcon");
        setTimeout(() => {
          redCross.classList.remove("blinkingIcon");
        }, 4500);
      }
    };
  }, 10);

  redCross.onclick = function () {
    mainWindow.parentNode.removeChild(mainWindow);
    anchorElement.style.display = "none";
    clearInterval(timer);
    //	console.log('your current total is:',counter)
  };

  redCross.addEventListener('mouseover', function() {
    redCross.style.cursor = 'pointer';
  });

  


}
