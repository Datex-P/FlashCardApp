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
    dataBase.queue.forEach((item, index) => {
      if (dataBase.queue[index].timeLeft >= 1000) {
        dataBase.queue[index].timeLeft -= 1000
      } else {
        dataBase.queue[index].timeLeft = 0
      }
      console.log(dataBase.queue[index].timeLeft)
    })

  }, 1000)

let incrementTimer = setInterval(() =>{

dataBase.studyTime += 1

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
  },
    'flexSpaceBetweenAlignCenter theNameOftheDeckAndRedCrossContainer'
  );
  mainWindow.append(theNameOftheDeckAndRedCrossContainer);

  let theNameofTheDeck = createElement(
    "div",
    `Deck: ${item}`,
    {fontSize: '17px'}
  );
  theNameOftheDeckAndRedCrossContainer.append(theNameofTheDeck);



  function close() {
    mainWindow.parentNode.removeChild(mainWindow);
    anchorElement.style.display = "none";
    clearInterval(timer); //not implemented yet
    clearInterval(decrementTimer);
    clearInterval(incrementTimer)
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

  buttonContainer.append(showAnswerButton)
  mainWindow.append(buttonContainer)

  let showAnswerButtonContainer = createElement(
    'div',
    '', {display: 'flex'}, 'showAnswerButtonContainer'
  )



  let [answerContainer, answerFieldTextArea] = generateTextarea(
    'Answer', {
    marginTop: '26px',
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
  let [question, answer, index] = shuffleLogic()

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
    showAnswerButtonContainer.removeChild(containerForAgainGoodEasyButtons);
    mainWindow.removeChild(showAnswerButtonContainer);


 


  },
    () => {
        deleteCardQuestionBox(() => dataBase.DeckNames[item].splice(index, 1), () => { questAnswerTrainOverv(item), createDom(dataBase.DeckNames),clearInterval(decrementTimer) }, 'Delete card', 'delete this card')
      },
      (container,playIcon,pauseIcon,edited) => {
        if (!edited) {
          container.replaceChild(playIcon, pauseIcon)
          window.onclick = ''
          edited = true;

          newDeckContainer.style.backgroundColor = 'grey'
          dataBase.DeckNames[item].deckPauseActive = true;

        }else {
          container.replaceChild(pauseIcon, playIcon)
          edited = false;
          newDeckContainer.style.border = 'none';
          
          newDeckContainer.style.backgroundColor =  dataBase.DeckNames[item].colorPlay;
          dataBase.DeckNames[item].deckPauseActive = false;
        }
        return edited
      },{ top: '-15px',left:'13px'}, 'card'
      )
      
  anchorThreeDots.style.position = 'absolute'
  anchorThreeDots.style.right = '86px'
  anchorThreeDots.style.top = '18px'

  theNameOftheDeckAndRedCrossContainer.append(anchorThreeDots)


  showAnswerButton.onclick = function () {
    this.style.display = 'none';
    answerContainer.style.display = 'block';
    showAnswerButtonContainer.style.display = 'flex';
    answerFieldTextArea.style.display = 'block';
  };

  let containerForAgainGoodEasyButtons = createElement(
    'div',
    '', {
    margin: '5px 0'
  }, 'flexSpaceBetween'
  );


  let [containerForLeft, containerForMiddle, containerForRight] = ['', '', ''].map(el=> {
    return createElement('div', el, {
    margin: '0 auto',
    width: '90%'
    }, 'flexColumnAlignCenter')
  });


showAnswerButtonContainer.append(containerForLeft, containerForMiddle, containerForRight)



  let {left,middle,right} = dataBase.timeValues

  let [leftTimeValue, middleTimeValue, rightTimeValue] = [`${left}min`, `${middle}hrs`, `${right}days`].map(el => {
    return createElement('div', `< ${el}`, {
      fontWeight: 'bold',
      fontSize: '14px'
    });
    containerForTimeButtons.append(btn);
    btn.title = `if you click here app will show you the same card in less than ${el} min`
  });

containerForLeft.append(leftTimeValue);
containerForMiddle.append(middleTimeValue);
containerForRight.append(rightTimeValue);







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

  let {leftName,middleName,rightName} = dataBase.nameValues;


  // if studytime is bigger than 5 min 


  // if key of days of study is different than date update counter


  showAnswerButtonContainer.append(containerForAgainGoodEasyButtons);
  [`${leftName}`, `${middleName}`, `${rightName}`].forEach((el, idx) => {

    let button = createElement(
      "button",
      el, {
      pointer: 'cursor'
    },
      "generalButtonStyling"
    );

    button.addEventListener('click', function () {

    
      dataBase.DeckNames[item].cardsToday++
      

      let randomNum = 0
      if (el === `${leftName}`) {
        randomNum = Math.floor(Math.random() * 10);
      }
      if (el === `${middleName}`) {
        randomNum = (Math.floor(Math.random() * (100 - 60 + 1) + 60));
      }
      if (el === `${rightName}`) {
        randomNum = (Math.floor(Math.random() * 3000));
      };
      dataBaseQueue(randomNum, item)
      display()
      shuffleLogic()
      createDom(dataBase.DeckNames)
    })
  

    if (idx ===0) {
      containerForLeft.append(button);
    
    } else if (idx === 1) {
      containerForMiddle.append(button);
  
    } else if (idx === 2) { 
      containerForRight.append(button);
    }
  });




  saveButton.onclick = function () {
    setThreeDotsOpen(false);

    //littleModalWindow.style.display = "none";
    answerFieldTextArea.style.border = 'none';
    questionFieldTextArea.style.border = 'none';
    answerFieldTextArea.style.outline = 'none';
    questionFieldTextArea.style.border = 'none';

    mainWindow.insertBefore(showAnswerButtonContainer, buttonContainer);
    showAnswerButtonContainer.append(containerForAgainGoodEasyButtons);
    showAnswerButtonContainer.style.display = 'flex';
    saveAndDiscardContainer.style.display = 'none';


    question = questionFieldTextArea.value;
    answer = answerFieldTextArea.value;
    dataBase.DeckNames[item].data[index].question = question
    dataBase.DeckNames[item].data[index].answer = answer

    display();
    shuffleLogic();

  }





  discardButton.onclick = function () {
    setThreeDotsOpen(false);

    answerFieldTextArea.style.border = 'none';
    questionFieldTextArea.style.border = 'none';
    answerFieldTextArea.style.outline = 'none';
    questionFieldTextArea.style.border = 'none';

    mainWindow.insertBefore(showAnswerButtonContainer, buttonContainer);
    showAnswerButtonContainer.append(containerForAgainGoodEasyButtons);
    showAnswerButtonContainer.style.display = 'flex';
    saveAndDiscardContainer.style.display = 'none';
  };



}






