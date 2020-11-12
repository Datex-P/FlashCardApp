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

  let mainWindow = createElement('div','',{},'addQuestionsToDeck')
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
    let [questionContainer,questionFieldTextArea] = generateTextarea(
      'Question',
      {
        marginBottom:'20px',
        marginTop:'20px',
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

    let [answerContainer,answerFieldTextArea] = generateTextarea(
      'Answer',
      {
        marginTop:'20px',
        display:'none',
        position: 'relative'
      }
    )
    mainWindow.appendChild(answerContainer)
    shuffleLogic()

    showAnswerButton.onclick = function () {
      this.style.display = 'none';
      answerContainer.style.display = 'block';
      showAnswerButtonContainer.style.display = 'block';
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
        "generalButtonStyling"
      );

      button.addEventListener('click', function () {


        if (el === 'again') {
          shuffleLogic();
          showAnswerButton.style.display = 'block';
          // shuffleLogic(); //different kinds of shuffle logic     
  
          // let randomNum = Math.floor(Math.random() * 2);
          // //let randomNum = Math.floor(Math.random *2*60)

          //remember card and deactivate if for a certain period of time

          // setTimeout(function () {
  
          //   button.addEventListener('click', function () {
          //     questionFieldTextArea.value = dataBase.DeckNames[item][index].question
          //     answerFieldTextArea.value = dataBase.DeckNames[item][index].answer
          //   })
  
          // }, randomNum * 1000); //right now card gets shown again after 2 sec, normally the formula is : 2 * 60 * 10000
  
          // display();
        }
  
        if (el == 'good') {
          shuffleLogic();
          showAnswerButton.style.display = 'block';
          
          let randomNum = Math.floor(Math.random() * 3);

         // let randomNum = (Math.floor(Math.random() * (10-2.1+1)*60) + 2*60);
          //var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
          //https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
          
          // setTimeout(function() {
            
          //   button.addEventListener('click', function () {
          //     questionFieldTextArea.value =  dataBase.DeckNames[item][index].question
          //     answerFieldTextArea.value = dataBase.DeckNames[item][index].answer
          //   })
            
            
            
          // }, randomNum * 1000);
          
        }
  
        if (el === 'easy') {
          shuffleLogic();
          showAnswerButton.style.display = 'block';
  
          
          let randomNum = Math.floor(Math.random() * 4);
            // let randomNum = (Math.floor(Math.random() * (10-2.1+1)*60) + 3*60);

          // setTimeout(function() {
            
          //   button.addEventListener('click', function () {
          //     questionFieldTextArea.value =  dataBase.DeckNames[item][index].question
          //     answerFieldTextArea.value = dataBase.DeckNames[item][index].answer
          //   })
            
          // }, randomNum * 1000);
         
        };
      })



  
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
  //  opened = !opened;
  //  littleModalWindow.style.display = opened ? "block" : "none";
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



    let dontShow = false;

  function popUp () {
      if (!dontShow) {
        let popUpWindowContainer = createElement(
          'div',
          '',
          {
            display: 'flex',
            flexDirection: column,
            width: '200px',
            height: '55px',
            backgroundColor: 'white',
            zIndex: '2',
            position: 'absolute',
            top: '120px',
            border: '1px black solid',
            justifyContent: 'space-between',
            borderRadius: '5px',
            marginLeft: '10%'

          }
        );

      let checkbox = createElement(
          'input',
          '',
          { });
        checkbox.setAttribute('type', 'checkbox');
        
      let dontShowInfo = createElement(
        'div',
        `Don't show message again`,
         {});

      let cardRemovedInfo = createElement(
        'div',
        'Card was removed from deck',
        {}
      );

      let dontShowAndCheckboxContainer = createElement(
        'div',
        '',
        {
          display: 'flex'
        }
      )


    checkbox.onclick = function () {
      dontShow = true;
      popUpWindowContainer.style.display = 'none';
    }


      }


    }

  }



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