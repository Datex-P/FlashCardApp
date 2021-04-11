import { dataBase } from './dataBase.js'
import createDom from './createDom.js';
import { createElement } from './exportFunctions.js';
import { redCross,handleOutsideClick } from './exportFunctions.js'


export default function addQuestionsToDeck(item) {

  let anchorElement = document.getElementById('questAnswerTrainOverv');
  anchorElement.style.display = 'flex';


  let mainWindow = createElement('div', '', {}, 'addQuestionsToDeck');

  let innerWindow = createElement('div', '', {});

  let addToDeck = createElement('button', 'Add to Deck', {}, 'addToDeck');

  let insideFlashCardsContainer = createElement('div', '', { marginTop: '20px' });

  let theWordFlashCardsAndRedCrossContainer = createElement('div', '', { width: '97%'}, 'flexSpaceBetween')

  let theNameOfTheDeck = createElement('div', `Deck: &#160${dataBase.DeckNames[item].name}`, {fontSize: '17px'});

  let header = createElement('div', '',{ display: 'flex' });


  header.appendChild(theNameOfTheDeck);



  ['Question', 'Answer'].forEach(el => {

    let textarea = document.createElement('textarea');
  

    let theWordQuestionAndAnswer = createElement('div',
     el, { fontWeight: 'bold', marginBottom: '14px', marginLeft: '8px'}
    )
 
    insideFlashCardsContainer.append(theWordQuestionAndAnswer, textarea)
  });

  insideFlashCardsContainer.childNodes[2].style.marginTop = '60px';

  let cardAddedPrompt = createElement('div', 'Card Added', {}, 'alertSuccess prompt cardAddedPrompt');


  insideFlashCardsContainer.append(addToDeck);

  theWordFlashCardsAndRedCrossContainer.append(header, redCross);
  innerWindow.append(theWordFlashCardsAndRedCrossContainer, insideFlashCardsContainer)
  
  insideFlashCardsContainer.append(cardAddedPrompt)
  
  
  mainWindow.append(innerWindow);

  anchorElement.append(mainWindow);

  redCross.onclick = function () {
    window.onclick = null

    anchorElement.innerHTML = '';
    anchorElement.style.display = 'none'
    createDom(dataBase.DeckNames)
  };

  handleOutsideClick(mainWindow)

  addToDeck.onclick = function () {
    console.log('still here')
    if (!dataBase.DeckNames[item]) {
      dataBase.DeckNames[item] = [];
      dataBase.DeckNames[item].cardsStudied = 0;
    }

    if (document.getElementsByTagName('textarea')[0].value.trim() === ''  //if one of the two input fields is empty message gets changed
    ||
    document.getElementsByTagName('textarea')[1].value.trim() === ''
    ) {
      cardAddedPrompt.classList.remove('alertSuccess')
      cardAddedPrompt.classList.add('alertDanger')


      cardAddedPrompt.innerText = 'Input needed'

    } else {
      
      cardAddedPrompt.innerText = 'Card Added'
      cardAddedPrompt.classList.add('alertSuccess')
      cardAddedPrompt.classList.remove('alertDanger')

    }


    cardAddedPrompt.style.display = 'block'

    setTimeout(()=> cardAddedPrompt.style.display = 'none', 500)

    dataBase.DeckNames[item].data.push({
      question: insideFlashCardsContainer.childNodes[1].value,
      answer: insideFlashCardsContainer.childNodes[3].value,
    });

    

    insideFlashCardsContainer.childNodes[1].value = '';
    insideFlashCardsContainer.childNodes[3].value = '';
    // answerFieldTextArea.value = '';

    createDom(dataBase.DeckNames);
  };

}

