import shuffle from "./shuffleButton.js";
import { startTimer, timer } from "./timer.js";
import { redCross as redCrossIcon } from "./svgs.js";
import { dataBase } from './dataBase.js';
import createDom from './createDom.js';

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
}

function generateTextarea(inner, style = {}) {
  let container = createElement('div', '', { ...style, width: '90%' });
  const label = createElement(
    'label',
    inner,
    {
      fontWeight: 'bold'
    }
  );

  let textarea = createElement(
    "textarea", '',
    {
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
  let decrementTimer = setInterval(()=>{
    dataBase.queue.forEach((card,index)=>{
      if(dataBase.queue[index].timeLeft>=1000){
        dataBase.queue[index].timeLeft-=1000
      }else{
        dataBase.queue[index].timeLeft = 0
      }
      console.log(dataBase.queue[index].timeLeft)
    })
    
  },1000)


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
    '',
    {
      width: "265px"
    },
    'flexSpaceBetween'
  );
  mainWindow.append(theNameOftheDeckAndRedCrossContainer);

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

  function close() {
    mainWindow.parentNode.removeChild(mainWindow);
    anchorElement.style.display = "none";
    clearInterval(timer);  //not implemented yet
    clearInterval(decrementTimer);
  }
  redCross.onclick = close


  // startTimer(item, index);

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


  theNameOftheDeckAndRedCrossContainer.append(redCross);
  //header
  let [questionContainer, questionFieldTextArea] = generateTextarea(
    'Question',
    {
      marginBottom: '20px',
      marginTop: '20px',
    }
  )
  mainWindow.appendChild(questionContainer);

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
  mainWindow.appendChild(buttonContainer)

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

  mainWindow.append(showAnswerButtonContainer);

  let [answerContainer, answerFieldTextArea] = generateTextarea(
    'Answer',
    {
      marginTop: '20px',
      display: 'none',
      position: 'relative'
    }
  )
  mainWindow.appendChild(answerContainer)
  let [question, answer, index] = shuffleLogic()

  showAnswerButton.onclick = function () {
    this.style.display = 'none';
    answerContainer.style.display = 'block';
    showAnswerButtonContainer.style.display = 'block';
  };

  let containerForAgainGoodEasyButtons = createElement(
    'div',
    '',
    {
      margin: '5px 0'
    }, 'flexSpaceBetween'
  );

  let containerForTimeButtons = createElement(
    'div',
    '',
    {
      margin: '0 auto',
      border: '1px black solid',
      width: '80%'
    }, 'flexSpaceBetween'
  );

  showAnswerButtonContainer.append(containerForTimeButtons);

  

  [1, 2, 20].forEach(el => {
    let btn = createElement('div', `<${el}m`, {});
    containerForTimeButtons.append(btn);
    btn.onclick = function(){
        dataBase.queue.push({question, answer, index,timeLeft: el*6000})
    }
  });

  //only count time when window is opened

  //let randomNum = Math.floor(Math.random() * 10 + 4); //good
  //let randomNum = Math.floor(Math.random() * 4 +2.1); //easy
  //let randomNum = Math.floor(Math.random() * 2); //again


  showAnswerButtonContainer.append(containerForAgainGoodEasyButtons);
  ["again", "good", "easy"].forEach((el) => {

    let button = createElement(
      "button",
      el,
      {
        pointer: 'cursor'
      },
      "generalButtonStyling"
    );

    button.addEventListener('click', function () {

      if (el === 'good') {

        //     let randomNum = Math.floor(Math.random() * 4 +2.1);
        //       // let randomNum = (Math.floor(Math.random() * (10-2.1+1)*60) + 2.1*60);

      }
      if (el === 'easy') {

        //     let randomNum = Math.floor(Math.random() * 10 + 4);
        //       // let randomNum = (Math.floor(Math.random() * (10-2.1+1)*60) + 2.1*60);


      }
    });

    containerForAgainGoodEasyButtons.append(button)

  });



  let settingsIconContainer = createElement(
    'div', '...',
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


  let opened = false;
  settingsIconContainer.onclick = function () {
     opened = !opened;
     littleModalWindow.style.display = opened ? "block" : "none";
  };



  let littleModalWindow = createElement(
    'div',
    '',
    {
      transform: 'rotate(-90deg)'
    },
    'littleModalWindow'
  )


  settingsIconContainer.appendChild(littleModalWindow);

  

["edit", "delete"].forEach((el) => {

  let button = createElement("button", el, {
    width: '100px',
    marginTop: '10px',
    marginLeft: '8px',
   },
    'generalButtonStyling'
  )
  
  littleModalWindow.append(button);


   button.onclick = function () {


    if (el === 'edit') {



       answerFieldTextArea.removeAttribute("disabled");
       questionFieldTextArea.removeAttribute("disabled");
       questionFieldTextArea.focus();
     

        showAnswerButtonContainer.removeChild(containerForTimeButtons);  
        showAnswerButtonContainer.removeChild(containerForAgainGoodEasyButtons);   



    let discardAndSaveContainer = createElement(
      'div',
      '',
    {
     border: '1px black solid',
     width: '60%',
    }, 'flexSpaceBetween'
  );



        showAnswerButtonContainer.append(discardAndSaveContainer);
     
        ["discard", "save"].forEach((el) => {

          let button = createElement("button", el, {
          }, 'generalButtonStyling'
        )
        discardAndSaveContainer.append(button);
      

      button.onclick = function () {
        if (el === 'discard') {
          showAnswerButtonContainer.removeChild(discardAndSaveContainer);
          showAnswerButtonContainer.append(containerForTimeButtons);
          showAnswerButtonContainer.append(containerForAgainGoodEasyButtons);

          showAnswerButtonContainer.style.display = 'block';
        }
 
        if (el === 'save') {

            //   question = questionFieldTextArea.value;
            //  answer = answerFieldTextArea.value;
            answerFieldTextArea.setAttribute("disabled", 'true');
            questionFieldTextArea.setAttribute("disabled", 'true');          

          showAnswerButtonContainer.removeChild(discardAndSaveContainer);
          showAnswerButtonContainer.append(containerForTimeButtons);
          showAnswerButtonContainer.append(containerForAgainGoodEasyButtons);

          showAnswerButtonContainer.style.display = 'block';
        }
      }


    }
 );
      
          


   }
  }


});
  


}


  
  
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



//   let dontShow = false;

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