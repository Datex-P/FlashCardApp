import {
  dataBase
} from './dataBase.js';
import createDom from './createDom.js';
import {createElement} from './exportFunctions.js'


export default function createNewDeck() {
  document.querySelector('#listOfDecks').style.display= 'none'
 

  let anchorElement = document.getElementById('questAnswerTrainOverv');
  anchorElement.style.display = 'flex'


  let mainWindow = createElement('div', '', {
      height: '160px',
      justifyContent: 'center',
      width: '280px',
      backgroundColor: 'rgba(200, 168, 115,0.95)',
      top: '166px',
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

  let selectField = createElement('select', `
    <option>or choose exited one</option>
    <option>cars' brands</option>
 
  `, {
    width: '70%',
    marginTop: '10px',
    marginBottom: '10px',
    height: '30px'
  });

  mainWindow.append(selectField)

  let buttonContainer = createElement('div', '', {
    width: '47%',
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
      // Array.from(all).reverse()[selectedIndex].style.zIndex = 2;
      // Array.from(all).reverse()[selectedIndex].querySelector('.threeDotsIcon').style.opacity = 1;
      // Array.from(all).reverse()[selectedIndex].style.transform = 'rotate(0deg)';
      // Array.from(all).reverse()[selectedIndex].querySelector('.orangeCircle').style.display = 'flex'

      if (el === 'Cancel') {
        mainWindow.style.display = 'none';
        anchorElement.style.display = 'none';
        document.querySelector('#listOfDecks').style.display= 'block'


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

          document.querySelector('#listOfDecks').style.display= 'block'

          dataBase.DeckNames[inputField.value] = [];
          createDom(dataBase.DeckNames);
          anchorElement.removeChild(mainWindow);
          anchorElement.style.display = 'none';
          //document.getElementById('createYourFirstDeckPrompt').style.display = 'none'
        }
      }
    })

    buttonContainer.append(button);
  });




};