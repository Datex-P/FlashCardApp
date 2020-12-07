
import { edit, save} from './svgs.js';
import { createElement, closeMenu, close, redCross, handleOutsideClick, deleteCardQuestionBox, setThreeDotsOpen, threeDots} from './exportFunctions.js'
import { dataBase } from './dataBase.js';



export default function settings() {

  let anchorElement = document.getElementById("questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let mainWindow = createElement('div', '', {
    border: '1px black solid'
  }, 'addQuestionsToDeck flexColumnCenter')
  anchorElement.appendChild(mainWindow);


  let settingsAndRedCrossContainer = createElement(
    'div', '', { width: "265px", marginBottom: '20px', height: '24px' }, 'flexSpaceBetweenAlignCenter'
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

  editContainerUpper.title = 'Click and change name buttons and repetition intervals for all decks.'



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
  let {left,middle,right} = dataBase.timeValues
  upperLeftZero.innerText = left
  upperMiddleZero.innerText = middle
  upperRightZero.innerText = right;
  //upperLeftZero.innerText = dataBase.timeValues.left;
  //console.log(dataBase.timeValues.left)
    
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


  let {leftName,middleName,rightName} = dataBase.nameValues



  let [again, good, easy] = [`${leftName}`, `${middleName}`, `${rightName}`].map((el) => {
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
  resetContainerOuter.style.width = '182px';
  resetContainerOuter.style.height = '52px';


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




  let [studyText, reviewText] = ['To Study:', 'To Review:'].map(el => {
    return createElement('div', el, { width: '74px', marginLeft: '9px' }, '')
  });


  let [studyAndReviewUpper, studyAndReviewLower] = ['', ''].map(el => {
    return createElement('div', el, {}, 'studyAndReset flexAlignCenter')
  });

let resetInner = createElement('div', 'Reset Cal. + Breakdown', {}, 'resetInner flexAlignCenter')

  studyAndReviewUpper.style.top = '6px';
  studyAndReviewLower.style.top =  '38px';
  



  let mainThreeDots = threeDots()

  resetInner.onclick = function () {
 
      deleteCardQuestionBox(() => {
        
     
        for (let deck in dataBase.DeckNames) {

          dataBase.DeckNames[deck].data.forEach((card) => {
           
                if (card.openHistory) {
                  delete card.openHistory
                }
        } ) } }
        
        //breakdown has to be resetted as well
        , () => {

      }, 'Reset current progress', 'reset the calendar and the hourly breakdown', {marginLeft: '40px', fontSize: '18px'})

   };
   
   
   
   
  



  let resetProgress = createElement('div', 'Reset Current Progress', {fontWeight: 'bold', textAlign: 'center', margin: '20px 0 10px'}
  )

 



  let editToReview = createElement('div', edit, {}, 'editToReview');

  editToReview.title = 'change study and review intervals for all decks';


  mainWindow.append(studyAndReviewContainerOuter, resetProgress, resetContainerOuter, resetColorSchemeContainer);

  resetContainerOuter.append(resetInner)



  studyAndReviewContainerOuter.append(studyAndReviewUpper, studyAndReviewLower, editToReview);

  studyAndReviewUpper.append(studyText, studyInputUnchanged, studyCards);


  studyAndReviewLower.append(reviewText, reviewInputUnchanged, reviewCards)

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

      dataBase.nameValues.leftName = again.innerText;
      dataBase.nameValues.middleName = good.innerText;
      dataBase.nameValues.rightName = easy.innerText

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

     dataBase.toStudyGoal = (Number(studyInputUnchanged.innerText));
       dataBase.toReviewGoal = (Number(reviewInputUnchanged.innerText));


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
    ].forEach( (item,idx) => {

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

        if (idx === 0) {

        dataBase.timeValues.left = Number(item.div.innerText)
      }
        else if (idx === 1) {
        dataBase.timeValues.middle = Number(item.div.innerText)
        }
        else if (idx === 2) {
        dataBase.timeValues.right = Number(item.div.innerText)
      }
    }
  }
    )
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
    radio.title = `Change background color of main menu to ${comp}.`
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

}












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
