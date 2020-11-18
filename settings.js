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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px black solid'
   }, 'addQuestionsToDeck')
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


  let editContainerUpper = createElement(
    'div', edit,{});

  let editContainerLower = createElement(
    'div', edit, {});


  let changeRepetitionIntervalContainer = createElement(
    'div',
    '',
    {
     width: '300px',
    height: '90px',
    border: '1px black solid', 
    marginTop: '10px'}, 'flexColumn'
  );

  mainWindow.append(changeRepetitionIntervalContainer);

  let containerUpper = createElement(
    'div',
    '',
    {
  width: '100%',
  height: '50%',
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  border: '1px black solid'});

changeRepetitionIntervalContainer.append(containerUpper);


let upperLeftContainer = createElement('div', '', {
  width: '20%', 
   border: '1px black solid'
}, 'flexSpaceAroundAlignCenter');



let [upperLeftsmallerThan, upperLeftZero, upperLeftMin] = ["<", '0', 'min'].map((el) => {
  let input = document.createElement("div");
  input.innerText = el;
  //input.className = "noBorders";
 // input.style.width = '20%';
  input.style.height = '30%'
  input.style.backgroundColor = 'rgba(200, 168, 115, 0.95)';


  upperLeftContainer.append(input)
  return input;

});
containerUpper.append(upperLeftContainer);




let upperMiddleContainer = createElement('div', '', {
  width: '20%',
  //border: '1px black solid',
  
}, 'flexSpaceAroundAlignCenter');


let [upperMiddlesmallerThan, upperMiddleZero, upperMiddleMin] = ["<", '0', 'min'].map((el) => {
  let input = document.createElement("div");
  input.innerText = el;
  //input.className = "noBorders";
 // input.style.width = '20%';
  input.style.height = '30%'
  input.style.backgroundColor = 'rgba(200, 168, 115, 0.95)';


  upperMiddleContainer.append(input)
  return input;

});

 containerUpper.append(upperMiddleContainer)


let upperRightContainer = createElement('div', '', {
  width: '20%',
 border: '1px black solid',
  
}, 'flexSpaceAroundAlignCenter');

let [upperRightSmallerThan, upperRightZero, upperRightMin] = ["<", '0', 'min'].map((el) => {
  let input = document.createElement("div");
  input.innerText = el;
  //input.className = "noBorders";
 // input.style.width = '20%';
  input.style.height = '30%'
  input.style.backgroundColor = 'rgba(200, 168, 115, 0.95)';

  upperRightContainer.append(input)
  return input;

});



containerUpper.append(upperRightContainer)


containerUpper.append(editContainerUpper)



let containerLower = createElement(
  'div',
  '',
  {
    position: 'relative',
width: '100%',
height: '50%',
border: '1px black solid',
}, 'flexSpaceAroundAlignCenter');

changeRepetitionIntervalContainer.append(containerLower);



let [again, good, easy] = ["again", "good", "easy"].map((el) => {
  let input = document.createElement('div', el, {
    width: '25%',
    textAlign: 'center',
    height: '57%',
    backgroundColor: 'grey',
    color: 'white',
    borderRadius: '5px'
  
//   input.innerText = el;
//  // input.className = "noBorders";
//   input.style.width = '25%';
//   input.style.textAlign = 'center';
//   input.style.height = '57%';
//   input.style.backgroundColor = 'grey';
//   input.style.color = 'white';
//   input.style.borderRadius = '5px';


//  return input
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

// let studyContainer = createElement(
//   'div', '', {border: '1px black solid', display: 'flex', width: '200px', justifyContent: 'space-around', marginTop: '10px'});

// let reviewContainer = createElement(
//     'div', '', {border: '1px black solid',  display: 'flex', justifyContent: 'space-around', marginTop: '10px', width: '200px'});

  let [studyContainer, reviewContainer] = [ '', ''].map(el=>{
    return createElement('div', '', {border: '1px black solid', display: 'flex', width: '200px', justifyContent: 'space-around', marginTop: '10px'})
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



let [studyCardInput, reviewCardInput] =  [Array(2).fill('10px')].map(width=>{
  return createElement('input' , '', {width});
})




editToReview.onclick = function () {
  reviewContainer.replaceChild(reviewCardInput, reviewInput)
}

editToStudy.onclick = function () {
  studyContainer.replaceChild(studyCardInput, studyInput)
}


editContainerUpper.onclick = function () {
 
  upperLeftContainer.replaceChild(changeNameofDeckInput1, upperLeftZero);
  changeNameofDeckInput1.value = upperLeftZero.innerText;  
  upperMiddleContainer.replaceChild(changeNameofDeckInput2, upperMiddleZero);
  changeNameofDeckInput2.value = upperMiddleZero.innerText;  
  upperRightContainer.replaceChild(changeNameofDeckInput3, upperRightZero);
  changeNameofDeckInput3.value = upperRightZero.innerText;  

};

editContainerLower.onclick = function () {
  containerLower.replaceChild(changeNameofDeckInput4, again);
  changeNameofDeckInput4.value = again.innerText;
  
  containerLower.replaceChild(changeNameofDeckInput5, good);
  changeNameofDeckInput5.value = good.innerText;

  containerLower.replaceChild(changeNameofDeckInput6, easy);
  changeNameofDeckInput6.value = easy.innerText;
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
 
      
          














