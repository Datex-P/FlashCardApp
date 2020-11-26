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
  redCross
} from './exportFunctions.js'
import {
  edit,
  trash, questionMark
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

  container.appendChild(label)
  container.appendChild(textarea)
  return [container, textarea]
};


export default function questAnswerTrainOverv(item) {
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

  let threeDotsOpen = false;

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




  let deleteContainerFrame = createElement('div', '', {
 
  }, 'deleteContainerFr');

  let deleteContainerInner = createElement('div', '', {
   // backgroundColor: 'white',
    position: 'absolute',
    top: '60px',
    height: '65px',
    width: '220px',
    height: '200px',
    backgroundColor: 'white',
    borderRadius: '10px'
    //border: '2px solid black'
  }, 'flexCenterAlignCenter')

  let deleteContainerYes = createElement('div', 'Yes', {
    width: '60px',
    height: '35px',
    color: 'white',
   // top: '135px',
    //right: '20px',
    borderRadius: '12px'
  }, 'flexCenterAlignCenter deleteContainerYes')


  let deleteContainerNo = createElement('div', 'Cancel', {
    width: '60px',
    height: '35px',
    color: 'white',
    //top: '135px',
    //left: '-18px',
    borderRadius: '12px'
  }, 'flexCenterAlignCenter deleteContainerNo');


  deleteContainerYes.onclick = function () {
    threeDotsOpen = false
    deleteContainerFrame.style.display = 'none'
  }

  deleteContainerNo.onclick = function () {
    threeDotsOpen = false
    deleteContainerFrame.style.display = 'none'
  }

  let deleteHeader = createElement('div', '', {width: '100%', position: 'absolute', top: '0px', backgroundColor: 'rgba(200, 168, 115, 0.95)', height: '33px', borderRadius: '10px 10px 0px 0px'})

  let messageDeleteCard = createElement('div', 'Delete Card', {height: '28px', color: 'white'}, 'flexCenterAlignCenter')

  let deleteYesAndNoContainer = createElement('div', '', {width: '245px', zIndex: '2', height: '50px', border: '1px black solid'}, 'flexSpaceAround');
  let dontShowMessageAgainContainer = createElement('div', '', {width: '300px', height: '60px', display: 'flex', justifyContent: 'center'}, 'flexCenter');
  let dontShowMessageText = createElement('div', "Don't show message again", {width: '200px', color: 'white', border: '1px black solid'});
  

  let doYouWantToDelete = createElement('div', 'Do you want to delete this card?', {position: 'absolute', right:'4px', top: '59px', zIndex: '2'});

  let questionMark1 = createElement('div', questionMark, { position: 'absolute', top: '-34px', right: '-36px' });
  let questionMark2 = createElement('div', questionMark, { position: 'absolute', top: '-24px', right: '-20px' });
  let questionMark3 = createElement('div', questionMark, { position: 'absolute', top: '-68px', right: '-20px' });
  
  let checkBoxContainer = createElement('div', '', {width: '40px'}, 'checkBoxContainer');
  let checkbox = createElement('input', '', {width: '45px'});
      checkbox.setAttribute('type', 'checkbox');

      checkbox.onchange = function(e) {
        dataBase.showDeleteFrame = !e.target.checked;
      }
      
  

  mainWindow.append(deleteContainerFrame);
  deleteContainerFrame.append(deleteContainerInner);
  deleteContainerInner.append(doYouWantToDelete)
  
  deleteContainerInner.append(deleteHeader)
  deleteHeader.append(messageDeleteCard)


  deleteContainerFrame.append(deleteYesAndNoContainer);
  deleteYesAndNoContainer.append(deleteContainerNo);
  deleteYesAndNoContainer.append(deleteContainerYes);
  deleteContainerInner.append(questionMark1);
  deleteContainerInner.append(questionMark2);
  deleteContainerInner.append(questionMark3);
  deleteContainerFrame.append(dontShowMessageAgainContainer);
  dontShowMessageAgainContainer.append(checkBoxContainer)
  checkBoxContainer.append(checkbox)
  dontShowMessageAgainContainer.append(dontShowMessageText);

  let dontShow = false;

  //   function popUp() {
  //     if (!dontShow) {
  //       let popUpWindowContainer = createElement(
  //         'div',
  //         '',
  //         {
  //           display: 'flex',
  //           flexDirection: column,
  //           width: '200px',
  //           height: '55px',
  //           backgroundColor: 'white',
  //           zIndex: '2',
  //           position: 'absolute',
  //           top: '120px',
  //           border: '1px black solid',
  //           justifyContent: 'space-between',
  //           borderRadius: '5px',
  //           marginLeft: '10%'
  
  //         }
  //       );
  
  //       let checkbox = createElement(
  //         'input',
  //         '',
  //         {});
  //       checkbox.setAttribute('type', 'checkbox');
  
  //       let dontShowInfo = createElement(
  //         'div',
  //         `Don't show message again`,
  //         {});
  
  //       let cardRemovedInfo = createElement(
  //         'div',
  //         'Card was removed from deck',
  //         {}
  //       );
  
  //       let dontShowAndCheckboxContainer = createElement(
  //         'div',
  //         '',
  //         {
  //           display: 'flex'
  //         }
  //       )
  
  
  //       checkbox.onclick = function () {
  //         dontShow = true;
  //         popUpWindowContainer.style.display = 'none';
  //       }
  
  
  //     }

















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
    '', {
    display: 'none',
    width: 'calc(90% - 2px)',
    height: '94px',
    padding: '20px',
    borderRadius: '5px',
    border: '1px solid grey',
    boxSizing: 'border-box',
    marginTop: '10px'
  }
  )

  mainWindow.append(showAnswerButtonContainer);

  let [answerContainer, answerFieldTextArea] = generateTextarea(
    'Answer', {
    marginTop: '20px',
    display: 'none',
  }
  )
  mainWindow.appendChild(answerContainer)


  let saveAndDiscardContainer = createElement('div', '', {
    display: 'none',
    width: '166px',
    height: '71px',
    top: '388px',
    position: 'absolute',
    border: '1px grey solid',
    borderRadius: '5px'
  })


  let [saveButton, discardButton] = ['Save', 'Discard'].map(el => {
    return createElement('div', el, {
      fontSize: '14px',
      //backgroundColor: '#81b29a',
    }, 'generalButtonStyling flexCenterAlignCenter')
  })

  saveButton.style.backgroundColor = '#2d6a4f';
  //discardButton.style.backgroundColor = '#c44536';
  discardButton.style.backgroundColor = '#772e25';




  mainWindow.append(saveAndDiscardContainer);
  saveAndDiscardContainer.append(discardButton);
  saveAndDiscardContainer.append(saveButton);





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

        dataBase.queue.push({
          question,
          answer,
          index,
          timeLeft: randomNum * 1000
        })

      }

      if (el == 'good') {

        let randomNum = (Math.floor(Math.random() * (100 - 60 + 1) + 60));

        dataBase.queue.push({
          question,
          answer,
          index,
          timeLeft: randomNum * 1000
        })
      }

      if (el === 'easy') {
        let randomNum = (Math.floor(Math.random() * 3000));

        dataBase.queue.push({
          question,
          answer,
          index,
          timeLeft: randomNum * 1000
        })
      };
    })
    containerForAgainGoodEasyButtons.append(button)

  });



  let settingsIconContainer = createElement(
    'div', '...', {
    transform: 'rotate(90deg)',
    fontWeight: 'bold',
    position: 'absolute',
    cursor: 'pointer',
    top: '15px',
    right: '66px',
    fontSize: '25px'
  }
  );

  settingsIconContainer.title = 'Edit question and answer or delete card';

  theNameOftheDeckAndRedCrossContainer.appendChild(settingsIconContainer)



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

  littleModalWindow.append(editIconContainer);
  littleModalWindow.append(trashIconContainer);


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

  editIconContainer.append(editIcon);
  editIconContainer.append(editIconText);
  trashIconContainer.append(trashIcon);
  trashIconContainer.append(trashIconText);


  trashIconContainer.onclick = function (e) {

    if (dataBase.showDeleteFrame) {
      threeDotsOpen = true;
      deleteContainerFrame.style.display = 'flex'
    }else{
      e.stopPropagation()
      threeDotsOpen = false;
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



  editIconContainer.onclick = function () {
    threeDotsOpen = true;
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
    showAnswerButtonContainer.removeChild(containerForTimeButtons);
    showAnswerButtonContainer.removeChild(containerForAgainGoodEasyButtons);
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



  saveButton.onclick = function () {
    threeDotsOpen = false;

    littleModalWindow.style.display = "none";
    answerFieldTextArea.style.border = 'none';
    questionFieldTextArea.style.border = 'none';
    answerFieldTextArea.style.outline = 'none';
    questionFieldTextArea.style.border = 'none';

    mainWindow.insertBefore(showAnswerButtonContainer, buttonContainer);
    showAnswerButtonContainer.append(containerForTimeButtons);
    showAnswerButtonContainer.append(containerForAgainGoodEasyButtons);
    showAnswerButtonContainer.style.display = 'block';
    saveAndDiscardContainer.style.display = 'none';

    question = questionFieldTextArea.value;
    answer = answerFieldTextArea.value;


  }


  discardButton.onclick = function () {
    threeDotsOpen = false;

    answerFieldTextArea.style.border = 'none';
    questionFieldTextArea.style.border = 'none';
    answerFieldTextArea.style.outline = 'none';
    questionFieldTextArea.style.border = 'none';

    mainWindow.insertBefore(showAnswerButtonContainer, buttonContainer);
    showAnswerButtonContainer.append(containerForTimeButtons);
    showAnswerButtonContainer.append(containerForAgainGoodEasyButtons);
    showAnswerButtonContainer.style.display = 'block';
    saveAndDiscardContainer.style.display = 'none';
  }








}


// [edit, trash].forEach((el) => {

//   let button = createElement("div", el, {
//     innerText: 'Trash',
//     width: '100px',
//     marginTop: '10px',
//     marginLeft: '8px',
//    },
//     'generalButtonStyling'
//   )

//   littleModalWindow.append(button);


//    button.onclick = function () {


//     if (el === 'edit') {

//        showAnswerButtonContainer.style.display = 'flex';
//        showAnswerButtonContainer.style.justifyContent = 'center';



//        answerFieldTextArea.removeAttribute("disabled");
//        questionFieldTextArea.removeAttribute("disabled");
//        questionFieldTextArea.focus();


//         showAnswerButtonContainer.removeChild(containerForTimeButtons);  
//         showAnswerButtonContainer.removeChild(containerForAgainGoodEasyButtons);   



//     let discardAndSaveContainer = createElement(
//       'div',
//       '',
//     {
//      border: '1px black solid',
//      width: '60%',
//     }, 'flexSpaceBetween'
//   );



//         showAnswerButtonContainer.append(discardAndSaveContainer);

//         ["discard", "save"].forEach((el) => {

//           let button = createElement("button", el, {
//           }, 'generalButtonStyling'
//         )
//         discardAndSaveContainer.append(button);


//       button.onclick = function () {
//         if (el === 'discard') {
//           showAnswerButtonContainer.removeChild(discardAndSaveContainer);
//           showAnswerButtonContainer.append(containerForTimeButtons);
//           showAnswerButtonContainer.append(containerForAgainGoodEasyButtons);

//           showAnswerButtonContainer.style.display = 'block';
//         }

//         if (el === 'save') {

//             //   question = questionFieldTextArea.value;
//             //  answer = answerFieldTextArea.value;
//             answerFieldTextArea.setAttribute("disabled", 'true');
//             questionFieldTextArea.setAttribute("disabled", 'true');          

//           showAnswerButtonContainer.removeChild(discardAndSaveContainer);
//           showAnswerButtonContainer.append(containerForTimeButtons);
//           showAnswerButtonContainer.append(containerForAgainGoodEasyButtons);

//           showAnswerButtonContainer.style.display = 'block';
//         }
//       }

//     }
//  );




//    }
//   }


// });



// }




//   button.onclick = function () {
//     if (el === 'discard') {


//       answerFieldTextArea.style.border = 'none';
//       questionFieldTextArea.style.border = 'none';
//       answerFieldTextArea.style.outline = 'none';
//       questionFieldTextArea.style.border = 'none';

//       containerForButtons.style.marginRight = '55px';

//       containerForsmallerTwoMinutesEtc.append(containerForText1DayEtc);
//       containerForsmallerTwoMinutesEtc.append(containerForAgainGoodEasyButtons);
//       buttonContainer.parentNode.removeChild(buttonContainer);

//       answerFieldTextArea.setAttribute("disabled", 'true');
//       questionFieldTextArea.setAttribute("disabled", 'true');

//     }
//     if (el === 'save') {

//    //   question = questionFieldTextArea.value;
//     //  answer = answerFieldTextArea.value;
//     answerFieldTextArea.setAttribute("disabled", 'true');
//     questionFieldTextArea.setAttribute("disabled", 'true');

//       containerForsmallerTwoMinutesEtc.append(containerForAgainGoodEasyButtons);
//       buttonContainer.parentNode.removeChild(buttonContainer);
//       shuffleLogic();


//     }

//   }


// });



//   


//   }

// }



















// 
// let dontShow = false;
// function popUp() {
//   if (!dontShow) {

//     let popUpWindowContainer = document.createElement('div');
//     popUpWindowContainer.style.display = 'flex';
//     popUpWindowContainer.style.flexDirection = 'column';
//     popUpWindowContainer.style.width = '200px';
//     popUpWindowContainer.style.height = '55px';
//     popUpWindowContainer.style.backgroundColor = 'white';
//     popUpWindowContainer.style.zIndex = '2';
//     popUpWindowContainer.style.position = 'absolute';
//     popUpWindowContainer.style.top = '120px';
//     popUpWindowContainer.style.border = '1px black solid';
//     popUpWindowContainer.style.justifyContent = 'space-between';
//     popUpWindowContainer.style.borderRadius = '5px';
//     popUpWindowContainer.style.marginLeft = '10%';

//     let checkbox = document.createElement('input');
//     checkbox.setAttribute('type', 'checkbox');

//     let dontShowInfo = document.createElement('div');
//     dontShowInfo.innerHTML = `Don't show message again`;

//     let cardRemovedInfo = document.createElement('div');
//     cardRemovedInfo.innerHTML = 'Card was removed from deck';

//     let dontShowAndCheckboxContainer = document.createElement('div');
//     dontShowAndCheckboxContainer.style.display = 'flex';

//     dontShowAndCheckboxContainer.append(checkbox);
//     dontShowAndCheckboxContainer.append(dontShowInfo);

//     popUpWindowContainer.append(cardRemovedInfo);
//     popUpWindowContainer.append(dontShowAndCheckboxContainer);
//     insideNameofDeckContainer.append(popUpWindowContainer);

//     checkbox.onclick = function () {
//       dontShow = true;
//       popUpWindowContainer.style.display = 'none'
//     }

//     setTimeout(function () {
//       popUpWindowContainer.style.display = 'none'

//     }, 500000);

//   }
// }


// }







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