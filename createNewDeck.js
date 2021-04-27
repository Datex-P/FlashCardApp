import {
  dataBase
} from './dataBase.js';
import createDom from './createDom.js';
import {createElement} from './exportFunctions.js'


export default function createNewDeck() {
  document.querySelector('#listOfDecks').style.display= 'none'
 

  let anchorElement = document.getElementById('questAnswerTrainOverv');
  anchorElement.style.display = 'flex'


  let mainWindow = createElement('div', '', { },'flexColumnAlignCenter mainWindow'
  );

  anchorElement.append(mainWindow);

  let nameForNewDeckText = createElement('div', 'Name for new deck', {
    fontWeight: 'bold'
  });

  mainWindow.append(nameForNewDeckText);

  let inputField = createElement('input', '', { //to add the new deck name
}, 'inputField');

  
  mainWindow.append(inputField);
  
  inputField.focus()
//select Field contains different options in the 'add new deck' field

  let selectField = createElement('select', ` 
    <option>or choose existing one</option>
    <option>cars' brands</option>
 
  `, {}, 'selectField');

  mainWindow.append(selectField)

  let buttonContainer = createElement('div', '', { //contains cancel and ok-button
    width: '57%',
  }, 'flexSpaceBetween');
  mainWindow.append(buttonContainer);


  ['Cancel', 'Ok'].forEach((el) => { //cancel and ok-button that are part of the button container
    let button = createElement(
      'button',
      el, {
        pointer: 'cursor'
      },
      'cancelOkButtonStyling'
    )

    button.addEventListener('click', function () {
      // Array.from(all).reverse()[selectedIndex].style.zIndex = 2;
      // Array.from(all).reverse()[selectedIndex].querySelector('.threeDotsIcon').style.opacity = 1;
      // Array.from(all).reverse()[selectedIndex].style.transform = 'rotate(0deg)';
     //  Array.from(all).reverse()[selectedIndex].querySelector('.orangeCircle').style.display = 'flex'

      if (el === 'Cancel') {

        [mainWindow, anchorElement].map(el=> el.style.display = 'none');
        // mainWindow.style.display = 'none';
        // anchorElement.style.display = 'none';
        document.querySelector('#listOfDecks').style.display= 'block'


      } else if (el === 'Ok') {

        if (Object.keys(dataBase.DeckNames).includes(inputField.value)) {
          
          alert('Name of Deck already exists')
          inputField.value = ''

        } else if (!inputField.value) {
          alert('Input needed')


        } else {

          //when deckname does not already exist this method is triggered

          document.querySelector('#listOfDecks').style.display= 'block';


  //         Object.keys(dataBase.DeckNames).length === 0 || ((dataBase.deckCompleted * 100) /
  // Object.keys(dataBase.DeckNames).length) === 100 )

        if(Object.keys(dataBase.DeckNames).length !== 0) {

          document.querySelector('.orangeCircle').style.display = 'flex';
        }
        
          dataBase.DeckNames[inputField.value] = {data: [], toStudyGoal:20, 

            cardsToday:0, pause: false, 
            skippedPausedCards: 0,
            pauseSwitch: false, 
            studyGoal: 0,
            thisDeckCompleted: false, 
            toStudyValue: 0,

            color: colors[ Object.keys(dataBase.DeckNames).length % colors.length],
          name: inputField.value};
          createDom(dataBase.DeckNames);
          anchorElement.removeChild(mainWindow); 
          anchorElement.style.display = 'none';

        }
      }
    })

    buttonContainer.append(button);
  });

};