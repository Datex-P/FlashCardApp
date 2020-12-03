import {
  redCross as redCrossIcon,
  flashcards,
  questionMark,
  edit,
  trash,
  save, pause, play
} from "./svgs.js";
import {
  dataBase
} from './dataBase.js';





function closeMenu() {
  let all = document.querySelectorAll('.menuContainer>div')
  document.querySelector('.menuBox').style.display = 'none';
  // opened = false;
  window.onclick = '';
  all[0].classList.remove('transPlus');
  all[0].style.top = '0px'
  all[2].classList.remove('transMinus');
  all[2].style.top = '16px'
  document.getElementById('menuIcon2').style.display = 'block';
};


function createElement(tag = 'div', inner = '', style = {}, className = null, id = null, parentNode = null) {

  let element = document.createElement(tag);

  element.innerHTML = inner;
  if (id) {
    element.id = id;
  }
  if (className) {
    element.className = className;
  }
  for (let prop in style) {
    element.style[prop] = style[prop]
  }
  if (parentNode) {
    parentNode.appendChild(element)
  }

  return element

};



let redCross = createElement(
  'div',
  redCrossIcon, {},
  'redCross'
);



function handleOutsideClick(mainWindow, target = redCross, upper = null, lower = null, questionFieldTextArea = null, answerFieldTextArea = null) {
  setTimeout(function () {
    window.onclick = function (e) {

      if (mainWindow.contains(e.target) || (upper && upper.contains(e.target)) || (lower && lower.contains(e.target)) ||
        (questionFieldTextArea && questionFieldTextArea.contains(e.target)) || (answerFieldTextArea && answerFieldTextArea.contains(e.target))) {
        //alert("Clicked in Box");
        window.onclick = ''
      } else {
        //alert("Clicked outside Box");
        target.classList.add('blinkingIcon');
        setTimeout(() => {
          target.classList.remove('blinkingIcon')
        }, 3000);
      }
    }
  }, 10);

}



function threeDots() {
  let threeDotsOpen = false
  return function (editHandler, deleteHandler, pauseHandler) {

    let settingsIconContainer = createElement(
      'div', '...', {}, 'settingsIconContainer'
    );

    settingsIconContainer.title = 'Edit question and answer or delete card';

    settingsIconContainer.onclick = function () {
      console.log('I was clicked')
      if (threeDotsOpen === false) {
        threeDotsOpen = true
        littleModalWindow.style.display = "block";

        setTimeout(function () {
          window.onclick = function (event) {
            if (!littleModalWindow.contains(event.target)) {
              littleModalWindow.style.display = 'none';
              window.onclick = ''
            }
          };
        }, 10);
      } else {
        threeDotsOpen = false
        littleModalWindow.style.display = "none";
      }
    };

    let littleModalWindow = createElement(
      'div',
      '', {},
      'littleModalWindow flexColumn'
    )
    let threeDotsContainer = createElement('div', '', { position: 'relative', width: 'fit-content' }, '')


    let [trashIconContainer, editIconContainer, pauseIconContainer] = ['', '', ''].map(el => {
      return createElement('div', '', {

      }, 'flexCenterAlignCenter trashIconContainer')
    });


    threeDotsContainer.append(settingsIconContainer, littleModalWindow);
    littleModalWindow.append(editIconContainer, pauseIconContainer, trashIconContainer);


    let [editIcon, trashIcon, saveIcon, pauseIcon, playIcon] = [edit, trash, save, pause, play].map(el => {
      return createElement('div', el, {
        width: '20px'
      })
    });

    let [editIconText, trashIconText, pauseIconText, playIconText] = ['card', 'card', 'card'].map(el => {
      return createElement('div', el, {
        width: 'fit-content',
        fontSize: '16px'
      })
    });

    editIconContainer.append(editIcon, editIconText);
    trashIconContainer.append(trashIcon, trashIconText);
    pauseIconContainer.append(pauseIcon, pauseIconText);


    trashIconContainer.onclick = function (e) {

      if (dataBase.showDeleteFrame) {
        e.stopPropagation()
        threeDotsOpen = false;
        deleteHandler()
        littleModalWindow.style.display = "none";

      } else {
        e.stopPropagation()
        threeDotsOpen = false;
        littleModalWindow.style.display = "none";
      }
    };


    let paused = false
    pauseIconContainer.onclick = function (event) {
      threeDotsOpen = true;
      littleModalWindow.style.display = "none";

      

      paused = pauseHandler(pauseIconContainer, playIcon,pauseIcon, paused)
    };



    editIconContainer.onclick = function (event) {
      threeDotsOpen = true;
      littleModalWindow.style.display = "none";



      editHandler(event, editIconContainer, editIcon, saveIcon, (event) => {
        if (!littleModalWindow.contains(event.target)) {
          littleModalWindow.style.display = 'none';
          window.onclick = ''
        }
      }, littleModalWindow)
    };

    return threeDotsContainer
  }

}


function close(mainWindow, anchorElement) {
  mainWindow.parentNode.removeChild(mainWindow);
  anchorElement.style.display = "none";
}

let threeDotsOpen = false;

function setThreeDotsOpen(cond) {
  threeDotsOpen = cond
}

function deleteCardQuestionBox(remove, refresh, header) {
  let anchorElement = document.getElementById("mainMenu");
  let deleteContainerFrame = createElement('div', '', {}, 'deleteContainerFr');

  let deleteContainerInner = createElement('div', '', {}, 'flexCenterAlignCenter deleteContainerInner')

  let [deleteContainerYes, deleteContainerNo] = ['Yes', 'No'].map(el => {

    return createElement('div', el, {
      cursor: 'pointer'

    }, 'flexCenterAlignCenter deleteContainerNoAndYes')
  })



  deleteContainerYes.onclick = function () {
    setThreeDotsOpen(false)
    remove()
    refresh(dataBase.DeckNames)
    anchorElement.removeChild(deleteContainerFrame)


  }

  deleteContainerNo.onclick = function () {
    setThreeDotsOpen(false)
    anchorElement.removeChild(deleteContainerFrame)
  }

  let deleteHeader = createElement('div', '', {}, 'deleteHeader')

  let messageDeleteCard = createElement('div', `Delete ${header}`, {}, 'flexCenterAlignCenter messageDeleteCard')

  let deleteYesAndNoContainer = createElement('div', '', {}, 'flexSpaceAround deleteYesAndNoContainer');
  let dontShowMessageAgainContainer = createElement('div', '', {}, 'flexCenter');
  let dontShowMessageText = createElement('div', "Don't show message again", {
    width: '200px',
    color: 'white'
  });

  let flashcardIcon = createElement('div', flashcards, {}, 'flashcardIcon');


  let leaveXContainer = createElement('div', '', {}, 'leaveXContainer')
  let leaveXsign = createElement('div', '&#10006;', {}, 'flexCenterAlignCenter leaveXsign')

  let doYouWantToDelete = createElement('div', `Do you want to delete this ${header}?`, {}, 'doYouWantToDelete');



  let [questionMark1, questionMark2, questionMark3] = [questionMark, questionMark, questionMark].map(el => {
    return createElement('div', el, { position: 'absolute' })
  })

  questionMark1.style.top = '-34px';
  questionMark1.style.right = '-36px';

  questionMark2.style.top = '-24px';
  questionMark2.style.right = '-20px';

  questionMark3.style.top = '-68px';
  questionMark3.style.right = '-20px';




  let checkBoxContainer = createElement('div', '', {
    width: '40px'
  }, 'checkBoxContainer');
  let checkbox = createElement('input', '', {
    width: '45px'
  });
  checkbox.setAttribute('type', 'checkbox');

  checkbox.onchange = function (e) {
    dataBase.showDeleteFrame = !e.target.checked;
  }




  anchorElement.append(deleteContainerFrame);

  deleteContainerFrame.append(deleteContainerInner, dontShowMessageAgainContainer);
  deleteContainerInner.append(doYouWantToDelete, deleteHeader, deleteYesAndNoContainer)

  deleteHeader.append(messageDeleteCard)

  deleteContainerInner.append(flashcardIcon, leaveXContainer, questionMark1, questionMark2, questionMark3)

  leaveXContainer.append(leaveXsign)

  deleteYesAndNoContainer.append(deleteContainerNo, deleteContainerYes);

  dontShowMessageAgainContainer.append(checkBoxContainer, dontShowMessageText)
  checkBoxContainer.append(checkbox)

}



export {
  createElement,
  close,
  closeMenu,
  redCross,
  handleOutsideClick,
  threeDots,
  deleteCardQuestionBox,
  setThreeDotsOpen,
  threeDotsOpen
};