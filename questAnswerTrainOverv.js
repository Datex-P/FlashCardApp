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
  edit, pause
} from "./svgs.js";



function generateTextarea(inner, style = {}) {
  let container = createElement('div', '', {...style, width: '90%'});
  const label = createElement(
    'label', inner, {}, 'labelInQuestionAnswer'
  );

  let textarea = createElement(
    "textarea", '', {} , 'textAreaInQuestionAnswer'
  );

  textarea.setAttribute("disabled", "true");

  container.append(label, textarea)
  return [container, textarea]
};


export default function questAnswerTrainOverv(item) {

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
    [showAnswerButtonContainer, answerContainer].map(el=>el.style.display = 'none');

    return [question, answer, index]
  }



  let onOffSwitch = createElement('div', '', {}, 'onoffswitch')


  let inputCheckbox = createElement('input', '', {}, 'onoffswitch-checkbox myonoffswitch')
  let label1 = createElement('label', '', {}, 'onoffswitch-label')
  let span1 = createElement('span', '', {}, 'onoffswitch-inner')
  let span2 = createElement('span', `${cardsPaused()}`, {}, 'onoffswitch-switch')

  var editMode = false;


  function cardsPaused() {
   // console.log('function cardsPaused was fired')
    return dataBase.DeckNames[item].data.filter(x => x.pause === true).length || 0
  }


  label1.for = 'myonoffswitch'
  inputCheckbox.tabindex = '0'
  inputCheckbox.name = 'onoffswitch'
  inputCheckbox.type = 'checkbox'

function cardPausedAddCursor() {

  if (dataBase.DeckNames[item].data.find(x => x.pause === true)) {

    label1.classList.add('cursor')  //if card in deck is set to pause, the on off switch is clickable and cursor appears
  } else {
    label1.classList.remove('cursor')
  }
}

cardPausedAddCursor()


  let arrOfPausedDecks;
 // console.log(dataBase.DeckNames[item], 'items')

  onOffSwitch.onclick = (e) => { clickHandler(e) }

  function clickHandler(e) {

    i = 0;
   // console.log(i, 'value of i')

    dataBase.DeckNames[item].skippedPausedCards = 0


    if (dataBase.DeckNames[item].data.find(x => x.pause === true)) {
      if (inputCheckbox.checked) {
      
        [pauseLogo, pauseAndEditText, answerContainer, answerFieldTextArea, unpauseButton, keepPausedButton].map(el=>el.style.display = 'none');
        
        questionContainer.style.marginTop = '20px'
        inputCheckbox.checked = false
     
        dataBase.DeckNames[item].pauseSwitch = false
        showAnswerButton.style.display = 'block'
        shuffleLogic() //just does not work sometimes

        //onOffSwitch.setAttribute('title', 'click to show all paused cards')
        buttonContainer.classList.remove('justify') //that keep paused button gets centered

      } else {

        if (editMode === false) {

    

        arrOfPausedDecks = dataBase.DeckNames[item].data.reduce((acc, el, index) => {
          if (el.pause) {
            let x = { ...el }
            x.index = index;
            x.deck = item
            acc.push(x)
          }
          return acc
        }, [])

        inputCheckbox.checked = true

        shuffleLogic()
        onOffSwitch.removeAttribute('title');

        [pauseLogo, pauseAndEditText, answerContainer, answerFieldTextArea].map(el=> el.style.display = 'block');
        
        [unpauseButton, keepPausedButton].map(el=> el.style.display = 'inline');
 
        questionContainer.style.marginTop = '37px'
        showAnswerButton.style.display = 'none'
        //load only paused cards here
        buttonContainer.classList.add('justify')


      } else {
      //onOffSwitch.style.cursor = 'default'  //cursor default needed when deck is paused
      }
    }
  }
  }

  onOffSwitch.addEventListener('mouseenter', function () {

    if (dataBase.DeckNames[item].data.find(x => x.pause === true)) {
      onOffSwitch.setAttribute('title', 'click to show all paused cards')
    
    } else {
      onOffSwitch.removeAttribute('title')   //has to be tested if remove works
    }
  }
  )


console.log(dataBase, 'db und so')

  let anchorElement = document.getElementById("questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let mainWindow = createElement('div', '', {}, 'addQuestionsToDeck')
  anchorElement.appendChild(mainWindow);


  let theNameOftheDeckAndRedCrossContainer = createElement(
    'div',
    '', {},
    'flexSpaceBetweenAlignCenter theNameOftheDeckAndRedCrossContainer'
  );
  mainWindow.append(theNameOftheDeckAndRedCrossContainer);

  let theNameofTheDeck = createElement(
    'div',
    `Deck: ${dataBase.DeckNames[item].name}`,
    { fontSize: '17px' }
  );
  theNameOftheDeckAndRedCrossContainer.append(theNameofTheDeck, onOffSwitch);


  // let cardsStudiedToday = dataBase.DeckNames[item].data.reduce((acc, card) => {
  //   let cardsForToday = card.openHistory?.filter(time => time?.toDateString() == today)
  //   // console.log(cardsForToday, 'cardsforToday')
  //   if (cardsForToday?.length) {
  //     acc += cardsForToday.length
  //   }
  //   return acc
  // }, 0)



  function close() {   //is triggered when user clicks on red cross, the timer that counts how long each card is studied is stopped
    
    if (document.querySelector('.saveAndDiscardContainer').classList.contains('flexSpaceAroundAlignCenter')) { //questionAnswerTrain can not be closed when save and Discard button is shown, thus when this class wasn t removed
      
      saveAndDiscardContainer.classList.add('blinkingIcon');
      setTimeout(() => {
        saveAndDiscardContainer.classList.remove('blinkingIcon')
      }, 3000);

    } else {

      mainWindow.parentNode.removeChild(mainWindow);
      anchorElement.style.display = "none"; //questionAnswerOverview gets put on display none
      clearInterval(timer); //not implemented yet
      clearInterval(decrementTimer);
      clearInterval(incrementTimer)
      window.onclick = null
    
      dataBase.DeckNames[item].pauseSwitch = false
      dataBase.showDiagram = true; //diagram is shown again, when deck is opened it is set to false
      dataBase.statsOrSettingsOpened = false; //needed so that scrollbar on the side reappears

      dataBase.questionAnswerOverview = false; 

      document.querySelector('.canvasContainer').style.display = 'block'; //diagram container was hidden when openening questionAnswer, now it is shown again



    let today = new Date().toDateString();

      let cardsStudiedToday = dataBase.DeckNames[item].data.reduce(
        (acc, card) => {
          let cardsForToday = card.openHistory?.filter(
            (time) => time?.toDateString() == today
          );
  
          if (cardsForToday?.length) {
            acc += cardsForToday.length;
          }
          return acc;
        },
        0
      );

      if (cardsStudiedToday >=Number(dataBase.DeckNames[item].toStudyValue)) {
        dataBase.deckCompleted++;
      }



      console.log(dataBase.deckCompleted)



      createDom(dataBase.DeckNames)
    }
  }

  redCross.onclick = close

  handleOutsideClick(mainWindow)


  theNameOftheDeckAndRedCrossContainer.append(redCross);
  let [questionContainer, questionFieldTextArea] = generateTextarea(
    'Question', {}, 'questionAndQuestionField'
  )


  questionContainer.id = 'questionContainer'
  questionFieldTextArea.id = 'questionFieldTextArea'

  mainWindow.appendChild(questionContainer);

  let buttonContainer = createElement(
    'div', '', {}, 'buttonContainer');



  let showAnswerButton = createElement('button', 'Show Answer', {
    cursor: 'pointer'
  },
    '',
    'showAnswerButton'
  );


  let unpauseButton = createElement('button', 'Unpause card', {
  }, ' unpauseAndKeepPausedButton', 'showAnswerButton'
  );

  let keepPausedButton = createElement('button','Keep paused', {
  }, ' unpauseAndKeepPausedButton', 'showAnswerButton'
  );

  var i = 0;




  function pausedAndUnpaused() {
    
    [unpauseButton, keepPausedButton, pauseLogo, pauseAndEditText, answerFieldTextArea, answerContainer].map(el=>el.style.display = 'none');
  
    showAnswerButton.style.display = 'block'
    questionContainer.style.marginTop = '20px'
    buttonContainer.classList.remove('justify')
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

      dataBase.DeckNames[item].skippedPausedCards += 1
      pausedAndUnpausedElseCond()
    }
    label1.classList.add('cursor')
  }

  function pausedAndUnpausedElseCond() {
    span2.innerText = cardsPaused()
    shuffleLogic()
    [answerFieldTextArea, answerContainer].map(el=>el.style.display = 'block');

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
         marginTop: '20px',
         display: 'none',
   }, 'answerAndAnswerField' 
  )


  let saveAndDiscardContainer = createElement('div', '', {}, 'saveAndDiscardContainer')


  let [saveButton, discardButton] = ['Save', 'Discard'].map(el => { //generates the save and discard button in questAnswertrain
    return createElement('div', el, {
      fontSize: '14px',
    }, 'generalButtonStyling flexCenterAlignCenter')
  })

  let saveChangesText = createElement('div', 'Save changes?', {width: '100px', height:'23px'})
  let saveAndDiscardButtonContainer = createElement('div', '', {width: '140px', display: 'flex', justifyContent:'space-between'})

  saveButton.classList.add('alertSuccess')
  discardButton.classList.add('alertDanger')

  mainWindow.append(showAnswerButtonContainer, answerContainer, saveAndDiscardContainer);
  saveAndDiscardContainer.append(saveChangesText, saveAndDiscardButtonContainer);
  saveAndDiscardButtonContainer.append(discardButton, saveButton)
  let [question, answer, index] = shuffleLogic()

  //var editMode = false;
  let cardThreeDots = threeDots()

  let anchorThreeDots = cardThreeDots(

    {
      edit: () => {
        [answerFieldTextArea, questionFieldTextArea].map(el=> el.classList.remove('answerAndQuestion')) //needed so that grey border is removed after cards are saved
        editMode = true;
        showAnswerButtonContainer.style.justifyContent = 'center';
       // label1.classList.remove('cursor')

        [answerContainer, answerFieldTextArea].map(el=> el.style.display = 'block');
 
        [answerFieldTextArea, questionFieldTextArea].map(el=> el.removeAttribute('disabled'));
    
        questionFieldTextArea.focus();

   
       
        dataBase.DeckNames[item].pauseSwitch = false

        saveAndDiscardContainer.classList.add('flexSpaceAroundAlignCenter');
        [showAnswerButton, anchorThreeDots].map(el=> el.style.display = 'none');

        showAnswerButtonContainer.removeChild(containerForAgainGoodEasyButtons);
        mainWindow.removeChild(showAnswerButtonContainer);
        [editLogo, pauseAndEditText].map(el=> el.style.display = 'block');


        dataBase.DeckNames[item].pauseSwitch = false
        // console.log(dataBase.DeckNames[item].pauseSwitch, 'pauseSwitch status')

        //inputCheckbox.checked = true

        questionContainer.style.marginTop = '37px' //more  space for edit mode text needed, changed back to default via discard and save button
        anchorThreeDots.style.display = 'none' //three dots are not displayed so that they can t be clicked accidentaly
        label1.classList.remove('cursor') 
       
      },

      pause: (container, playIcon, pauseIcon, edited) => {

        //document.getElementById('showAnswerButton').style.display = 'none' //show answer button is set to display none when pause is activated
        if (dataBase.showDeleteFrameQuestion) {
            deleteCardQuestionBox(() =>
                dataBase.DeckNames[item].data[index].pause = true, //remove
                () => {
                   questAnswerTrainOverv(item),
                  (data)=>createDom(data), clearInterval(decrementTimer)
                  },  //refresh
            'Pause card',  //header
            'pause this card? <br><span style="font-size: 12px">Paused cards are not counted in stats.</span>') //body

        } else {
          dataBase.DeckNames[item].data[index].pause = true;
         
        }
        document.getElementById('showAnswerButton').style.display = 'none' 
       

        
      }
      ,
      delete: () => {

        if (dataBase.showDeleteFrameQuestion) {
          deleteCardQuestionBox(() =>
            dataBase.DeckNames[item].data.splice(index, 1), //remove
            () => { questAnswerTrainOverv(item), createDom(dataBase.DeckNames), clearInterval(decrementTimer) }, //refresh
             'Delete card', //header
             'delete this card') //body

        } else {
          dataBase.DeckNames[item].data.splice(index, 1)
          questAnswerTrainOverv(item)
          createDom(dataBase.DeckNames) //to remove it from the database
        }
      },
     
    }, { top: '-15px', left: '13px' }, 'card', { marginTop: '0px' }


  )

  theNameOftheDeckAndRedCrossContainer.append(anchorThreeDots)

    anchorThreeDots.classList.add('threeDotsStyling')




  showAnswerButton.onclick = function () {

    if (dataBase.DeckNames[item].pauseSwitch === true) { //checks whether pause switch was clicked next to three dots / default is false

      [answerContainer, answerFieldTextArea].map(el=> el.style.display = 'none');
    } else {

    this.style.display = 'none';
    [answerContainer, answerFieldTextArea].map(el=> el.style.display = 'block');
     
    showAnswerButtonContainer.style.display = 'flex';
      dataBase.DeckNames[item].pauseSwitch = false
    }
  };

  let containerForAgainGoodEasyButtons = createElement(
    'div', '', {margin: '5px 0'}, 'flexSpaceBetween');




  let [containerForLeft, containerForMiddle, containerForRight] = ['', '', ''].map(el => {
    return createElement('div', el, {
    }, 'flexColumnAlignCenter containerForLeftMiddleRight')
  });


  showAnswerButtonContainer.append(containerForLeft, containerForMiddle, containerForRight)



  let { left, middle, right } = dataBase.timeValues

  let [leftTimeValue, middleTimeValue, rightTimeValue] = [`${left} min`, `${middle} hrs`, `${right}      days`].map(el => {
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





  let editLogo = createElement('div', edit, {}, 'editAndPauseLogo')

  let pauseLogo = createElement('div', pause, {}, 'editAndPauseLogo')

  let pauseAndEditText = createElement('div', 'mode', {}, 'pauseAndEditText')


  function display() {

    [answerFieldTextArea, answerContainer, showAnswerButtonContainer].map(el=>el.style.display = 'none');

    showAnswerButton.style.display = 'block';
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


  let randomNum = 0
  
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

      if (el === `${leftName}`) {

        let newRandomNumber = Math.floor(Math.random() * 10);
        while (randomNum == newRandomNumber) {
          newRandomNumber = Math.floor(Math.random() * 10);
        }

        randomNum = newRandomNumber
    
      }
      if (el === `${middleName}`) {
        let newRandomNumber = Math.floor(Math.random() * (100 - 60 + 1) + 60);
        while (randomNum == newRandomNumber) {
          newRandomNumber = Math.floor(Math.random() * (100 - 60 + 1) + 60);
        }

        randomNum = newRandomNumber

      }
      if (el === `${rightName}`) {
        let newRandomNumber = Math.floor(Math.random() * 3000);
        while (randomNum == newRandomNumber) {
          newRandomNumber = Math.floor(Math.random() * 3000);
        }

        randomNum = newRandomNumber
      };
      dataBaseQueue(randomNum, item)
      display()
      shuffleLogic()
      createDom(dataBase.DeckNames)
      // console.log(dataBase.DeckNames)

      // console.log(dataBase.DeckNames[item].data.filter(x=>x.openHistory))
    })


    if (idx === 0) {
      containerForLeft.append(button);

    } else if (idx === 1) {
      containerForMiddle.append(button);

    } else if (idx === 2) {
      containerForRight.append(button);
    }
  });



  // console.log(randomNum, 'randomNum')
  // console.log(dataBase.DeckNames[item].data[randomNum].answer, 'newRandomNumber')


  saveButton.onclick = function () {
    setThreeDotsOpen(false);
    questionContainer.style.marginTop = '20px' //place for edit mode text not needed anymore, changed back to default
   
    if (dataBase.currentQuestionAndAnswerArr[0] !== questionFieldTextArea.value || dataBase.currentQuestionAndAnswerArr[1] !== answerFieldTextArea.value) { //only show modified when card was actually changed
      cardModifiedPrompt.style.display = 'block'

       setTimeout(() => cardModifiedPrompt.style.display = 'none', 500) //message that card was changed appears for half a second
    }

        [answerFieldTextArea, questionFieldTextArea].map(el=> el.classList.add('answerAndQuestion'))
      

        mainWindow.insertBefore(showAnswerButtonContainer, buttonContainer);
        showAnswerButtonContainer.append(containerForAgainGoodEasyButtons);
        showAnswerButtonContainer.style.display = 'flex';
        saveAndDiscardContainer.classList.remove('flexSpaceAroundAlignCenter')
        anchorThreeDots.style.display = 'block';
        [editLogo, pauseAndEditText].map(el=>el.style.display = 'none'); //edit Logo dissapears that is active in card edit mode

        editMode = false                          //whether edit in three dots was clicked or not


        question = questionFieldTextArea.value;
        answer = answerFieldTextArea.value;
        dataBase.DeckNames[item].data[index].question = question
        dataBase.DeckNames[item].data[index].answer = answer

        handleOutsideClick(mainWindow)  //add red cross blink functionality as it was killed by clicking on three dots
        display();
        shuffleLogic();
        cardPausedAddCursor()
      
  }


 
  
  
  
  // console.log(dataBase.DeckNames, 'database decknames')

  discardButton.onclick = function () {
    setThreeDotsOpen(false);

    questionFieldTextArea.value = questionField  //access to previous saved value
    answerFieldTextArea.value = answerField; //access to previous saved value

    [pauseAndEditText, editLogo].map(el=>el.style.display = 'none'); //edit Logo dissapears that is active in card edit mode
    editMode = false
    questionContainer.style.marginTop = '20px'; //place for edit mode text not needed anymore, changed back to default

    [answerFieldTextArea, questionFieldTextArea].map(el=> el.classList.add('answerAndQuestion'))

  
    mainWindow.insertBefore(showAnswerButtonContainer, buttonContainer);
    showAnswerButtonContainer.append(containerForAgainGoodEasyButtons);

    showAnswerButtonContainer.style.display = 'flex';
    saveAndDiscardContainer.classList.remove('flexSpaceAroundAlignCenter')


    anchorThreeDots.style.display = 'block'
    display()
    handleOutsideClick(mainWindow) //add red cross blink functionality as it was killed by clicking on three dots
    cardPausedAddCursor()
  };

  let cardModifiedPrompt = createElement('div', 'Card modified', {

    position: 'relative',
    top: '14px',
  }, 'alertSuccess prompt');


  mainWindow.append(editLogo, pauseLogo, pauseAndEditText, cardModifiedPrompt) //Logo that appears in edit mode

  let questionField = questionFieldTextArea.value; //previous question value saved
  let answerField = answerFieldTextArea.value; //previous answer value saved

  onOffSwitch.append(inputCheckbox, label1)
  label1.append(span1, span2)
}


