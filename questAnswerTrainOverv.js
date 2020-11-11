import shuffle from "./shuffleButton.js";
import { startTimer, timer } from "./timer.js";
import { redCross as redCrossIcon} from "./svgs.js";
import { dataBase } from './dataBase.js';
import createDom from './createDom.js';

function createElement(tag='div',inner='', style={}, className=null, id=null) {

  let element = document.createElement(tag);

  element.innerHTML = inner;
  if(id){
    element.id = id;
  }
  if(className){
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
  return container
};



export default function questAnswerTrainOverv(item) {
  let anchorElement = document.getElementById("questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let innerWindow = createElement('div','',{},'addQuestionsToDeck')
  anchorElement.appendChild(innerWindow);
  
  //header
    let theNameOftheDeckAndRedCrossContainer = createElement(
      'div',
      '',
      {
        width: "265px"
      },
      'flexSpaceBetween'
    )
    innerWindow.append(theNameOftheDeckAndRedCrossContainer);

    let theNameofTheDeck = createElement(
      "div",
      `Deck: ${item}`
    )
    theNameOftheDeckAndRedCrossContainer.append(theNameofTheDeck);

    let redCross = createElement(
      'div', 
      redCrossIcon, 
      {}, 
      'redCross'
    );
    theNameOftheDeckAndRedCrossContainer.append(redCross);
  //header

  innerWindow.appendChild(
    generateTextarea(
      'Question',
      {
        marginBottom:'20px',
        marginTop:'20px',
      }
    )
  )



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


  //   containerForAgainGoodEasyButtons.style.display = 'flex';
  //   containerForAgainGoodEasyButtons.style.justifyContent = 'space-between';

  //   this.style.display = "none";
  //   settingsIconContainer.style.display = "block";
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





  // settingsIconContainer.onclick = function () {
  //   opened = !opened;
  //   littleModalWindow.style.display = opened ? "block" : "none";
  // };
  
  // settingsIconContainer.appendChild(littleModalWindow);















      
      

      

      containerForText1DayEtc.append(container2min);
      containerForText1DayEtc.append(containerForAgainGoodEasyButtons);
      showAnswerButton.append(containerForText1DayEtc);
      innerWindow.append(showAnswerButton);


  //innerWindow.childNodes[3].append(settingsIconContainer)    
    innerWindow.appendChild(generateTextarea('Answer',{marginTop:'20px'}))
  

  
}
