import {edit,save, trash} from './svgs.js';
import questAnswerTrainOverv from './questAnswerTrainOverv.js';
import addQuestionsToDeck from './addQuestionsToDeck.js';


export default function createDom(obj, length = "long") {

  listOfDecks.innerHTML = "";
  let arr = Object.keys(obj);

  arr.forEach((item) => {
    let newDeckContainer = document.createElement("div");
        newDeckContainer.style.marginTop = "10px";
        newDeckContainer.style.marginLeft = "20px";
        newDeckContainer.style.display = "flex";
        newDeckContainer.style.justifyContent = "space-between";

    let nameOfNewDeck = document.createElement("div");
        nameOfNewDeck.innerText = item;

        nameOfNewDeck.onmouseover = function () {
          nameOfNewDeck.style.color = "rgb(200, 168, 115)";
          nameOfNewDeck.style.cursor = "pointer";
        };
    
        nameOfNewDeck.addEventListener("mouseleave", () => {
          nameOfNewDeck.style.color = "black";
        });
 
        nameOfNewDeck.onclick = function () {
            questAnswerTrainOverv(item)
        };

    let addEditDeleteContainer = document.createElement("div");
        addEditDeleteContainer.style.display = "flex";
        addEditDeleteContainer.style.justifyContent = "space-around";
        addEditDeleteContainer.style.width = "100px";
        addEditDeleteContainer.style.alignItems = "center";


    let trashIcon = document.createElement("img");
        trashIcon.innerHTML =  trash;
        trashIcon.style.width = "16px";
        trashIcon.style.height = "16px";
        trashIcon.style.right = "5px";

        trashIcon.onclick = () => {
          newDeckContainer.parentNode.removeChild(newDeckContainer);
          delete dataBase.DeckNames[item];
          if (!Object.keys(dataBase.DeckNames).length) {
            arrowDown.style.display = "block";
            createYourFirstDeckPrompt.style.display = "block";
          }
        };
    

    let editIcon = document.createElement("div");
        editIcon.style.width = "16px";
        editIcon.style.height = "16px";
        editIcon.style.marginRight = "5px";

    let edited = false;
        editIcon.innerHTML = edit;
    
        
    let changeNameofDeckInput = document.createElement("input");

    editIcon.onclick = function () {
      let oldInput = nameOfNewDeck.innerText;
      if (!edited) {
        this.innerHTML = save;
        newDeckContainer.replaceChild(changeNameofDeckInput, nameOfNewDeck);
        changeNameofDeckInput.value = nameOfNewDeck.innerText;
        edited = true;
      } else {
        this.innerHTML = edit;
        newDeckContainer.replaceChild(nameOfNewDeck, changeNameofDeckInput);

        edited = false;
        //send fetch=>saveToDataBase
        // if ok
        nameOfNewDeck.innerText = changeNameofDeckInput.value;
        // if not
        // nameOfNewDeck.innerText = oldInput
        // alert('smth wrong with server, try again later, sorry, free hugs')
      }
    };

    let addIcon = document.createElement("span");
        addIcon.innerText = "+";

        addIcon.onclick = function () {
     
        addQuestionsToDeck(item);
        /*
        setTimeout(() => {
        window.addEventListener("click", handleOutsideClick);
        }, 10);
        */
        };



    newDeckContainer.appendChild(nameOfNewDeck);
    if (length == "long") {
      addEditDeleteContainer.appendChild(addIcon);
      addEditDeleteContainer.appendChild(editIcon);
      addEditDeleteContainer.appendChild(trashIcon);
    }

    newDeckContainer.appendChild(addEditDeleteContainer);


    listOfDecks.appendChild(newDeckContainer);

    pageNameforNewDeck.style.display = "none";
    listOfDecks.style.display = "block";
    let navOverview = document.getElementById("navOverview");
    navOverview.style.display = "flex";
    document.getElementById("createDeckButton").style.display = "block";
    document.getElementById("navLine").style.display = "flex";
  });
}