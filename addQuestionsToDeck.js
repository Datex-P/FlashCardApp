import { dataBase } from './dataBase.js'
import createDom from './createDom.js';
import { createElement } from './exportFunctions.js';
import { redCross,handleOutsideClick } from './exportFunctions.js'


export default function addQuestionsToDeck(item) {

  let anchorElement = document.getElementById('questAnswerTrainOverv');
  anchorElement.style.display = 'flex';


  let mainWindow = createElement('div', '', {}, 'addQuestionsToDeck');

  let innerWindow = createElement('div', '', {});

  let addToDeck = createElement('button', 'Add to Deck', {
    backgroundColor: '#545863', color: '#FFE3E3', width: '45%', height: '21px', marginTop: '10px',
    marginLeft: '8px', cursor: 'pointer'
  });

  let insideFlashCardsContainer = createElement('div', '', { marginTop: '20px' });

  let theWordFlashCardsAndRedCrossContainer = createElement('div', '', { width: '97%'}, 'flexSpaceBetween')

  let theNameOfTheDeck = createElement('div', `Deck: &#160${item}`, {fontSize: '17px'});

  let header = createElement('div', '',{ display: 'flex' });

  header.appendChild(theNameOfTheDeck);





  ['Question', 'Answer'].forEach(el => {

    let textarea = document.createElement('textarea');
  

    let theWordQuestionAndAnswer = document.createElement('div');
    theWordQuestionAndAnswer.innerText = el;
    theWordQuestionAndAnswer.style.fontWeight = 'bold';
    theWordQuestionAndAnswer.style.marginBottom = '14px';
    theWordQuestionAndAnswer.style.marginLeft = '8px';

    insideFlashCardsContainer.append(theWordQuestionAndAnswer, textarea)
  });

  insideFlashCardsContainer.childNodes[2].style.marginTop = '25px';



  insideFlashCardsContainer.append(addToDeck);

  theWordFlashCardsAndRedCrossContainer.append(header, redCross);
  innerWindow.append(theWordFlashCardsAndRedCrossContainer, insideFlashCardsContainer)

  mainWindow.append(innerWindow);
  anchorElement.append(mainWindow);

  redCross.onclick = function () {

    anchorElement.innerHTML = '';
    anchorElement.style.display = 'none'
  };

  handleOutsideClick(mainWindow)

  addToDeck.onclick = function () {

    if (!dataBase.DeckNames[item]) {
      dataBase.DeckNames[item] = [];
      dataBase.DeckNames[item].cardsStudied = 0;
    }
    dataBase.DeckNames[item].push({
      question: insideFlashCardsContainer.childNodes[1].value,
      answer: insideFlashCardsContainer.childNodes[3].value,
    });

    insideFlashCardsContainer.childNodes[1].value = '';
    insideFlashCardsContainer.childNodes[3].value = '';
    // answerFieldTextArea.value = '';

    createDom(dataBase.DeckNames);
  };

}

