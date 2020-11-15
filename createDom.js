import { edit, save, trash} from './svgs.js';
import questAnswerTrainOverv from './questAnswerTrainOverv.js';
import addQuestionsToDeck from './addQuestionsToDeck.js';
import { dataBase } from './dataBase.js';


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
}


export default function createDom(obj, length = "long") {

  listOfDecks.innerHTML = "";
  let arr = Object.keys(obj);








  let colors = ['#ffcdb2','#ffb4a2','#e5989b','#b5838d','#6d6875']
  
  arr.forEach((item, index) => {
    let newDeckContainer = document.createElement("div");
    newDeckContainer.className = 'newDeckContainer';

    newDeckContainer.style.backgroundColor = colors[index%5]

    newDeckContainer.style.transform =  `rotate(${index*-3}deg)`;

    newDeckContainer.onmouseenter = function(){
      this.style.transform =  `rotate(0deg)`;
    }
    newDeckContainer.onmouseleave = function(){
      this.style.transform =  `rotate(${index*-5}deg)`;
    }

    let nameOfNewDeck = document.createElement("div");
        nameOfNewDeck.innerText = item;
        //nameOfNewDeck.style.fontWeight = 'bold';

    nameOfNewDeck.onmouseover = function () {
      nameOfNewDeck.style.color = "rgb(200, 168, 115)";
      nameOfNewDeck.style.cursor = "pointer";
    };

    nameOfNewDeck.addEventListener("mouseleave", () => {
      nameOfNewDeck.style.color = "black";
    });

    if (!dataBase.DeckNames[item].length) {
      nameOfNewDeck.onclick = function () {
        addIcon.classList.remove('blinkingIcon');
        alert('Click on the blinking add icon');
        addIcon.classList.add('blinkingIcon');

      };
    } else {
      nameOfNewDeck.onclick = function () {
        questAnswerTrainOverv(item);
      };
    }


    let addEditDeleteContainer = document.createElement("div");
    addEditDeleteContainer.style.display = "flex";
    addEditDeleteContainer.style.flexDirection = 'column';
    addEditDeleteContainer.style.justifyContent = "space-around";
    addEditDeleteContainer.style.width = "140px";
    addEditDeleteContainer.style.height = '120px';
    addEditDeleteContainer.style.marginTop = '20px'
    //addEditDeleteContainer.style.alignItems = "center";
    addEditDeleteContainer.style.left = '105px';
    addEditDeleteContainer.style.border = '1px black solid'
    addEditDeleteContainer.style.zIndex = '3';
    addEditDeleteContainer.style.position = 'absolute';



   // ['', '', '', '', '', '', '', ''].forEach()




    // ['a', 'a', 'a'].forEach(el => {
    //   let blackLines12 = document.createElement('div');
    //   blackLines12.style.width = '99%';
    //   blackLines12.style.border= '0.5px #eee4e1 solid'
    //   blackLines12.innerText = el
    //   //container2min.append(smallerThan);

    //   newDeckContainer.append(blackLines12)
    // });


    let blackLines = document.createElement('div');
        blackLines.style.width = '99%';
        blackLines.style.border= '0.5px #eee4e1 solid'

    let blackLines2 = document.createElement('div');
        blackLines2.style.marginTop = '15px';
        blackLines2.style.width = '99%';
        blackLines2.style.border= '0.5px #eee4e1 solid'

    let blackLines3 = document.createElement('div');
        blackLines3.style.marginTop = '15px';
        blackLines3.style.width = '99%';
        blackLines3.style.border= '0.5px #eee4e1 solid'

    let blackLines4 = document.createElement('div');
        blackLines4.style.marginTop = '15px';
        blackLines4.style.width = '99%';
        blackLines4.style.border= '0.5px #eee4e1 solid';

    let blackLines5 = document.createElement('div');
        blackLines5.style.marginTop = '15px';
        blackLines5.style.width = '99%';
        blackLines5.style.border= '0.5px #eee4e1 solid';

    let blackLines6 = document.createElement('div');
        blackLines6.style.marginTop = '15px';
        blackLines6.style.width = '99%';
        blackLines6.style.border= '0.5px #eee4e1 solid';

    let blackLines7 = document.createElement('div');
        blackLines7.style.marginTop = '15px';
        blackLines7.style.width = '99%';
        blackLines7.style.border= '0.5px #eee4e1 solid';

    let blackLines8 = document.createElement('div');
        blackLines8.style.marginTop = '15px';
        blackLines8.style.width = '99%';
        blackLines8.style.border= '0.5px #eee4e1 solid';

    let trashIcon = document.createElement("div");
    trashIcon.innerHTML = trash;
    trashIcon.style.right = "5px";
    //trashIcon.querySelector('svg').style.color = 'red';


    let trashIconContainer = document.createElement('div');
        trashIconContainer.style.border = '1px black solid';
        trashIconContainer.style.display = 'flex';
        trashIconContainer.style.justifyContent = 'space-around';

    let trashIconText = document.createElement('div');
        trashIconText.innerHTML = 'Delete deck';


    trashIcon.onclick = () => {
      newDeckContainer.parentNode.removeChild(newDeckContainer);
      delete dataBase.DeckNames[item];
      if (!Object.keys(dataBase.DeckNames).length) {
        let arrowDown = document.querySelector(".arrowDown");
        arrowDown.style.display = "block";
        document.getElementById('createYourFirstDeckPrompt').style.display = 'block';

      }
    };

    let editIcon = document.createElement("div");
    //editIcon.style.marginRight = "5px";
    editIcon.style.left = '190px'
    editIcon.style.position = 'absolute';
    editIcon.style.top = '11px'


     let addIcon = document.createElement("div");
    //addIcon.style.marginRight = "5px";
    // addIcon.style.left = '180px'
    // addIcon.style.position = 'absolute';
    // addIcon.style.top = '11px'








    let edited = false;
    editIcon.innerHTML = edit;
    //editIcon.querySelector('svg').style.color = 'orange';

    let changeNameofDeckInput = document.createElement("input");
    changeNameofDeckInput.onclick = function(event){
      event.stopPropagation()
    }

    function clickOutsideHandle(){
      //alert("Clicked out Box")
      editIcon.classList.add('blinkingIcon')
      setTimeout(()=>{
        editIcon.classList.remove('blinkingIcon')
      },3000)
     
    }

    editIcon.onclick = function (event) {
    
        window.addEventListener('click',clickOutsideHandle)
      event.stopPropagation()

      if (!edited) {
        //save.querySelector('svg').style.color = 'orange';
        this.innerHTML = save;       
        
        newDeckContainer.replaceChild(changeNameofDeckInput, nameOfNewDeck);
        changeNameofDeckInput.value = nameOfNewDeck.innerText;
        edited = true;
    
       // console.log('click like a edit')
      } else {
        this.innerHTML = edit; 
       // editIcon.querySelector('svg').style.color = 'orange';
        //console.log('click like a save')
        newDeckContainer.replaceChild(nameOfNewDeck, changeNameofDeckInput);
        window.removeEventListener('click',clickOutsideHandle)
        edited = false;
        //send fetch=>saveToDataBase
        // if ok
        nameOfNewDeck.innerText = changeNameofDeckInput.value;
      }
    };



  [trashIcon, editIcon].forEach((el) => {

    el.style.cursor = 'pointer';
  });

  let addIconContainer = document.createElement('div');
      //addIconContainer.style.border = '1px black solid';
      //addIconContainer.style.display = 'flex';
     // addIconContainer.style.transform = 'rotate(180deg)';
      addIconContainer.style.left = '190px'
      addIconContainer.style.position = 'absolute';
      addIconContainer.style.top = '11px';
      addIconContainer.style.cursor = 'pointer';

    // transform: 'rotate(90deg)',
    // fontWeight: 'bold',
    // marginTop:'5px',
    // display: 'none',
    // position: 'absolute',



    


    let littleModalWindow = createElement(
      'div',
      '',
      {
        transform: 'rotate(-90deg)'
      },
      'littleModalWindow2'
    )



    addIconContainer.onclick = function () {

      littleModalWindow.style.display = 'block'
    }










    

   // let addIcon = document.createElement("div");
    // addIcon.className = 'orangeCircle';
    // addIcon.innerText = "+";
    // addIcon.style.color = 'white'
    // addIcon.style.border = '1px solid grey';

    //addIcon.style.zIndex = '3';
    addIcon.style.transform = 'rotate(90deg)';
    addIcon.innerText='...';
    addIcon.style.fontWeight = 'bold';
  

    // addIcon.onclick = function () {
    //   this.classList.remove('blinkingIcon')
    //   addQuestionsToDeck(item);
    // }

    // addIcon.addEventListener('mouseover', function() {
    //   addIcon.style.cursor = 'pointer';
    // });


    newDeckContainer.appendChild(nameOfNewDeck);

    //newDeckContainer.append(editIcon)
    newDeckContainer.append(addIconContainer)


    addIconContainer.append(littleModalWindow)
    addIconContainer.append(addIcon)


    if (length == "long") {
     // addEditDeleteContainer.appendChild(addIcon);
      //addEditDeleteContainer.appendChild(editIcon);

      //addEditDeleteContainer.append(addIconContainer);
     // addIconContainer.append(addIcon);
     // addIconContainer.append(addIconText)


      addEditDeleteContainer.appendChild(trashIconContainer)

      trashIconContainer.append(trashIcon)
      trashIconContainer.append(trashIconText)
      //addEditDeleteContainer.appendChild(trashIcon);


      newDeckContainer.appendChild(blackLines);
      newDeckContainer.appendChild(blackLines2);
      newDeckContainer.appendChild(blackLines3);
      newDeckContainer.appendChild(blackLines4);
      newDeckContainer.appendChild(blackLines5);
      newDeckContainer.appendChild(blackLines6);
      newDeckContainer.appendChild(blackLines7);
      newDeckContainer.appendChild(blackLines8);
    }

    newDeckContainer.appendChild(addEditDeleteContainer);
    listOfDecks.prepend(newDeckContainer);

    // listOfDecks.style.display = "block";


  });
}