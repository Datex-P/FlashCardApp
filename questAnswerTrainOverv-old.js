import shuffle from "./shuffleButton.js";
import { startTimer, timer } from "./timer.js";
import { redCross as redCrossIcon} from "./svgs.js";
import { dataBase } from './dataBase.js';
import createDom from './createDom.js';

let dontShow = false;
function popUp() {
  if (!dontShow) {

    let popUpWindowContainer = document.createElement('div');
    popUpWindowContainer.style.display = 'flex';
    popUpWindowContainer.style.flexDirection = 'column';
    popUpWindowContainer.style.width = '200px';
    popUpWindowContainer.style.height = '55px';
    popUpWindowContainer.style.backgroundColor = 'white';
    popUpWindowContainer.style.zIndex = '2';
    popUpWindowContainer.style.position = 'absolute';
    popUpWindowContainer.style.top = '120px';
    popUpWindowContainer.style.border = '1px black solid';
    popUpWindowContainer.style.justifyContent = 'space-between';
    popUpWindowContainer.style.borderRadius = '5px';
    popUpWindowContainer.style.marginLeft = '10%';

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');

    let dontShowInfo = document.createElement('div');
    dontShowInfo.innerHTML = `Don't show message again`;

    let cardRemovedInfo = document.createElement('div');
    cardRemovedInfo.innerHTML = 'Card was removed from deck';

    let dontShowAndCheckboxContainer = document.createElement('div');
    dontShowAndCheckboxContainer.style.display = 'flex';

    dontShowAndCheckboxContainer.append(checkbox);
    dontShowAndCheckboxContainer.append(dontShowInfo);

    popUpWindowContainer.append(cardRemovedInfo);
    popUpWindowContainer.append(dontShowAndCheckboxContainer);
    insideNameofDeckContainer.append(popUpWindowContainer);

    checkbox.onclick = function () {
      dontShow = true;
      popUpWindowContainer.style.display = 'none'
    }

    setTimeout(function () {
      popUpWindowContainer.style.display = 'none'
      
    }, 500000);

  }
}


function createElement(tag='div',inner='', style={}, className='', id='') {

  
  let element = document.createElement(tag);
  element.innerHTML = inner;
  element.id = id;

  element.className = className;
  for (let prop in style) {
    element.style[prop] = style[prop]
  }
  return element
}



export default function questAnswerTrainOverv(item) {
  let anchorElement = document.getElementById("questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let mainWindow = createElement('div','',{},'addQuestionsToDeck')
  // mainWindow.className = "addQuestionsToDeck";

  let innerWindow = createElement('div','',{
    margin: "20px",
    border: '1px black solid',
    height: '100%',
    display:'flex',
    flexDirection: 'column'
  })

  
  let theNameOftheDeckAndRedCrossContainer = createElement('div','',{
    width: "265px",
    marginLeft: "4px",
    border:'1px black solid'},
    'flexSpaceBetween')


  // let redCross = createElement('div', redCrossIcon, {
  //   cursor: 'pointer'
  // }, 'redCross');


  let showAnswerButton = createElement('button', 'Show Answer', {
    marginLeft: '8px',
    cursor: 'pointer'
  }, '', 'showAnswerButton');


  let containerForText1DayEtc = createElement('div', '', {
    display: 'none',
    width : '205px',
    marginLeft: '20px',
    marginBottom: '2px',
    border: '1px black solid'
  }, '', '');



  let containerForAgainGoodEasyButtons = createElement('div', '', {
    display: 'flex',
    justifyContent: 'space-between',
  }, '', '');


  let container2min = document.createElement('div');
      container2min.style.display = 'flex';
      container2min.style.justifyContent = 'space-between';
      container2min.style.width = '80%';
      //can I use margin for this box?


  ['<2m', '<10m', '<2d'].forEach(el => {
    let smallerThan = document.createElement('div');
    smallerThan.innerText = el;
    container2min.append(smallerThan);
  });

  ["again", "good", "easy"].forEach((el) => {
    let button = document.createElement("button");
    button.innerText = el;
    button.className = "againGoodEasyButton";

    button.onmouseover = function (e) {
      e.target.style.cursor = 'pointer';
    }
  
    button.addEventListener('click', function () {


      if (el === 'again') {
        shuffleLogic(); //different kinds of shuffle logic     

        let randomNum = Math.floor(Math.random() * 3);

        setTimeout(function () {

          button.addEventListener('click', function () {
            questionFieldTextArea.value = dataBase.DeckNames[item][index].question
            answerFieldTextArea.value = dataBase.DeckNames[item][index].answer
          })

        }, randomNum * 1000);

        display();
      }

      if (el == 'good') {
        shuffleLogic();
        display();
        
        let randomNum = Math.floor(Math.random() * 3);
        
        setTimeout(function() {
          
          button.addEventListener('click', function () {
            questionFieldTextArea.value =  dataBase.DeckNames[item][index].question
            answerFieldTextArea.value = dataBase.DeckNames[item][index].answer
          })
          
          
          
        }, randomNum * 1000);
        
      }


      if (el === 'again') {
        shuffleLogic();

        
        let randomNum = Math.floor(Math.random() * 3);
        
        setTimeout(function() {
          
          button.addEventListener('click', function () {
            questionFieldTextArea.value =  dataBase.DeckNames[item][index].question
            answerFieldTextArea.value = dataBase.DeckNames[item][index].answer
          })
          
        }, randomNum * 1000);
        
        display();
      };
    })
    containerForAgainGoodEasyButtons.append(button)
  });










  let theNameofTheDeck = document.createElement("div");
      theNameofTheDeck.innerHTML = `Deck: ${item}`;


      function generateTextarea(inner, style={}){
        let container = document.createElement('div');
        const label = document.createElement('label');
        label.innerHTML = inner;
        label.style.fontWeight = 'bold';
        label.style.marginBottom = '10px';
        let textarea = document.createElement("textarea");
        textarea.className = "textareaStyling";
        textarea.setAttribute("disabled", "true");
        textarea.style.backgroundColor = "white";
        container.appendChild(label)
        container.appendChild(textarea)

        for(let prop in style){
          container.style[prop] = style[prop]
        }

        return container

      };


   showAnswerButton.onclick = function () {

    //why can t I hide showAnswerButton with this


      //this.style.display = "none";

        generateTextarea('Answer', {marginTop: '20px', display: 'none'})

        innerWindow.childNodes[3].style.display = 'none';

//        innerWindow.children[3].display
  //   theWordAnswer.style.display = "block";
     // this.style.display = 'none';
     containerForText1DayEtc.style.display = 'flex';
     containerForText1DayEtc.style.justifyContent = 'space-between';
     containerForText1DayEtc.style.flexDirection = 'column';


    containerForAgainGoodEasyButtons.style.display = 'flex';
    containerForAgainGoodEasyButtons.style.justifyContent = 'space-between';

    this.style.display = "none";
    settingsIconContainer.style.display = "block";
   };

  let settingsIconContainer = createElement('div','...',{
    transform: 'rotate(90deg)',
    fontWeight: 'bold',
    marginTop:'5px',
    display: 'none',
    position: 'absolute',
    cursor: 'pointer'
  },
    '', '');





  settingsIconContainer.onclick = function () {
    opened = !opened;
    littleModalWindow.style.display = opened ? "block" : "none";
  };
  
  settingsIconContainer.appendChild(littleModalWindow);















      
      theNameOftheDeckAndRedCrossContainer.append(theNameofTheDeck);
      //theNameOftheDeckAndRedCrossContainer.append(redCross);
      innerWindow.append(theNameOftheDeckAndRedCrossContainer);

      innerWindow.appendChild(generateTextarea('Question',{marginBottom:'20px',marginTop:'20px'}))

      containerForText1DayEtc.append(container2min);
      containerForText1DayEtc.append(containerForAgainGoodEasyButtons);
      showAnswerButton.append(containerForText1DayEtc);
      innerWindow.append(showAnswerButton);


  //innerWindow.childNodes[3].append(settingsIconContainer)    
  innerWindow.appendChild(generateTextarea('Answer',{marginTop:'20px'}))
  mainWindow.append(innerWindow);
  anchorElement.append(mainWindow);

  
}


  ["again", "good", "easy"].forEach((el) => {
    let button = document.createElement("button");
    button.innerText = el;
    button.className = "againGoodEasyButton";

    button.onmouseover = function (e) {
      e.target.style.cursor = 'pointer';
    };

    button.addEventListener('click', function () {


      if (el === 'again') {
        shuffleLogic(); //different kinds of shuffle logic     

        let randomNum = Math.floor(Math.random() * 3);

        setTimeout(function () {

          button.addEventListener('click', function () {
            questionFieldTextArea.value = dataBase.DeckNames[item][index].question
            answerFieldTextArea.value = dataBase.DeckNames[item][index].answer
          })

        }, randomNum * 1000);

        display();
      }



      if (el == 'good') {
        shuffleLogic();
        display();
        
        let randomNum = Math.floor(Math.random() * 3);
        
        setTimeout(function() {
          
          button.addEventListener('click', function () {
            questionFieldTextArea.value =  dataBase.DeckNames[item][index].question
            answerFieldTextArea.value = dataBase.DeckNames[item][index].answer
          })
          
          
          
        }, randomNum * 1000);
        
      }


      if (el === 'again') {
        shuffleLogic();

        
        let randomNum = Math.floor(Math.random() * 3);
        
        setTimeout(function() {
          
          button.addEventListener('click', function () {
            questionFieldTextArea.value =  dataBase.DeckNames[item][index].question
            answerFieldTextArea.value = dataBase.DeckNames[item][index].answer
          })
          
        }, randomNum * 1000);
        
        display();
      };
    })
   // containerForAgainGoodEasyButtons.append(button)
  });




  let insideNameofDeckContainer = document.createElement("div");
  insideNameofDeckContainer.style.marginTop = "30px";
  insideNameofDeckContainer.id = "insideNameofDeckContainer";

  let littleModalWindow = document.createElement("div");
  littleModalWindow.classList.add("littleModalWindow");
  littleModalWindow.style.transform = 'rotate(-90deg)';

  let opened = false;
  ["edit", "delete"].forEach((el) => {

    let button = document.createElement("button");
    button.innerText = el;
    button.className = "againGoodEasyButton";
    button.style.width = "100px";
    button.style.marginTop = "10px";
    button.style.marginLeft = "8px";
    button.style.cursor = 'pointer';
    
    button.onclick = function () {

      if (el === 'edit') {

       // containerForButtons.style.display = 'flex';
       // containerForButtons.style.justifyContent = 'center';

        answerFieldTextArea.removeAttribute("disabled");
        questionFieldTextArea.removeAttribute("disabled");
        questionFieldTextArea.focus();
        // mainWindow.style.backgroundColor = 'rgba(0,0,0,0.7)'

        containerForAgainGoodEasyButtons.parentNode.removeChild(containerForAgainGoodEasyButtons);
        containerForText1DayEtc.parentNode.removeChild(containerForText1DayEtc);

                  
        let buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.border = '1px black solid';
        containerForButtons.append(buttonContainer);


        ["discard", "save"].forEach((el) => {

          let button = document.createElement("button");
          button.innerText = el;
          button.className = "againGoodEasyButton";
          button.style.width = "100px";
          button.style.marginTop = "10px";
          button.style.marginLeft = "8px";
          button.style.cursor = 'pointer';


          buttonContainer.append(button);
          
          
          button.onclick = function () {
            if (el === 'discard') {


              answerFieldTextArea.style.border = 'none';
              questionFieldTextArea.style.border = 'none';
              answerFieldTextArea.style.outline = 'none';
              questionFieldTextArea.style.border = 'none';

              containerForButtons.style.marginRight = '55px';

              containerForsmallerTwoMinutesEtc.append(containerForText1DayEtc);
              containerForsmallerTwoMinutesEtc.append(containerForAgainGoodEasyButtons);
              buttonContainer.parentNode.removeChild(buttonContainer);

              answerFieldTextArea.setAttribute("disabled", 'true');
              questionFieldTextArea.setAttribute("disabled", 'true');

            }
            if (el === 'save') {

           //   question = questionFieldTextArea.value;
            //  answer = answerFieldTextArea.value;
            answerFieldTextArea.setAttribute("disabled", 'true');
            questionFieldTextArea.setAttribute("disabled", 'true');

              containerForsmallerTwoMinutesEtc.append(containerForAgainGoodEasyButtons);
              buttonContainer.parentNode.removeChild(buttonContainer);
              shuffleLogic();


            }





          }


          
        });




    }




       else if (el === 'delete') {

        dataBase.DeckNames[item].splice(index, 1);
        createDom(dataBase.DeckNames)
        
        if (dataBase.DeckNames[item].length) {
          shuffleLogic();
        } else {
          close()
        }
        popUp();
      }
    }
    littleModalWindow.appendChild(button);
  });

  let settingsIconContainer = document.createElement("div");
  settingsIconContainer.innerHTML = '...'
  settingsIconContainer.style.transform = 'rotate(90deg)';
  settingsIconContainer.style.fontWeight = 'bold';
  settingsIconContainer.style.marginTop = '5px';
  settingsIconContainer.style.display = "none";
  settingsIconContainer.style.position = "relative";
  settingsIconContainer.style.cursor = 'pointer';

  settingsIconContainer.onclick = function () {
    opened = !opened;
    littleModalWindow.style.display = opened ? "block" : "none";
  };
  
  settingsIconContainer.appendChild(littleModalWindow);


  let showAnswerButton = document.createElement("button");
  showAnswerButton.innerHTML = "Show Answer";
  showAnswerButton.id = "showAnswerButton";
  showAnswerButton.style.marginLeft = "8px";
  showAnswerButton.style.cursor = "pointer";


  let theNameOftheDeckAndRedCrossContainer = document.createElement("div");
  theNameOftheDeckAndRedCrossContainer.style.width = "265px";
  theNameOftheDeckAndRedCrossContainer.className = 'flexSpaceBetween'
  theNameOftheDeckAndRedCrossContainer.style.marginLeft = "4px";
  theNameOftheDeckAndRedCrossContainer.style.border = '1px black solid';

  let theNameofTheDeck = document.createElement("div");
  //theNameofTheDeck.innerHTML = `Deck: ${item}`;

  let redCross = document.createElement("div");
  redCross.innerHTML = redCrossIcon;
  redCross.className = 'redCross';
  redCross.style.cursor = 'pointer';

  let theWordQuestion = document.createElement("div");
  theWordQuestion.className = "theWordQuestionAndAnswer";
  theWordQuestion.innerHTML = "Question";

  let theWordAnswer = document.createElement("div");
  theWordAnswer.innerHTML = "Answer";
  theWordAnswer.className = "theWordQuestionAndAnswer";
  theWordAnswer.style.display = "none";
  theWordAnswer.style.marginTop = '5px';

  let questionFieldTextArea = document.createElement("textarea");
  questionFieldTextArea.className = "textareaStyling";
  questionFieldTextArea.setAttribute("disabled", "true");
  questionFieldTextArea.style.backgroundColor = "white";
  questionFieldTextArea.title = 'imput smth here'

  let answerFieldTextArea = document.createElement("textarea");
  answerFieldTextArea.style.display = "none";
  answerFieldTextArea.className = "textareaStyling";
  answerFieldTextArea.setAttribute("disabled", "true");
  answerFieldTextArea.style.backgroundColor = "white";

  let theWordAnswerContainer = document.createElement("div");
  theWordAnswerContainer.className = 'flexSpaceBetween'
  //theWordAnswerContainer.style.border = '1px black solid';
  theWordAnswerContainer.style.width = "270px";

  let innerWindow = document.createElement("div");
  innerWindow.style.marginTop = "20px";
  innerWindow.style.marginLeft = "30px";

  //let [question, answer, index] = shuffle(item);
  questionFieldTextArea.value = question;
  answerFieldTextArea.innerText = answer;

  function display() {
    answerFieldTextArea.style.display = "none";
    theWordAnswer.style.display = "none";
    containerForText1DayEtc.style.display = "none";
    containerForAgainGoodEasyButtons.style.display = "none";
    showAnswerButton.style.display = "block";
    settingsIconContainer.style.display = "none";
  }

 


  showAnswerButton.onclick = function () {

    answerFieldTextArea.style.display = "block";
    theWordAnswer.style.display = "block";
    containerForText1DayEtc.style.display = 'flex';
    containerForText1DayEtc.style.justifyContent = 'space-between';

    containerForAgainGoodEasyButtons.style.display = 'flex';
    containerForAgainGoodEasyButtons.style.justifyContent = 'space-between';

    this.style.display = "none";
    settingsIconContainer.style.display = "block";
  };



  startTimer(item, index);

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

  function close() {
    mainWindow.parentNode.removeChild(mainWindow);
    anchorElement.style.display = "none";
    clearInterval(timer);
  }
  redCross.onclick = close




