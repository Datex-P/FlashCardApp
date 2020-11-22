import shuffle from "./shuffleButton.js";
import { startTimer, timer } from "./timer.js";
import { redCross as redCrossIcon } from "./svgs.js";
import { dataBase } from './dataBase.js';
import createDom from './createDom.js';
import { edit, save, trash, reset } from './svgs.js';
import { createElement, closeMenu, close, redCross, handleOutsideClick } from './exportFunctions.js'

export default function settings() {

  let anchorElement = document.getElementById("questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let mainWindow = createElement('div', '', {
    border: '1px black solid'
  }, 'addQuestionsToDeck flexColumnCenter')
  anchorElement.appendChild(mainWindow);

  //header
  let settingsAndRedCrossContainer = createElement(
    'div', '', { width: "265px", marginBottom: '10px' }, 'flexSpaceBetween'
  );


  mainWindow.append(settingsAndRedCrossContainer);

  let theWordSettings = createElement(
    "div",
    `Settings`,
    { fontWeight: 'bold' }
  );
  settingsAndRedCrossContainer.append(theWordSettings);



  let changeTimeIntervall = createElement(
    'div', 'Change Repetition Interval', {fontWeight: 'bold'});

  mainWindow.append(changeTimeIntervall);



  let [editContainerUpper] = [''].map(el => {
    return createElement('div', edit, { position: 'absolute', left: '299px', top: '103px'})
  });



  let changeRepetitionIntervalContainer = createElement(
    'div',
    '',
    {
      width: '290px',
      height: '75px',
      border: '1px black solid',
      marginTop: '10px',
      borderRadius: '5px'
    }, 'flexColumn'
  );

  mainWindow.append(changeRepetitionIntervalContainer);


  let changeRepetitionIntervalContainerInner = createElement(
    'div',
    '',
    {
      width: '260px',
      height: '68px',
     // border: '1px black solid',
      //marginTop: '10px',
      borderRadius: '5px'
      //border: '1px black solid'
    }, 'flexColumn'
  );

  changeRepetitionIntervalContainer.append(changeRepetitionIntervalContainerInner);




  let [containerUpper, containerLower] = ['', ''].map((el) => createElement(
    'div',
    '',
    {
      position: 'relative',
      width: '100%',
      height: '50%',
     // border: '1px black solid',
      //borderTop: '0px'
    }, 'flexSpaceAroundAlignCenter', '', changeRepetitionIntervalContainerInner))



  let [upperLeftContainerContainer, upperMiddleContainerContainer, upperRightContainerContainer] = ['63px', '63px', '63px'].map(width => createElement('div', '', {
    width,
    border: '1px black solid',
    borderRadius: '5px'
  }, 'flexCenter'))

  containerUpper.append(upperLeftContainerContainer);
  containerUpper.append(upperMiddleContainerContainer);
  containerUpper.append(upperRightContainerContainer);


  let [upperLeftContainer, upperMiddleContainer, upperRightContainer] = ['63px', '63px', '63px'].map(width => createElement('div', '', {
    width,
    padding: '3px',
  }, 'flexSpaceBetween'))

  upperLeftContainerContainer.append(upperLeftContainer);
  upperMiddleContainerContainer.append(upperMiddleContainer)
  upperRightContainerContainer.append(upperRightContainer)




  let [[upperLeftSmaller,upperLeftZero], [upperMiddleSmaller,upperMiddleZero], [upperRightSmaller,upperRightZero]] = [upperLeftContainer, upperMiddleContainer, upperRightContainer].map(container =>
    ["<","0"].map((el) => {
      let input = document.createElement("div");
      input.innerText = el;
      //input.className = "noBorders";
      //input.style.height = '30%'
      input.style.backgroundColor = 'rgba(200, 168, 115, 0.95)';


      container.append(input)
      return input;

    })
  )



  let [upperLeftMin, upperMiddleMin, upperRightMin] = 
    ["min",'hours','days'].map((el) => {
      let input = document.createElement("div");
      input.innerText = el;
      input.style.fontWeight = 'bold'
      //input.className = "noBorders";
      //input.style.height = '30%'
      input.style.backgroundColor = 'rgba(200, 168, 115, 0.95)';

      switch(el){
        case 'min':
          upperLeftContainer.append(input)
          break
        case 'hours':
          upperMiddleContainer.append(input)
          break
        case 'days':
          upperRightContainer.append(input)
          break
      }
      return input;

    })


    changeRepetitionIntervalContainer.append(editContainerUpper)

  let [again, good, easy] = ["again", "good", "easy"].map((el) => {
    let input = createElement('div', el, {
      width: '68px',
      textAlign: 'center',
      height: '27px',
      backgroundColor: 'grey',
      color: 'white',
      borderRadius: '5px'
    })
    containerLower.append(input)
    return input
  });

 

  let [changeNameofDeckInput1, changeNameofDeckInput2, changeNameofDeckInput3, changeNameofDeckInput4, changeNameofDeckInput5, changeNameofDeckInput6] = [...Array(3).fill('82%'), ...Array(3).fill('20%')].map(width => {
    return createElement('input', '', { width }, 'settingsButtonStyling');
  })

  let reviewAndStudy = createElement(
    'div', 'Review and Study Interval', { marginTop: "20px", fontWeight: 'bold'}
  );

  mainWindow.append(reviewAndStudy)


  let [studyAndReviewContainerOuter] = [''].map(el => {
    return createElement('div', '', { border: '1px black solid', borderRadius: '5px', width: '225px', height: '70px', marginTop: '10px' }, 'flexColumnSpaceAround')
  })


  let resetColorSchemeContainer = createElement(
    'div', '', {
    width: '154px',
    border: '1px black solid',
    marginTop: '20px'
  }, 'flexSpaceBetween'
  );

  let resetColor = createElement(
    'div', 'Reset Colorscheme', {fontWeight: 'bold'}
  );

  let resetColorIcon = createElement(
    'div', reset, {}
  );

  let [studyCards, reviewCards] = ['cards', 'cards'].map(el=>{
    return createElement('div', el, {width: '30px'}, 'flexCenterAlignCenter')
  });

  let [studyInput, reviewInput] = ['10', '11'].map(el => {
    return createElement('div', el, {width: '50px'}, 'flexCenterAlignCenter')
  });


  let [studyText, reviewText] = ['To study:', 'To review:'].map(el => {
    return createElement('div', el, {width: '75px'}, 'flexCenterAlignCenter')
  });



let [studyAndReviewUpper, studyAndReviewLower] = ['', ''].map(el=>{
  return createElement('div', el, {width: '145px', height: '40px'}, 'flexSpaceAroundAlignCenter')
});

let editToReview = createElement('div', edit, {width: '50px', position: 'absolute', width: '65px', top: '230px', right: '27px'});



  mainWindow.append(studyAndReviewContainerOuter);
  studyAndReviewContainerOuter.append(studyAndReviewUpper);
  studyAndReviewContainerOuter.append(studyAndReviewLower);

  studyAndReviewUpper.append(studyText);
  studyAndReviewUpper.append(studyInput);
  studyAndReviewUpper.append(studyCards)
 
  studyAndReviewLower.append(reviewText);
  studyAndReviewLower.append(reviewInput);
  studyAndReviewLower.append(reviewCards);
  studyAndReviewContainerOuter.append(editToReview);

  mainWindow.append(resetColorSchemeContainer);
  resetColorSchemeContainer.append(resetColor);
  resetColorSchemeContainer.append(resetColorIcon);



  let [studyCardInput, reviewCardInput] = Array(2).fill('27px').map(width => createElement('input', '', { width, height: '18px'}, 'studyAndReviewInputStyling'))



editToReview.onclick = function () {
  studyAndReviewLower.replaceChild(reviewCardInput, reviewInput);
  studyAndReviewUpper.replaceChild(studyCardInput, studyInput);
  }



  editContainerUpper.onclick = function () {

    [
      {
        container: upperLeftContainer,
        input: changeNameofDeckInput1,
        div: upperLeftZero,
        smaller: upperLeftSmaller
      },
      {
        container: upperMiddleContainer,
        input: changeNameofDeckInput2,
        div: upperMiddleZero,
        smaller: upperMiddleSmaller
      },
      {
        container: upperRightContainer,
        input: changeNameofDeckInput3,
        div: upperRightZero,
        smaller: upperRightSmaller
      },
    ].forEach(item => {
      item.container.replaceChild(item.input, item.div);
      item.input.value = upperLeftZero.innerText;
      item.input.style.width = '47%';
      item.input.style.marginRight = '3px';
      item.smaller.style.display = 'none'
    })

    containerLower.replaceChild(changeNameofDeckInput4, again);
    changeNameofDeckInput4.value = again.innerText;
  
    containerLower.replaceChild(changeNameofDeckInput5, good);
    changeNameofDeckInput5.value = good.innerText;

    containerLower.replaceChild(changeNameofDeckInput6, easy);
    changeNameofDeckInput6.value = easy.innerText;

  }


  redCross.onclick =()=>close(mainWindow, anchorElement)

  handleOutsideClick(mainWindow)



  redCross.addEventListener('click', closeMenu());



  settingsAndRedCrossContainer.append(redCross);

  closeMenu()


}

