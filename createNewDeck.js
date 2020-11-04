import {dataBase} from './dataBase.js';
import createDom from './createDom.js';


export default function createNewDeck () {
  
  let anchorElement = document.getElementById('questAnswerTrainOverv');
      anchorElement.style.display = 'flex'

  let mainWindow = document.createElement('div');
      mainWindow.style.height = '160px';
      mainWindow.style.width = '280px';
      mainWindow.style.backgroundColor = 'rgba(200, 168, 115,0.95)';
      mainWindow.style.top =  '100px';
      mainWindow.style.position = 'absolute';
      mainWindow.style.borderRadius = '5px';
      mainWindow.style.display = 'flex';
      mainWindow.style.flexDirection = 'column';
      mainWindow.style.alignItems = 'center';
    
  let nameForNewDeckText = document.createElement('div');
      nameForNewDeckText.style.fontWeight = 'bold';
      nameForNewDeckText.innerHTML = 'Name for new deck' ;
     

  let inputNewDeck = document.createElement('input');
      inputNewDeck.id  = 'inputNameOfNewDeck'

  let nameForNewDeckTextandinputNewDeckContainer = document.createElement('div');
      nameForNewDeckTextandinputNewDeckContainer.style.display = 'flex';
      nameForNewDeckTextandinputNewDeckContainer.style.flexDirection = 'column';

  let okButtonAndCancelButtonContainer = document.createElement('div');
      okButtonAndCancelButtonContainer.style.marginTop = '30px';
     
      document.getElementById('createYourFirstDeckPrompt').style.display = 'none'

  let okButton = document.createElement("button");
      okButton.innerHTML = "Ok";  
      okButton.id = 'okButton';

  let cancelButton = document.createElement("button");
      cancelButton.innerHTML = "Cancel";
      cancelButton.id = "cancelButton";

  let newContainer = document.createElement('div');
      newContainer.style.display = 'flex';
      newContainer.style.flexDirection = 'column';


      nameForNewDeckTextandinputNewDeckContainer.append(nameForNewDeckText);
      nameForNewDeckTextandinputNewDeckContainer.append(inputNewDeck);
      okButtonAndCancelButtonContainer.append(nameForNewDeckTextandinputNewDeckContainer);
      okButtonAndCancelButtonContainer.append(cancelButton);
      okButtonAndCancelButtonContainer.append(okButton);
      mainWindow.append(okButtonAndCancelButtonContainer)
      

      anchorElement.append(mainWindow);

      cancelButton.onclick = function () {
        anchorElement.style.display = 'none'
        anchorElement.removeChild(mainWindow);

        if (!Object.keys(dataBase.DeckNames).length) {
          let arrowDown = document.querySelector(".arrowDown");
          arrowDown.style.display = "block";
          document.getElementById('createYourFirstDeckPrompt').style.display = 'block';   
        }
      }

      okButton.onclick = function () {
       
        anchorElement.style.display = 'none'
        if (inputNewDeck.value === "") {
          alert("Input needed");
        } else {
          dataBase.DeckNames[inputNewDeck.value] = [];
          createDom(dataBase.DeckNames);
          anchorElement.removeChild(mainWindow);
          document.getElementById('createYourFirstDeckPrompt').style.display = 'none'        
        }
          };
      
      
 };


