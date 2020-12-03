import shuffle from "./shuffleButton.js";
import {
  startTimer,
  timer
} from "./timer.js";
import {
  dataBase
} from './dataBase.js';
import {
  createElement,
  handleOutsideClick,
  redCross, deleteCardQuestionBox, setThreeDotsOpen, threeDots
} from './exportFunctions.js'
import createDom from "./createDom.js";



function generateTextarea(inner, style = {}) {
  let container = createElement('div', '', {
    ...style,
    width: '90%'
  });
  const label = createElement(
    'label',
    inner, {
    fontWeight: 'bold',
    marginLeft: '7px'
  }
  );

  let textarea = createElement(
    "textarea", '', {
    backgroundColor: "white",
    marginTop: '10px'
  }
  );
  textarea.setAttribute("disabled", "true");

  container.append(label, textarea)
  return [container, textarea]
};


export default function questAnswerTrainOverv(item) {
  console.log(item)
  let decrementTimer = setInterval(() => {
    dataBase.queue.forEach((card, index) => {
      if (dataBase.queue[index].timeLeft >= 1000) {
        dataBase.queue[index].timeLeft -= 1000
      } else {
        dataBase.queue[index].timeLeft = 0
      }
      console.log(dataBase.queue[index].timeLeft)
    })

  }, 1000)


  function shuffleLogic() {
    let [question, answer, index] = shuffle(item);
    questionFieldTextArea.value = question;
    answerFieldTextArea.innerText = answer;
    showAnswerButtonContainer.style.display = 'none'
    answerContainer.style.display = 'none'
    return [question, answer, index]
  }



  let anchorElement = document.getElementById("questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let mainWindow = createElement('div', '', {}, 'addQuestionsToDeck')
  anchorElement.appendChild(mainWindow);


  let theNameOftheDeckAndRedCrossContainer = createElement(
    'div',
    '', {
    width: "89%",
    marginBottom: '6px',
    height: '24px'
  },
    'flexSpaceBetweenAlignCenter'
  );
  mainWindow.append(theNameOftheDeckAndRedCrossContainer);

  let theNameofTheDeck = createElement(
    "div",
    `Deck: ${item}`
  );
  theNameOftheDeckAndRedCrossContainer.append(theNameofTheDeck);



  function close() {
    mainWindow.parentNode.removeChild(mainWindow);
    anchorElement.style.display = "none";
    clearInterval(timer); //not implemented yet
    clearInterval(decrementTimer);
  }
  redCross.onclick = close






  // startTimer(item, index);



  handleOutsideClick(mainWindow)


  theNameOftheDeckAndRedCrossContainer.append(redCross);
  //header
  let [questionContainer, questionFieldTextArea] = generateTextarea(
    'Question', {
    marginBottom: '20px',
    marginTop: '20px',
  }
  )

  questionContainer.id = 'questionContainer'
  questionFieldTextArea.id = 'questionFieldTextArea'


  mainWindow.appendChild(questionContainer);




  let buttonContainer = createElement(
    'div',
    '', {
    textAlign: 'left',
    width: '90%'
  });

  let showAnswerButton = createElement(
    'button',
    'Show Answer', {
    cursor: 'pointer'
  },
    '',
    'showAnswerButton'
  );

  buttonContainer.appendChild(showAnswerButton)
  mainWindow.appendChild(buttonContainer)

  let showAnswerButtonContainer = createElement(
    'div',
    '', {}, 'showAnswerButtonContainer'
  )



  let [answerContainer, answerFieldTextArea] = generateTextarea(
    'Answer', {
    marginTop: '20px',
    display: 'none',
  },
  )


  let saveAndDiscardContainer = createElement('div', '', {}, 'saveAndDiscardContainer'
  )


  let [saveButton, discardButton] = ['Save', 'Discard'].map(el => {
    return createElement('div', el, {
      fontSize: '14px',
    }, 'generalButtonStyling flexCenterAlignCenter')
  })

  saveButton.style.backgroundColor = '#2d6a4f';
  discardButton.style.backgroundColor = '#772e25';


  mainWindow.append(showAnswerButtonContainer, answerContainer, saveAndDiscardContainer);
  saveAndDiscardContainer.append(discardButton, saveButton);


  let cardThreeDots = threeDots()

  let anchorThreeDots = cardThreeDots(() => {
    showAnswerButtonContainer.style.justifyContent = 'center';
    answerContainer.style.display = 'block'
    answerFieldTextArea.style.display = 'block';
    answerFieldTextArea.removeAttribute("disabled");
    questionFieldTextArea.removeAttribute("disabled");
    questionFieldTextArea.focus();
    saveAndDiscardContainer.style.display = 'flex';
    saveAndDiscardContainer.style.justifyContent = 'space-around';
    saveAndDiscardContainer.style.alignItems = 'center'
    showAnswerButton.style.display = 'none';
    showAnswerButtonContainer.removeChild(containerForTimeButtons, containerForAgainGoodEasyButtons);
    mainWindow.removeChild(showAnswerButtonContainer);


 


  },
    () => {
      deleteCardQuestionBox(() => dataBase.DeckNames[item].splice(index, 1), () => { questAnswerTrainOverv(item), createDom(dataBase.DeckNames),clearInterval(decrementTimer) }, 'card')
    })

  anchorThreeDots.style.position = 'absolute'
  anchorThreeDots.style.right = '86px'
  anchorThreeDots.style.top = '18px'

  // littleModalWindow.style.top = '-15px';
  // littleModalWindow.style.left = '10px';
  //littleModalWindow.stye


  theNameOftheDeckAndRedCrossContainer.append(anchorThreeDots)

  let [question, answer, index] = shuffleLogic()

  showAnswerButton.onclick = function () {
    this.style.display = 'none';
    answerContainer.style.display = 'block';
    showAnswerButtonContainer.style.display = 'block';
    answerFieldTextArea.style.display = 'block';
  };

  let containerForAgainGoodEasyButtons = createElement(
    'div',
    '', {
    margin: '5px 0'
  }, 'flexSpaceBetween'
  );

  let containerForTimeButtons = createElement(
    'div',
    '', {
    margin: '0 auto',
    // border: '1px black solid',
    width: '90%'
  }, 'flexSpaceBetween'
  );

  showAnswerButtonContainer.append(containerForTimeButtons);


  let {left,middle,right} = dataBase.timeValues

  let [leftTimeValue, middleTimeValue, rightTimeValue] = [`${left}min`, `${middle}hrs`, `${right}days`].map(el => {
    return createElement('div', `< ${el}`, {
      fontWeight: 'bold'
    });
    containerForTimeButtons.append(btn);
    btn.title = `if you click here app will show you the same card in less than ${el} min`
  });

  containerForTimeButtons.append(leftTimeValue, middleTimeValue, rightTimeValue);









  //let randomNum = Math.floor(Math.random() * 10 + 4); //good
  //let randomNum = Math.floor(Math.random() * 4 +2.1); //easy
  //let randomNum = Math.floor(Math.random() * 2); //again


  function display() {
    answerFieldTextArea.style.display = 'none';
    answerContainer.style.display = 'none'
    showAnswerButton.style.display = 'block';
    showAnswerButtonContainer.style.display = 'none'
  }

  function dataBaseQueue(randomNum, item) {
    dataBase.queue.push({
      question,
      answer,
      index,
      timeLeft: randomNum * 1000,
      item: item
    })
  }



  showAnswerButtonContainer.append(containerForAgainGoodEasyButtons);
  ["again", "good", "easy"].forEach((el) => {

    let button = createElement(
      "button",
      el, {
      pointer: 'cursor'
    },
      "generalButtonStyling"
    );

    button.addEventListener('click', function () {
      let randomNum = 0
      if (el === 'again') {
        randomNum = Math.floor(Math.random() * 10);
      }
      if (el == 'good') {
        randomNum = (Math.floor(Math.random() * (100 - 60 + 1) + 60));
      }
      if (el === 'easy') {
        randomNum = (Math.floor(Math.random() * 3000));
      };
      dataBaseQueue(randomNum, item)
      display()
      shuffleLogic()
      createDom(dataBase.DeckNames)
    })
    containerForAgainGoodEasyButtons.append(button)

  });




  saveButton.onclick = function () {
    setThreeDotsOpen(false);

    littleModalWindow.style.display = "none";
    answerFieldTextArea.style.border = 'none';
    questionFieldTextArea.style.border = 'none';
    answerFieldTextArea.style.outline = 'none';
    questionFieldTextArea.style.border = 'none';

    mainWindow.insertBefore(showAnswerButtonContainer, buttonContainer);
    showAnswerButtonContainer.append(containerForTimeButtons, containerForAgainGoodEasyButtons);
    showAnswerButtonContainer.style.display = 'block';
    saveAndDiscardContainer.style.display = 'none';

    question = questionFieldTextArea.value;
    answer = answerFieldTextArea.value;


  }


  discardButton.onclick = function () {
    setThreeDotsOpen(false);

    answerFieldTextArea.style.border = 'none';
    questionFieldTextArea.style.border = 'none';
    answerFieldTextArea.style.outline = 'none';
    questionFieldTextArea.style.border = 'none';

    mainWindow.insertBefore(showAnswerButtonContainer, buttonContainer);
    showAnswerButtonContainer.append(containerForTimeButtons, containerForAgainGoodEasyButtons);
    showAnswerButtonContainer.style.display = 'block';
    saveAndDiscardContainer.style.display = 'none';
  };



}





