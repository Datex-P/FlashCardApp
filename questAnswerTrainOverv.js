import shuffle from './shuffleButton.js';
import {startTimer,timer} from  './timer.js';
import {redCross as redCrossIcon} from './svgs.js';


export default function questAnswerTrainOverv (item) {

  let anchorElement = document.getElementById('questAnswerTrainOverv');
      anchorElement.style.display = 'flex'
  let mainWindow = document.createElement("div");
      mainWindow.id = 'addQuestionsToDeck';

  let containerForButtons = document.createElement('div');
      containerForButtons.style.display = 'flex';
      containerForButtons.style.marginTop = '10px'; 
      containerForButtons.style.marginBottom = '10px';

  let cont = document.createElement('div');
      cont.style.display = 'flex';
      cont.style.justifyContent = 'space-between';
      cont.style.width = '255px';
 

  let containerForAgainGoodEasyButtons = document.createElement('div');
      containerForAgainGoodEasyButtons.style.display = 'none';
      containerForAgainGoodEasyButtons.style.border = '1px black solid';
      containerForAgainGoodEasyButtons.style.width = '255px';

   let containerForsmallerTwoMinutesEtc = document.createElement('div'); 
      containerForsmallerTwoMinutesEtc.style.width = '255px';
      containerForsmallerTwoMinutesEtc.style.display = 'flex';
      containerForsmallerTwoMinutesEtc.style.flexDirection = 'column';

      
    

  let containerForButtonsWithDescriptionsDisplay = document.createElement('div');
      containerForButtonsWithDescriptionsDisplay.style.display = 'flex';
      containerForButtonsWithDescriptionsDisplay.style.flexDirection = 'column';

  let smallerTwoMin = document.createElement('div');
      smallerTwoMin.innerText = '<2m';

  let smallerTenMin = document.createElement('div');
      smallerTenMin.innerText = '<10m';

  let smallerTwoDays = document.createElement('div');
      smallerTwoDays.innerText = '<2d';

  let againButton = document.createElement('button');
      againButton.style.width = '60px';
      againButton.style.height = '30px';
      againButton.innerText = 'Again';
      againButton.style.backgroundColor = 'grey';
      againButton.style.color = 'white';
   


  let goodButton = document.createElement('button');
      goodButton.style.width = '60px';
      goodButton.style.height = '30px';
      goodButton.innerText = 'Good';
      goodButton.style.backgroundColor = 'grey';
      goodButton.style.color = 'white';
    

  let easyButton = document.createElement('button');
      easyButton.style.width = '60px';
      easyButton.style.height = '30px';
      easyButton.innerText = 'Easy';
      easyButton.style.backgroundColor = 'grey';
      easyButton.style.color = 'white';
  


  let shuffleButton = document.createElement("button");
      shuffleButton.innerHTML = "Shuffle";  
      shuffleButton.id = 'shuffleButton';

  let showAnswerButton = document.createElement("button");
      showAnswerButton.innerHTML = "Show Answer";
      showAnswerButton.id = "showAnswerButton";

  let insideFlashCardsContainer = document.createElement('div');
      insideFlashCardsContainer.style.marginTop = '30px';
     // insideFlashCardsContainer.style.display = 'flex';

  let theWordFlashCardsAndRedCrossContainer = document.createElement('div');
      theWordFlashCardsAndRedCrossContainer.style.display = 'flex';
      theWordFlashCardsAndRedCrossContainer.style.width = '255px';
      theWordFlashCardsAndRedCrossContainer.style.justifyContent = 'space-between';
     
  let theWordFlashCards = document.createElement('div');
      theWordFlashCards.innerHTML = `&#160${item}`;   
      theWordFlashCards.style.fontWeight = 'bold';

  let redCross = document.createElement('div');
       redCross.innerHTML = redCrossIcon;
       redCross.style.height = '20px';
       redCross.style.width = '20px';
  
 
  let theWordQuestion = document.createElement('div');
      theWordQuestion.innerHTML = 'Question';
      theWordQuestion.style.fontWeight = 'bold';
      theWordQuestion.style.marginBottom = '10px';

  let theWordAnswer = document.createElement('div');
      theWordAnswer.innerHTML = 'Answer'
      theWordAnswer.style.fontWeight = 'bold';
      theWordAnswer.style.marginBottom = '10px';
      theWordAnswer.style.display = 'none';


  let questionFieldTextArea = document.createElement('textarea');
      //questionFieldTextArea.value = shuffle(item)
      //questionFieldTextArea.id = 'questionFieldTextArea';

  let answerFieldTextArea = document.createElement('textarea');
      answerFieldTextArea.style.display = 'none';
      //answerFieldTextArea.id = 'answerFieldTextArea'


  let innerWindow = document.createElement('div');
    innerWindow.style.marginTop = '20px';
    innerWindow.style.marginLeft = '30px';

  let [question, answer] =  shuffle(item)
      questionFieldTextArea.value = question
      answerFieldTextArea.innerText = answer
    
  shuffleButton.onclick = function (){
    let [question, answer] =  shuffle(item)
    questionFieldTextArea.value = question
    answerFieldTextArea.innerText = answer
  };

  showAnswerButton.onclick = function () {
    this.style.cursor = "pointer";

    if (answerFieldTextArea.style.display === 'none') {
      answerFieldTextArea.style.display = 'block';
      theWordAnswer.style.display = 'block';
      cont.style.display = 'flex';
  
      containerForAgainGoodEasyButtons.style.display = 'flex';
      containerForAgainGoodEasyButtons.style.justifyContent = 'space-between';
  // answerField.value = dataBase.DeckNames[newDeckText.innerText][key].answer;
    } else {
      answerFieldTextArea.style.display = 'none';
      theWordAnswer.style.display = 'none';
      cont.style.display = 'none';
      containerForAgainGoodEasyButtons.style.display = 'none'
    }
    this.parentNode.removeChild(this);
  };



  cont.append(smallerTwoMin)
  cont.append(smallerTenMin)
  cont.append(smallerTwoDays)
 

  containerForAgainGoodEasyButtons.append(againButton);
  containerForAgainGoodEasyButtons.append(goodButton);
  containerForAgainGoodEasyButtons.append(easyButton);


  containerForsmallerTwoMinutesEtc.append(cont)
  containerForsmallerTwoMinutesEtc.append(containerForAgainGoodEasyButtons);

  containerForButtons.append(showAnswerButton)
  containerForButtons.append(containerForsmallerTwoMinutesEtc)

  insideFlashCardsContainer.append(containerForButtons)

  insideFlashCardsContainer.append(theWordQuestion);
  insideFlashCardsContainer.append(questionFieldTextArea);
  insideFlashCardsContainer.append(containerForButtons);
  insideFlashCardsContainer.append(theWordAnswer);
  insideFlashCardsContainer.append(answerFieldTextArea);
  
  theWordFlashCardsAndRedCrossContainer.append(theWordFlashCards);
  theWordFlashCardsAndRedCrossContainer.append(redCross);
  innerWindow.append(theWordFlashCardsAndRedCrossContainer)
  innerWindow.append(insideFlashCardsContainer);
  
  mainWindow.append(innerWindow);
  anchorElement.append(mainWindow);

  startTimer(item);



  redCross.onclick = function () {
    mainWindow.parentNode.removeChild(mainWindow);
    anchorElement.style.display = 'none'
    clearInterval(timer)
  //	console.log('your current total is:',counter)

  };  
};

