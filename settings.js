
import { edit, hexagon, save } from './svgs.js';
import { createElement, closeMenu, close, redCross, handleOutsideClick} from './exportFunctions.js'
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
    'div', 'Change Repetition Interval', { fontWeight: 'bold', fontSize: '17px' });


  mainWindow.append(settingsAndRedCrossContainer, changeTimeIntervall);

  let theWordSettings = createElement(
    "div",
    'Settings',
    { fontWeight: 'bold', fontSize: '22px' }
  );
  settingsAndRedCrossContainer.append(theWordSettings);




  let [editContainerUpper] = [''].map(el => {
    return createElement('div', edit, { position: 'absolute', right: '8px', top: '24px', cursor: 'pointer' })
  });

  editContainerUpper.title = 'Click and change name buttons and repetition intervals for all decks.'


  let changeRepetitionIntervalContainer = createElement(
    'div', '', { position: 'relative', marginTop: '10px' }, 'flexColumn changeRepetitionIntervalContainer', '', mainWindow
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
  let { left, middle, right } = dataBase.timeValues
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

  let { leftName, middleName, rightName } = dataBase.nameValues

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
    'div', 'Goal Settings', { marginTop: "25px", fontWeight: 'bold', fontSize: '17px' }
  );

  let goalSettingsText = createElement('div', 'Current weekly Target', { fontWeight: 'bold', fontSize: '13px', margin: '6px 0 2px' })
  let editGoals = createElement('div', edit, { position: 'absolute', right: '-30px', top: '13px' }, 'editToReview');


  let goalSettingsBox = createElement('div', '', { width: '200px', borderRadius: '5px', position: 'relative', height: '60px',  display: 'flex', justifyContent: 'space-around' /*display: 'flex', flexDirection: 'column'*/})
  let weeklyTarget = createElement('div', `Target met: ${0} weeks in a row`, { width: '165px', marginTop: '5px', height: '20px', fontSize: '14px', fontWeight: 'normal' })



  let editClicked = false;
  let selected = 0

  function editHandler(editClicked) {


    arr.forEach((div, k) => {
      let blackBox = createElement('div', '', {width: '40px', display: 'flex', border: '1px solid black', left: '30px'})
      let blackArrow = createElement('div', '', { width: '2px', height: '13px', transform: 'rotate(-90deg)', backgroundColor: 'black', fontSize: '16px', fontWeight: 'bold', position: 'absolute', top: '37px',left:'27px'})
      let number = createElement('div', `${k+1} ${k+1 >1 ? 'days' : 'day'} / <br> week`, {}, 'number')


      if (!editClicked) {

        div.onmouseenter = null
      } else {
        div.onmouseenter = function () {
         // this.append(blackBox)
          this.append(blackArrow)
          blackArrow.append(number)

          selected = k
          console.log(selected)
          arr.forEach((newItem, index) => {
            if (index <= k) {
              newItem.classList.add('selected')
              
            } else {
              newItem.classList.remove('selected')
            }
            newItem.style.cursor = 'pointer';
            editClicked = !editClicked

            if (!editClicked) {
              editGoals.innerHTML = edit;
              //editClicked = true;
            }

          })
        }
        div.onmouseleave = function () {
          this.removeChild(blackArrow)
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
      dataBase.daysOfStudy.day = selected+1;
    }

    editHandler(editClicked)
  }

  let arr = Array(7).fill('').map(el => {

    let div = createElement('div', hexagon, { display: 'flex', transform: 'rotate(90deg)', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '16px', height: '21px',position: 'relative' }, 'item');

    return div
  });

 
  goalSettingsBox.append(...arr)


  function renderHexagons() {
    arr.forEach((newItem, index) => {
      if (index <= dataBase.daysOfStudy.day) {
        newItem.classList.add('selected')
      }
    })
  }

  renderHexagons()


console.log(selected)

//console.log(dataBase.daysOfStudy.day)


let goalSettingsBox1 = createElement('div', '', { width: '260px', border: '1px solid black', borderRadius: '5px', position: 'relative', height: '60px',  display: 'flex', justifyContent: 'space-around' /*display: 'flex', flexDirection: 'column'*/})



  mainWindow.append(goalSettings);
  goalSettings.append(goalSettingsText, goalSettingsBox1, weeklyTarget);
  goalSettingsBox1.append(goalSettingsBox)
  goalSettingsBox.append(editGoals)


  let resetColorSchemeContainer = createElement(
    'div', '', {
    width: '154px',
    // border: '1px black solid',
    marginTop: '20px',

  }, '');

  let colorscheme = createElement(
    'div', 'Colorscheme', { fontWeight: 'bold', textAlign: 'center', fontSize: '17px' }
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
    }
    )
  }

  editContainerUpper.onclick = function () {
    editContainerUpperClickHandler(editedUpper)

    editContainerUpperLowerRow(editedUpper)
    editedUpper = !editedUpper
  }



  redCross.onclick = () => {
    close(mainWindow, anchorElement);

  }
  handleOutsideClick(mainWindow, redCross)

  redCross.addEventListener('click', closeMenu());
  settingsAndRedCrossContainer.append(redCross);

  closeMenu()



  let themeRadiosContainer = createElement('div', '', {}, 'themeRadiosContainer flexSpaceAround', '', mainWindow);


  ['light', 'dark', 'default'].map(comp => {
    let inputContainer = createElement('div', '', {}, '', '', themeRadiosContainer)

    let radio = createElement('input', '', { cursor: 'pointer' }, '', '', inputContainer)
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

