import shuffle from "./shuffleButton.js";
import { startTimer, timer } from "./timer.js";
import { redCross as redCrossIcon } from "./svgs.js";
import { dataBase } from './dataBase.js';
import createDom from './createDom.js';
import { edit, save, trash} from './svgs.js';
import {createElement, closeMenu} from './exportFunctions.js'

export default function settings() {
  

  let anchorElement = document.getElementById("questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let mainWindow = createElement('div', '', {
    border: '1px black solid'
   }, 'addQuestionsToDeck flexColumnCenter')
  anchorElement.appendChild(mainWindow);

  //header
  let settingsAndRedCrossContainer = createElement(
    'div', '', {width: "265px", marginBottom: '10px'}, 'flexSpaceBetween'
  );


  mainWindow.append(settingsAndRedCrossContainer);

  let theWordSettings = createElement(
    "div",
    `Settings`,
    {fontWeight: 'bold'}
  );
  settingsAndRedCrossContainer.append(theWordSettings);

  let redCross = createElement(
    'div',
    redCrossIcon,
    {},
    'redCross'
  );

  let changeTimeIntervall = createElement(
    'div', 'Change Repetition Interval', {});

  mainWindow.append(changeTimeIntervall);


  
  let [editContainerLower, editContainerUpper] = ['', ''].map(el=>{
    return createElement('div', edit, {})
  });



  let changeRepetitionIntervalContainer = createElement(
    'div',
    '',
    {
     width: '300px',
    height: '68px',
    border: '1px black solid', 
    marginTop: '10px'}, 'flexColumn'
  );

  mainWindow.append(changeRepetitionIntervalContainer);

//   let containerUpper = createElement(
//     'div',
//     '',
//     {
//   width: '100%',
//   height: '50%',
//   position: 'relative',
//   display: 'flex',
//   justifyContent: 'space-around',
//   alignItems: 'center',
//   border: '1px black solid',
//   borderBottom: '0px'});

// let containerLower = createElement(
//   'div',
//   '',
//   { 
// position: 'relative',
// width: '100%',
// height: '50%',
// border: '1px black solid',
// borderTop: '0px'
// }, 'flexSpaceAroundAlignCenter');


let [containerUpper,containerLower] = ['', ''].map((el) =>createElement(
  'div',
  '',
  { 
position: 'relative',
width: '100%',
height: '50%',
border: '1px black solid',
borderTop: '0px'
}, 'flexSpaceAroundAlignCenter','',changeRepetitionIntervalContainer))


// changeRepetitionIntervalContainer.append(containerUpper);
// changeRepetitionIntervalContainer.append(containerLower);


let [upperLeftContainer, upperMiddleContainer, upperRightContainer] = ['23%','17%','23%'].map(width=>createElement('div', '', {
  width, 
   border: '1px black solid'
}, 'flexSpaceBetween'))


let [upperLeftZero,upperMiddleZero,upperRightZero] = [upperLeftContainer,upperMiddleContainer,upperRightContainer].map(container=>
  ["<", '0', 'min'].map((el) => {
    let input = document.createElement("div");
    input.innerText = el;
    //input.className = "noBorders";
    input.style.height = '30%'
    input.style.backgroundColor = 'rgba(200, 168, 115, 0.95)';
  
  
    container.append(input)
    return input;
  
  })[1]
)

// let [upperLeftsmallerThan, upperLeftZero, upperLeftMin] = ["<", '0', 'min'].map((el) => {
//   let input = document.createElement("div");
//   input.innerText = el;
//   //input.className = "noBorders";
//   input.style.height = '30%'
//   input.style.backgroundColor = 'rgba(200, 168, 115, 0.95)';


//   upperLeftContainer.append(input)
//   return input;

// });
containerUpper.append(upperLeftContainer);



// let [upperMiddlesmallerThan, upperMiddleZero, upperMiddleMin] = ["<", '0', 'min'].map((el) => {
//   let input = document.createElement("div");
//   input.innerText = el;
//   //input.className = "noBorders";
//   input.style.height = '30%'
//   input.style.backgroundColor = 'rgba(200, 168, 115, 0.95)';


//   upperMiddleContainer.append(input)
//   return input;

// });

 containerUpper.append(upperMiddleContainer)

// let [upperRightSmallerThan, upperRightZero, upperRightMin] = ["<", '0', 'min'].map((el) => {
//   let input = document.createElement("div");
//   input.innerText = el;
//   //input.className = "noBorders";
//  // input.style.width = '20%';
//   input.style.height = '30%'
//   input.style.backgroundColor = 'rgba(200, 168, 115, 0.95)';

//   upperRightContainer.append(input)
//   return input;

// });

containerUpper.append(upperRightContainer)


containerUpper.append(editContainerUpper)







let [again, good, easy] = ["again", "good", "easy"].map((el) => {
  let input = createElement('div', el, {
    width: '68px',
    textAlign: 'center',
    height: '21px',
    backgroundColor: 'grey',
    color: 'white',
    borderRadius: '5px'
  })
  containerLower.append(input)
  return input
});

containerLower.append(editContainerLower)

let [changeNameofDeckInput1,changeNameofDeckInput2,changeNameofDeckInput3,changeNameofDeckInput4,changeNameofDeckInput5,changeNameofDeckInput6] = [...Array(3).fill('28%'), ...Array(3).fill('20%')].map(width=>{
  return createElement('input', '', {width});
})

let reviewAndStudy = createElement(
  'div', 'Review and Study Interval', {marginTop: "20px" }
);

mainWindow.append(reviewAndStudy)


  let [studyContainer, reviewContainer] = [ '', ''].map(el=>{
    return createElement('div', '', {border: '1px black solid', display: 'flex', width: '200px', justifyContent: 'space-around', alignItems: 'center', marginTop: '10px'})
  })



let studyCards = createElement(
  'div', 'cards', {width: '30px'}
);


let [studyText, studyInput, editToStudy, editToReview, reviewText, reviewInput, reviewCards] =  ['To study', '', edit, edit, 'To review', '', 'cards'].map(el=>{
  return createElement('div', el, {})
});



mainWindow.append(studyContainer);
studyContainer.append(studyText);
studyContainer.append(studyInput);
studyContainer.append(studyCards)
studyContainer.append(editToStudy);

mainWindow.append(reviewContainer);
reviewContainer.append(reviewText);
reviewContainer.append(reviewInput);
reviewContainer.append(reviewCards);
reviewContainer.append(editToReview);



let [studyCardInput, reviewCardInput] =  Array(2).fill('23px').map(width=>createElement('input' , '', {width}))



editToReview.onclick = function () {
  reviewContainer.replaceChild(reviewCardInput, reviewInput)
}

editToStudy.onclick = function () {
  studyContainer.replaceChild(studyCardInput, studyInput)
}


editContainerUpper.onclick = function () {
 
  upperLeftContainer.replaceChild(changeNameofDeckInput1, upperLeftZero);
  changeNameofDeckInput1.value = upperLeftZero.innerText;  
  changeNameofDeckInput1.className = 'settingsButtonStyling'
  


  upperMiddleContainer.replaceChild(changeNameofDeckInput2, upperMiddleZero);
  changeNameofDeckInput2.value = upperMiddleZero.innerText; 
  changeNameofDeckInput2.className = 'settingsButtonStyling';
  upperMiddleContainer.style.width = '23%';
  
  upperRightContainer.replaceChild(changeNameofDeckInput3, upperRightZero);
  changeNameofDeckInput3.value = upperRightZero.innerText;  
  changeNameofDeckInput3.className = 'settingsButtonStyling';


};

editContainerLower.onclick = function () {
  containerLower.replaceChild(changeNameofDeckInput4, again);
  changeNameofDeckInput4.value = again.innerText;
  changeNameofDeckInput4.className = 'settingsButtonStyling';
  //changeNameofDeckInput4.focus();

  containerLower.replaceChild(changeNameofDeckInput5, good);
  changeNameofDeckInput5.value = good.innerText;
  changeNameofDeckInput5.className = 'settingsButtonStyling';
  
  containerLower.replaceChild(changeNameofDeckInput6, easy);
  changeNameofDeckInput6.value = easy.innerText;
  changeNameofDeckInput6.className = 'settingsButtonStyling';
  
}









  function close() {
    mainWindow.parentNode.removeChild(mainWindow);
    anchorElement.style.display = "none";
  }
  redCross.onclick = close

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

 redCross.addEventListener('click', closeMenu());



  settingsAndRedCrossContainer.append(redCross);

  

closeMenu()


    }
 
      
          














