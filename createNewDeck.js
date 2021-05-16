import {
  dataBase
} from './dataBase.js';
import createDom from './createDom.js';
import {createElement} from './exportFunctions.js'


export default function createNewDeck() {
  document.querySelector('#listOfDecks').style.display= 'none'
  document.querySelectorAll('.addQuestionsToDeck').forEach(box => { box.style.display = 'none'}) //for some reasons serveral addquestionstodeck are made in questionanswertrain, this way they get all hidden
  document.querySelector('.overDiagram').style.display = 'none'
 

  let anchorElement = document.getElementById('questAnswerTrainOverv');
  anchorElement.style.display = 'flex'


  let mainWindow = createElement('div', '', { },'flexColumnAlignCenter mainWindow'
  );

  anchorElement.append(mainWindow);


  let nameTooShortOrLong = createElement('div', '', {}, 'nameTooShortOrLong')

  let nameForNewDeckText = createElement('div', 'Name for new deck', {
    fontWeight: 'bold'
  });

  mainWindow.append(nameForNewDeckText);
  mainWindow.append(nameTooShortOrLong)

  let inputField = createElement('input', '', { //to add the new deck name
}, 'inputField');

  
  mainWindow.append(inputField);
  
  inputField.focus()


//select Field contains different options in the 'add new deck' field

  let selectField = createElement('select', ` 
    <option>premade Deck</option>
    <option>cars' brands</option>
 
  `, {}, 'selectField');

  mainWindow.append(selectField)

  let buttonContainer = createElement('div', '', { //contains cancel and ok-button
    width: '57%',
  }, 'flexSpaceBetween buttonContainerTwo');
  mainWindow.append(buttonContainer);


  let [cancel,ok]= ['Cancel', 'Ok'].map((el) => { //cancel and ok-button that are part of the button container
    let button = createElement(
      'button',
      el, {
        pointer: 'cursor'
      },
      'cancelOkButtonStyling cancelOkstyling'
    )

    button.addEventListener('click', function () {


      if (el === 'Cancel') {

        [mainWindow, anchorElement].map(el=> el.style.display = 'none');
     
        document.querySelector('#listOfDecks').style.display= 'block'

        if (Object.keys(dataBase.DeckNames).length === 0 || ((dataBase.deckCompleted * 100) /
            Object.keys(dataBase.DeckNames).length) === 100 ) {
  
            document.querySelector(".arrowDown").style.display = "block"; //arrow down button gets displayed
   
            }
        document.querySelector('.canvasContainer').style.display = 'block'; //diagram on main screen reappears

        if (dataBase.deckCompleted>0) {
          document.querySelector('.overDiagram').style.display = 'block'
        }



      } else if (el === 'Ok') {

        if (Object.keys(dataBase.DeckNames).includes(inputField.value)) {
          
          alert('Name of Deck already exists')
          inputField.value = ''

        } else if (!inputField.value) {
          alert('Input needed')


        } else {
          if (dataBase.deckCompleted>0) {
            document.querySelector('.overDiagram').style.display = 'block'
          }
          document.querySelector('#listOfDecks').style.display= 'block';
          document.querySelector('.canvasContainer').style.display = 'block'; //diagram on main screen reappears

  //         Object.keys(dataBase.DeckNames).length === 0 || ((dataBase.deckCompleted * 100) /
  // Object.keys(dataBase.DeckNames).length) === 100 )

        if(Object.keys(dataBase.DeckNames).length !== 0) {

    
        }
        
          dataBase.DeckNames[inputField.value] = {data: [], 
           
            cardsToday:0, 
            pause: true,  //initially every deck is paused true but that changes to pause false
            skippedPausedCards: 0,
            pauseSwitch: false, 
            studyGoal: 0,
            thisDeckCompleted: false, 
            toStudyValue: 1,

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
    return button
  });



  inputField.oninput = function(e){
      
    setTimeout(()=>{
      if (e.target.value.length > 10 || e.target.value.length <3 || 
        Object.keys(dataBase.DeckNames).includes(e.target.value)) { 

          if (nameTooShortOrLong.classList.contains('fontSizeNameTooShort')) {
            nameTooShortOrLong.classList.remove('fontSizeNameTooShort')
          }
        
            ok.disabled = true;  
            ok.classList.remove('cancelOkButtonStyling')
            nameTooShortOrLong.style.display = 'block'

            if (e.target.value.length>10) {
              nameTooShortOrLong.innerText = 'too long'
            } else if (e.target.value.length < 3) {
              nameTooShortOrLong.innerText = 'too short'
            } else {
              nameTooShortOrLong.innerText = 'name exists'
              nameTooShortOrLong.classList.add('fontSizeNameTooShort')
            }

      } else {

        nameTooShortOrLong.style.display = 'none'
        ok.disabled = false;
        ok.classList.add('cancelOkButtonStyling')
      }
    }
, 800)
  }

};


