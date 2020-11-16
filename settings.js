import shuffle from "./shuffleButton.js";
import { startTimer, timer } from "./timer.js";
import { redCross as redCrossIcon } from "./svgs.js";
import { dataBase } from './dataBase.js';
import createDom from './createDom.js';
import { edit, save, trash} from './svgs.js';

function createElement(tag = 'div', inner = '', style = {}, className = null, id = null) {

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
  return element
};



export default function settings() {
  


  let anchorElement = document.getElementById("questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let mainWindow = createElement('div', '', {}, 'addQuestionsToDeck')
  anchorElement.appendChild(mainWindow);

  //header
  let settingsAndRedCrossContainer = createElement(
    'div',
    '',
    {
      width: "265px"
    },
    'flexSpaceBetween'
  );
  mainWindow.append(settingsAndRedCrossContainer);

  let theWordSettings = createElement(
    "div",
    `Settings`,
    {fontWeight: 'bold'}
  );
  settingsAndRedCrossContainer.append(theWordSettings);

  let redCross = createElement(
    'div',
    redCrossIcon,
    {},
    'redCross'
  );

  let changeTimeIntervall = createElement(
    'div',
    'Change Repetition Interval',
    {}
  );

  mainWindow.append(changeTimeIntervall);



  let editContainer = createElement(
    'div',
    edit,
    {border: '1px black solid',
    position: 'absolute',
    top: '10px',
    right: '20px'
  }
  );

  let editContainer2 = createElement(
    'div',
    edit,
    {}
  );


  let containerForChangeTimeIntervall = createElement(
    'div',
    '',
    {display: 'flex',
    flexDirection: 'column',
  width: '300px',
  height: '90px',
border: '1px black solid'}
  );

  mainWindow.append(containerForChangeTimeIntervall);

  let containerUpper = createElement(
    'div',
    '',
    {display: 'flex',
     justifyContent: 'space-around',
  width: '100%',
  height: '50%',
  position: 'relative',
border: '1px black solid'});

containerForChangeTimeIntervall.append(containerUpper);




let container1  = document.createElement('div');
container1.style.display = 'flex';
container1.style.justifyContent = 'space-around';
container1.style.width = '20%';
container1.style.border = '1px black solid';

["<", '0', 'min'].forEach((el) => {
  let input = document.createElement("div");
  input.innerText = el;
  //input.className = "noBorders";
  input.style.width = '20%';
  input.style.height = '30%'
  input.style.backgroundColor = 'rgba(200, 168, 115, 0.95)';


  container1.append(input)

});
containerUpper.append(container1);


let container2  = document.createElement('div');
container2.style.display = 'flex';
container2.style.justifyContent = 'space-around';
container2.style.width = '20%';
container2.style.border = '1px black solid';



["<", '0', 'min'].forEach((el) => {
  let input = document.createElement("div");
  input.innerText = el;
  //input.className = "noBorders";
  input.style.width = '20%';
  input.style.height = '30%'
  input.style.backgroundColor = 'rgba(200, 168, 115, 0.95)';


  container2.append(input)

});
containerUpper.append(container2)


let container3  = document.createElement('div');
container3.style.display = 'flex';
container3.style.justifyContent = 'space-around';
container3.style.width = '20%';
container3.style.border = '1px black solid';



["<", '0', 'min'].forEach((el) => {
  let input = document.createElement("div");
  input.innerText = el;
  //input.className = "noBorders";
  input.style.width = '20%';
  input.style.height = '30%'
  input.style.backgroundColor = 'rgba(200, 168, 115, 0.95)';


  container3.append(input)

});
containerUpper.append(container3)









// let smallerThan1 = document.createElement('div');
// smallerThan1.innerText = '<'
// containerUpper.append(smallerThan1)






containerUpper.append(editContainer)







let containerLower = createElement(
  'div',
  '',
  {
    display: 'flex',
    justifyContent: 'space-around',
    position: 'relative',
width: '100%',
height: '50%',
border: '1px black solid'});

containerForChangeTimeIntervall.append(containerLower);


["again", "good", "easy"].forEach((el) => {
  let input = document.createElement("div");
  input.innerText = el;
 // input.className = "noBorders";
  input.style.width = '25%';
  input.style.height = '30%';
  input.style.backgroundColor = 'rgba(200, 168, 115, 0.95)';

  containerLower.append(input)
});

containerLower.append(editContainer2)
//containerLower.append(changeNameofDeckInput)








let changeNameofDeckInput1 = document.createElement("input");
        changeNameofDeckInput1.style.width = '3%';
        changeNameofDeckInput1.style.position = 'absolute';
        changeNameofDeckInput1.style.left = '67px';
    changeNameofDeckInput1.onclick = function(event){
      event.stopPropagation()
    }


    let changeNameofDeckInput2 = document.createElement("input");
    changeNameofDeckInput2.style.width = '3%';
    changeNameofDeckInput2.style.position = 'absolute';
    changeNameofDeckInput2.style.left = '216px';
changeNameofDeckInput2.onclick = function(event){
  event.stopPropagation()
}

let changeNameofDeckInput3 = document.createElement("input");
changeNameofDeckInput3.style.width = '3%';
changeNameofDeckInput3.style.position = 'absolute';
changeNameofDeckInput3.style.left = '280px';
changeNameofDeckInput3.onclick = function(event){
event.stopPropagation()
}




let edited = false;

//let bla = containerUpper.childNodes[0]

editContainer.onclick = function () {
    
//   window.addEventListener('click',clickOutsideHandle)
// event.stopPropagation()

//if (!edited) {
 

  container1.replaceChild(changeNameofDeckInput1, container1.childNodes[1]);
  container2.replaceChild(changeNameofDeckInput2, container2.childNodes[1]);
  container3.replaceChild(changeNameofDeckInput3, container3.childNodes[1]);
  //containerUpper.replaceChild(changeNameofDeckInput3, containerUpper.childNodes[2] )
 //this.innerHTML = save;       
  
  // containerUpper.replaceChild(test, changeNameofDeckInput);
  // changeNameofDeckInput.value = nameOfNewDeck.innerText;
  // edited = true;

 // console.log('click like a edit')
// } else {
 
//   editIconContainer.append(editIcon)
//   editIconContainer.append(editIconText)



//   //console.log('click like a save')
//   newDeckContainer.replaceChild(nameOfNewDeck, changeNameofDeckInput);
//   window.removeEventListener('click',clickOutsideHandle)
//   edited = false;
//   //send fetch=>saveToDataBase
//   // if ok
//   nameOfNewDeck.innerText = changeNameofDeckInput.value;

};























  function close() {
    mainWindow.parentNode.removeChild(mainWindow);
    anchorElement.style.display = "none";
  }
  redCross.onclick = close

  setTimeout(function () {
    window.onclick = function handleOutsideClick(e) {
      if (mainWindow.contains(e.target)) {
        //alert("Clicked in Box");
      } else {
        //alert("Clicked outside Box");
        redCross.classList.add("blinkingIcon");
        setTimeout(() => {
          redCross.classList.remove("blinkingIcon");
        }, 4500);
      }
    };
  }, 10);

 redCross.addEventListener('click', closeMenu());



  settingsAndRedCrossContainer.append(redCross);

  
  //mainWindow.appendChild(questionContainer);


  function closeMenu(){
    let all = document.querySelectorAll('.menuContainer>div')
    document.querySelector('.menuBox').style.display = 'none';
   // opened = false;
    window.onclick = '';
    all[0].classList.remove('transPlus');
    all[0].style.top = '0px'
    all[2].classList.remove('transMinus');
    all[2].style.top = '16px'
    document.getElementById('menuIcon2').style.display = 'block';
  }

//closeMenu()







    }
 
      
          














