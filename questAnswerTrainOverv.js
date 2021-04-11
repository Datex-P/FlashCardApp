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
  let container = createElement('div', '', {
    ...style,
    width: '90%'
  });
  const label = createElement(
    'label',
    inner, {}, 'labelInQuestionAnswer'
  );

  let textarea = createElement(
    "textarea", '', {} , 'textAreaInQuestionAnswer'
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

    [showAnswerButtonContainer, answerContainer].map(el=>el.style.display = 'none');
    // showAnswerButtonContainer.style.display = 'none'
    // answerContainer.style.display = 'none'
    return [question, answer, index]
  }



  let onOffSwitch = createElement('div', '', {}, 'onoffswitch')


  let inputCheckbox = createElement('input', '', {}, 'onoffswitch-checkbox myonoffswitch')
  let label1 = createElement('label', '', {}, 'onoffswitch-label')
  let span1 = createElement('span', '', {}, 'onoffswitch-inner')
  let span2 = createElement('span', `${cardsPaused()}`, {}, 'onoffswitch-switch')

  var editMode = false;


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

  onOffSwitch.onclick = (e) => { clickHandler(e) }

  function clickHandler(e) {

    i = 0;
    console.log(i, 'value of i')

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

        console.log('hello from right now')

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
    '', {},
    'flexSpaceBetweenAlignCenter theNameOftheDeckAndRedCrossContainer'
  );
  mainWindow.append(theNameOftheDeckAndRedCrossContainer);

  let theNameofTheDeck = createElement(
    "div",
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
    
    if (saveAndDiscardContainer.style.display === 'flex') { //questionAnswerTrain can not be closed when save and Discard button is shown
      
      saveAndDiscardContainer.classList.add('blinkingIcon');
      setTimeout(() => {
        saveAndDiscardContainer.classList.remove('blinkingIcon')
      }, 3000);

    } else {

      mainWindow.parentNode.removeChild(mainWindow);
      anchorElement.style.display = "none";
      clearInterval(timer); //not implemented yet
      clearInterval(decrementTimer);
      clearInterval(incrementTimer)
      window.onclick = null
      //console.log('hello from close')
      dataBase.DeckNames[item].pauseSwitch = false
      //      dataBase.overview = true; //commented out again 
      dataBase.showDiagram = true


      // if (((((cardsStudiedToday || 0) * 100) /  dataBase.DeckNames[item].studyGoal).toFixed(0) >= 50)
      
      //         && dataBase.DeckNames[item].thisDeckCompleted === false
      //         && dataBase.diagramWasTriggeredOnce === false) {
      //   //when the study goal is fullfilled for 100 %
      //   console.log('hello from cardStudied')

      //     dataBase.DeckNames[item].thisDeckCompleted = true
      //     // dataBase.showDiagram = true;
      //     dataBase.deckCompleted++
      //     newDeckContainer.style.display = 'none'
      //     let decks= document.querySelectorAll('#listOfDecks .newDeckContainer')
      //       let length = Array.from(decks).length
      //       console.log(Array.from(decks))
      //       //decks[length-1]
      
      
      // .querySelector('.orangeCircle').style.display = 'block'
      //       config.data.datasets[0].data.push(
      //       Object.keys(dataBase.DeckNames).length - dataBase.deckCompleted,
      //       dataBase.deckCompleted)


      //   config.data.datasets[0].data.push('config data')



      //   let canvas = createElement('canvas', '', {}, 'pieChart canvasStyling')

      //   let ctx = canvas.getContext("2d");
      //   let myChart = new Chart(ctx, config);

      //   Chart.pluginService.register({
      //     beforeDraw: function (chart) {
      //       if (chart.config.options.elements.center) {
      //         // Get ctx from string
      //         var ctx = chart.chart.ctx;

      //         // Get options from the center object in options
      //         var centerConfig = chart.config.options.elements.center;
      //         var fontStyle = centerConfig.fontStyle || 'Arial';
      //         var txt = centerConfig.text;
      //         var color = centerConfig.color || '#000';
      //         var maxFontSize = centerConfig.maxFontSize || 75;
      //         var sidePadding = centerConfig.sidePadding || 20;
      //         var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
      //         // Start with a base font of 30px
      //         ctx.font = "30px " + fontStyle;

      //         // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      //         var stringWidth = ctx.measureText(txt).width;
      //         var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      //         // Find out how much the font can grow in width.
      //         var widthRatio = elementWidth / stringWidth;
      //         var newFontSize = Math.floor(30 * widthRatio);
      //         var elementHeight = (chart.innerRadius * 2);

      //         // Pick a new font size so it will not be larger than the height of label.
      //         var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
      //         var minFontSize = centerConfig.minFontSize;
      //         var lineHeight = centerConfig.lineHeight || 25;
      //         var wrapText = false;

      //         if (minFontSize === undefined) {
      //           minFontSize = 20;
      //         }

      //         if (minFontSize && fontSizeToUse < minFontSize) {
      //           fontSizeToUse = minFontSize;
      //           wrapText = true;
      //         }

      //         // Set font settings to draw it correctly.
      //         ctx.textAlign = 'center';
      //         ctx.textBaseline = 'middle';
      //         var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      //         var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      //         ctx.font = fontSizeToUse + "px " + fontStyle;
      //         ctx.fillStyle = color;

      //         if (!wrapText) {
      //           ctx.fillText(txt, centerX, centerY);
      //           return;
      //         }

      //         var words = txt.split(' ');
      //         var line = '';
      //         var lines = [];

      //         // Break words up into multiple lines if necessary
      //         for (var n = 0; n < words.length; n++) {
      //           var testLine = line + words[n] + ' ';
      //           var metrics = ctx.measureText(testLine);
      //           var testWidth = metrics.width;
      //           if (testWidth > elementWidth && n > 0) {
      //             lines.push(line);
      //             line = words[n] + ' ';
      //           } else {
      //             line = testLine;
      //           }
      //         }

      //         // Move the center up depending on line height and number of lines
      //         centerY -= (lines.length / 2) * lineHeight;

      //         for (var n = 0; n < lines.length; n++) {
      //           ctx.fillText(lines[n], centerX, centerY);
      //           centerY += lineHeight;
      //         }
      //         //Draw text in center
      //         ctx.fillText(line, centerX, centerY);
      //       }
      //     }
      //   });

      //   if (dataBase.showDiagram) {
      //     document.querySelector('#mainMenu').append(canvasContainer)
      //     canvasContainer.append(canvas)
      //   }
      // }



      dataBase.showDiagram = true
      // createDom(dataBase.DeckNames) //Dom is rerendered so that show diagram and pause switch for instance get updated

    }
    createDom(dataBase.DeckNames)
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
    // answerFieldTextArea.style.display = 'block';
    // answerContainer.style.display = 'block';
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
   }, 'answerAndAnswerField' 
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

  //var editMode = false;
  let cardThreeDots = threeDots()

  let anchorThreeDots = cardThreeDots(

    {
      edit: () => {
        editMode = true;
        showAnswerButtonContainer.style.justifyContent = 'center';
        //answerContainer.style.display = 'block'
        //answerFieldTextArea.style.display = 'block';
        console.log('hello from edit')

          [answerContainer, answerFieldTextArea].map(el=> el.style.display = 'block');
        //  return el})
        [answerFieldTextArea, questionFieldTextArea].map(el=> el.removeAttribute('disabled'));
        //  answerFieldTextArea.removeAttribute('disabled');
        //  questionFieldTextArea.removeAttribute('disabled');
        questionFieldTextArea.focus();
       
        dataBase.DeckNames[item].pauseSwitch = false

        saveAndDiscardContainer.classList.add('flexSpaceAroundAlignCenter')


        // showAnswerButton.style.display = 'none';
        // anchorThreeDots.style.display = 'none'             //hides the three dots element when edit is clicked

        [showAnswerButton, anchorThreeDots].map(el=>el.style.display = 'none');
        showAnswerButtonContainer.removeChild(containerForAgainGoodEasyButtons);
        mainWindow.removeChild(showAnswerButtonContainer);
        [editLogo, pauseAndEditText].forEach(el=> el = el.style.display = 'block');
       

        dataBase.DeckNames[item].pauseSwitch = false
        console.log(dataBase.DeckNames[item].pauseSwitch, 'pauseSwitch status')
        // console.log(dataBase.DeckNamses[item.pauseSwitch, 'pauseswitch'])

        //inputCheckbox.checked = true

        questionContainer.style.marginTop = '37px' //more  space for edit mode text needed, changed back to default via discard and save button
      },

      pause: (container, playIcon, pauseIcon, edited) => {

        if (dataBase.showDeleteFrameQuestion) {
          deleteCardQuestionBox(() =>
            dataBase.DeckNames[item].data[index].pause = true, () => {
              questAnswerTrainOverv(item),
                (data)=>createDom(data), clearInterval(decrementTimer)
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

    }, { top: '-15px', left: '13px' }, 'card', { marginTop: '0px' }


  )

  theNameOftheDeckAndRedCrossContainer.append(anchorThreeDots)

    anchorThreeDots.classList.add('threeDotsStyling')




  showAnswerButton.onclick = function () {

    if (dataBase.DeckNames[item].pauseSwitch === true) { //checks whether pause switch was clicked next to three dots / default is false

      // answerContainer.style.display = 'none';
      // answerFieldTextArea.style.display = 'none';
      [answerContainer, answerFieldTextArea].map(el=> el.style.display = 'none');
    } else {

    this.style.display = 'none';
    [answerContainer, answerFieldTextArea].map(el=> el.style.display = 'block');
     
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


  let editLogo = createElement('div', edit, {}, 'editAndPauseLogo')

  let pauseLogo = createElement('div', pause, {}, 'editAndPauseLogo')

  let pauseAndEditText = createElement('div', 'mode', {}, 'pauseAndEditText')


  function display() {

    [answerFieldTextArea, answerContainer, showAnswerButtonContainer].map(el=>el.style.display = 'none')

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

        let newRandomNumber = Math.floor(Math.random() * 10);
        while (randomNum == newRandomNumber) {
          newRandomNumber = Math.floor(Math.random() * 10);
        }

        randomNum = newRandomNumber
        console.log(randomNum)
      }
      if (el === `${middleName}`) {
        let newRandomNumber = Math.floor(Math.random() * (100 - 60 + 1) + 60);
        while (randomNum == newRandomNumber) {
          newRandomNumber = Math.floor(Math.random() * (100 - 60 + 1) + 60);
        }

        randomNum = newRandomNumber


        console.log(randomNum)
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


  saveButton.onclick = function () {
    setThreeDotsOpen(false);
    questionContainer.style.marginTop = '20px' //place for edit mode text not needed anymore, changed back to default


    cardModifiedPrompt.style.display = 'block'

    if (questionField.value !== questionFieldTextArea.value) { //only show modified when card was actually changed

      setTimeout(() => cardModifiedPrompt.style.display = 'none', 500) //message that card was changed appears for half a second
    }

    [answerFieldTextArea, questionFieldTextArea].map(el=> el.classList.add('answerAndQuestion'))
  

    mainWindow.insertBefore(showAnswerButtonContainer, buttonContainer);
    showAnswerButtonContainer.append(containerForAgainGoodEasyButtons);
    showAnswerButtonContainer.style.display = 'flex';
    saveAndDiscardContainer.classList.remove('flexSpaceAroundAlignCenter')
    anchorThreeDots.style.display = 'block'

    [editLogo, pauseAndEditText].map(el=>el.style.display = 'none');
    // editLogo.style.display = 'none'             //edit Logo dissapears that is active in card edit mode
    // pauseAndEditText.style.display = 'none'             //'mode' dissappears 
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

    // editLogo.style.display = 'none'  //edit Logo dissapears that is active in card edit mode
    // pauseAndEditText.style.display = 'none'
    [pauseAndEditText, editLogo].map(el=>el.style.display = 'none');
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


