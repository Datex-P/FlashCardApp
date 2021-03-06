import questAnswerTrainOverv from "./questAnswerTrainOverv.js";
import addQuestionsToDeck from "./addQuestionsToDeck.js";
import { dataBase } from "./dataBase.js";
import {
  createElement,
  deleteCardQuestionBox,
  threeDots,
} from "./exportFunctions.js";
import { play, plusSvg } from "./svgs.js";



let canvasContainer = createElement("div", "", {}, "canvasContainer");
let canvas = createElement("canvas", "", {}, "pieChart canvasStyling");

export default function createDom(obj) {
  console.log("create Dom was rendered");
  listOfDecks.innerHTML = "";
  let arr = Object.keys(obj);

  document.getElementById("mainMenu").append(putOver);
  document.getElementById("mainMenu").append(showPausedDecks);

  let decksThatArenotCompleted = arr.filter(
    (item) => !obj[item].thisDeckCompleted
  );

  let edited = false;

  decksThatArenotCompleted.forEach((item, index, filteredArray) => {
    let newDeckContainer = createElement(
      "div",
      "",
      {
        backgroundColor: dataBase.DeckNames[item].color,
        transform: `rotate(${index * -2}deg)`,
      },
      "newDeckContainer"
    );

    //dataBase.DeckNames[item].deckPauseActive = false; not sure if this value is needed here

    let nameOfNewDeck = createElement(
      "div",
      dataBase.DeckNames[item].name,
      {//most upper deck after rendering name of deck
      },
      'nameOfNewDeck'
    );

    nameOfNewDeck.title = 'Click to open this deck';

    if (!dataBase.DeckNames[item].data.length) {
      nameOfNewDeck.onclick = function () {
        plusIcon.classList.remove("blinkingIcon");
        alert("Click on the blinking add icon");
        plusIcon.classList.add("blinkingIcon");
      };
    }

    let addEditDeleteContainer = createElement(
      'div', '', {}, 'flexColumnSpaceEvenlyAlignCenter addEditDeleteContainer', '', newDeckContainer
    );

    let toStud = 'To Study:'; //field on each card on the main screen

    let inputToStudy = createElement('input', '', {}, 'inputToStudy');


    inputToStudy.type = "number";
    inputToStudy.value = dataBase.DeckNames[item].toStudyValue;

    //`${dataBase.DeckNames[item].data.length -  //not needed because max number does not influence here
    //   dataBase.DeckNames[item].data.filter((x) => x.pause === true).length ||
    //   0}`;
    inputToStudy.onchange = function () {
      dataBase.DeckNames[item].toStudyValue = inputToStudy.value;
    };
    inputToStudy.min = "1";
    inputToStudy.max = `${dataBase.DeckNames[item].data.length -
      dataBase.DeckNames[item].data.filter((x) => x.pause === true).length ||
      0}`;

    dataBase.DeckNames[item].toStudyValue = inputToStudy.value || 0;



    let [toStudy] = [
      `${toStud.padEnd(7, "⠀")}`,

      `Progress:⠀${(
        ((dataBase.DeckNames[item].data.filter((x) => x.openHistory).length ||
          0) *
          100) /
        inputToStudy.value
      )
        .toFixed(0)
        .padStart(2, "⠀")} %`,
    ].map((el) => {
      return createElement("div", el, {}, "decksizeStudyRev");
    });


    toStudy.append(inputToStudy);


    let [toStudyContainer, decksizeContainer] = ["", ""].map((el) => {
      return createElement("div", el, {}, "studyReviewDecksize");
    });

    let Decksize = 'Decksize:';

    let decksize = createElement(
      'div',
      `${Decksize.padEnd(10, "⠀")}${dataBase.DeckNames[item].data.length}`,
      {},
      "decksizeStudyRev"
    );

    let changeNameofDeckInput = createElement(       //input field that gets active when deckname is change
      "input",
      "",
      {},
      "changeNameOfDeckInput"
    );

    changeNameofDeckInput.onclick = function (event) {
      event.stopPropagation();
    };

    function clickOutsideHandle(el) {
      //alert("Clicked out Box")
      el.classList.add("blinkingIcon");
      setTimeout(() => {
        el.classList.remove("blinkingIcon");
      }, 3000);
    }

    let mainThreeDots = threeDots();
    let threeDotsContainer = null;
    if (dataBase.DeckNames[item].data.length) {
      threeDotsContainer = mainThreeDots(
        {
          edit: (
            event,
            editIconContainer,
            editIcon,
            saveIcon,
            outsideClickClosehandler,
            littleModalWindow
          ) => {
            event.stopPropagation();

            threeDotsContainer.onclick = check;

            function check() {
              //needed in case the changeNameofDeckINput is active and  three dots is clicked
              if (edited) {
                //default state is false

                newDeckContainer.replaceChild(
                  nameOfNewDeck,
                  changeNameofDeckInput
                );
                editIconContainer.replaceChild(editIcon, saveIcon); //why does this line not fire up
                edited = false;
              }
            }

            if (!edited) {
              //edited was pressed in three dots /default false

              window.onclick = "";
              window.addEventListener("click", () =>
                clickOutsideHandle(saveIcon)
              );
              editIconContainer.replaceChild(saveIcon, editIcon); //saveIcon replaces  editIcon //replaceChild(newChild, oldchild)
              newDeckContainer.replaceChild(
                changeNameofDeckInput,
                nameOfNewDeck
              );
              changeNameofDeckInput.value = nameOfNewDeck.innerText;
              littleModalWindow.style.display = "block";

              console.log(changeNameofDeckInput, 'changenameofdeckinput')

              changeNameofDeckInput.oninput = function () {
                let name = dataBase.DeckNames[item].name

                if ((this.value.length > 12 || this.value.length < 3 || Object.keys(dataBase.DeckNames).includes(this.value)) && this.value !== name) {

                  if (Object.keys(dataBase.DeckNames).includes(this.value)) {
                    messageTooLongOrTooShort.innerHTML = 'name exists'
                  } else if (this.value !== nameOfNewDeck.innerText) {
                    let tooLongOrShort = messageTooLongOrTooShort
                    this.value.length > 12 ? tooLongOrShort.innerHTML = 'Too long' : tooLongOrShort.innerHTML = 'Too short'

                  }
                  littleModalWindow.style.display = "none";
                  messageTooLongOrTooShort.style.display = 'block'


                } else {
                  // edited = true;
                  messageTooLongOrTooShort.style.display = 'none'
                  window.onclick = "";
                  littleModalWindow.style.display = "block";
                }

              };
              edited = true;
            } else {
              editIconContainer.replaceChild(editIcon, saveIcon); //editIcon replaces  saveIcon //replaceChild(newChild, oldchild)
              newDeckContainer.replaceChild(
                nameOfNewDeck,
                changeNameofDeckInput
              );
              dataBase.DeckNames[item].name = changeNameofDeckInput.value;
              edited = false;
              nameOfNewDeck.innerText = changeNameofDeckInput.value;
              setTimeout(function () {
                window.onclick = outsideClickClosehandler;
              }, 10);
              createDom(dataBase.DeckNames); //rerender Dom so that the deckname is changed when cards are added to the deck right away
              // console.log('I rerendered')
            }
          },

          pause: (container, playIcon, pauseIcon, edited) => {
            window.onclick = "";
            edited = true;
            threeDotsContainer.style.display = "none"; //hides the three dots when pause was pressed
            nameOfNewDeck.style.background = dataBase.DeckNames[item].color;

            dataBase.DeckNames[item].deckPauseActive = true;

            nameOfNewDeck.classList.remove("pointer");
            addToDeckIcon.removeEventListener("click", addToDeckHandler); //to remove event listener

            if (dataBase.DeckNames[item].pause == false) {
              addEditDeleteContainer.style.display = "none";
              pauseInfoField.style.display = "block";

              [addToDeckIcon, plusIcon].map(
                (el) => (el.style.cursor = "default")
              );

              //   newDeckContainer.querySelector('.nameOfNewDeck').classList.add('nameOfDeckChangedPausedMode') not sure what it is needed for 11.04
            } else {
              dataBase.DeckNames[item].pause = true;
            }
            return edited;
          },

          delete: () => {

            if (dataBase.showDeleteFrameOverview) {
              deleteCardQuestionBox(
                () => {
                  delete dataBase.DeckNames[item];

                  console.log(Object.keys(dataBase.DeckNames));
                },
                createDom,
                "Delete deck",
                "delete this deck"
              );
            } else {
              delete dataBase.DeckNames[item];
              createDom(dataBase.DeckNames);

              window.onclick = ""; //otherwise you had to click double on three dots as some event listener was still active
            }
          },
        },
        { top: "3px", left: "13px" },
        "deck"
      );
    } else {
      threeDotsContainer = mainThreeDots(
        {
          delete: () => {
            if (dataBase.showDeleteFrameOverview) {
              deleteCardQuestionBox(
                () => {
                  delete dataBase.DeckNames[item];
                },
                createDom,
                "Delete deck",
                "delete this deck"
              );
            } else {
              delete dataBase.DeckNames[item];

              console.log("newstate", dataBase.DeckNames);
              setTimeout(() => createDom(dataBase.DeckNames), 0);
              setTimeout(() => createDom(dataBase.DeckNames), 1000);
              window.onclick = ""; //otherwise you had to click double on three dots as some event listener was still active
            }
          },
        },
        { top: "3px", left: "13px" },
        "deck"
      );
    }

    let messageTooLongOrTooShort = createElement('div', '', {}, 'messageTooLongOrShort')

    toStudy.append(messageTooLongOrTooShort)

    threeDotsContainer.classList.add("threeDotsContainer");

    let plusIcon = createElement("div", "+", {}, "plusIcon");
    let openDeck = createElement("button", "Open Deck", {}, "openDeck");

    let pauseInfoField = createElement(
      "div",
      "This Deck is paused.",
      {
        backgroundColor: dataBase.DeckNames[item].color,
      },
      "pauseInfoField"
    );


    let deckIsEmptyField = createElement(
      "div",
      "Deck is empty.",
      {
        backgroundColor: dataBase.DeckNames[item].color,
      },
      "deckIsEmptyField"
    );

    let deckIsEmptyFieldAdditional = createElement(
      "div",
      "Press:",
      { backgroundColor: dataBase.DeckNames[item].color },
      "deckIsEmptyFieldAdditional"
    );

    let deckIsEmptyFieldAdditionalTwo = createElement(
      "div",
      "To add cards to the deck.",
      {},
      "deckIsEmptyFieldAdditionalTwo"
    );

    let plusButtonInsidePause = createElement(
      "div",
      plusSvg,
      {},
      "plusButtonInsidePause"
    );

    deckIsEmptyField.append(plusButtonInsidePause);

    let playIconContainer = createElement(
      "button",
      play,
      {},
      "playIconContainer"
    );

    let playText = createElement(
      "div",
      "It doesn't count to the study goal.",
      {},
      "playText"
    );

    let playTextAdditional = createElement(
      "div",
      "Press:",
      {},
      "playTextAdditional"
    );

    playIconContainer.onclick = function () {

      [plusIcon, addToDeckIcon].map((el) => (el.style.cursor = "pointer")); //grey circle is pointable again

      threeDotsContainer.style.display = "block"; //three dots container is shown again
      newDeckContainer.style.background = dataBase.DeckNames[item].color;
      pauseInfoField.style.display = "none";
      globalThreeDotsOpen = false;
      addEditDeleteContainer.style.display = "flex";
      addToDeckIcon.addEventListener("click", addToDeckHandler);
      dataBase.DeckNames[item].deckPauseActive = false;
      document
        .querySelector(".nameOfNewDeck")
        .classList.remove("nameOfDeckChangedPausedMode");
    };



    function openDeckHandler() {
      if (
        dataBase.DeckNames[item].deckPauseActive !== true &&
        dataBase.DeckNames[item].data.length !== 0
      ) {
        if (edited) {
          //checks whether the input field is open and in that case it does not open the trainings overview
          document
            .querySelector('svg[data-icon="save"]')
            .classList.add("blinkingIcon");
        } else {
          document.querySelector(".settingsIconContainer").classList.add("top");
          questAnswerTrainOverv(item); //here the questAnswertrainoverview gets started
          dataBase.openedToday = true;
          dataBase.showDiagram = false; //deck is opened and thus diagram with goals is not shown for the moment
          dataBase.statsOrSettingsOpened = true
          document.querySelector(".overDiagram").style.display = "none";
          createDom(dataBase.DeckNames);

          document.querySelector(".canvasContainer").style.display = "none";
          dataBase.questionAnswerOverview = true;
        }
      }
    }

    openDeck.addEventListener("click", openDeckHandler);

    if (dataBase.DeckNames[item].data.length === 0) {
      [addEditDeleteContainer, openDeck].map(
        (el) => (el.style.display = "none")
      );

      [deckIsEmptyField, deckIsEmptyFieldAdditionalTwo].map(
        (el) => (el.style.display = "flex")
      );
    } else {
      addEditDeleteContainer.style.display = "flex";
      openDeck.style.display = "block";
    }

    openDeck.title = "Click to open this deck";

    let addToDeckIcon = createElement("div", "", {}, "orangeCircle");

    addToDeckIcon.style.display = "flex";
     addToDeckIcon.title = "Add Questions to this deck";

     addToDeckIcon.addEventListener("click", addToDeckHandler);

    function addToDeckHandler() {
      addQuestionsToDeck(item);
      dataBase.statsOrSettingsOpened = true; //needed so that scrollbar in the back dissapears when add to deck menu is open
      document.querySelector(".canvasContainer").style.display = "none"; //progress diagram on the main screen gets hidden
      document.querySelector('.overDiagram').style.display = 'none' //progress diagram on the main screen gets hidden
      createDom(dataBase.DeckNames);
    }

    plusButtonInsidePause.onclick = function () {
      //plus button inside card when deck is new created
      addToDeckHandler(item);
    };

    let today = new Date().toDateString();

    let cardsStudiedToday = dataBase.DeckNames[item].data.reduce(
      (acc, card) => {
        let cardsForToday = card.openHistory?.filter(
          (time) => time?.toDateString() == today
        );

        if (cardsForToday?.length) {
          acc += cardsForToday.length;
        }
        return acc;
      },
      0
    );


    newDeckContainer.append(
      pauseInfoField,
      deckIsEmptyField,
      nameOfNewDeck,
      threeDotsContainer,
      addToDeckIcon
    );

    deckIsEmptyField.append(deckIsEmptyFieldAdditional);
    newDeckContainer.append(deckIsEmptyFieldAdditionalTwo);
    addEditDeleteContainer.append(toStudyContainer, toStudy, decksizeContainer, openDeck);
    toStudyContainer.append(toStudy);
    decksizeContainer.append(decksize);

    listOfDecks.prepend(newDeckContainer);
    addToDeckIcon.append(plusIcon);

    pauseInfoField.append(playIconContainer, playText, playTextAdditional);

    if (dataBase.DeckNames[item].deckPauseActive === true) {
      //in case create Dom gets rerendered so that the paused deck does not loose its state
      addEditDeleteContainer.style.display = "none";
      pauseInfoField.style.display = "block";
      [addToDeckIcon, plusIcon].map((el) => (el.style.cursor = "default"));
    } else {

    }

    var config = {
      type: "doughnut",
      data: {
        legend: {
          labels: {
            generateLabels: function () {
              return "";
            },
          },
        },
        datasets: [
          {
            data: [
              // Object.keys(dataBase.DeckNames).length - dataBase.deckCompleted,
              //dataBase.deckCompleted
              //first value shows all decks that are left to study
              //second value shows decks that were already studied
            ],
            //checks which background color is set in the database and changed in settings
            backgroundColor: [
              dataBase.backgroundColorApp === "default"
                ? "#5aaa95"
                : dataBase.backgroundColorApp === "dark"
                  ? "#5aaaff"
                  : "#86a873",
              "#FF6384",
            ],
            borderColor: ["#5aaa95", "#FF6384"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        elements: {
          center: {
            text: "",

            fontStyle: "Times", // Default is Arial
            minFontSize: 12, // Default is 20 (in px), set to false and text will not wrap.

            lineHeight: 19,
            //Default is 25 (in px), used for when text wraps
          },
        },
        tooltips: false, //removes the tooltips from the diagram that are present in the diagram in stats
        hover: { mode: null }, //when hovered over the diagram sections, nothing flashes or highlights
        cutoutPercentage: 81,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 10,
          },
          border: "none",
        },
      },
    };


    dataBase.showDiagram === false;

    let numberOfDecks = Object.keys(dataBase.DeckNames).length;
    let pausedDecks = Object.values(dataBase.DeckNames).filter(
      (item) => item.deckPauseActive
    ).length;
    let completedDecks = dataBase.deckCompleted;

    // console.log(numberOfDecks, "numebr of decks");
    // console.log(pausedDecks, "paused decks");
    // console.log(completedDecks, "completed decks");

    // console.log(Object.keys(dataBase.DeckNames).length, 'legnth of databse')
    // console.log(dataBase.DeckNames[item].deckPauseActive, 'deck active yes or deck')
    // console.log(Object.values(dataBase.DeckNames).filter(item => !item.deckPauseActive ), 'items that are not pasued right now')

    // console.log(dataBase.deckCompleted, 'deckcompleted')

    if (
      numberOfDecks > completedDecks &&
      (numberOfDecks === completedDecks + pausedDecks) 
      
      && !dataBase.leftOverDeckPausedComplete
    ) {
      dataBase.allLeftOverDecksPaused = true

      function callableOnce() {
        callableOnce = function () { };

        deleteCardQuestionBox(
          () => dataBase.DeckNames[item].data.splice(index, 1), //remove
          () => {
            createDom(dataBase.DeckNames)
          }, //refresh
          "Unpause deck", //header
          "unpause this deck? <br/> <span style='font-size:12px; top:9px; position:relative'>All the decks left to study are paused.</span>"
          , //body
          {},
          false,
          item
        ); //body

      }
      callableOnce()
    }

    if (
      ((cardsStudiedToday >= Number(dataBase.DeckNames[item].toStudyValue) &&

      dataBase.DeckNames[item].thisDeckCompleted === false &&
      dataBase.showDiagram === true )|| dataBase.leftOverDeckPausedComplete)
      || dataBase.settingsClosed
    ) {

       if (!dataBase.settingsClosed) { //condition is needed so that diagram redraws correctly when color of background is changed

        dataBase.DeckNames[item].thisDeckCompleted = true;
        
        dataBase.deckCompleted++;
        newDeckContainer.style.display = "none";
      }
      dataBase.showDiagram = true;



      config.data.datasets[0].data.push(
        Object.keys(dataBase.DeckNames).length - dataBase.deckCompleted,
        dataBase.deckCompleted
      );


      let decks = document.querySelectorAll("#listOfDecks .newDeckContainer");
      let length = Array.from(decks).length;

      if (decks.length) {
        decks[length - 1].querySelector(".orangeCircle").style.display = "flex";
      }



      let ctx = canvas.getContext("2d");
      let myChart = new Chart(ctx, config);

      Chart.pluginService.register({
        beforeDraw: function (chart) {
          if (chart.config.options.elements.center) {
            // Get ctx from string
            var ctx = chart.chart.ctx;

            // Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            var fontStyle = centerConfig.fontStyle || "Arial";
            var txt = centerConfig.text;
            var color = centerConfig.color || "#000";
            var maxFontSize = centerConfig.maxFontSize || 75;
            var sidePadding = centerConfig.sidePadding || 20;
            var sidePaddingCalculated =
              (sidePadding / 100) * (chart.innerRadius * 2);
            // Start with a base font of 30px
            ctx.font = "30px " + fontStyle;

            // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            var stringWidth = ctx.measureText(txt).width;
            var elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

            // Find out how much the font can grow in width.
            var widthRatio = elementWidth / stringWidth;
            var newFontSize = Math.floor(30 * widthRatio);
            var elementHeight = chart.innerRadius * 2;

            // Pick a new font size so it will not be larger than the height of label.
            var fontSizeToUse = Math.min(
              newFontSize,
              elementHeight,
              maxFontSize
            );
            var minFontSize = centerConfig.minFontSize;
            var lineHeight = centerConfig.lineHeight || 25;
            var wrapText = false;

            if (minFontSize === undefined) {
              minFontSize = 20;
            }

            if (minFontSize && fontSizeToUse < minFontSize) {
              fontSizeToUse = minFontSize;
              wrapText = true;
            }

            // Set font settings to draw it correctly.
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
            var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
            ctx.font = fontSizeToUse + "px " + fontStyle;
            ctx.fillStyle = color;

            if (!wrapText) {
              ctx.fillText(txt, centerX, centerY);
              return;
            }

            var words = txt.split(" ");
            var line = "";
            var lines = [];

            // Break words up into multiple lines if necessary
            for (var n = 0; n < words.length; n++) {
              var testLine = line + words[n] + " ";
              var metrics = ctx.measureText(testLine);
              var testWidth = metrics.width;
              if (testWidth > elementWidth && n > 0) {
                lines.push(line);
                line = words[n] + " ";
              } else {
                line = testLine;
              }
            }
            // Move the center up depending on line height and number of lines
            centerY -= (lines.length / 2) * lineHeight;

            for (var n = 0; n < lines.length; n++) {
              ctx.fillText(lines[n], centerX, centerY);
              centerY += lineHeight;
            }
            //Draw text in center
            ctx.fillText(line, centerX, centerY);
          }
        },
      });
    }
  });

  if (dataBase.showDiagram) {
    document.querySelector("#mainMenu").append(canvasContainer);
    canvasContainer.append(canvas);
  } else {

  }



  if (
    Object.keys(dataBase.DeckNames).length === 0 ||
    (dataBase.deckCompleted * 100) / Object.keys(dataBase.DeckNames).length ===
    100) {
    //if no deck is present, scrollbar dissapear and info to create a deck appears

    document.querySelector("#scrollable").style.display = "none"; //no deck in the stack so the scrollbar disappears
    document.querySelector(".arrowDown").style.display = "block"; //arrow down button gets displayed
    document.getElementById("createYourFirstDeckPrompt").style.display = "block";
  } else {


    if (
      //document.getElementById("listOfDecks").childElementCount === 1

      Object.values(dataBase.DeckNames).length - 
      (Object.values(dataBase.DeckNames).filter((item) => item.pause).length + Object.values(dataBase.DeckNames).filter((item) => item.thisDeckCompleted).length) <=1
    ) {
      //when there is only one deck in the stack the scrollbar on the right sid disappears
      document.querySelector("#scrollable").style.display = "none";
    } else {
        if (dataBase.statsOrSettingsOpened) {
          document.querySelector("#scrollable").style.display = "none";
        } else {
          document.querySelector("#scrollable").style.display = "block";
        }
    }
  }

  let pars = parseInt(
    (dataBase.deckCompleted * 100) / Object.keys(dataBase.DeckNames).length
  );

  putOver.innerHTML = `${"Goal".bold()} <span class='spanStyling'>${parseInt(
    (dataBase.deckCompleted * 100) /
    Object.values(dataBase.DeckNames).filter((item) => !item.pause).length
  )} % </span>`;

  let dateToday = new Date();

  dateToday.setHours(0, 0, 0, 0);

  let dateToPush = new Date();
  dateToPush.setHours(0, 0, 0, 0);

  // console.log(new Date(dataBase.dateToday), "datetoday");

  if (
    Object.values(dataBase.DeckNames).filter((item) => item.thisDeckCompleted)
      .length > 0
  ) {
    if (Object.values(dataBase.goalReached).includes(`${dateToPush}`)) {
      dataBase.goalReached = {};
    } else {
      // console.log(
      //   Object.values(dataBase.DeckNames).filter((item) => !item.pause).length,
      //   "items not pasued"
      // );
      dataBase.goalReached = {
        [parseInt(
          (dataBase.deckCompleted * 100) /
          Object.values(dataBase.DeckNames).filter((item) => !item.pause)
            .length
        )]: dateToPush,
      };
    }
  }

  dataBase.settingsClosed = false //when stats was closed it is needed to be set back to false so that diagram work again

  if (pars === 100) {
    document.getElementById("allDecksFinished").style.display = "none";
    document.getElementById("finishedAllDecksToday").style.display = "flex";
    document.getElementById("createDeckButtonContainer").style.display = "none";
    document.getElementById("scrollable").style.display = "none";
  } else {
    document.getElementById("allDecksFinished").style.display = "block";
    document.getElementById("finishedAllDecksToday").style.display = "none";
  }

  document.querySelector("#scrollable").onscroll = function (event) {
    if (edited) {
      document
        .querySelector('svg[data-icon="save"]')
        .classList.add("blinkingIcon");
    }

    if (!edited) {
      document.querySelector(".littleModalWindow").style.display = "none";
      let all = listOfDecks.querySelectorAll(".newDeckContainer");
      let allInArr = Array.from(all).filter((el) => el.style.display != "none");
      let step =
        (1000 - all[0].getBoundingClientRect().height) / (allInArr.length - 1);
      let index = Math.floor(event.target.scrollTop / step);
      // index = (index > arr.length-1) ? arr.length-1 : index
      let count = 1
      allInArr.reverse().forEach((item, i) => {
        
        if(i !=index){
          item.style.transform = `rotate(${count* -2 }deg)`;
          item.style.zIndex = 0;
          count++
        }else{
          item.style.transform = `rotate(0deg)`;
          item.style.zIndex = 2;
        }
        item.querySelector(".settingsIconContainer").style.display = "none";
        item.querySelector(".nameOfNewDeck").style.display = "none";
        item.querySelector(".orangeCircle").style.display = "none";
        
      });

     // allInArr[index].style.zIndex = 2;
      //allInArr[index].style.transform = "rotate(0deg)";
      allInArr[index].querySelector(".settingsIconContainer").style.display =
        "block";
      allInArr[index].querySelector(".nameOfNewDeck").style.display = "block";
      allInArr[index].querySelector(".orangeCircle").style.display = "flex";
    }
  };


}

export let putOver = createElement("div", "", {}, "overDiagram");
export let showPausedDecks = createElement("div", "", {}, "showPausedDecks");
