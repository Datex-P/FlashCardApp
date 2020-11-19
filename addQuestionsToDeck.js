import { dataBase } from './dataBase.js'
import createDom from './createDom.js';
import { createElement } from './exportFunctions.js';
import { redCross,handleOutsideClick } from './exportFunctions.js'


export default function addQuestionsToDeck(item) {

  let anchorElement = document.getElementById('questAnswerTrainOverv');
  anchorElement.style.display = 'flex';


  let mainWindow = createElement('div', '', {}, 'addQuestionsToDeck');

  let innerWindow = createElement('div', '', { marginTop: '20px', marginLeft: '30px' });

  let addToDeck = createElement('button', 'Add to Deck', {
    backgroundColor: '#545863', color: '#FFE3E3', width: '70%', marginTop: '10px',
    marginLeft: '8px', cursor: 'pointer'
  });

  let insideFlashCardsContainer = createElement('div', '', { marginTop: '30px' });

  let theWordFlashCardsAndRedCrossContainer = createElement('div', '', { width: '247px', marginLeft: '8px' }, 'flexSpaceBetween')

  let theNameOfTheDeck = createElement('div', `&#160${item}`, {});

  let theWordDeck = createElement('div', 'Deck', { fontWeight: 'bold' });



  let header = createElement('div', { display: 'flex' });

  header.appendChild(theWordDeck);
  header.appendChild(theNameOfTheDeck);





  ['Question', 'Answer'].forEach(el => {

    let textarea = document.createElement('textarea');
    textarea.className = 'textareaStyling';

    let theWordQuestionAndAnswer = document.createElement('div');
    theWordQuestionAndAnswer.innerText = el;
    theWordQuestionAndAnswer.style.fontWeight = 'bold';
    theWordQuestionAndAnswer.style.marginBottom = '10px';
    theWordQuestionAndAnswer.style.marginLeft = '8px';

    insideFlashCardsContainer.append(theWordQuestionAndAnswer)
    insideFlashCardsContainer.append(textarea)
  });



  insideFlashCardsContainer.append(addToDeck);

  theWordFlashCardsAndRedCrossContainer.append(header);
  theWordFlashCardsAndRedCrossContainer.append(redCross);
  innerWindow.append(theWordFlashCardsAndRedCrossContainer)
  innerWindow.append(insideFlashCardsContainer);

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

