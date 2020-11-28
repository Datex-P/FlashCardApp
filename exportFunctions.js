import { redCross as redCrossIcon, flashcards, questionMark } from "./svgs.js";


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
  redCrossIcon,
  {},
  'redCross'
);

function handleOutsideClick(mainWindow){
  setTimeout(function () {
    window.onclick = function (e) {
      if (mainWindow.contains(e.target)) {
        //alert("Clicked in Box");
        window.onclick = ''         
      } else {
        //alert("Clicked outside Box");
        redCross.classList.add('blinkingIcon');
        setTimeout(() => {
          redCross.classList.remove('blinkingIcon')
        }, 3000);
      }
    }
  }, 10);
}


function close(mainWindow, anchorElement) {
  mainWindow.parentNode.removeChild(mainWindow);
  anchorElement.style.display = "none";
}



function deleteCardQuestionBox(deck,index) {

  let deleteContainerFrame = createElement('div', '', {}, 'deleteContainerFr');

  let deleteContainerInner = createElement('div', '', {}, 'flexCenterAlignCenter deleteContainerInner')

  let [deleteContainerYes, deleteContainerNo] = ['Yes', 'No'].map(el=>{

    return createElement('div', el, {
    
    }, 'flexCenterAlignCenter deleteContainerNoAndYes')
  })



  deleteContainerYes.onclick = function () {
    threeDotsOpen = false
    //some delete card logic needed here
    dataBase.DeckNames[deck].splice(index,1)
    deleteContainerFrame.style.display = 'none'
  }

  deleteContainerNo.onclick = function () {
    threeDotsOpen = false
    deleteContainerFrame.style.display = 'none'
  }

  let deleteHeader = createElement('div', '', {}, 'deleteHeader')

  let messageDeleteCard = createElement('div', 'Delete Card', {}, 'flexCenterAlignCenter messageDeleteCard')

  let deleteYesAndNoContainer = createElement('div', '', {}, 'flexSpaceAround deleteYesAndNoContainer');
  let dontShowMessageAgainContainer = createElement('div', '', { marginTop: '-30px', width: '300px', height: '60px' }, 'flexCenter');
  let dontShowMessageText = createElement('div', "Don't show message again", { width: '200px', color: 'white' });

  let flashcardIcon = createElement('div', flashcards, {}, 'flashcardIcon');


  let leaveXContainer = createElement('div', '', {}, 'leaveXContainer')
  let leaveXsign = createElement('div', '&#10006;', { width: '20px', height: '20px', color: 'white', right: '-3px', fontSize: '11px' }, 'flexCenterAlignCenter')


  let doYouWantToDelete = createElement('div', 'Do you want to delete this card?', { position: 'absolute', top: '67px', zIndex: '2' });

  let questionMark1 = createElement('div', questionMark, { position: 'absolute', top: '-34px', right: '-36px' });
  let questionMark2 = createElement('div', questionMark, { position: 'absolute', top: '-24px', right: '-20px' });
  let questionMark3 = createElement('div', questionMark, { position: 'absolute', top: '-68px', right: '-20px' });

  let checkBoxContainer = createElement('div', '', { width: '40px' }, 'checkBoxContainer');
  let checkbox = createElement('input', '', { width: '45px' });
  checkbox.setAttribute('type', 'checkbox');

  checkbox.onchange = function (e) {
    dataBase.showDeleteFrame = !e.target.checked;
  }

  let anchorElement = document.getElementById("questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let mainWindow = createElement('div', '', {}, 'addQuestionsToDeck')
  anchorElement.appendChild(mainWindow);


  mainWindow.append(deleteContainerFrame);
  deleteContainerFrame.append(deleteContainerInner);
  deleteContainerInner.append(doYouWantToDelete)

  deleteContainerInner.append(deleteHeader)
  deleteHeader.append(messageDeleteCard)

  deleteContainerInner.append(flashcardIcon)

  deleteContainerInner.append(leaveXContainer)
  leaveXContainer.append(leaveXsign)



  deleteContainerInner.append(deleteYesAndNoContainer)
  deleteYesAndNoContainer.append(deleteContainerNo);
  deleteYesAndNoContainer.append(deleteContainerYes);
  deleteContainerInner.append(questionMark1);
  deleteContainerInner.append(questionMark2);
  deleteContainerInner.append(questionMark3);
  deleteContainerFrame.append(dontShowMessageAgainContainer);
  dontShowMessageAgainContainer.append(checkBoxContainer)
  checkBoxContainer.append(checkbox)
  dontShowMessageAgainContainer.append(dontShowMessageText);

}












export { createElement, close, closeMenu, redCross, handleOutsideClick, deleteCardQuestionBox};
