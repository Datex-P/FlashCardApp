
import { edit, save} from './svgs.js';
import { createElement, closeMenu, close, redCross, handleOutsideClick} from './exportFunctions.js'
import { dataBase } from './dataBase.js';
import {deleteCardQuestionBox, threeDots} from './exportFunctions.js'


export default function settings() {

  let anchorElement = document.getElementById("questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let mainWindow = createElement('div', '', {
    border: '1px black solid'
  }, 'addQuestionsToDeck flexColumnCenter')
  anchorElement.appendChild(mainWindow);


  let settingsAndRedCrossContainer = createElement(
    'div', '', { width: "265px", marginBottom: '20px', height: '24px' }, 'flexSpaceBetween'
  );

  let changeTimeIntervall = createElement(
    'div', 'Change Repetition Interval', { fontWeight: 'bold' });


  mainWindow.append(settingsAndRedCrossContainer, changeTimeIntervall);

  let theWordSettings = createElement(
    "div",
    'Settings',
    { fontWeight: 'bold' }
  );
  settingsAndRedCrossContainer.append(theWordSettings);






  let [editContainerUpper] = [''].map(el => {
    return createElement('div', edit, {  position: 'absolute', right: '8px', top: '24px', cursor: 'pointer'})
  });



  let changeRepetitionIntervalContainer = createElement(
    'div', '', {position: 'relative'}, 'flexColumn changeRepetitionIntervalContainer', '', mainWindow
  );



  let changeRepetitionIntervalContainerInner = createElement(
    'div', '', {}, 'flexColumn changeRepetitionIntervalContainerInner'
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



  let [upperLeftContainerContainer, upperMiddleContainerContainer, upperRightContainerContainer] = ['70px', '70px', '70px'].map(width => createElement('div', '', {
    width,
    border: '1px black solid',
    borderRadius: '5px'
  }, 'flexCenter'))

  containerUpper.append(upperLeftContainerContainer, upperMiddleContainerContainer, upperRightContainerContainer);


  let [upperLeftContainer, upperMiddleContainer, upperRightContainer] = ['63px', '63px', '63px'].map(width => createElement('div', '', {
    width,
    padding: '3px',
    height: '19px'
  }, 'flexSpaceBetween'))

  upperLeftContainerContainer.append(upperLeftContainer);
  upperMiddleContainerContainer.append(upperMiddleContainer)
  upperRightContainerContainer.append(upperRightContainer)



  let [[upperLeftSmaller, upperLeftZero], [upperMiddleSmaller, upperMiddleZero], [upperRightSmaller, upperRightZero]] = [upperLeftContainer, upperMiddleContainer, upperRightContainer].map(container =>
    ["<", "0"].map((el) => {
      let input = document.createElement("div");
      input.innerText = el;
      //input.className = "noBorders";
      //input.style.height = '30%'
      input.style.backgroundColor = 'rgba(200, 168, 115, 0.95)';


      container.append(input)
      return input;

    })
  );
    
  ["min", 'hrs', 'days'].map((el) => {
      let input = document.createElement("div");
      input.innerText = el;
      input.style.fontWeight = 'bold'
      //input.className = "noBorders";
      //input.style.height = '30%'
      input.style.backgroundColor = 'rgba(200, 168, 115, 0.95)';

      switch (el) {
        case 'min':
          upperLeftContainer.append(input)
          break
        case 'hrs':
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
      height: '27px',
      backgroundColor: 'grey',
      color: 'white',
      position: 'relative',
      borderRadius: '5px'
    }, 'flexCenterAlignCenter')
    containerLower.append(input)
    return input
  });



  let [changeNameofDeckInput1, changeNameofDeckInput2, changeNameofDeckInput3, changeNameofDeckInput4, changeNameofDeckInput5, changeNameofDeckInput6] = [...Array(3).fill('82%'), ...Array(3).fill('20%')].map(width => {
    return createElement('input', '', { width }, 'settingsButtonStyling');
  })

changeNameofDeckInput1.type = 'number';
changeNameofDeckInput2.type = 'number';
changeNameofDeckInput3.type = 'number';


  let reviewAndStudy = createElement(
    'div', 'Review and Study Interval', { marginTop: "20px", fontWeight: 'bold' }
  );

  mainWindow.append(reviewAndStudy)


  let [studyAndReviewContainerOuter, resetContainerOuter] = ['', ''].map(el => {
    return createElement('div', '', {}, 'flexColumnSpaceAround studyAndReviewContainerOuter')
  })

  resetContainerOuter.style.marginTop = '0px';
  resetContainerOuter.style.width = '142px';


  let resetColorSchemeContainer = createElement(
    'div', '', {
    width: '154px',
    // border: '1px black solid',
    marginTop: '20px',

  }, '');

  let colorscheme = createElement(
    'div', 'Colorscheme', { fontWeight: 'bold', textAlign: 'center' }
  );



  let [studyCards, reviewCards, studyInputUnchanged, reviewInputUnchanged] = ['cards', 'cards', '10', '11'].map(el => {
    return createElement('div', el, { width: '30px' }, 'flexCenterAlignCenter')
  });


  dataBase.toStudyGoal = (Number(studyInputUnchanged.innerText));
  dataBase.toReviewGoal = (Number(reviewInputUnchanged.innerText));


  //console.log(typeof(studyInputUnchanged.innerText))

  //console.log(Number(studyInputUnchanged.innerText))



  let [studyText, reviewText] = ['To study:', 'To review:'].map(el => {
    return createElement('div', el, { width: '69px', marginLeft: '9px' }, '')
  });



  let [ resetCalendarText, resetHourlyBreakdownText] = ['Reset Calendar', 'Reset Breakdown'].map(el => {
    return createElement('div', el, {color: 'white', marginLeft: '9px', cursor: 'pointer'}, '')
  });

  resetCalendarText.style.width = '102px';
  resetHourlyBreakdownText.style.width = '172px';




  let [studyAndReviewUpper, studyAndReviewLower, resetCalendar, resetHourlyBreakdown] = ['', '', '', ''].map(el => {
    return createElement('div', el, {}, 'studyAndReset')
  });

  studyAndReviewUpper.style.top = '6px';
  studyAndReviewLower.style.top =  '38px';
  

  resetCalendar.style.backgroundColor = 'grey';
  resetHourlyBreakdown.style.backgroundColor = 'grey'



  resetCalendar.style.width = '127px'
  resetCalendar.style.top = '6px';
  resetHourlyBreakdown.style.top = '38px';
  resetHourlyBreakdown.style.width = '127px';

  let mainThreeDots = threeDots()

  resetCalendar.onclick = function () {
   //((mainThreeDots(somepara)
  }

  resetHourlyBreakdown.onclick = function () {
    //mainThreeDots(somepara)
  }


  let resetProgress = createElement('div', 'Reset Current Progress', {fontWeight: 'bold', textAlign: 'center', margin: '20px 0 10px'}
  )

 



  let editToReview = createElement('div', edit, {}, 'editToReview');



  mainWindow.append(studyAndReviewContainerOuter, resetProgress, resetContainerOuter);



  resetContainerOuter.append(resetCalendar, resetHourlyBreakdown)
  resetCalendar.append(resetCalendarText);
  resetHourlyBreakdown.append(resetHourlyBreakdownText);






  studyAndReviewContainerOuter.append(studyAndReviewUpper, studyAndReviewLower, editToReview);

  studyAndReviewUpper.append(studyText, studyInputUnchanged, studyCards);


  studyAndReviewLower.append(reviewText, reviewInputUnchanged, reviewCards)



  mainWindow.append(resetColorSchemeContainer);
  resetColorSchemeContainer.append(colorscheme);

  let [studyCardInput, reviewCardInput] = Array(2).fill('27px').map(width => createElement('input', '', { width, height: '15px', margin: '0 10px'}, 'studyAndReviewInputStyling'))

  studyCardInput.type = 'number'
  reviewCardInput.type = 'number'



   function editContainerUpperLowerRow (cond) {

    if (!cond) {

      containerLower.replaceChild(changeNameofDeckInput4, again)
      containerLower.replaceChild(changeNameofDeckInput5, good)
      containerLower.replaceChild(changeNameofDeckInput6, easy)

      changeNameofDeckInput4.value = again.innerText;
      changeNameofDeckInput5.value = good.innerText
      changeNameofDeckInput6.value = easy.innerText;

    } else {
      containerLower.replaceChild(again, changeNameofDeckInput4)
      containerLower.replaceChild(good, changeNameofDeckInput5)
      containerLower.replaceChild(easy, changeNameofDeckInput6)

      again.innerText = changeNameofDeckInput4.value;
      good.innerText = changeNameofDeckInput5.value;
      easy.innerText = changeNameofDeckInput6.value;
    }
  }




  let editedLower = false;


  editToReview.onclick = function (event) {
    
    event.stopPropagation()
    //  this.innerHTML = ''
    if (!editedLower) {

      studyAndReviewLower.replaceChild(reviewCardInput, reviewInputUnchanged);
      studyAndReviewUpper.replaceChild(studyCardInput, studyInputUnchanged);

      reviewCardInput.value = reviewInputUnchanged.innerText;
      studyCardInput.value = studyInputUnchanged.innerText;
      editedLower = true;
      editToReview.innerHTML = save
  
      handleOutsideClick(editToReview, editToReview, reviewCardInput, studyCardInput)

      
      
    } else {
      editToReview.innerHTML = edit
      console.log(2)
      studyAndReviewLower.replaceChild(reviewInputUnchanged, reviewCardInput);
      studyAndReviewUpper.replaceChild(studyInputUnchanged, studyCardInput);

      reviewInputUnchanged.innerText =  reviewCardInput.value;
      studyInputUnchanged.innerText = studyCardInput.value;

      // dataBase.toStudyGoal = (Number(studyInputUnchanged.innerText));
      // dataBase.toReviewGoal = (Number(reviewInputUnchanged.innerText));


      window.onclick = ''
      editedLower = false;
     
    }
  }




  let editedUpper = false;


  function editContainerUpperClickHandler(cond){
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

       if (!cond) {

        item.container.replaceChild(item.input, item.div);
        item.input.value = item.div.innerText 
        item.smaller.style.display = 'none'
        editContainerUpper.innerHTML = save;

       } else {

        item.container.replaceChild(item.div, item.input);
        item.div.innerText = item.input.value 
        item.smaller.style.display = 'block'
        editContainerUpper.innerHTML = edit;
      }
    })

  
  }

  editContainerUpper.onclick = function () {
    editContainerUpperClickHandler(editedUpper)

    editContainerUpperLowerRow (editedUpper)
    editedUpper = !editedUpper
  }



  redCross.onclick = () => close(mainWindow, anchorElement)

  redCross.addEventListener('click', closeMenu());
  settingsAndRedCrossContainer.append(redCross);

  closeMenu()




  let themeRadiosContainer = createElement('div', '', { }, 'themeRadiosContainer flexSpaceAround', '', mainWindow);


  ['light', 'dark', 'default'].map(comp => {
    let inputContainer = createElement('div', '', {}, '', '', themeRadiosContainer)

    let radio = createElement('input', '', {cursor: 'pointer'}, '', '', inputContainer)
    radio.name = 'theme';
    radio.type = 'radio';
    radio.value = comp;
    radio.onchange = function () {
      if (comp === 'default') {
        document.body.className = ''
      } else {
        document.body.className = this.value
      }
    }
    if (comp === 'default') {
      radio.checked = true
    }
    createElement("label", comp, {}, '', '', inputContainer);
  });

  // let checkbox = createElement('input', '', {}, '', '', themeRadiosContainer)
  // checkbox.type = 'checkbox';
  // checkbox.checked = true
  // checkbox.onchange = function (e) {
  //   let weekOverview = document.querySelector('#weekOverview')
  //   if (e.target.checked) {
  //     weekOverview.classList.remove('none')
  //     weekOverview.classList.add('weekOverview')
  //   } else {
  //     weekOverview.classList.add('none')
  //     weekOverview.classList.remove('weekOverview')
  //   }
  // }




}
