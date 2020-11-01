import {dataBase} from './dataBase.js'

export default function addQuestionsToDeck (item) {

  let anchorElement = document.getElementById('questAnswerTrainOverv');
  let mainWindow = document.createElement("div");
      mainWindow.id = 'addQuestionsToDeck';

  let addToDeck = document.createElement("button");
      addToDeck.innerHTML = "Add to Deck";
      addToDeck.style.backgroundColor = '#545863';
      addToDeck.style.color = '#FFE3E3';  
      addToDeck.style.width = '70%';
      addToDeck.style.marginTop =  '10px';
    
      
  let insideFlashCardsContainer = document.createElement('div');
      insideFlashCardsContainer.style.marginTop = '30px'

  let theWordFlashCardsAndRedCrossContainer = document.createElement('div');
      theWordFlashCardsAndRedCrossContainer.style.display = 'flex';
      theWordFlashCardsAndRedCrossContainer.style.width = '255px';
      theWordFlashCardsAndRedCrossContainer.style.justifyContent = 'space-between'
     
  let theNameofTheDeck = document.createElement('div');
      theNameofTheDeck.innerHTML = item;    
      theNameofTheDeck.style.fontWeight = 'bold';

let   theWordDeck = document.createElement('div');
      theWordDeck.innerHTML = 'Deck:';
      theWordDeck.fontWeight = 'bold';


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


  let innerWindow = document.createElement('div');
    innerWindow.style.marginTop = '20px';
    innerWindow.style.marginLeft = '30px';


  insideFlashCardsContainer.append(theWordQuestion);
  insideFlashCardsContainer.append(questionFieldTextArea);
  insideFlashCardsContainer.append(theWordAnswer);
  insideFlashCardsContainer.append(answerFieldTextArea);
  insideFlashCardsContainer.append(addToDeck);
  
  theWordFlashCardsAndRedCrossContainer.append(theWordDeck);
  theWordFlashCardsAndRedCrossContainer.append(theNameofTheDeck);
  theWordFlashCardsAndRedCrossContainer.append(redCross);
  innerWindow.append(theWordFlashCardsAndRedCrossContainer)
  innerWindow.append(insideFlashCardsContainer);
  
  mainWindow.append(innerWindow);
  anchorElement.append(mainWindow);

  redCross.onclick = function () {

    mainWindow.parentNode.removeChild(mainWindow);
 
  };

  addToDeck.onclick = function () {
    
      if (!dataBase.DeckNames[item]) {
         dataBase.DeckNames[item] = [];
      }
      dataBase.DeckNames[item].push({
        question: questionFieldTextArea.value,
        answer: answerFieldTextArea.value,
      });

      questionFieldTextArea.value = '';
      answerFieldTextArea.value = '';
    
    };


  }


  