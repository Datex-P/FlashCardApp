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
    'div', 'Change Repetition Interval', {});

  mainWindow.append(changeTimeIntervall);



  let [editContainerLower, editContainerUpper] = ['', ''].map(el => {
    return createElement('div', edit, {})
  });


  // let [modalLeft,modalMiddle, modalRight] = ['', '', ''].map((el) =>createElement(
  //   'div',
  //   '',
  //   { 
  // //position: 'relative',
  // width: '30px',
  // height: '40px',
  // border: '1px black solid',
  // backgroundColor: 'white'
  // }))



  let changeRepetitionIntervalContainer = createElement(
    'div',
    '',
    {
      width: '300px',
      height: '68px',
      border: '1px black solid',
      marginTop: '10px'
    }, 'flexColumn'
  );

  mainWindow.append(changeRepetitionIntervalContainer);



  let [containerUpper, containerLower] = ['', ''].map((el) => createElement(
    'div',
    '',
    {
      position: 'relative',
      width: '100%',
      height: '50%',
      border: '1px black solid',
      borderTop: '0px'
    }, 'flexSpaceAroundAlignCenter', '', changeRepetitionIntervalContainer))



  let [upperLeftContainerContainer, upperMiddleContainerContainer, upperRightContainerContainer] = ['63px', '63px', '63px'].map(width => createElement('div', '', {
    width,
    border: '1px black solid'
  }, 'flexCenter'))

  containerUpper.append(upperLeftContainerContainer);
  containerUpper.append(upperMiddleContainerContainer);
  containerUpper.append(upperRightContainerContainer);


  let [upperLeftContainer, upperMiddleContainer, upperRightContainer] = ['56px', '56px', '56px'].map(width => createElement('div', '', {
    width,
    border: '1px black solid'
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

  let [changeNameofDeckInput1, changeNameofDeckInput2, changeNameofDeckInput3, changeNameofDeckInput4, changeNameofDeckInput5, changeNameofDeckInput6] = [...Array(3).fill('28%'), ...Array(3).fill('20%')].map(width => {
    return createElement('input', '', { width }, 'settingsButtonStyling');
  })

  let reviewAndStudy = createElement(
    'div', 'Review and Study Interval', { marginTop: "20px" }
  );

  mainWindow.append(reviewAndStudy)


  let [studyContainer, reviewContainer] = ['', ''].map(el => {
    return createElement('div', '', { border: '1px black solid', display: 'flex', width: '160px', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' })
  })

  let theWordResetConfigurations = createElement(
    'div', 'Reset Configurations', {
    border: '1px black solid',
    marginTop: '20px',
    marginBottom: '10px'
  }
  );

  let resetColorSchemeContainer = createElement(
    'div', '', {
    width: '154px',
    border: '1px black solid',
    display: 'flex',
    justifyContent: 'space-between'
  }
  );

  let resetColor = createElement(
    'div', 'Reset Colorscheme', {}
  );

  let resetColorIcon = createElement(
    'div', reset, {}
  );





  let studyCards = createElement(
    'div', 'cards', { width: '30px' }
  );


  let [studyText, studyInput, editToStudy, editToReview, reviewText, reviewInput, reviewCards] = ['To study', '', edit, edit, 'To review', '', 'cards'].map(el => {
    return createElement('div', el, {})
  });

  studyText.style.border = '1px black solid';
  studyText.style.width = '63px';
  reviewText.style.border = '1px black solid';
  reviewText.style.widt = '63px';



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

  mainWindow.append(theWordResetConfigurations)
  mainWindow.append(resetColorSchemeContainer);
  resetColorSchemeContainer.append(resetColor);
  resetColorSchemeContainer.append(resetColorIcon);



  let [studyCardInput, reviewCardInput] = Array(2).fill('23px').map(width => createElement('input', '', { width }))



  editToReview.onclick = function () {
    reviewContainer.replaceChild(reviewCardInput, reviewInput)
  }

  editToStudy.onclick = function () {
    studyContainer.replaceChild(studyCardInput, studyInput)
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

  };

  editContainerLower.onclick = function () {
    containerLower.replaceChild(changeNameofDeckInput4, again);
    changeNameofDeckInput4.value = again.innerText;
    //changeNameofDeckInput4.focus();

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

