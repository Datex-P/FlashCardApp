import {edit,save} from './svgs.js';
import questAnswerTrainOverv from './questAnswerTrainOverv.js';
import addQuestionsToDeck from './addQuestionsToDeck.js';

export default function createDom(obj, length = "long") {
  listOfDecks.innerHTML = "";
  let arr = Object.keys(obj);
  arr.forEach((item, key, arr) => {
    let newDeck = document.createElement("div");
    let newDeckText = document.createElement("div");
    newDeckText.innerText = item;
    newDeck.style.marginTop = "10px";
    newDeck.style.marginLeft = "20px";

    newDeckText.onclick = function () {
      /*
      pageNameforNewDeck.style.display = "flex";
      document.getElementById("chooseDeckToAdd").style.display = "none";
      document.getElementById(
        "nameOfDeckInAddQuestion"
      ).innerHTML = this.innerText;
      */

      questAnswerTrainOverv()


    };

    let trashIcon = document.createElement("img");
    let editIcon = document.createElement("div");

    let edited = false;
    editIcon.innerHTML = edit;

    trashIcon.onclick = () => {
      newDeck.parentNode.removeChild(newDeck);
      delete dataBase.DeckNames[item];
      if (!Object.keys(dataBase.DeckNames).length) {
        arrowDown.style.display = "block";
        createYourFirstDeckPrompt.style.display = "block";
      }
    };

    let newDeckInput = document.createElement("input");

    /*changes the color and cursor when mouse is moved over deck name in the click and train overview --->*/

    newDeckText.onmouseover = function () {
      newDeckText.style.color = "rgb(200, 168, 115)";
      newDeckText.style.cursor = "pointer";
    };

    newDeckText.addEventListener("mouseleave", () => {
      newDeckText.style.color = "black";
    });

    /*<--------------------------------------*/

    /*when the edit icon in the click and train overview is clicked the name of the deck can be changed and the edit icon changes to a save icon that must be clicked--->*/

    editIcon.onclick = function () {
      let oldInput = newDeckText.innerText;
      if (!edited) {
        this.innerHTML = save;
        newDeck.replaceChild(newDeckInput, newDeckText);
        newDeckInput.value = newDeckText.innerText;
        edited = true;
      } else {
        this.innerHTML = edit;
        newDeck.replaceChild(newDeckText, newDeckInput);

        edited = false;
        //send fetch=>saveToDataBase
        // if ok
        newDeckText.innerText = newDeckInput.value;
        // if not
        // newDeckText.innerText = oldInput
        // alert('smth wrong with server, try again later, sorry, free hugs')
      }
    };

    /*<--------------------------------------*/

    trashIcon.src = "trash.svg";
    trashIcon.style.width = "16px";
    trashIcon.style.height = "16px";
    editIcon.style.width = "16px";
    editIcon.style.height = "16px";
    editIcon.style.marginRight = "5px";
    trashIcon.style.right = "5px";

    let addIcon = document.createElement("span");
    addIcon.innerText = "+";

    addIcon.onclick = function () {
      /*
      document.getElementById("nameOfDeckInAddQuestion").innerText = item;
      addQuestionsToDeck.style.display = "flex";
      */

      addQuestionsToDeck(item);

      setTimeout(() => {
        window.addEventListener("click", handleOutsideClick);
      }, 10);
    };


    let container = document.createElement("div");
    container.style.display = "flex";
    container.style.justifyContent = "space-around";
    container.style.width = "100px";
    container.style.alignItems = "center";
    newDeck.appendChild(newDeckText);
    if (length == "long") {
      container.appendChild(addIcon);
      container.appendChild(editIcon);
      container.appendChild(trashIcon);
    }

    newDeck.appendChild(container);
    newDeck.style.display = "flex";
    newDeck.style.justifyContent = "space-between";

    listOfDecks.appendChild(newDeck);

    pageNameforNewDeck.style.display = "none";
    listOfDecks.style.display = "block";
    let navOverview = document.getElementById("navOverview");
    navOverview.style.display = "flex";
    document.getElementById("createDeckButton").style.display = "block";
    document.getElementById("navLine").style.display = "flex";
  });
}