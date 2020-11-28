import shuffle from "./shuffleButton.js";
import {
  startTimer,
  timer
} from "./timer.js";
import {
  dataBase
} from './dataBase.js';
import createDom from './createDom.js';
import {
  createElement,
  handleOutsideClick,
  redCross, deleteCardQuestionBox,threeDotsOpen,setThreeDotsOpen
} from './exportFunctions.js'
import {
  edit,
  trash
} from './svgs.js';


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

  //header
  let theNameOftheDeckAndRedCrossContainer = createElement(
    'div',
    '', {
    width: "89%",
    marginBottom: '6px'
  },
    'flexSpaceBetween'
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
  }
  )



  let saveAndDiscardContainer = createElement('div', '', {}, 'saveAndDiscardContainer'
  )


  let [saveButton, discardButton] = ['Save', 'Discard'].map(el => {
    return createElement('div', el, {
      fontSize: '14px',
    }, 'generalButtonStyling flexCenterAlignCenter')
  })

  saveButton.style.backgroundColor = '#2d6a4f';
  //discardButton.style.backgroundColor = '#c44536';
  discardButton.style.backgroundColor = '#772e25';


  mainWindow.append(showAnswerButtonContainer, answerContainer, saveAndDiscardContainer);
  saveAndDiscardContainer.append(discardButton, saveButton);





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




  [1, 2, 20].forEach(el => {
    let btn = createElement('div', `< ${el}m`, {
      fontWeight: 'bold'
    });
    containerForTimeButtons.append(btn);
    btn.onclick = function () {
      dataBase.queue.push({
        question,
        answer,
        index,
        timeLeft: el * 6000
      })
    }
    btn.title = `if you click here app will show you the same card in less than ${el} min`
  });

  //only count time when window is opened

  //let randomNum = Math.floor(Math.random() * 10 + 4); //good
  //let randomNum = Math.floor(Math.random() * 4 +2.1); //easy
  //let randomNum = Math.floor(Math.random() * 2); //again


  function display() {
    answerFieldTextArea.style.display = 'none';
    answerContainer.style.display = 'none'
    showAnswerButton.style.display = 'block';
    showAnswerButtonContainer.style.display = 'none'
  }

  function dataBaseQueue(randomNum) {
    dataBase.queue.push({
      question,
      answer,
      index,
      timeLeft: randomNum * 1000
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


      if (el === 'again') {

        let randomNum = Math.floor(Math.random() * 10);

        // dataBase.queue.push({
        //   question,
        //   answer,
        //   index,
        //   timeLeft: randomNum * 1000
        // })

        dataBaseQueue(randomNum)

      }

      if (el == 'good') {

        let randomNum = (Math.floor(Math.random() * (100 - 60 + 1) + 60));

        // dataBase.queue.push({
        //   question,
        //   answer,
        //   index,
        //   timeLeft: randomNum * 1000
        // })

        dataBaseQueue(randomNum)

      }

      if (el === 'easy') {
        let randomNum = (Math.floor(Math.random() * 3000));

        // dataBase.queue.push({
        //   question,
        //   answer,
        //   index,
        //   timeLeft: randomNum * 1000
        // })
        dataBaseQueue(randomNum)

      };
    })
    containerForAgainGoodEasyButtons.append(button)

  });

 


  function threeDots() {

    let settingsIconContainer = createElement(
      'div', '...', {
    }, 'settingsIconContainer'
    );

    settingsIconContainer.title = 'Edit question and answer or delete card';

    settingsIconContainer.onclick = function () {
      console.log('I was clicked')
      if (threeDotsOpen === false) {

        littleModalWindow.style.display = littleModalWindow.style.display === "none" ? "block" : "none";

        if (littleModalWindow.style.display === 'block') {
          setTimeout(function () {
            window.onclick = function (event) {
              if (!littleModalWindow.contains(event.target)) {
                littleModalWindow.style.display = 'none';
                window.onclick = ''
              }
            };
          }, 10);
        }
      }
    };

    let littleModalWindow = createElement(
      'div',
      '', {
      transform: 'rotate(-90deg)',
      top: '-56px',
      left: '-6px',
      border: '1px black solid',
      borderRadius: '5px',
      position: 'absolute'
    },
      'littleModalWindow flexColumn'
    )

    settingsIconContainer.append(littleModalWindow);

    let [trashIconContainer, editIconContainer] = ['', ''].map(el => {
      return createElement('div', '', {
        width: 'fit-content',
        height: '25px',
        border: '1px black solid',
      }, 'flexCenterAlignCenter trashIconContainer')
    });

    littleModalWindow.append(editIconContainer, trashIconContainer);


    let [editIcon, trashIcon] = [edit, trash].map(el => {
      return createElement('div', el, {
        width: '20px'
      })
    });

    let [editIconText, trashIconText] = ['card', 'card'].map(el => {
      return createElement('div', el, {
        width: 'fit-content',
        fontSize: '16px'
      })
    });

    editIconContainer.append(editIcon, editIconText);
    trashIconContainer.append(trashIcon, trashIconText);


    trashIconContainer.onclick = function (e) {

      if (dataBase.showDeleteFrame) {
        setThreeDotsOpen(true);
        //deleteContainerFrame.style.display = 'flex'

        deleteCardQuestionBox(()=>dataBase.DeckNames[item].splice(index,1),()=>questAnswerTrainOverv(item))
      } else {
        e.stopPropagation()
        setThreeDotsOpen(false);
        littleModalWindow.style.display = "none";
      }


      // dataBase.DeckNames[item].splice(index, 1);
      // createDom(dataBase.DeckNames)

      // if (dataBase.DeckNames[item].length) {
      //   shuffleLogic();
      // } else {
      //   close()
      // }
      //popUp();

    }
    theNameOftheDeckAndRedCrossContainer.appendChild(settingsIconContainer)





    editIconContainer.onclick = function () {
      setThreeDotsOpen(true);
      littleModalWindow.style.display = "none";

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


      setTimeout(function () {
        window.onclick = function (e) {
          if (!settingsIconContainer.contains(e.target)) {
            //alert("Clicked in Box");
            window.onclick = ''
          } else {
            //alert("Clicked outside Box");
            saveAndDiscardContainer.classList.add('blinkingIcon');
            setTimeout(() => {
              saveAndDiscardContainer.classList.remove('blinkingIcon')
            }, 3000);
          }
        }
      }, 10);

    };

  }

  threeDots()



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










//     //   button.addEventListener('click', function () {
//     //     questionFieldTextArea.value = dataBase.DeckNames[item][index].question
//     //     answerFieldTextArea.value = dataBase.DeckNames[item][index].answer
//     //   })

//     // }, randomNum * 1000); //right now card gets shown again after 2 sec, normally the formula is : 2 * 60 * 10000

//     // display();
//   }

//   if (el == 'good') {
//     shuffleLogic();
//     showAnswerButton.style.display = 'block';

//     let randomNum = Math.floor(Math.random() * 3);

//    // let randomNum = (Math.floor(Math.random() * (10-2.1+1)*60) + 2*60);
//     //var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
//     //https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range

//     // setTimeout(function() {

//     //   button.addEventListener('click', function () {
//     //     questionFieldTextArea.value =  dataBase.DeckNames[item][index].question
//     //     answerFieldTextArea.value = dataBase.DeckNames[item][index].answer
//     //   })



//     // }, randomNum * 1000);

//   }

//   if (el === 'easy') {
//     shuffleLogic();
//     showAnswerButton.style.display = 'block';


//     let randomNum = Math.floor(Math.random() * 4);
//       // let randomNum = (Math.floor(Math.random() * (10-2.1+1)*60) + 2.1*60);

//     // setTimeout(function() {

//     //   button.addEventListener('click', function () {
//     //     questionFieldTextArea.value =  dataBase.DeckNames[item][index].question
//     //     answerFieldTextArea.value = dataBase.DeckNames[item][index].answer
//     //   })

//     // }, randomNum * 1000);