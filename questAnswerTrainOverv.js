import shuffle from "./shuffleButton.js";
import { startTimer, timer } from "./timer.js";
import { redCross as redCrossIcon} from "./svgs.js";
import { dataBase } from './dataBase.js';
import createDom from './createDom.js';

function createElement(tag='div',inner='', style={}, className=null, id=null) {

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

function generateTextarea(inner, style={}){
  let container = createElement('div','',{...style,width: '90%'});
  const label = createElement(
    'label',
    inner,
    {
      fontWeight: 'bold'
    }
  );

  let textarea = createElement(
    "textarea",'',
    {
      backgroundColor: "white",
      marginTop: '10px'
    }
  );
  textarea.setAttribute("disabled", "true");

  container.appendChild(label)
  container.appendChild(textarea)
  return [container,textarea]
};

 

export default function questAnswerTrainOverv(item) {
  function shuffleLogic() {
    let [question, answer, index] = shuffle(item);
    questionFieldTextArea.value = question;
    answerFieldTextArea.innerText = answer;
    showAnswerButtonContainer.style.display = 'none'
    answerContainer.style.display = 'none'
    return index
  }
  let anchorElement = document.getElementById("questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let innerWindow = createElement('div','',{},'addQuestionsToDeck')
  anchorElement.appendChild(innerWindow);
  
  //header
    let theNameOftheDeckAndRedCrossContainer = createElement(
      'div',
      '',
      {
        width: "265px"
      },
      'flexSpaceBetween'
    );
    innerWindow.append(theNameOftheDeckAndRedCrossContainer);

    let theNameofTheDeck = createElement(
      "div",
      `Deck: ${item}`
    );
    theNameOftheDeckAndRedCrossContainer.append(theNameofTheDeck);

    let redCross = createElement(
      'div', 
      redCrossIcon, 
      {}, 
      'redCross'
    );
    theNameOftheDeckAndRedCrossContainer.append(redCross);
  //header
    let [questionContainer,questionFieldTextArea] = generateTextarea(
      'Question',
      {
        marginBottom:'20px',
        marginTop:'20px',
      }
    )
    innerWindow.appendChild(questionContainer);

    let buttonContainer = createElement(
      'div',
      '',
      {
        textAlign: 'left',
        width: '90%'
      }
    )
    let showAnswerButton = createElement(
      'button',
      'Show Answer', 
      {
        cursor: 'pointer'
      }, 
      '', 
      'showAnswerButton'
    );
    buttonContainer.appendChild(showAnswerButton)
    innerWindow.appendChild(buttonContainer)

    let showAnswerButtonContainer = createElement(
      'div',
      '',
      {
        display: 'none',
        width: '90%',
        padding: '20px',
        border: '1px black solid',
        boxSizing: 'border-box',
        marginTop: '10px'
      }
    )
    innerWindow.append(showAnswerButtonContainer);

    let [answerContainer,answerFieldTextArea] = generateTextarea(
      'Answer',
      {
        marginTop:'20px',
        display:'none',
        position: 'relative'
      }
    )
    innerWindow.appendChild(answerContainer)
    shuffleLogic()

    showAnswerButton.onclick = function () {
      answerContainer.style.display = 'block'
      showAnswerButtonContainer.style.display = 'block'
    };

    let containerForAgainGoodEasyButtons = createElement(
      'div', 
      '', 
      {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '5px 0'
      }
    );
    
    let containerForTimeButtons = createElement(
      'div', 
      '', 
      {
        display: 'flex',
        justifyContent: 'space-between',
        //margin: '5px 0',
        margin: '0 auto',
        border: '1px black solid',
        width: '80%'
      }
    );

    showAnswerButtonContainer.append(containerForTimeButtons);

  ['<2m', '<10m', '<2d'].forEach(el => {
    let btn = createElement('div',el, {});
    containerForTimeButtons.append(btn);
  });


    showAnswerButtonContainer.append(containerForAgainGoodEasyButtons);
    ["again", "good", "easy"].forEach((el) => {

      let button = createElement(
        "button",
        el,
        {
          pointer: 'cursor'
        },
        "againGoodEasyButton"
      )
  
      button.onclick = shuffleLogic

      containerForAgainGoodEasyButtons.append(button)
    });  



  let settingsIconContainer = createElement(
    'div',
    '...',
    {
      transform: 'rotate(90deg)',
      fontWeight: 'bold',
      position: 'absolute',
      cursor: 'pointer',
      top: '0',
      right: '0'
    }
  );



  answerContainer.appendChild(settingsIconContainer)

  
  settingsIconContainer.onclick = function () {
    opened = !opened;
    littleModalWindow.style.display = opened ? "block" : "none";
  };
  
  settingsIconContainer.appendChild(littleModalWindow);





}