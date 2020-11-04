import {dataBase} from './dataBase.js'
import {redCross as redCrossIcon} from './svgs.js';
import createDom from './createDom.js';

export default function addQuestionsToDeck (item) {

  let anchorElement = document.getElementById('questAnswerTrainOverv');
      anchorElement.style.display = 'flex';

  let mainWindow = document.createElement("div");
      mainWindow.className = 'addQuestionsToDeck';

  let innerWindow = document.createElement('div');
      innerWindow.style.marginTop = '20px';
      innerWindow.style.marginLeft = '30px';

  let addToDeck = document.createElement("button");
      addToDeck.innerHTML = "Add to Deck";
      addToDeck.style.backgroundColor = '#545863';
      addToDeck.style.color = '#FFE3E3';  
      addToDeck.style.width = '70%';
      addToDeck.style.marginTop =  '10px';
      addToDeck.style.marginLeft = '8px';
    
      
  let insideFlashCardsContainer = document.createElement('div');
      insideFlashCardsContainer.style.marginTop = '30px'

  let theWordFlashCardsAndRedCrossContainer = document.createElement('div');
      theWordFlashCardsAndRedCrossContainer.style.display = 'flex';
      theWordFlashCardsAndRedCrossContainer.style.width = '247px';
      theWordFlashCardsAndRedCrossContainer.style.justifyContent = 'space-between'
      theWordFlashCardsAndRedCrossContainer.style.marginLeft = '8px';
     
  let theNameofTheDeck = document.createElement('div');
      theNameofTheDeck.innerHTML = `&#160${item}`;    

  let theWordDeck = document.createElement('div');
      theWordDeck.innerHTML = 'Deck:';
      theWordDeck.fontWeight = 'bold';

  let header = document.createElement('div');
      header.appendChild(theWordDeck);
      header.appendChild(theNameofTheDeck);
      header.style.display = 'flex'


  let redCross = document.createElement('div');
       redCross.innerHTML = redCrossIcon;
       redCross.style.height = '20px';
       redCross.style.width = '20px';

  let theWordQuestion = document.createElement('div');
      theWordQuestion.innerHTML = 'Question';
      theWordQuestion.style.fontWeight = 'bold';
      theWordQuestion.style.marginBottom = '10px';
      theWordQuestion.style.marginLeft = '8px';

  let theWordAnswer = document.createElement('div');
      theWordAnswer.innerHTML = 'Answer'
      theWordAnswer.style.fontWeight = 'bold';
      theWordAnswer.style.marginBottom = '10px';
      theWordAnswer.style.marginLeft = '8px';


  let questionFieldTextArea = document.createElement('textarea');
      questionFieldTextArea.id = 'questionFieldTextArea';

  let answerFieldTextArea = document.createElement('textarea');



      insideFlashCardsContainer.append(theWordQuestion);
      insideFlashCardsContainer.append(questionFieldTextArea);
      insideFlashCardsContainer.append(theWordAnswer);
      insideFlashCardsContainer.append(answerFieldTextArea);
      insideFlashCardsContainer.append(addToDeck);
      
      theWordFlashCardsAndRedCrossContainer.append(header);
      theWordFlashCardsAndRedCrossContainer.append(redCross);
      innerWindow.append(theWordFlashCardsAndRedCrossContainer)
      innerWindow.append(insideFlashCardsContainer);
      
      mainWindow.append(innerWindow);
      anchorElement.append(mainWindow);

  redCross.onclick = function () {

    mainWindow.parentNode.removeChild(mainWindow);
    anchorElement.style.display = 'none'
  };

  setTimeout(function() {
    window.onclick = function handleOutsideClick(e) {
       if (mainWindow.contains(e.target)) {
         //alert("Clicked in Box");         
       } else {
         //alert("Clicked outside Box");
         redCross.classList.add('blinkingIcon');
         setTimeout(()=>{
         redCross.classList.remove('blinkingIcon')}, 3000);
       }
     }
   }, 10);

  addToDeck.onclick = function () {
    anchorElement.style.display = 'none'
      if (!dataBase.DeckNames[item]) {
         dataBase.DeckNames[item] = [];
         dataBase.DeckNames[item].cardsStudied = 0;
      }
      dataBase.DeckNames[item].push({
        question: questionFieldTextArea.value,
        answer: answerFieldTextArea.value,
      });
      
      questionFieldTextArea.value = '';
      answerFieldTextArea.value = '';

      createDom(dataBase.DeckNames);
    };
    
  };


  