import createDom from './createDom.js';
import {
  dataBase
} from './dataBase.js';
import stats from './stats.js';
import settings from './settings.js';
import createNewDeck from './createNewDeck.js';
import {
  closeMenu,
  createElement
} from './exportFunctions.js';
import {
  brush, hexagon
} from "./svgs.js";

createDom(dataBase.DeckNames);





dataBase.userStylePreferences.forEach(item => {
  item.element.style.backgroundColor = item.backgroundColor
})




let opened = false;

function handleOutsideClick(e) {
  if (!(document.querySelector('.menuBox').contains(e.target))) {
    //alert("Clicked outside Box");
    // document.querySelector('.menuBox').style.display = 'none';
    // opened = false;
    console.log('window handler still alive')
    //window.onclick = ''
    closeMenu()
    opened = false;
  }
  window.onclick = ''
}

document.querySelector('.menu').onclick = function () {

  let all = document.querySelectorAll('.menuContainer>div')
  all[0].classList.add('transPlus');
  all[2].classList.add('transMinus');
  all.forEach(item => item.style.top = '8px')
  // document.querySelectorAll('.menuContainer>div').removeProperty('margin-bottom');

  // document.getElementById('menuBanner').style.display = 'block'

  document.getElementById('menuIcon2').style.display = 'none';

  if (!opened) {
    document.querySelector('.menuBox').style.display = 'flex';
    document.querySelector('.menuBox').style.justifyContent = 'space-around';
    opened = true;
    setTimeout(() => {
      window.onclick = handleOutsideClick;
    }, 10)
  } else {
    closeMenu()
    opened = false;
  }

};

let colorContainer = createElement('div', '', {
  position: 'absolute',
  display: 'block',
  zIndex: 3
}, '', '', document.body)
// let colorInput = createElement('input')
//       colorInput.type = 'color'
//       colorContainer.appendChild(colorInput)

// document.getElementById('paintbrush').onclick = function () {

//     if (document.body.style.cursor == 'default') {
//       document.body.style.cursor = "url('brush.svg') 10 20, auto";
//       // document.body.style.cursor = "url(`${brush}`) 10 20, auto";

//       let colorInput = createElement('input')
//       document.body.addEventListener('mousemove',otherStaffListener)

//       document.body.addEventListener('mousemove',changePositionOfColorContainer)

//       function otherStaffListener(event){
//         function componentToHex(c) {
//           let num = +c
//           var hex = num.toString(16);
//           return hex.length == 1 ? "0" + hex : hex;
//         }

//         function rgbToHex(r, g, b) {
//           return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
//         }

//         colorInput.type = 'color'
//         let color = window.getComputedStyle(event.target).getPropertyValue('background-color')
//         let params = color.match(/([0-9]{3})/g) || [0, 0, 0]
//         colorInput.value = rgbToHex(...params);
//         // console.log(color)
//         // console.log(event.target.style.backgroundColor)
//         colorContainer.innerHTML = ''
//         colorContainer.appendChild(colorInput)
//         colorContainer.style.display = 'block'
//       }
//       function changePositionOfColorContainer(event){
//         colorContainer.style.top = `${event.clientY+10}px`
//         colorContainer.style.left = `${event.clientX+10}px`
//       }

//       document.body.ondblclick = function (event) {
//         // event.target.style.backgroundColor = 'red'

//         // let {x,y} = colorContainer.getBoundingClientRect()
//         // colorContainer.style.top
//         document.body.removeEventListener('mousemove',changePositionOfColorContainer)
//         document.body.removeEventListener('mousemove',otherStaffListener)
//         colorInput.oninput = function(){
//           event.target.style.backgroundColor = this.value
//           document.body.addEventListener('mousemove',otherStaffListener)
//           document.body.addEventListener('mousemove',changePositionOfColorContainer)
//           dataBase.userStylePreferences.push({element:event.target,backgroundColor:this.value})
//           console.log(JSON.stringify(dataBase.userStylePreferences))
//         }
//       }

//     } else {
//       document.body.style.cursor = 'default'
//     }
//   }






function days(){
	let anchor = document.querySelector('#daysContainer')

  anchor.style.display = 'flex';
  anchor.style.cursor = 'pointer';
  
  ['M','T','W','T','F','S','S'].forEach((letter, idx)=>{
    anchor.innerHTML += `
      <div class='flexColumnAlignCenter'>
        <div class='daysStyling'>
          ${letter}
          <div id='${idx}' style="transform: rotate(90deg)">${hexagon}</div>
        </div>
      
      </div>
      `
 })
}
//let div = createElement('div', '2 out of 3 days', {width: '100px', height: '50px', position: 'absolute', top: '49px', right: '6px'})

//document.querySelector('#mainMenu').append(div)
 

//days()








let boxesInMenu = document.querySelectorAll('.menuBoxesStyling');
boxesInMenu.forEach(button => {
  button.onclick = function () {
    if (button.innerText === 'Stats') {
      stats();
      document.querySelector('.menuBox').style.display = 'none';
    }
    if (button.innerText === 'Settings') {
      settings();
      document.querySelector('.menuBox').style.display = 'none';
    }
  }
});

// document.querySelector('#daysContainer').onclick = function () {
//   settings()
// }




document.getElementById("createDeckButton").onclick = function () {
  createNewDeck()

  document.querySelector(".arrowDown").style.display = "none";
};