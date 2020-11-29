
import { edit} from './svgs.js';
import { createElement, closeMenu, close, redCross, handleOutsideClick} from './exportFunctions.js'

export default function settings() {

  let anchorElement = document.getElementById("questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let mainWindow = createElement('div', '', {
    border: '1px black solid'
  }, 'addQuestionsToDeck flexColumnCenter')
  anchorElement.appendChild(mainWindow);


  let settingsAndRedCrossContainer = createElement(
    'div', '', { width: "265px", marginBottom: '20px', height: '24px'}, 'flexSpaceBetween'
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
    return createElement('div', edit, { position: 'absolute', left: '299px', top: '103px' })
  });



  let changeRepetitionIntervalContainer = createElement(
    'div', '',{}, 'flexColumn changeRepetitionIntervalContainer', '', mainWindow
    );



  let changeRepetitionIntervalContainerInner = createElement(
    'div',
    '',
    { }, 'flexColumn changeRepetitionIntervalContainerInner'
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

  containerUpper.append(upperLeftContainerContainer, upperMiddleContainerContainer, upperRightContainerContainer);


  let [upperLeftContainer, upperMiddleContainer, upperRightContainer] = ['63px', '63px', '63px'].map(width => createElement('div', '', {
    width,
    padding: '3px',
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
  )



  let [upperLeftMin, upperMiddleMin, upperRightMin] =
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
    'div', 'Review and Study Interval', { marginTop: "20px", fontWeight: 'bold' }
  );

  mainWindow.append(reviewAndStudy)


  let [studyAndReviewContainerOuter] = [''].map(el => {
    return createElement('div', '', {}, 'flexColumnSpaceAround studyAndReviewContainerOuter')
  })


  let resetColorSchemeContainer = createElement(
    'div', '', {
    width: '154px',
    // border: '1px black solid',
    marginTop: '20px',
   
  }, '');

  let colorscheme = createElement(
    'div', 'Colorscheme', { fontWeight: 'bold', textAlign: 'center'}
  );

 

  let [studyCards, reviewCards, studyInput, reviewInput] = ['cards', 'cards', '10', '11'].map(el => {
    return createElement('div', el, { width: '30px' }, 'flexCenterAlignCenter')
  });



  let [studyText, reviewText] = ['To study:', 'To review:'].map(el => {
    return createElement('div', el, { width: '69px',marginLeft:'9px' }, '')
  });



  let [studyAndReviewUpper, studyAndReviewLower] = ['', ''].map(el => {
    return createElement('div', el, { width: '163px', height: '40px',display:'flex',alignItems:'center' }, '')
  });

  let editToReview = createElement('div', edit, { }, 'editToReview');



  mainWindow.append(studyAndReviewContainerOuter);



  studyAndReviewContainerOuter.append(studyAndReviewUpper, studyAndReviewLower);

  studyAndReviewUpper.append(studyText, studyInput, studyCards);
  

  studyAndReviewLower.append(reviewText, reviewInput, reviewCards)

  studyAndReviewContainerOuter.append(editToReview);

  mainWindow.append(resetColorSchemeContainer);
  resetColorSchemeContainer.append(colorscheme);

  let [studyCardInput, reviewCardInput] = Array(2).fill('27px').map(width => createElement('input', '', { width, height: '18px',margin:'0 10px' }, 'studyAndReviewInputStyling'))




  function clickOutsideHandle(x) {
    //alert("Clicked out Box")
    x.classList.add('blinkingIcon')
    setTimeout(() => {
      x.classList.remove('blinkingIcon')
    }, 3000)
  }





   let editedLower = false;


  editToReview.onclick = function (event) {

      window.addEventListener('click', ()=> clickOutsideHandle(editToReview))
    event.stopPropagation()
  //  this.innerHTML = ''
    if (!editedLower) {

    studyAndReviewLower.replaceChild(reviewCardInput, reviewInput);
    studyAndReviewUpper.replaceChild(studyCardInput, studyInput);

    reviewCardInput.value =  reviewInput.innerText;
    editedLower = true;
  
  } else {

    studyAndReviewLower.replaceChild(reviewInput, reviewCardInput);
    studyAndReviewUpper.replaceChild(studyInput, studyCardInput);

       editedLower = false;
  //     //send fetch=>saveToDataBase
  //     // if ok
  //     nameOfNewDeck.innerText = changeNameofDeckInput.value;

  }

  window.removeEventListener('click', ()=> clickOutsideHandle(editToReview))

  }




  let editedUpper = false;


  editContainerUpper.onclick = function (event) {

    // window.addEventListener('click', clickOutsideHandle)
    // event.stopPropagation()




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

      if (!editedUpper) {

      item.container.replaceChild(item.input, item.div);
      item.input.value = upperLeftZero.innerText;
      item.input.style.width = '47%';
      item.input.style.marginRight = '3px';
      item.smaller.style.display = 'none'
      }
      else {
        item.container.replaceChild(item.div, item.input);
        item.input.value = upperLeftZero.innerText;
        item.input.style.width = '47%';
        item.input.style.marginRight = '3px';
        item.smaller.style.display = 'none'
      }
    })

    if (!editedUpper) {

    containerLower.replaceChild(changeNameofDeckInput4, again);
    changeNameofDeckInput4.value = again.innerText;

    containerLower.replaceChild(changeNameofDeckInput5, good);
    changeNameofDeckInput5.value = good.innerText;

    containerLower.replaceChild(changeNameofDeckInput6, easy);
    changeNameofDeckInput6.value = easy.innerText;
    }



  }


  redCross.onclick = () => close(mainWindow, anchorElement)

  handleOutsideClick(mainWindow)

  redCross.addEventListener('click', closeMenu());
  settingsAndRedCrossContainer.append(redCross);

  closeMenu()


  



let themeRadiosContainer = createElement('div','',{marginTop:'10px'},'','',mainWindow);


['light','dark','default'].map(comp=>{
  let inputContainer = createElement('div', '',{},'','',themeRadiosContainer)

  let radio = createElement('input', '',{},'','',inputContainer)
  radio.name = 'theme';
  radio.type = 'radio';
  radio.value = comp;
  radio.onchange = function(){
    if(comp==='default'){
      document.body.className = ''
    }else{
      document.body.className = this.value
    }
  }
  if(comp==='default'){
    radio.checked =true
  }
  createElement("label", comp, {},'','',inputContainer);
});

let checkbox = createElement('input', '',{},'','',themeRadiosContainer)
checkbox.type = 'checkbox';
checkbox.checked = true
checkbox.onchange = function(e){
  let weekOverview = document.querySelector('#weekOverview')
  if(e.target.checked){
    weekOverview.classList.remove('none')
    weekOverview.classList.add('weekOverview')
  }else{
    weekOverview.classList.add('none')
    weekOverview.classList.remove('weekOverview')
  }
}




}
