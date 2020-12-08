
import { edit, hexagon, hexagonGreen, save} from './svgs.js';
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
    'div', '', { width: "291px", marginBottom: '20px', height: '24px' }, 'flexSpaceBetweenAlignCenter'
  );

  let changeTimeIntervall = createElement(
    'div', 'Change Repetition Interval', { fontWeight: 'bold', fontSize: '17px'});


  mainWindow.append(settingsAndRedCrossContainer, changeTimeIntervall);

  let theWordSettings = createElement(
    "div",
    'Settings',
    { fontWeight: 'bold', fontSize: '22px' }
  );
  settingsAndRedCrossContainer.append(theWordSettings);






  let [editContainerUpper] = [''].map(el => {
    return createElement('div', edit, {  position: 'absolute', right: '8px', top: '24px', cursor: 'pointer'})
  });

  editContainerUpper.title = 'Click and change name buttons and repetition intervals for all decks.'



  let changeRepetitionIntervalContainer = createElement(
    'div', '', {position: 'relative'}, 'flexColumn changeRepetitionIntervalContainer', '', mainWindow
  );

  changeRepetitionIntervalContainer.style.marginTop = '10px';



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
  
    }, 'flexCenterAlignCenter againGoodEasySettings')
    containerLower.append(input)
    return input
  });



  let [changeNameofDeckInput1, changeNameofDeckInput2, changeNameofDeckInput3, changeNameofDeckInput4, changeNameofDeckInput5, changeNameofDeckInput6] = [...Array(3).fill('82%'), ...Array(3).fill('20%')].map(width => {
    return createElement('input', '', { width }, 'settingsButtonStyling');
  })

changeNameofDeckInput1.type = 'number';
changeNameofDeckInput2.type = 'number';
changeNameofDeckInput3.type = 'number';


  let goalSettings = createElement(
    'div', 'Goal Settings', { marginTop: "25px", fontWeight: 'bold', fontSize: '17px'}
  );

  let goalSettingsText = createElement('div', 'Set a Weekly Target', {fontWeight: 'bold', fontSize: '13px'})
  let goalSettingsBox = createElement('div', '', {width: '200px', borderRadius: '5px', height: '40px', border: '1px black solid', display: 'flex', justifyContent: 'space-around'})
  let goalSettingsButton = createElement('button', 'Update Weekly Target', {backgroundColor: 'grey', width: '126px', fontSize: '11px', padding: '3px', marginTop: '5px', color: 'white'})
 
  let star1 = createElement('div', hexagon, {width: '16px', height: '16px'});
  let star2 = createElement('div', hexagon, {width: '16px', height: '16px'});
  let star3 = createElement('div', hexagon, {width: '16px', height: '16px'});
  let star4 = createElement('div', hexagon, {width: '16px', height: '16px'});
  let star5 = createElement('div', hexagon, {width: '16px', height: '16px'});
  let star6 = createElement('div', hexagon, {width: '16px', height: '16px'});
  let star7 = createElement('div', hexagon, {width: '16px', height: '16px'});




  let arr = Array(7).fill('1').map((item,k)=>{

    let div = createElement('div', hexagon, {width: '16px', height: '16px'}, 'item');


    // let div = document.createElement('div')
    // div.innerHTML = '3'
    // div.className='item'
    return div
  });
  
  
  arr.forEach((div,k)=>{
    div.onmouseenter = function(){
      arr.forEach((newItem,index)=>{
        if(index<=k){
          newItem.classList.add('selected')
          //newItem.style.fill = 'green';
          //hexagon.style.fill = 'green'
          // div.innerHTML = hexagon;
        }else{
          // div.innerHTML = hexagonGreen
          newItem.classList.remove('selected')
          //newItem.style.fill = 'gr';
        }
      })
    }
  
  })

  goalSettingsBox.append(...arr);










  mainWindow.append(goalSettings);
  goalSettings.append(goalSettingsText);
  goalSettings.append(goalSettingsBox)
//  goalSettingsBox.append(star1);
  //goalSettingsBox.append(divStar1)
  //divStar1.append(star1)


 // goalSettingsBox.append(divStar2);
  // divStar2.append(star2)
  // goalSettingsBox.append(divStar3);
  // divStar3.append(star3)
  // goalSettingsBox.append(divStar4);
  // divStar4.append(star4)
  // goalSettingsBox.append(divStar5);
  // divStar5.append(star5)
  // goalSettingsBox.append(divStar6);
  // divStar6.append(star6)
  // goalSettingsBox.append(divStar7);
  // divStar7.append(star7)
  goalSettings.append(goalSettingsButton);


  let [resetContainerOuter] = [''].map(el => {
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
    'div', 'Colorscheme', { fontWeight: 'bold', textAlign: 'center', fontSize: '17px'}
  );



  // let [studyCards, reviewCards, studyInputUnchanged, reviewInputUnchanged] = ['cards', 'cards', '10', '11'].map(el => {
  //   return createElement('div', el, { width: '30px' }, 'flexCenterAlignCenter')
  // });

  // studyInputUnchanged.style.width = '34px';
  // reviewInputUnchanged.style.width = '34px';




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
   
   
   
   
  



  let resetProgress = createElement('div', 'Reset Current Progress', {}, 'resetProgress'
  )

 



  let editToReview = createElement('div', edit, {}, 'editToReview');

  editToReview.title = 'change study and review intervals for all decks';


  mainWindow.append(resetProgress, resetContainerOuter, resetColorSchemeContainer);

  resetContainerOuter.append(resetInner)



  //studyAndReviewContainerOuter.append(studyAndReviewUpper, studyAndReviewLower, editToReview);

 // studyAndReviewUpper.append(studyText, studyInputUnchanged, studyCards);


  //studyAndReviewLower.append(reviewText, reviewInputUnchanged, reviewCards)

  resetColorSchemeContainer.append(colorscheme);

  // let [studyCardInput, reviewCardInput] = Array(2).fill('22px').map(width => createElement('input', '', { width, height: '15px', margin: '0 6px'}, 'studyAndReviewInputStyling'))

  // studyCardInput.type = 'number';
  // reviewCardInput.type = 'number';

  //reviewCardInput.style.margin = '0 6px';



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

  // editToReview.onclick = function (event) {
    
  //   event.stopPropagation()
  //   //  this.innerHTML = ''
  //   if (!editedLower) {

  //     studyAndReviewLower.replaceChild(reviewCardInput, reviewInputUnchanged);
  //     studyAndReviewUpper.replaceChild(studyCardInput, studyInputUnchanged);

  //     reviewCardInput.value = reviewInputUnchanged.innerText;
  //     studyCardInput.value = studyInputUnchanged.innerText;
  //     editedLower = true;
  //     editToReview.innerHTML = save
  
  //     handleOutsideClick(editToReview, editToReview, reviewCardInput, studyCardInput)
  
      
  //   } else {
  //     editToReview.innerHTML = edit
  //     console.log(2)
  //     studyAndReviewLower.replaceChild(reviewInputUnchanged, reviewCardInput);
  //     studyAndReviewUpper.replaceChild(studyInputUnchanged, studyCardInput);

  //     reviewInputUnchanged.innerText =  reviewCardInput.value;
  //     studyInputUnchanged.innerText = studyCardInput.value;

  //    dataBase.toStudyGoal = (Number(studyInputUnchanged.innerText));
  //      dataBase.toReviewGoal = (Number(reviewInputUnchanged.innerText));


  //     window.onclick = ''
  //     editedLower = false;
     
  //   }
  // }


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
      
      } else if (idx === 1) {
        dataBase.timeValues.middle = Number(item.div.innerText)
        
      } else if (idx === 2) {
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
  handleOutsideClick(mainWindow);
}











