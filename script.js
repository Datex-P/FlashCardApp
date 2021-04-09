import createDom from './createDom.js';
import {
  dataBase
} from './dataBase.js';
import stats from './stats.js';
import settings from './settings.js';
import createNewDeck from './createNewDeck.js';
import {
  closeMenu,
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
    console.log('window handler still alive')  //message gets displayed when menu is open and clicked outside
    //window.onclick = ''
    closeMenu()            //menu closes after clicked outside
    dataBase.showDiagram = true
    createDom(dataBase.DeckNames)

    opened = false;
  }
  window.onclick = ''
}

document.querySelector('.menu').onclick = function () { //opens the menu field when clicked


  let all = document.querySelectorAll('.menuContainer>div')
  all[0].classList.add('transPlus');
  all[2].classList.add('transMinus');
  all.forEach(item => item.style.top = '8px')


  document.getElementById('menuIcon2').style.display = 'none';

  if (!opened) {
    document.querySelector('.menuBox').style.display = 'flex';
    document.querySelector('.menuBox').style.justifyContent = 'space-around';
    opened = true;
    setTimeout(() => {        // logic that menu field closes again when clicked outside
      window.onclick = handleOutsideClick;
    }, 10)
  } else {
    closeMenu()
    opened = false;
  }

};

// document.querySelector('.menuContainer').onclick = function () {
//   //dataBase.showDiagram = false
//   document.getElementById('canvasContainer').style.display = 'none'
//   canvasContainer.style.display = 'none'
//   console.log('hello menucontainer')
//   createDom(dataBase.DeckNames) //dom needs to be rerended to hide the diagram
// }




// let colorContainer = createElement('div', '', {
//   position: 'absolute',
//   display: 'block',
//   zIndex: 3
// }, '', '', document.body)
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


// let canvasContainer = createElement('div', '', {width: '100px', height:'100px'})

// let canvas = createElement('canvas', '', { position: 'absolute', width: '50px', right: '50px', top: '34px', height: '50px', overflow: 'hidden', borderRadius: '5px' }, 'pieChart')

// document.querySelector('#mainMenu').append(canvasContainer)
// canvasContainer.append(canvas)


// var config = {
//   type: 'doughnut',
//   data: {
//     labels: [
//       //  "Red",
//       //  'Blue'
//     ],
//     datasets: [{
//       data: [
//         Object.keys(dataBase.DeckNames).length-dataBase.deckCompleted, dataBase.deckCompleted
//        //first value shows all decks that are left to study
//        //second value shows decks that were already studied
//       ],
//       backgroundColor: [
//         '#5aaa95', "#FF6384"
//       ],
//       borderColor: [
//          '#5aaa95', "#FF6384",
//       ],
//       borderWidth: 1,
//       hoverBackgroundColor: [
//         // "#FF6384",
//       ]
//     }]
//   },
//   options: {
//     elements: {
//       center: {
//         text: `Goal ${(dataBase.deckCompleted*100)/Object.keys(dataBase.DeckNames).length}`,
        
//         // !dataBase.openedToday ? 'No cards studied today'
//         //   //<div style='font-size:12px'>No data</div> 
//         //   :

//         //   `Data from ${todayDate.toLocaleString('de-DE', {
//         //     day: 'numeric',
//         //     month: 'numeric',
//         //     year: 'numeric',
//         //   })}`,
//         // color: '#FF6384', // Default is #000000
//         // color: 'black',
//          fontStyle: 'Times', // Default is Arial
//         // sidePadding: 2, // Default is 20 (as a percentage)
//          minFontSize: 12, // Default is 20 (in px), set to false and text will not wrap.
         
//         // lineHeight: 19,
//         // Default is 25 (in px), used for when text wraps
//       }
//     },
//     legend: {
//       // position: 'bottom',
//       // labels: {
//       //   fontColor: 'black'
//       // }

//     },
//     cutoutPercentage: 81,
//     maintainAspectRatio: false,
//     layout: {
//       padding: {
//         top: 10
//       },
//       border: 'none'
//     }
//   }
// };




function days(){ //itereates over the days and adds them to the days container
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
boxesInMenu.forEach(button => { //opens settings and stats when clicked upon them does not
                                //do anything for logout icon so far
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

document.getElementById("createDeckButton").onclick = function () {
                                    //opens the add new deck question field when create button is clicked
  createNewDeck()

  document.querySelector(".arrowDown").style.display = "none";
};


// document.getElementById('loginButton').onclick = function () {
// 	let userNameExists = userDataBase[loginName.value];
// 	if (userNameExists && userNameExists.password === password.value) {
// 		startRender(userNameExists,loginName.value)
//     currentlyLoggedIn = loginName.value;
// 	}else{
// 		alert('Invalid username or password.')
// 	}
// }



// document.querySelector('#signUpNow').onclick = function(){
// 	loginPage.style.display='none'
// 	registerPageContainer.style.display='flex'
// }



// document.querySelector('#backToSignIn').onclick = function () {
//   loginPage.style.display='flex';
//   registerPageContainer.style.display='none'
//   document.getElementById('passwordRequirements').style.display='none';
//   document.getElementById('newUserPassword').value = '';
//   newUserLoginName.value = '';
//   registerButton.style.marginTop="90px";
// }



