import {edit,save} from './svgs.js';

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
      pageNameforNewDeck.style.display = "flex";
      document.getElementById("chooseDeckToAdd").style.display = "none";
      document.getElementById(
        "nameOfDeckInAddQuestion"
      ).innerHTML = this.innerText;
      renderTrainModal(item)
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
      document.getElementById("nameOfDeckInAddQuestion").innerText = item;
      addQuestionsToDeck.style.display = "flex";

      setTimeout(() => {
        window.addEventListener("click", handleOutsideClick);
      }, 10);
    };

    newDeckText.onclick = function () {
      questAnswerTrainOverv.style.display = "flex";
      createEditDeleteDeckPage.style.display = "none";
      document.getElementById(
        "nameOfDeckInTrainOverv"
      ).innerHTML = this.innerHTML;

      // let redCross = document.createElement("img");
      // redCross.src = ;
      // document.getElementById("redCross").appendChild(redCross);

      let childShuffleButton = document.createElement("button");
      childShuffleButton.innerHTML = "Shuffle";
      childShuffleButton.id = "shuffleButton";
      document
        .getElementById("shuffleContainer")
        .appendChild(childShuffleButton);

      let childShowOrHideButton = document.createElement("button");
      childShowOrHideButton.innerHTML = "ShowOrHide";
      childShowOrHideButton.id = "showOrHideButton";
      document
        .getElementById("showOrHideContainer")
        .appendChild(childShowOrHideButton);

      let cardsStudied = 0;

      childShowOrHideButton.onclick = function () {
        let answerBox = document.getElementById("answers");
        this.style.cursor = "pointer";
        //changes pointer when moved over shorOrHide Button
        // answerField.value = dataBase.DeckNames[newDeckText.innerText][key].answer;

        if (answerBox.style.display === "none") {
          answerBox.style.display = "flex";
          answerBox.style.justifyContent = "center";
          answerBox.style.flexDirection = "column";
        } else {
          answerBox.style.display = "none";
        }
      };

      childShuffleButton.onclick = function () {
        cardsStudied++;
        dataBase.DeckNames[newDeckText.innerText].cardsStudied = cardsStudied;

        function questionNumber(random) {
          let questionField = document.getElementById("questionField");
          questionField.innerText = `${
            dataBase.DeckNames[item][random].question
          }`;
          key = random;
        }

        let randomInScope = random();

        function answerNumber(random) {
          let answerField = document.getElementById("answerField");

          answerField.innerText = `${
            dataBase.DeckNames[item][random].answer
          }`;
          key = random;
        }

        function random() {
          return Math.floor(
            Math.random() * dataBase.DeckNames[item].length
          );
        }
        questionNumber(randomInScope);
        answerNumber(randomInScope);
      };

      redCross.onclick = function () {
        childShuffleButton.parentNode.removeChild(childShuffleButton);
        childShowOrHideButton.parentNode.removeChild(childShowOrHideButton);
        this.parentNode.removeChild(this);
      };

      // event
      timer = setInterval(() => {
        if (
          !counter[document.getElementById("nameOfDeckInTrainOverv").innerHTML]
        ) {
          counter[
            document.getElementById("nameOfDeckInTrainOverv").innerHTML
          ] = 0;
        }
        /*new stuff down there*/
        let secondsDeckStudied = (counter[
          document.getElementById("nameOfDeckInTrainOverv").innerHTML
        ] += 1);
        dataBase.DeckNames[
          document.getElementById("nameOfDeckInTrainOverv").innerHTML
        ].seconds = secondsDeckStudied;

        /*method below logs the seconds that passed while studiying a specific deck to the counter*/

        console.log(counter);
      }, 1000);
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