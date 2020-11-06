import shuffle from './shuffleButton.js';
import {startTimer,timer} from  './timer.js';
import {redCross as redCrossIcon, settingsIcon} from './svgs.js';


export default function questAnswerTrainOverv (item) {

  let anchorElement = document.getElementById('questAnswerTrainOverv');
      anchorElement.style.display = 'flex';

  let mainWindow = document.createElement("div");
      mainWindow.className = 'addQuestionsToDeck';

  let containerForButtons = document.createElement('div');
      containerForButtons.style.display = 'flex';
      containerForButtons.style.marginTop = '10px'; 
      containerForButtons.style.marginBottom = '10px';

  let containerForText1DayEtc = document.createElement('div');
      containerForText1DayEtc.style.display = 'none';
      containerForText1DayEtc.style.justifyContent = 'space-between';
      containerForText1DayEtc.style.width = '205px';
      containerForText1DayEtc.style.marginLeft = '20px';
      containerForText1DayEtc.style.marginBottom = '2px';
      //containerForText1DayEtc.style.border = '1px black solid';


  let containerForAgainGoodEasyButtons = document.createElement('div');
      containerForAgainGoodEasyButtons.style.display = 'none';
      //containerForAgainGoodEasyButtons.style.border = '1px black solid';
      containerForAgainGoodEasyButtons.style.width = '239px';
      containerForAgainGoodEasyButtons.style.marginLeft = '8px';

   let containerForsmallerTwoMinutesEtc = document.createElement('div'); 
      containerForsmallerTwoMinutesEtc.style.width = '255px';
      containerForsmallerTwoMinutesEtc.style.display = 'flex';
      containerForsmallerTwoMinutesEtc.style.flexDirection = 'column';
   

  let containerForButtonsWithDescriptionsDisplay = document.createElement('div');
      containerForButtonsWithDescriptionsDisplay.style.display = 'flex';
      containerForButtonsWithDescriptionsDisplay.style.flexDirection = 'column';
/*
  let smallerTwoMin = document.createElement('div');
      smallerTwoMin.innerText = '< 2m';

  let smallerTenMin = document.createElement('div');
      smallerTenMin.innerText = '< 10m';

  let smallerTwoDays = document.createElement('div');
      smallerTwoDays.innerText = '< 2d';
*/


/*
      containerForText1DayEtc.append(smallerTwoMin)
      containerForText1DayEtc.append(smallerTenMin)
      containerForText1DayEtc.append(smallerTwoDays)
*/


/*
['<2m', '<10m', '<2d'].forEach(el=>{
  let smallerThan = document.createElement('div');
      smallerThan.innerText = el;
      containerForText1DayEtc.append(smallerThan);
})
*/ 

    /*  
  let againButton = document.createElement('button');
      againButton.className = 'againGoodEasyButton';
      againButton.innerText = 'Again'
    
  let goodButton = document.createElement('button');
      goodButton.className = 'againGoodEasyButton';
      goodButton.innerText = 'Good';
      
  let easyButton = document.createElement('button');
      easyButton.className = 'againGoodEasyButton';
      easyButton.innerText = 'Easy';
*/

['again', 'good', 'easy'].forEach(el =>{

  let  buttons = document.createElement('button');
        buttons.innerText = el;
        buttons.className = 'againGoodEasyButton';
      
        containerForAgainGoodEasyButtons.append(buttons);
  })




let insideNameofDeckContainer = document.createElement('div');
insideNameofDeckContainer.style.marginTop = '30px';
insideNameofDeckContainer.id='insideNameofDeckContainer';

let littleModalWindow = document.createElement('div');
littleModalWindow.classList.add('littleModalWindow')

let opened = false;
['edit', 'Delete Card'].forEach(el =>{

  let  buttons = document.createElement('button');
        buttons.innerText = el;
        buttons.className = 'againGoodEasyButton';
        buttons.style.width = '100px';
        buttons.style.marginTop = '10px';
        buttons.style.marginLeft = '8px';

        littleModalWindow.appendChild(buttons);
  })

  let settingsIconContainer = document.createElement('div');
    settingsIconContainer.innerHTML = settingsIcon;
    settingsIconContainer.style.display = 'none';
    settingsIconContainer.style.position = 'relative';
    settingsIconContainer.onclick = function () {
      opened = !opened
      littleModalWindow.style.display = opened?'block':'none'
    }

    settingsIconContainer.appendChild(littleModalWindow)
    



/*

  let deleteButton = document.createElement('button');
      deleteButton.className = 'againGoodEasyButton';
      deleteButton.style.width = '100px';
      deleteButton.innerText = 'Delete Card';
      deleteButton.style.display = 'none';
      deleteButton.style.marginTop = '10px';
      deleteButton.style.marginLeft = '8px';
*/





  
  let showAnswerButton = document.createElement("button");
      showAnswerButton.innerHTML = "Show Answer";
      showAnswerButton.id = "showAnswerButton";
      showAnswerButton.style.marginLeft = '8px';



  let theNameOftheDeckAndRedCrossContainer = document.createElement('div');
      theNameOftheDeckAndRedCrossContainer.style.display = 'flex';
      theNameOftheDeckAndRedCrossContainer.style.width = '247px';
      theNameOftheDeckAndRedCrossContainer.style.justifyContent = 'space-between';
      theNameOftheDeckAndRedCrossContainer.style.marginLeft = '4px';
     
  let theNameofTheDeck = document.createElement('div');
      theNameofTheDeck.innerHTML = `Deck: ${item}`;   
      
  let redCross = document.createElement('div');
       redCross.innerHTML = redCrossIcon;
       redCross.style.height = '20px';
       redCross.style.width = '20px';
  
  let theWordQuestion = document.createElement('div');
      theWordQuestion.className = 'theWordQuestionAndAnswer'   
      theWordQuestion.innerHTML = 'Question';
    
  let theWordAnswer = document.createElement('div');
      theWordAnswer.innerHTML = 'Answer'
      theWordAnswer.className = 'theWordQuestionAndAnswer'
      theWordAnswer.style.display = 'none';


  let questionFieldTextArea = document.createElement('textarea');
      questionFieldTextArea.className = 'textareaStyling';
      questionFieldTextArea.setAttribute('disabled', 'true')
      questionFieldTextArea.style.backgroundColor = 'white';

  let answerFieldTextArea = document.createElement('textarea');
      answerFieldTextArea.style.display = 'none';
      answerFieldTextArea.className = 'textareaStyling';
      answerFieldTextArea.setAttribute('disabled', 'true');
      answerFieldTextArea.style.backgroundColor = 'white';

  let theWordAnswerContainer = document.createElement('div');
      theWordAnswerContainer.style.display = 'flex';
      theWordAnswerContainer.style.justifyContent = 'space-between';
      //theWordAnswerContainer.style.border = '1px black solid';
      theWordAnswerContainer.style.width = '270px';

 

  let innerWindow = document.createElement('div');
      innerWindow.style.marginTop = '20px';
      innerWindow.style.marginLeft = '30px';

  let [question, answer,index] =  shuffle(item)
      questionFieldTextArea.value = question
      answerFieldTextArea.innerText = answer

  function display () {
    answerFieldTextArea.style.display = 'none';
    theWordAnswer.style.display = 'none';
    containerForText1DayEtc.style.display = 'none';
    containerForAgainGoodEasyButtons.style.display = 'none';
    showAnswerButton.style.display = 'block';
  }

  function shuffleLogic() {
    let [question, answer] =  shuffle(item);
    questionFieldTextArea.value = question;
    answerFieldTextArea.innerText = answer;
  }

/*
  buttons.onclick = function () {
    //this.style.cursor = 'pointer';
    console.log('hi');
  }
*/

/*
  againButton.onclick = function () {
    shuffleLogic();
    this.style.cursor = 'pointer';
    display();
  };

  goodButton.onclick = function () {
    shuffleLogic();
    this.style.cursor = 'pointer';
    display(); 
  }

  easyButton.onclick = function () {
    shuffleLogic();
    this.style.cursor = "pointer";
    display();
  }
*/

  

  showAnswerButton.onclick = function () {
    this.style.cursor = "pointer";
    answerFieldTextArea.style.display = 'block';
    theWordAnswer.style.display = 'block';
    containerForText1DayEtc.style.display = 'flex';
    containerForAgainGoodEasyButtons.style.display = 'flex';
    containerForAgainGoodEasyButtons.style.justifyContent = 'space-between';
    this.style.display = 'none';
    //deleteButton.style.display = 'block';
    settingsIconContainer.style.display = 'block'

    };



 

 // containerForAgainGoodEasyButtons.append(againButton);
  //containerForAgainGoodEasyButtons.append(goodButton);
  //containerForAgainGoodEasyButtons.append(easyButton);

  containerForsmallerTwoMinutesEtc.append(containerForText1DayEtc)
  containerForsmallerTwoMinutesEtc.append(containerForAgainGoodEasyButtons);

  containerForButtons.append(showAnswerButton)
  containerForButtons.append(containerForsmallerTwoMinutesEtc)

  insideNameofDeckContainer.append(containerForButtons)

  insideNameofDeckContainer.append(theWordQuestion);
  insideNameofDeckContainer.append(questionFieldTextArea);
  insideNameofDeckContainer.append(containerForButtons);


  theWordAnswerContainer.append(theWordAnswer)
  theWordAnswerContainer.append(settingsIconContainer)
  insideNameofDeckContainer.append(theWordAnswerContainer)
  //insideNameofDeckContainer.append(theWordAnswer);
  insideNameofDeckContainer.append(answerFieldTextArea);
  //insideNameofDeckContainer.append(deleteButton);
  
  theNameOftheDeckAndRedCrossContainer.append(theNameofTheDeck);
  theNameOftheDeckAndRedCrossContainer.append(redCross);
  innerWindow.append(theNameOftheDeckAndRedCrossContainer)
  innerWindow.append(insideNameofDeckContainer);
  
  mainWindow.append(innerWindow);
  anchorElement.append(mainWindow);

  startTimer(item,index);



  setTimeout(function() {
    window.onclick = function handleOutsideClick(e) {
       if (mainWindow.contains(e.target)) {
         //alert("Clicked in Box");
         
       } else {
         //alert("Clicked outside Box");
         redCross.classList.add('blinkingIcon');
         setTimeout(()=>{
         redCross.classList.remove('blinkingIcon')}, 4500);
       }
     }
   }, 10);


  redCross.onclick = function () {
    mainWindow.parentNode.removeChild(mainWindow);
    anchorElement.style.display = 'none'
    clearInterval(timer)
  //	console.log('your current total is:',counter)
  };  

};

