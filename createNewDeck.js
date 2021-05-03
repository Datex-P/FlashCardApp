import {
  dataBase
} from './dataBase.js';
import createDom from './createDom.js';
import {createElement} from './exportFunctions.js'
import questAnswerTrainOverv from './questAnswerTrainOverv.js'


export default function createNewDeck() {
  document.querySelector('#listOfDecks').style.display= 'none'
  document.querySelectorAll('.addQuestionsToDeck').forEach(box => { box.style.display = 'none'}) //for some reasons serveral addquestionstodeck are made in questionanswertrain, this way they get all hidden

 

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


      if (el === 'Cancel') {

        [mainWindow, anchorElement].map(el=> el.style.display = 'none');
        // mainWindow.style.display = 'none';
        // anchorElement.style.display = 'none';
        document.querySelector('#listOfDecks').style.display= 'block'

        if (Object.keys(dataBase.DeckNames).length === 0 || ((dataBase.deckCompleted * 100) /
            Object.keys(dataBase.DeckNames).length) === 100 ) {
  
            document.querySelector(".arrowDown").style.display = "block"; //arrow down button gets displayed
   
            }
        document.querySelector('.canvasContainer').style.display = 'block'; //diagram on main screen reappears

      } else if (el === 'Ok') {

        if (Object.keys(dataBase.DeckNames).includes(inputField.value)) {
          
          alert('Name of Deck already exists')
          inputField.value = ''

        } else if (!inputField.value) {
          alert('Input needed')


        } else {

          document.querySelector('#listOfDecks').style.display= 'block';
          document.querySelector('.canvasContainer').style.display = 'block'; //diagram on main screen reappears

  //         Object.keys(dataBase.DeckNames).length === 0 || ((dataBase.deckCompleted * 100) /
  // Object.keys(dataBase.DeckNames).length) === 100 )

        if(Object.keys(dataBase.DeckNames).length !== 0) {

         // document.querySelector('.orangeCircle').style.display = 'flex';
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
      if (Object.keys(dataBase.DeckNames).length > 1) { //needed in case there is only one deck in the stack the scrollbar would reappear otherwise
          document.querySelector('#scrollable').style.display = 'block' //scrollbar reappears after it was hidden in script.js when createnewdeck was invoked
      }
    })

    buttonContainer.append(button);
  });

};