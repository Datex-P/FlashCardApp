import shuffle from './shuffleButton.js';
import {startTimer,timer} from  './timer.js';

export default function questAnswerTrainOverv (item) {

  let anchorElement = document.getElementById('questAnswerTrainOverv');
  let mainWindow = document.createElement("div");
      mainWindow.id = 'addQuestionsToDeck';

  let containerForButtons = document.createElement('div');
      containerForButtons.style.display = 'flex';
      containerForButtons.style.marginTop = '10px'; 
      containerForButtons.style.marginBottom = '10px';
      // containerForButtons.className = 'btn'

  let shuffleButton = document.createElement("button");
      shuffleButton.innerHTML = "Shuffle";  
      shuffleButton.id = 'shuffleButton';

  let showOrHideButton = document.createElement("button");
      showOrHideButton.innerHTML = "ShowOrHide";
      showOrHideButton.id = "showOrHideButton";

  let insideFlashCardsContainer = document.createElement('div');
      insideFlashCardsContainer.style.marginTop = '30px'

  let theWordFlashCardsAndRedCrossContainer = document.createElement('div');
      theWordFlashCardsAndRedCrossContainer.style.display = 'flex';
      theWordFlashCardsAndRedCrossContainer.style.width = '255px';
      theWordFlashCardsAndRedCrossContainer.style.justifyContent = 'space-between';
     
  let theWordFlashCards = document.createElement('div');
      theWordFlashCards.innerHTML = item;    
      theWordFlashCards.style.fontWeight = 'bold';

  let redCross = document.createElement('img');
       redCross.src = 'redCross.svg';
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


  let questionFieldTextArea = document.createElement('textarea');
      questionFieldTextArea.id = 'questionFieldTextArea';

  let answerFieldTextArea = document.createElement('textarea');
      answerFieldTextArea.style.display = 'none';
      answerFieldTextArea.id = 'answerFieldTextArea'


  let innerWindow = document.createElement('div');
    innerWindow.style.marginTop = '20px';
    innerWindow.style.marginLeft = '30px';


  shuffleButton.onclick = function (){
    shuffle(item)
  };

  showOrHideButton.onclick = function () {
    this.style.cursor = "pointer";

    if (answerFieldTextArea.style.display === 'none') {
      answerFieldTextArea.style.display = 'block';
  // answerField.value = dataBase.DeckNames[newDeckText.innerText][key].answer;
    } else {
      answerFieldTextArea.style.display = 'none';
    }
  };


  containerForButtons.append(showOrHideButton);
  containerForButtons.append(shuffleButton);
  

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

    clearInterval(timer)
  //	console.log('your current total is:',counter)

  };  
}




