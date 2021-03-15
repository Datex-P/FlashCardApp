import {
  redCross as redCrossIcon,
  flashcards,
  questionMark,
  edit,
  trash,
  save, pause, play, reset
} from "./svgs.js";
import {
  dataBase
} from './dataBase.js';





function closeMenu() {  //closes the menu on the starting screen
  let all = document.querySelectorAll('.menuContainer>div')
  document.querySelector('.menuBox').style.display = 'none';

  window.onclick = '';
  all[0].classList.remove('transPlus');
  all[0].style.top = '0px'
  all[2].classList.remove('transMinus');
  all[2].style.top = '16px'
  document.getElementById('menuIcon2').style.display = 'block';
};


function createElement(tag = 'div', inner = '', style = {}, className = null, id = null, parentNode = null) {

  //function that is the basis of all other functions in the application

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

function handleOutsideClick(mainWindow, target = redCross) {
  setTimeout(function () {
    mainWindow.onclick = function (e) { e.stopPropagation() }

    window.onclick = function () {

      target.classList.add('blinkingIcon');
      setTimeout(() => {
        target.classList.remove('blinkingIcon')
      }, 3000);
    }
  }, 10);
}



function threeDots() {
  let threeDotsOpen = false
  return function (btnList, littleModalWindowStyles = {}, cardOrDeck) {

    let settingsIconContainer = createElement(
      'div', '...', {}, 'settingsIconContainer'
    );

    settingsIconContainer.title = 'Edit question and answer or delete card';
    let littleModalWindow = createElement(
      'div',
      '', littleModalWindowStyles,
      'littleModalWindow flexColumn'
    )
    settingsIconContainer.onclick = function () {
      console.log('I was clicked')
      function listener(event) {
        littleModalWindow.style.display='none'
      };
      if (threeDotsOpen === false) {
        threeDotsOpen = true
        littleModalWindow.style.display = "block";
        setTimeout(function () { 
          window.onclick = function () {
            littleModalWindow.style.display = 'none';
            console.log('hello')
          }
        }, 10);

        // setTimeout(function () { //function that closes  the edit/pause/trash field when clicked outside of it
        //    window.addEventListener('click',listener)
           
        // }, 10);

      } else {
        threeDotsOpen = false
        littleModalWindow.style.display = "none";
        window.onclick =''
      }
    };

   


    let threeDotsContainer = createElement('div', '', { position: 'relative', width: 'fit-content', right: '95px', top: '6px' }, '')
    threeDotsContainer.append(settingsIconContainer, littleModalWindow);




    let [editIconContainer, trashIconContainer, pauseIconContainer, resetIconContainer] = ['', '', '', ''].map(el => {
      return createElement('div', '', {
      }, 'flexCenterAlignCenter')
    });





    let [editIcon, trashIcon, saveIcon, pauseIcon, playIcon, resetIcon] = [edit, trash, save, pause, play, reset].map(el => {
      return createElement('div', el, {
        width: '20px',
        paddingLeft: '1px'
      })
    });

    let [editIconText, trashIconText, pauseIconText, playIconText, stats] = [`${cardOrDeck}`, `${cardOrDeck}`, `${cardOrDeck}`, `${cardOrDeck}`, 'stats'].map(el => {
      return createElement('div', el, {
        width: 'fit-content',
        fontSize: '16px',
        paddingRight: '1px'
      })
    });

    stats.style.padding = '2px'

    editIconContainer.append(editIcon, editIconText);
    resetIconContainer.append(resetIcon, stats);
    pauseIconContainer.append(pauseIcon, pauseIconText);
    trashIconContainer.append(trashIcon, trashIconText);

    trashIconContainer.classList.add('trashIconContainer')
    editIconContainer.classList.add('editIconContainer')
    pauseIconContainer.classList.add('resetAndPauseIconContainer')
    resetIconContainer.classList.add('resetIconContainer')



    let btns = {
      edit: editIconContainer,
      reset: resetIconContainer,
      pause: pauseIconContainer,
      delete: trashIconContainer
    }

    for (let btn in btnList) {
      switch (btn) {
        case 'pause':
          let paused = false;
          btns[btn].onclick = function () {
            threeDotsOpen = true;
            littleModalWindow.style.display = "none";

          //  document.querySelector('addEditDeleteContainer').style.display = 'none'

            paused = btnList[btn](pauseIconContainer, playIcon, pauseIcon, paused)
          };
          littleModalWindow.append(btns[btn])
          break;

        case 'delete':
          btns[btn].onclick = function (e) {
            if (dataBase.showDeleteFrame) {
              e.stopPropagation()
              threeDotsOpen = false;
              btnList[btn]()
              littleModalWindow.style.display = "none";
            } else {
              e.stopPropagation()
              threeDotsOpen = false;
              littleModalWindow.style.display = "none";
            }
          };
          littleModalWindow.append(btns[btn])
          break;

        case 'edit':
          btns[btn].onclick = function (event) {
            threeDotsOpen = true;
            littleModalWindow.style.display = "none";

           

            btnList[btn](event, editIconContainer, editIcon, saveIcon, (event) => {
              if (!littleModalWindow.contains(event.target)) {
                littleModalWindow.style.display = 'none';
                window.onclick = '';
              }
            }, littleModalWindow)
          };
          littleModalWindow.append(btns[btn])
          break;
        case 'reset':
          btns[btn].onclick =  function(event){
       
            btnList[btn](event)
            threeDotsOpen = !threeDotsOpen
          }
           
          
          
          littleModalWindow.append(btns[btn])
          
          //newly added
          // setTimeout(function () {
          //   window.onclick = outsideClickClosehandler
          // }, 10);
          //newly added
          break;
      }
    }

    return threeDotsContainer
  }
}


function close(mainWindow, anchorElement) {
  mainWindow.parentNode.removeChild(mainWindow);
  anchorElement.style.display = "none";
  window.onclick = null
}

let threeDotsOpen = false;

function setThreeDotsOpen(cond) {
  threeDotsOpen = cond
}

function deleteCardQuestionBox(remove, refresh, header, body, messageDeleteCardStyling = {}) {
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

  let messageDeleteCard = createElement('div', `${header}`, messageDeleteCardStyling, 'flexCenterAlignCenter messageDeleteCard')

  let deleteYesAndNoContainer = createElement('div', '', {}, 'flexSpaceAround deleteYesAndNoContainer');
  let dontShowMessageAgainContainer = createElement('div', '', {position: 'relative', top: '65px'}, 'flexCenter');
  let dontShowMessageText = createElement('div', "Don't show message again", {
    width: '200px',
    color: 'white'
  });

  let flashcardIcon = createElement('div', flashcards, {}, 'flashcardIcon');


  let leaveXContainer = createElement('div', '', {}, 'leaveXContainer')
  let leaveXsign = createElement('div', '&#10006;', { cursor: 'pointer' }, 'flexCenterAlignCenter leaveXsign')

  leaveXsign.onclick = function () {
    setThreeDotsOpen(false)
    anchorElement.removeChild(deleteContainerFrame)
  }



  let doYouWantToDelete = createElement('div', `Do you want to ${body}?`, {}, 'doYouWantToDelete');

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
    console.log('still alive and well')
  }




  anchorElement.append(deleteContainerFrame);

  deleteContainerFrame.append(deleteContainerInner, dontShowMessageAgainContainer);

  deleteContainerInner.append(doYouWantToDelete, deleteHeader, deleteYesAndNoContainer)
  deleteContainerInner.append(flashcardIcon, leaveXContainer, questionMark1, questionMark2, questionMark3)

  deleteHeader.append(messageDeleteCard)


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