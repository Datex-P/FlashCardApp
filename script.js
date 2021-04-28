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
    let chartjsel= document.querySelector('.canvasContainer .chartjs-render-monitor')
    if(chartjsel){
      chartjsel.classList.toggle('d-none');
    }
  }
  window.onclick = ''
}

document.querySelector('.menu').onclick = function () { //opens the menu field when clicked


  let all = document.querySelectorAll('.menuContainer>div')
  all[0].classList.add('transPlus');
  all[2].classList.add('transMinus');
  all.forEach(item => item.style.top = '8px')
  let chartjsel= document.querySelector('.canvasContainer .chartjs-render-monitor')
    

  document.getElementById('menuIcon2').style.display = 'none';

  if (!opened) {
    document.querySelector('.menuBox').style.display = 'flex';
    document.querySelector('.menuBox').style.justifyContent = 'space-around';
    opened = true;
    setTimeout(() => {        // logic that menu field closes again when clicked outside
      window.onclick = function(e){
        handleOutsideClick(e);
        if(chartjsel){
          chartjsel.classList.remove('d-none');
          document.querySelector('.orangeCircle').style.display = 'flex !important'
          document.querySelector('.orangeCircle').style.zIndex = '3 !important'
        }
      }
    }, 10)
    if(chartjsel){
      chartjsel.classList.add('d-none');
    }
  } else {
    closeMenu()
    opened = false;
    
    document.querySelector('.orangeCircle').style.display = 'flex !important'
    document.querySelector('.orangeCircle').style.zIndex = '3 !important'
    if(chartjsel){
      chartjsel.classList.remove('d-none');
    }


    // let chartjsel= document.querySelector('.canvasContainer .chartjs-render-monitor')
    // if(chartjsel){
    //   chartjsel.classList.toggle('d-none');
    // }


  //  document.querySelector('.canvasContainer .chartjs-render-monitor').classList.toggle('d-none');
  }

};

document.querySelector('.menuContainer').onclick = function () {
  //dataBase.showDiagram = false
  //document.querySelector('.canvasContainer').style.display = 'none'
  let chartjsel= document.querySelector('.canvasContainer .chartjs-render-monitor')
  if(chartjsel){
    chartjsel.classList.toggle('d-none');
  }


}








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
    document.querySelector('#scrollable').style.display = 'none' //scrollbar dissapears when stats or settings is clicked
    dataBase.statsOrSettingsOpened = true //when stats or settings button is clicked the scrollbar in createDom dissapears because of this prop
  }
});

document.getElementById("createDeckButton").onclick = function () {
                                    //opens the add new deck question field when create button is clicked
                                    document.querySelector('#scrollable').style.display = 'none'
                                   // dataBase.statsOrSettingsOpened = true //needed so that scrollbar on the right disappears
  createNewDeck()  

  document.querySelector(".arrowDown").style.display = "none"; //arrow down that is visible when there is no deck in the stack is put to display: none
};




