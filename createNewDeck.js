import {
  dataBase
} from './dataBase.js';
import createDom from './createDom.js';

function createElement(tag = 'div', inner = '', style = {}, className = null, id = null) {

  let element = document.createElement(tag);

  element.innerHTML = inner;
  if (id) {
    element.id = id;
  }
  if (className) {
    element.className = className;
  }
  for (let prop in style) {
    element.style[prop] = style[prop]
  }
  return element
}



export default function createNewDeck() {

  let anchorElement = document.getElementById('questAnswerTrainOverv');
  anchorElement.style.display = 'flex'


  let mainWindow = createElement('div', '', {
      height: '160px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '280px',
      backgroundColor: 'rgba(200, 168, 115,0.95)',
      top: '100px',
      position: 'absolute',
      borderRadius: '5px'
    },
    'flexColumnAlignCenter'
  );

  anchorElement.append(mainWindow);

  let nameForNewDeckText = createElement('div', 'Name for new deck', {
    fontWeight: 'bold'
  });

  mainWindow.append(nameForNewDeckText);

  let inputField = createElement('input', '', {
    width: '70%',
    marginTop: '10px',
    marginBottom: '10px',
    height: '30px'
  });

  mainWindow.append(inputField);

  let buttonContainer = createElement('div', '', {
    width: '47%',
    // border: '1px black solid'
  }, 'flexSpaceBetween');
  mainWindow.append(buttonContainer);


  ['Cancel', 'Ok'].forEach((el) => {
    let button = createElement(
      'button',
      el, {
        pointer: 'cursor'
      },
      'generalButtonStyling'
    )

    button.addEventListener('click', function () {


      if (el === 'Cancel') {
        mainWindow.style.display = 'none';
        anchorElement.style.display = 'none';

        // if (!Object.keys(dataBase.DeckNames).length) {
        //   //         let arrowDown = document.querySelector(".arrowDown");
        //   //         arrowDown.style.display = "block";
        //   //         document.getElementById('createYourFirstDeckPrompt').style.display = 'block';   
        //   //       }

      } else if (el === 'Ok') {
        if (Object.keys(dataBase.DeckNames).includes(inputField.value)) {
          alert('Name of Deck already exists')
          inputField.value = ''
        } else if (!inputField.value) {
          alert('Input needed')
        } else {
          dataBase.DeckNames[inputField.value] = [];
          createDom(dataBase.DeckNames);
          anchorElement.removeChild(mainWindow);
          anchorElement.style.display = 'none';
          document.getElementById('createYourFirstDeckPrompt').style.display = 'none'
        }
      }
    })

    buttonContainer.append(button);
  });












};