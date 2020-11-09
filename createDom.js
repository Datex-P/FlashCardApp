import { edit, save, trash, statsIcon } from './svgs.js';
import questAnswerTrainOverv from './questAnswerTrainOverv.js';
import addQuestionsToDeck from './addQuestionsToDeck.js';
import { dataBase } from './dataBase.js';

export default function createDom(obj, length = "long") {

  listOfDecks.innerHTML = "";
  let arr = Object.keys(obj);

  
  arr.forEach((item) => {
    let newDeckContainer = document.createElement("div");
    newDeckContainer.style.marginTop = "10px";
    newDeckContainer.style.marginLeft = "20px";
    newDeckContainer.className = 'flexSpaceBetween';

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
      //nameOfNewDeck.style.filter = 'blur(5px)'
     //document.getElementById('mainMenu').style.filter='blur(5px)';
      };
    }


    let addEditDeleteContainer = document.createElement("div");
    addEditDeleteContainer.style.display = "flex";
    addEditDeleteContainer.style.justifyContent = "space-around";
    addEditDeleteContainer.style.width = "100px";
    addEditDeleteContainer.style.alignItems = "center";


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
    }

    newDeckContainer.appendChild(addEditDeleteContainer);
    listOfDecks.appendChild(newDeckContainer);

    listOfDecks.style.display = "block";
    document.getElementById("navOverview").style.display = 'flex';
    document.getElementById("createDeckButton").style.display = "block";
    document.getElementById("navLine").style.display = "flex";
  });
}