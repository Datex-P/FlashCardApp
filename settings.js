import {
  edit,
  hexagon,
  save
} from './svgs.js';
import {
  createElement,
  closeMenu,
  close,
  redCross,
  handleOutsideClick
} from './exportFunctions.js'
import {
  dataBase
} from './dataBase.js';





export default function settings() {

  let anchorElement = document.getElementById("questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let mainWindow = createElement('div', '', {
    border: '1px black solid'
  }, 'addQuestionsToDeck flexColumnCenter')
  anchorElement.appendChild(mainWindow);


  let settingsAndRedCrossContainer = createElement(
    'div', '', {}, 'flexSpaceBetweenAlignCenter settingsAndRedCrossContainer' 
  );

  let changeTimeIntervall = createElement(
    'div', 'Change Repetition Interval', {}, 'changeTimeIntervall');


  mainWindow.append(settingsAndRedCrossContainer, changeTimeIntervall);

  let theWordSettings = createElement(
    'div', 'Settings', {}, 'theWordSettings'
  );
  settingsAndRedCrossContainer.append(theWordSettings);


  let editContainerUpper = createElement('div', edit, {}, 'editContainerUpper')

  editContainerUpper.title = 'Click and change name buttons and repetition intervals for all decks.'


  let changeRepetitionIntervalContainer = createElement(
    'div', '', {}, 'flexColumn changeRepetitionIntervalContainer', '', mainWindow
  );


  let changeRepetitionIntervalContainerInner = createElement(
    'div', '', {}, 'flexColumn changeRepetitionIntervalContainerInner'
  );

  changeRepetitionIntervalContainer.append(changeRepetitionIntervalContainerInner);


  let [containerUpper, containerLower] = ['', ''].map((el) => createElement(
    'div',
    '', {}, 'flexSpaceAroundAlignCenter containerUpperAndLower', '', changeRepetitionIntervalContainerInner))



  let [upperLeftContainerContainer, upperMiddleContainerContainer, upperRightContainerContainer] = ['70px', '70px', '70px'].map(width => createElement('div', '', {
    width,
    border: '1px solid black',
    borderRadius: '5px'
  }, 'flexCenter'))

  containerUpper.append(upperLeftContainerContainer, upperMiddleContainerContainer, upperRightContainerContainer);


  let [upperLeftContainer, upperMiddleContainer, upperRightContainer] = ['63px', '63px', '63px'].map(width => createElement('div', '', {
    width,
  }, 'flexSpaceBetween upperLeftMiddleRightContainer'))

  upperLeftContainerContainer.append(upperLeftContainer);
  upperMiddleContainerContainer.append(upperMiddleContainer)
  upperRightContainerContainer.append(upperRightContainer)



  let [
    [upperLeftSmaller, upperLeftZero],
    [upperMiddleSmaller, upperMiddleZero],
    [upperRightSmaller, upperRightZero]
  ] = [upperLeftContainer, upperMiddleContainer, upperRightContainer].map(container => ["<", "0"].map((el) => {
    let input = document.createElement("div");
    input.innerText = el;
    //input.className = "noBorders";
    //input.style.height = '30%'
    input.style.backgroundColor = 'rgba(200, 168, 115, 0.95)';


    container.append(input)
    return input;

  }));
  let {
    left,
    middle,
    right
  } = dataBase.timeValues
  upperLeftZero.innerText = left
  upperMiddleZero.innerText = middle
  upperRightZero.innerText = right;



  ["min", 'hrs', 'days'].map((el) => {
    let input = document.createElement("div");
    input.innerText = el;
    input.style.fontWeight = 'bold'
   
    
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



  let [ 
    changeNameofDeckInput4, changeNameofDeckInput5, changeNameofDeckInput6] =    //input fields for naming the time buttons
    [...Array(3).fill('82%'), ...Array(3).fill('20%')].map(width => {
    let inp = createElement('input', '', {
      width
    }, 'settingsButtonStyling');
    
    inp.oninput = function(e){
      
      e.target.value =  e.target.value.substr(0,7)  //input can be seven letters long max
    }

    return inp

  })


  let [changeNameofDeckInput1, changeNameofDeckInput2, changeNameofDeckInput3] =  //input fields for the time 
    [...Array(3).fill('82%'), ...Array(3).fill('20%')].map(width => {

     let inp = createElement('input', '', {
      width
    }, 'settingsButtonStyling');
    inp.type='number'
    inp.maxlength = '2'
    inp.oninput = function(e){
      
      e.target.value =  e.target.value.substr(0,2) //input can be two digits long max
    }
    return inp
  })




  let goalSettings = createElement(
    'div', 'Goal Settings', {}, 'goalSettings'
  );

  let goalSettingsText = createElement('div', 'Current weekly Target', {}, 'goalSettingsText')
  let editGoals = createElement('div', edit, {}, 'editToReview editGoals');


  let goalSettingsBox = createElement('div', '', {}, 'flexSpaceAround')
  let weeklyTarget = createElement('div', `Target met: ${0} weeks in a row`, {}, 'weeklyTarget')


  let editClicked = false;
  let selected = 0

  function editHandler(editClicked) {


    arr.forEach((div, k) => {
      let blackArrow = createElement('div', '', {}, 'blackArrow')
      let number = createElement('div', `<span style='font-weight: bold'>${k + 1}</span> ${k + 1 > 1 ? 'days' : 'day'}`, {}, 'number')


      if (!editClicked) {

        div.onmouseenter = null
      } else {
        div.onmouseenter = function () {

          
          blackArrow.append(number)

          selected = k
          console.log(selected)
          arr.forEach((newItem, index) => {
            //remove previous arrows
            let arrow = newItem.querySelector('.blackArrow')
            newItem.classList.remove('selected')
            if (arrow) {
              newItem.removeChild(arrow)
            }

            if (index <= k) {
              newItem.classList.add('selected')

            } else {
              newItem.classList.remove('selected')
            }
            newItem.style.cursor = 'pointer';
            editClicked = !editClicked

           

          })
          this.append(blackArrow)
        }

        // div.onmouseleave = function () {
        //   this.removeChild(blackArrow)
        // }

        div.onclick = function () {
          // editGoals.innerHTML = edit;
          // editClicked = false;
          dataBase.daysOfStudy.day = k-1;
          editGoals.click()
          arr.forEach(newItem => {
            newItem.onmouseleave = null;
            newItem.onmouseenter = null;
            newItem.onclick = null;
          })
        }

      }
    })
  }

  editGoals.onclick = function () {
    editClicked = !editClicked

    if (editClicked) {
      this.innerHTML = save;
      editClicked = true;


    } else {
      this.innerHTML = edit;
      dataBase.daysOfStudy.day = selected + 1;
    }

    editHandler(editClicked)
  }

  let arr = Array(7).fill('').map(el => {

    let div = createElement('div', hexagon, {}, 'item hexagonStyling');

    return div
  });


  goalSettingsBox.append(...arr)


  function renderHexagons() {
    arr.forEach((newItem, k) => {
      if (k < dataBase.daysOfStudy.day) {
        newItem.classList.add('selected')
      }
      if(k == dataBase.daysOfStudy.day-1){
        let blackArrow = createElement('div', '', {}, 'blackArrow')
        let number = createElement('div', `<span style='font-weight: bold'>${k + 1}</span> ${k + 1 > 1 ? 'days' : 'day'}`, {}, 'number')
        blackArrow.append(number)
        newItem.append(blackArrow)
      }
    })
  }

  renderHexagons()



  let goalSettingsBox1 = createElement('div', '', {}, 'goalSettingsBox1 flexSpaceAround')



  mainWindow.append(goalSettings);
  goalSettings.append(goalSettingsText, goalSettingsBox1, weeklyTarget);
  goalSettingsBox1.append(goalSettingsBox)
  goalSettingsBox.append(editGoals)


  let resetColorSchemeContainer = createElement(
    'div', '', {}, 'resetColorSchemeContainer');

  let colorscheme = createElement(
    'div', 'Colorscheme', {}, 'colorscheme'
  );



  let [studyAndReviewUpper, studyAndReviewLower] = ['', ''].map(el => {
    return createElement('div', el, {}, 'studyAndReset flexAlignCenter')
  });

  studyAndReviewUpper.style.top = '6px';
  studyAndReviewLower.style.top = '38px';



  let editToReview = createElement('div', edit, {}, 'editToReview');

  editToReview.title = 'change study and review intervals for all decks';


  mainWindow.append(resetColorSchemeContainer);

  resetColorSchemeContainer.append(colorscheme);


  function editContainerUpperLowerRow(cond) {

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

  let editedUpper = false;


  function editContainerUpperClickHandler(cond) {
    [{
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
    ].forEach((item, idx) => {

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
    })
  }

  editContainerUpper.onclick = function () {
    editContainerUpperClickHandler(editedUpper)

    editContainerUpperLowerRow(editedUpper)
    editedUpper = !editedUpper
  }



  redCross.onclick = () => {
    if (!editedUpper && !editClicked) { //checks whether times and names field are still open or study days is open
        close(mainWindow, anchorElement);
    
    } else if (editClicked && editedUpper) {
      console.log('fired')
    
      editContainerUpper.classList.add('blinkingIcon');
      editGoals.classList.add('blinkingIcon');

      setTimeout(() => {
        editGoals.classList.remove('blinkingIcon')
        editContainerUpper.classList.remove('blinkingIcon')
      }, 3000);
    } else if (editClicked) {
    
    editGoals.classList.add('blinkingIcon');
  setTimeout(() => {
    editGoals.classList.remove('blinkingIcon')
  }, 3000);

} else if (editedUpper) {

  editContainerUpper.classList.add('blinkingIcon');
  setTimeout(() => {
    editContainerUpper.classList.remove('blinkingIcon')
  }, 3000);
  }
}

  handleOutsideClick(mainWindow, redCross)

  redCross.addEventListener('click', closeMenu());
  settingsAndRedCrossContainer.append(redCross);

  closeMenu()



  let themeRadiosContainer = createElement('div', '', {}, 'themeRadiosContainer flexSpaceAround', '', mainWindow);


  ['light', 'dark', 'default'].map(comp => {
    let inputContainer = createElement('div', '', {}, '', '', themeRadiosContainer)

    let radio = createElement('input', '', {
      cursor: 'pointer'
    }, '', '', inputContainer)
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