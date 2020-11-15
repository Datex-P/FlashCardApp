import { edit, save, trash} from './svgs.js';
import questAnswerTrainOverv from './questAnswerTrainOverv.js';
import addQuestionsToDeck from './addQuestionsToDeck.js';
import { dataBase } from './dataBase.js';

export default function createDom(obj, length = "long") {

  listOfDecks.innerHTML = "";
  let arr = Object.keys(obj);





  listOfDecks.onwheel = function () {
    // z Index of visible card  (currently 100) is 1
      //z Index of all the other cards get incremented by 1
      //how to get card with hightest zIndex

      //for x in listofDecks
     
      function maxZIndex() {

        console.log(Array.from(document.querySelectorAll('newDeckContainer'))
              .map(a => parseFloat(window.getComputedStyle(a).zIndex))
              .filter(a => !isNaN(a))
              .sort()
              .pop()
   }
   maxZIndex()

  }






  
  arr.forEach((item, index) => {
    let newDeckContainer = document.createElement("div");
    newDeckContainer.className = 'newDeckContainer';



    newDeckContainer.style.zIndex =  index+1;



    let nameOfNewDeck = document.createElement("div");
    nameOfNewDeck.innerText = item;

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
    addEditDeleteContainer.style.justifyContent = "space-around";
    addEditDeleteContainer.style.width = "100px";
    addEditDeleteContainer.style.marginTop = '60px'
    addEditDeleteContainer.style.alignItems = "center";
    addEditDeleteContainer.style.zIndex = '3';
    addEditDeleteContainer.style.position = 'absolute';



    let blackLines = document.createElement('div');
        blackLines.style.width = '99%';
        blackLines.style.border= '0.5px #f7ede2 solid'

    let blackLines2 = document.createElement('div');
        blackLines2.style.marginTop = '15px';
        blackLines2.style.width = '99%';
        blackLines2.style.border= '0.5px #ffe8d6 solid'

    let blackLines3 = document.createElement('div');
        blackLines3.style.marginTop = '15px';
        blackLines3.style.width = '99%';
        blackLines3.style.border= '0.5px #eee4e1 solid'

    let blackLines4 = document.createElement('div');
        blackLines4.style.marginTop = '15px';
        blackLines4.style.width = '99%';
        blackLines4.style.border= '0.5px #ffe1a8 solid';

    let blackLines5 = document.createElement('div');
        blackLines5.style.marginTop = '15px';
        blackLines5.style.width = '99%';
        blackLines5.style.border= '0.5px #ffeedd solid';

    let trashIcon = document.createElement("div");
    trashIcon.innerHTML = trash;
    trashIcon.style.right = "5px";
    trashIcon.querySelector('svg').style.color = 'red';


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
    editIcon.style.marginRight = "5px";


    let edited = false;
    editIcon.innerHTML = edit;
    editIcon.querySelector('svg').style.color = 'orange';

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
        editIcon.querySelector('svg').style.color = 'orange';
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





    let addIcon = document.createElement("div");
    addIcon.className = 'orangeCircle';
    addIcon.innerText = "+";
    addIcon.style.border = '1px solid red';


    addIcon.onclick = function () {
      this.classList.remove('blinkingIcon')
      addQuestionsToDeck(item);
    }

    addIcon.addEventListener('mouseover', function() {
      addIcon.style.cursor = 'pointer';
    });


    newDeckContainer.appendChild(nameOfNewDeck);
    if (length == "long") {
      addEditDeleteContainer.appendChild(addIcon);
      addEditDeleteContainer.appendChild(editIcon);
      addEditDeleteContainer.appendChild(trashIcon);


      newDeckContainer.appendChild(blackLines);
      newDeckContainer.appendChild(blackLines2);
      newDeckContainer.appendChild(blackLines3);
      newDeckContainer.appendChild(blackLines4);
      newDeckContainer.appendChild(blackLines5);

    }

    newDeckContainer.appendChild(addEditDeleteContainer);
    listOfDecks.appendChild(newDeckContainer);

    listOfDecks.style.display = "block";


  });
}