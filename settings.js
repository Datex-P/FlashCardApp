import shuffle from "./shuffleButton.js";
import { startTimer, timer } from "./timer.js";
import { redCross as redCrossIcon } from "./svgs.js";
import { dataBase } from './dataBase.js';
import createDom from './createDom.js';
import { edit, save, trash} from './svgs.js';

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
};



export default function settings() {
  


  let anchorElement = document.getElementById("questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let mainWindow = createElement('div', '', {}, 'addQuestionsToDeck')
  anchorElement.appendChild(mainWindow);

  //header
  let settingsAndRedCrossContainer = createElement(
    'div',
    '',
    {
      width: "265px"
    },
    'flexSpaceBetween'
  );
  mainWindow.append(settingsAndRedCrossContainer);

  let theWordSettings = createElement(
    "div",
    `Settings`,
    {fontWeight: 'bold'}
  );
  settingsAndRedCrossContainer.append(theWordSettings);

  let redCross = createElement(
    'div',
    redCrossIcon,
    {},
    'redCross'
  );

  let changeTimeIntervall = createElement(
    'div',
    'Change Repetition Interval',
    {}
  );

  mainWindow.append(changeTimeIntervall);

  let containerForChangeTimeIntervall = createElement(
    'div',
    '',
    {display: 'flex',
    // flexDirection: 'column',
  width: '200px',
border: '1px black solid'}
  );

  mainWindow.append(containerForChangeTimeIntervall);





    let oneTwoTwentyMinContainer = createElement(
      'div',
      '',
      {display: 'flex',
      border: '1px black solid',
      // justifyContent: 'space-around',
      flexDirection: 'column'
      });
  
     containerForChangeTimeIntervall.append(oneTwoTwentyMinContainer);


      
      [1, 2, 20].forEach(el => {
        let btn = createElement('input', `<${el}m`, {
          display: 'flex',
          width: '40%'
        }, 'noBorders');
     
    
        oneTwoTwentyMinContainer.append(btn);
      });


      let againGoodEasyContainer = createElement(
        'div',
        '',
        {display: 'flex',
        border: '1px black solid',
        width: '200px',
        flexDirection: 'column'
        // justifyContent: 'space-around'
        });
    
        containerForChangeTimeIntervall.append(againGoodEasyContainer);

 

  ["again", "good", "easy"].forEach((el) => {

    let input = createElement(
      "input", 'el',
      {
        display: 'flex',
        flexDirection: 'column',
        pointer: 'cursor',
        width: '30%',
        placeholder: el
      },
      "noBorders"
    );
    againGoodEasyContainer.append(input)
  });

  let editIcon = document.createElement("div");
  editIcon.innerHTML = edit;

  againGoodEasyContainer.append(editIcon)
















  function close() {
    mainWindow.parentNode.removeChild(mainWindow);
    anchorElement.style.display = "none";
  }
  redCross.onclick = close

  setTimeout(function () {
    window.onclick = function handleOutsideClick(e) {
      if (mainWindow.contains(e.target)) {
        //alert("Clicked in Box");
      } else {
        //alert("Clicked outside Box");
        redCross.classList.add("blinkingIcon");
        setTimeout(() => {
          redCross.classList.remove("blinkingIcon");
        }, 4500);
      }
    };
  }, 10);

 



  settingsAndRedCrossContainer.append(redCross);

  
  //mainWindow.appendChild(questionContainer);

 

    }
 
      
          














