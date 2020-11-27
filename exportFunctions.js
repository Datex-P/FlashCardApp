import { redCross as redCrossIcon } from "./svgs.js";
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

function dataBaseQueue(randomNum){
dataBase.queue.push({
  question,
  answer,
  index,
  timeLeft: randomNum * 1000
})
}


function close(mainWindow, anchorElement) {
  mainWindow.parentNode.removeChild(mainWindow);
  anchorElement.style.display = "none";
}



export { createElement, close, closeMenu, redCross, handleOutsideClick, dataBaseQueue};
