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
  redCross, deleteCardQuestionBox, setThreeDotsOpen, threeDots, threeDotsOpen
} from './exportFunctions.js'
import createDom from "./createDom.js";
import {
  edit, pause, greenCheckmark
} from "./svgs.js";



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
  //console.log(item)
  let decrementTimer = setInterval(() => {
    dataBase.queue.forEach((item, index) => {
      if (dataBase.queue[index].timeLeft >= 1000) {
        dataBase.queue[index].timeLeft -= 1000
      } else {
        dataBase.queue[index].timeLeft = 0
      }
      // console.log(dataBase.queue[index].timeLeft)
    })

  }, 1000)

  let incrementTimer = setInterval(() => {

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



  let onOffSwitch = createElement('div', '', {}, 'onoffswitch')


  let inputCheckbox = createElement('input', '', {}, 'onoffswitch-checkbox myonoffswitch')
  let label1 = createElement('label', '', {}, 'onoffswitch-label')
  let span1 = createElement('span', '', {}, 'onoffswitch-inner')
  let span2 = createElement('span', `${cardsPaused()}`, {}, 'onoffswitch-switch')


  function cardsPaused() {
    console.log('function cardsPaused was fired')
    return dataBase.DeckNames[item].data.filter(x => x.pause === true).length || 0
  }


  label1.for = 'myonoffswitch'
  inputCheckbox.tabindex = '0'
  inputCheckbox.name = 'onoffswitch'
  inputCheckbox.type = 'checkbox'

  if (dataBase.DeckNames[item].data.find(x => x.pause === true)) {


    label1.classList.add('cursor')  //if card in deck is set to pause, the on off switch is clickable and cursor appears
  } else {
    label1.classList.remove('cursor')
  }


let arrOfPausedDecks;
console.log(dataBase.DeckNames[item], 'items')

  onOffSwitch.onclick = (e)=>{clickHandler(e)}
  
  function clickHandler(e) {

     i = 0;
    console.log(i, 'value of i')

    dataBase.DeckNames[item].skippedPausedCards = 0


    if (dataBase.DeckNames[item].data.find(x => x.pause === true)) {
      if (inputCheckbox.checked) {
        console.log('pause not shown')
        pauseLogo.style.display = 'none'             //edit Logo dissapears that is active in card edit mode
        pauseText.style.display = 'none'
        questionContainer.style.marginTop = '20px'
        inputCheckbox.checked = false

        answerContainer.style.display = 'none';
        answerFieldTextArea.style.display = 'none';
        dataBase.DeckNames[item].pauseSwitch = false
        unpauseButton.style.display = 'none';
        keepPausedButton.style.display = 'none'
        showAnswerButton.style.display = 'block'
        shuffleLogic() //just does not work sometimes

        //onOffSwitch.setAttribute('title', 'click to show all paused cards')
        buttonContainer.classList.remove('justify') //that keep paused button gets centered

      } else {

        arrOfPausedDecks = dataBase.DeckNames[item].data.reduce((acc,el,index) => {
          if(el.pause){
            let x = {...el}
            x.index=index;
            x.deck = item
            acc.push(x)
        }
        return acc
      },[])
      
        inputCheckbox.checked = true

      //= true
        shuffleLogic()
        onOffSwitch.removeAttribute('title')




        pauseLogo.style.display = 'block'             //edit Logo dissapears that is active in card edit mode
        pauseText.style.display = 'block'
        unpauseButton.style.display = 'inline'
        keepPausedButton.style.display = 'inline'
        questionContainer.style.marginTop = '37px'
        answerContainer.style.display = 'block';
        answerFieldTextArea.style.display = 'block';
        showAnswerButton.style.display = 'none'
        //load only paused cards here
        buttonContainer.classList.add('justify')


      }
    }
  }

  onOffSwitch.addEventListener('mouseenter', function () {

    if (dataBase.DeckNames[item].data.find(x => x.pause === true)) {
      onOffSwitch.setAttribute('title', 'click to show all paused cards')
      console.log('working and alive')
    } else {
      onOffSwitch.removeAttribute('title')   //has to be tested if remove works
    }

  }
  )




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
    `Deck: ${dataBase.DeckNames[item].name}`,
    { fontSize: '17px' }
  );
  theNameOftheDeckAndRedCrossContainer.append(theNameofTheDeck);

  theNameOftheDeckAndRedCrossContainer.append(onOffSwitch)




  function close() {   //is triggered when user clicks on red cross, the timer that counts how long each card is studied is stopped
    if (saveAndDiscardContainer.style.display === 'flex') { //questionAnswerTrain can not be closed when save and Discard button is shown
      console.log('save works')
      saveAndDiscardContainer.classList.add('blinkingIcon');
      setTimeout(() => {
        saveAndDiscardContainer.classList.remove('blinkingIcon')
      }, 3000);
      console.log('its active')
    } else {
      mainWindow.parentNode.removeChild(mainWindow);
      anchorElement.style.display = "none";
      clearInterval(timer); //not implemented yet
      clearInterval(decrementTimer);
      clearInterval(incrementTimer)
      window.onclick = null
 
      dataBase.DeckNames[item].pauseSwitch = false
//      dataBase.overview = true; //commented out again 
      dataBase.DeckNames[item].displayDeckInBack = true
      createDom(dataBase.DeckNames)


    }
  }

  redCross.onclick = close





  handleOutsideClick(mainWindow)


  theNameOftheDeckAndRedCrossContainer.append(redCross);
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
    width: '90%',
    display: 'flex'
  });



  let showAnswerButton = createElement(
    'button',
    'Show Answer', {
    cursor: 'pointer'
  },
    '',
    'showAnswerButton'
  );


  let unpauseButton = createElement(
    'button',
    'Unpause card', {
    cursor: 'pointer',
    display: 'none',
    width: '113px',
    padding: '7px'
  },
    '',
    'showAnswerButton'
  );

  let keepPausedButton = createElement(
    'button',
    'Keep paused', {
    cursor: 'pointer',
    display: 'none',
    width: '113px',
    padding: '7px'
  },
    '',
    'showAnswerButton'
  );

  var i =0;




function pausedAndUnpaused() {
  unpauseButton.style.display = 'none'
  keepPausedButton.style.display = 'none'
  showAnswerButton.style.display = 'block'
  pauseLogo.style.display = 'none'             //edit Logo dissapears that is active in card edit mode
  pauseText.style.display = 'none'
  questionContainer.style.marginTop = '20px'
  buttonContainer.classList.remove('justify')
  answerFieldTextArea.style.display = 'none';
  answerContainer.style.display = 'none';
   dataBase.DeckNames[item].pauseSwitch = false
   inputCheckbox.checked = false
   label1.classList.remove('cursor')
   span2.innerText = cardsPaused()
   shuffleLogic()
}

  unpauseButton.onclick = function () {


      dataBase.DeckNames[item].data[arrOfPausedDecks[i].index].pause = false //the first item that was captured by pauseswitch is set to fasle
      
      i++

      if (i >= arrOfPausedDecks.length) {
  
        pausedAndUnpaused()
        } else {
    
          pausedAndUnpausedElseCond()
          }
    }

  keepPausedButton.onclick = function () {
  
    i++

    if (i >= arrOfPausedDecks.length) {

      pausedAndUnpaused()
    
    } else {

        dataBase.DeckNames[item].skippedPausedCards +=1
        pausedAndUnpausedElseCond()
        }
        label1.classList.add('cursor')
   }

   function pausedAndUnpausedElseCond () {
    span2.innerText = cardsPaused()
    shuffleLogic()
    answerFieldTextArea.style.display = 'block';
    answerContainer.style.display = 'block';
   }






  buttonContainer.append(showAnswerButton, unpauseButton, keepPausedButton)
  mainWindow.append(buttonContainer)

  let showAnswerButtonContainer = createElement(
    'div',
    '', {
      display: 'flex'

  }, 'showAnswerButtonContainer'
  )



  let [answerContainer, answerFieldTextArea] = generateTextarea(
    'Answer', {
    marginTop: '26px',
    display: 'none',
  },
  )


  let saveAndDiscardContainer = createElement('div', '', {}, 'saveAndDiscardContainer')


  let [saveButton, discardButton] = ['Save', 'Discard'].map(el => { //generates the save and discard button in questAnswertrain
    return createElement('div', el, {
      fontSize: '14px',
    }, 'generalButtonStyling flexCenterAlignCenter')
  })

  saveButton.classList.add('alertSuccess')
  discardButton.classList.add('alertDanger')

  mainWindow.append(showAnswerButtonContainer, answerContainer, saveAndDiscardContainer);
  saveAndDiscardContainer.append(discardButton, saveButton);
  let [question, answer, index] = shuffleLogic()

  var editMode = false;
  let cardThreeDots = threeDots()

  let anchorThreeDots = cardThreeDots(

    {
      edit: () => {
        editMode = true;
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
        anchorThreeDots.style.display = 'none'             //hides the three dots element when edit is clicked
        editLogo.style.display = 'block'                     //edit logo appears that shows that the app is in edit-mode
        editText.style.display = 'block'

        questionContainer.style.marginTop = '37px' //more  space for edit mode text needed, changed back to default via discard and save button
      },

      pause: (container, playIcon, pauseIcon, edited) => {

        if (dataBase.showDeleteFrameQuestion) {
          deleteCardQuestionBox(() =>
            dataBase.DeckNames[item].data[index].pause = true, () => {
              questAnswerTrainOverv(item),
              createDom(dataBase.DeckNames), clearInterval(decrementTimer)
            }, 'Pause card', 'pause this card? <br><span style="font-size: 12px">Paused cards are not counted in stats.</span>')

        } else {
          dataBase.DeckNames[item].data[index].pause = true
        }


      }
      ,
      delete: () => {

        if (dataBase.showDeleteFrameQuestion) {
          deleteCardQuestionBox(() =>
            dataBase.DeckNames[item].data.splice(index, 1), () => { questAnswerTrainOverv(item), createDom(dataBase.DeckNames), clearInterval(decrementTimer) }, 'Delete card', 'delete this card')

        } else {
          dataBase.DeckNames[item].data.splice(index, 1)
          questAnswerTrainOverv(item)
          createDom(dataBase.DeckNames) //to remove it from the database
        }
      }

    }, { top: '-15px', left: '13px' }, 'card',{marginTop:'0px'}


  )

  console.log('shuff')

  theNameOftheDeckAndRedCrossContainer.append(anchorThreeDots)


  anchorThreeDots.style.position = 'absolute'
  anchorThreeDots.style.right = '86px'
  anchorThreeDots.style.top = '18px'



  showAnswerButton.onclick = function () {

    if (dataBase.DeckNames[item].pauseSwitch === true) { //checks whether pause switch was clicked next to three dots / default is false
    
      // answerContainer.style.display = 'none';
      // answerFieldTextArea.style.display = 'none';
    } else {

      this.style.display = 'none';
      answerContainer.style.display = 'block';
      answerFieldTextArea.style.display = 'block';
      showAnswerButtonContainer.style.display = 'flex';
      dataBase.DeckNames[item].pauseSwitch = false
    }
  };

  let containerForAgainGoodEasyButtons = createElement(
    'div',
    '', {
    margin: '5px 0'
  }, 'flexSpaceBetween'
  );


  let [containerForLeft, containerForMiddle, containerForRight] = ['', '', ''].map(el => {
    return createElement('div', el, {
      margin: '0 auto',
      width: '90%'
    }, 'flexColumnAlignCenter')
  });


  showAnswerButtonContainer.append(containerForLeft, containerForMiddle, containerForRight)



  let { left, middle, right } = dataBase.timeValues

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


  let editLogo = createElement(
    'div',
    edit, {   //pause switch here   `${pauseMode ===false? edit: pause}`
    width: 'fit-content',
    position: 'absolute',
    top: '55px',
    left: '48px',
    display: 'none'

  },
    ''
  )

 // let pic =  dataBase.DeckNames[item].pauseSwitch === true? pause : edit

  let pauseLogo = createElement(
    'div',
   pause, {
    width: 'fit-content',
    position: 'absolute',
    top: '55px',
    left: '48px',
    display: 'none'

  },
    ''
  )



  let pauseText = createElement(
    'div',
    'mode', {
    width: 'fit-content',
    position: 'absolute',
    top: '55px',
    left: '68px',
    display: 'none'

  },
    ''
  )

  let editText = createElement(
    'div',
    'mode', {
    width: 'fit-content',
    position: 'absolute',
    top: '55px',
    left: '68px',
    display: 'none'
  },
    ''
  )

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

  let { leftName, middleName, rightName } = dataBase.nameValues;



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
        console.log(randomNum)
      }
      if (el === `${middleName}`) {
        randomNum = (Math.floor(Math.random() * (100 - 60 + 1) + 60));
        console.log(randomNum)
      }
      if (el === `${rightName}`) {
        randomNum = (Math.floor(Math.random() * 3000));
        console.log(randomNum)
      };
      dataBaseQueue(randomNum, item)
      display()
      shuffleLogic()
      createDom(dataBase.DeckNames)
      console.log(dataBase.DeckNames)
    
      //console.log(dataBase.DeckNames[item].data.filter(x=>x.openHistory))
    })


    if (idx === 0) {
      containerForLeft.append(button);

    } else if (idx === 1) {
      containerForMiddle.append(button);

    } else if (idx === 2) {
      containerForRight.append(button);
    }
  });


  saveButton.onclick = function () {
    setThreeDotsOpen(false);
    questionContainer.style.marginTop = '20px' //place for edit mode text not needed anymore, changed back to default


    cardModifiedPrompt.style.display = 'block'

    if (questionField.value !== questionFieldTextArea.value) { //only show modified when card was actually changed

      setTimeout(() => cardModifiedPrompt.style.display = 'none', 500) //message that card was changed appears for half a second
    }

    answerFieldTextArea.style.border = 'none';
    questionFieldTextArea.style.border = 'none';
    answerFieldTextArea.style.outline = 'none';
    questionFieldTextArea.style.border = 'none';

    mainWindow.insertBefore(showAnswerButtonContainer, buttonContainer);
    showAnswerButtonContainer.append(containerForAgainGoodEasyButtons);
    showAnswerButtonContainer.style.display = 'flex';
    saveAndDiscardContainer.style.display = 'none';
    anchorThreeDots.style.display = 'block'

    editLogo.style.display = 'none'             //edit Logo dissapears that is active in card edit mode
    editText.style.display = 'none'             //'mode' dissappears 
    editMode = false                          //whether edit in three dots was clicked or not


    question = questionFieldTextArea.value;
    answer = answerFieldTextArea.value;
    dataBase.DeckNames[item].data[index].question = question
    dataBase.DeckNames[item].data[index].answer = answer

    display();
    shuffleLogic();
    handleOutsideClick(mainWindow)  //add red cross blink functionality as it was killed by clicking on three dots
  }

  discardButton.onclick = function () {
    setThreeDotsOpen(false);

    questionFieldTextArea.value = questionField  //access to previous saved value
    answerFieldTextArea.value = answerField //access to previous saved value

    editLogo.style.display = 'none'  //edit Logo dissapears that is active in card edit mode
    editText.style.display = 'none'
    editMode = false
    questionContainer.style.marginTop = '20px' //place for edit mode text not needed anymore, changed back to default

    answerFieldTextArea.style.border = 'none';
    questionFieldTextArea.style.border = 'none';
    answerFieldTextArea.style.outline = 'none';
    questionFieldTextArea.style.border = 'none';

    mainWindow.insertBefore(showAnswerButtonContainer, buttonContainer);
    showAnswerButtonContainer.append(containerForAgainGoodEasyButtons);

    showAnswerButtonContainer.style.display = 'flex';
    saveAndDiscardContainer.style.display = 'none';
    anchorThreeDots.style.display = 'block'
    display()
    handleOutsideClick(mainWindow) //add red cross blink functionality as it was killed by clicking on three dots

  };

  let cardModifiedPrompt = createElement('div', 'Card modified', {

    position: 'relative',
    top: '14px',
  }, 'alertSuccess prompt');

  // console.log(dataBase.DeckNames[item].pauseSwitch , 'pauseswit')

  mainWindow.append(editLogo) //Logo that appears in edit mode
  mainWindow.append(editText) //text next to edit logo that appears in edit mode
  mainWindow.append(pauseLogo)
  mainWindow.append(pauseText)
  mainWindow.append(cardModifiedPrompt)

  let questionField = questionFieldTextArea.value; //previous question value saved
  let answerField = answerFieldTextArea.value; //previous answer value saved

  onOffSwitch.append(inputCheckbox, label1)
  label1.append(span1, span2)
}


