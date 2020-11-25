import { dataBase } from "./dataBase.js";
import { redCross as redCrossIcon } from "./svgs.js";

import {
  createElement,
  handleOutsideClick,
  closeMenu,
  close,
  redCross,
} from "./exportFunctions.js";

export default function stats() {
  let anchorElement = document.querySelector("#questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let mainWindow = createElement("div", "", {}, "addQuestionsToDeck");

  let innerWindow = createElement("div", "", {
     overflow: "scroll", overflowX: "hidden"});

  let redCrossAndStatsContainer = createElement(
    "div",
    "",
    {
      height: "20px",
      width: "290px",
      marginLeft: "24px",
      border: "1px black solid",
    },
    "flexSpaceBetween"
  );

  let theWordStats = createElement("div", "Stats", { fontWeight: "bold" });

  let todayAndCardsStudiedContainer = createElement(
    "div",
    "",
    { marginTop: "30px" },
    "flexColumnAlignCenter"
  );

  let cardsStudied = createElement(
    "div",
    "",
    {
      width: "240px",
      maxHeight: "100px",
      height: "fit-content",
      overflow: "scroll",
      overflowX: "hidden",
      marginBottom: "5px",
    },
    "flexColumnCenter"
  );

  let theWordTodayContainer = createElement(
    "div",
    "",
    { marginBottom: "10px", border: "1px black solid" },
    "flexColumnAlignCenter"
  );

  let theWordToday = createElement("div", "Today's study breakdown", {
    fontWeight: "bold",
    marginBottom: "5px",
  });

  let theWordCalendarContainer = createElement(
    "div",
    "",
    {},
    "flexColumnAlignCenter"
  );

  let theWordCalendar = createElement("div", "Calendar", {
    marginTop: "10px",
    marginBottom: "5px",
    fontWeight: "bold",
  });

  let rightAndLeftButtonContainer = createElement("div", "", {
    display: "flex",
  });

  let [buttonLeft, buttonRight] = ["<", ">"].map((el) => {
    return createElement(
      "div",
      el,
      { cursor: "pointer", marginBottom: "5px" },
      "calendarButtons flexCenter"
    );
  });

  buttonLeft.style.marginRight = "5px";
  buttonRight.style.marginLeft = "5px";

  let [studyInput, reviewInput] = ["10", "11"].map((el) => {
    return createElement("div", el, { width: "50px" }, "flexCenterAlignCenter");
  });

  //  let container = createElement('div', {templateRows: '30px', templateColumns: '20px'});

  let yearBoxContainer = createElement("div", "", {
    display: "flex",
    flexWrap: "wrap",
    width: "270px",
    height: "210px",
  });

  let hourlyBreakdownContainer = createElement(
    "div",
    "",
    { marginTop: "20px", width: "330px" },
    "flexColumnAlignCenter"
  );

  let theWordhourlyBreakdown = createElement("div", "Hourly Breakdown", {
    margingTop: "10px",
    fontWeight: "bold",
  });

  let radioButtonContainer = createElement("div", "", {
    display: "flex",
    border: "1px black solid",
    marginTop: "10px",
    marginBottom: "20px",
  });

  ["1 month", "3 month", "12 month"].forEach((radio) => {
    let radioBtn = createElement("input", "", { cursor: "pointer" });
    let label = createElement("label", radio, {});
    //label.innerText = radio;
    radioBtn.value = radio;
    radioBtn.setAttribute("type", "radio");
    radioBtn.name = "month";
    radioBtn.onchange = function (event) {
      let { value } = event.target;
      console.log(value);
    };
    // radioBtn.onmouseover = function (event){
    //   let {name,checked, value} = event.target
    //   console.log(name,checked, value)
    // }
    radioButtonContainer.appendChild(radioBtn);
    radioButtonContainer.appendChild(label);
  });

  let diagramHourlyBreakDownContainer = createElement(
    "div",
    "",
    { width: "260px", border: "1px solid black", height: "190px", position: 'relative' },
    "flexColumnSpaceAround"
  );





  let studyGoal = 80
  let timeObj = {
    5: 15,
    9: 20,
    17: 14
  }


  let timeAndProgressContainer = createElement('div', '', { display: 'flex' });
  let time = createElement("div", 'Study Goal', { marginLeft: '10px', border: '1px solid black', width: '82px' });

  let progressbar = createElement('div', '', {
    backgroundColor: 'black', marginLeft: '6px', 
    padding: '3px', height: '10px', width: '145px'
  })

  let innerprogress = createElement('div', '', {
    backgroundColor: 'orange', color: 'black',
    width: `${Object.values(timeObj).reduce((sum, i) => sum += i, 0) / studyGoal * 100}%`, height: '10px'
  });

  let currentProgress = Object.values(timeObj).reduce((sum, i) => sum += i, 0) / studyGoal * 100
  let widthAdjusted = Math.round(currentProgress) + 120


  console.log((((Object.values(timeObj).reduce((sum, i) => sum += i, 0) / studyGoal * 100) / 145) * 125))


  let progressNumber = createElement('div', `${currentProgress.toFixed(0)}%`, {
    position: 'absolute', top: '0px', left: `${widthAdjusted}px`, fontSize: '13px'
  })






  diagramHourlyBreakDownContainer.append(timeAndProgressContainer);
  timeAndProgressContainer.append(time)
  timeAndProgressContainer.append(progressbar);
  progressbar.append(innerprogress);
  timeAndProgressContainer.append(progressNumber)



  let arr = [];
  let previousWidthVar = 0

  for (let i = 5; i <= 25; i += 4) {


    if (i in timeObj) {


      arr.push(i)
      let timeAndProgressContainer = createElement('div', '', { display: 'flex' });



      let widthVar = (timeObj[i] || 0) / studyGoal * 100

      let time = createElement("div", '', { marginLeft: '10px', border: '1px solid black', width: '50px' });

      let progressbar = createElement('div', '', { backgroundColor: 'black', padding: '3px', height: '10px', width: '146px', marginLeft: '37px' })
      let innerprogress = createElement('div', '', { marginLeft: `${previousWidthVar}%`, backgroundColor: 'orange', width: `${widthVar}%`, height: '10px'});

      previousWidthVar+=widthVar


      if (i === 5 || i === 9) {
        time.style.marginLeft = "17px";
        progressbar.style.marginLeft = '30px';
      }


      if (i === 21) {
        time.innerHTML = `
        <div>${21} - ${24}</div>
      `;
      } else if (i === 25) {
        time.innerHTML = `
        <div>${24} - ${5}</div>
      `;
      } else {
        time.innerHTML = `
      <div>${i} - ${i + 4}</div>
    `;

      }

      diagramHourlyBreakDownContainer.append(timeAndProgressContainer);
      timeAndProgressContainer.append(time)
      timeAndProgressContainer.append(progressbar);
      progressbar.append(innerprogress);

    }
  }


  let yearOfStudy = new Date();
  let year = document.createElement("div");
  year.innerText = yearOfStudy.getFullYear();

  let dec = 0;

  function change(dec) {
    let yearN = yearOfStudy.getFullYear() + dec;
    year.innerText = yearN;
    renderDays(yearN);
  }

  buttonLeft.onclick = function () {
    dec -= 1;
    change(dec);
  };

  buttonRight.onclick = function () {
    dec += 1;
    change(dec);
  };


  let counter = 0;

  renderDays(2020);

  function renderDays(year) {
    yearBoxContainer.innerHTML = "";
    let thisYear = new Date(`January 1, ${+year}`);

    while (
      thisYear.getMonth() != 0 ||
      thisYear.getDate() != 1 ||
      thisYear.getFullYear() == +year
    ) {
      let day = document.createElement("div");
      day.classList.add("day");
      let date = thisYear.toDateString();

      for (let deck in dataBase.DeckNames) {
        dataBase.DeckNames[deck].forEach((card) => {
          card.openHistory &&
            card.openHistory.forEach((openTime) => {
              if (date === openTime.toDateString()) {
                counter++;
              }
            });
        });
      }

      for (let deck in dataBase.DeckNames) {
        if (
          dataBase.DeckNames[deck].find(
            (item) => new Date(item.lastOpen).toDateString() == date
          )
        ) {
          day.style.backgroundColor = "red";
          day.style.cursor = "pointer";

          day.onclick = function (event) {
            event.stopPropagation();
            yearBoxContainer
              .querySelectorAll(".day")
              .forEach((day) => (day.innerHTML = ""));
            let dayInner = document.createElement("div");
            let time = Math.round(
              Object.values(dataBase.studyTime).reduce(
                (acc, cur) => acc + cur
              ) / 60
            );
            dayInner.innerText = `${date} Time: ${time
              .toString()
              .padStart(3, "⠀")} min \n Review: ${counter} cards`;
            console.log(counter);
            day.append(dayInner);
          };
        }
      }

      /*
            let dayToday = new Date();
            let threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      */
      // for (let deck in dataBase.DeckNames[deck].openHistory) {
      //   if (deck.getMonth() + 3 >= dayToday.getMonth() && deck.getDate() >= dayToday.getMonth()) {

      //   }
      // }

      thisYear.setDate(thisYear.getDate() + 1);

      yearBoxContainer.appendChild(day);
      yearBoxContainer.onclick = function (event) {
        alert("you do not have training in this day");
      };
    }
  }

  function removePopUpwindow() {
    yearBoxContainer
      .querySelectorAll("div")
      .forEach((div) => (div.innerHTML = ""));
  }
  mainWindow.onclick = removePopUpwindow;

  /*when deck is deleted it should also be deleted out of stats*/

  let counterTwo = 0;

  let date = new Date();

  /*
    for (let deck in dataBase.DeckNames) {
      if (dataBase.DeckNames[deck].find(item => new Date(item.lastOpen).toDateString() == date)) {
  */

  let resultContainer = createElement(
    "div",
    "",
    { border: "1px solid black"},
    "flexColumnSpaceBetween"
  );

  cardsStudied.append(resultContainer);
  for (let deck in dataBase.DeckNames) {
    dataBase.DeckNames[deck].forEach((card) => {
      let child1 = createElement("div", `Deck ${deck}:`, {});
      let child2 = createElement("div", `${counterTwo} cards studied`, {});
      card.openHistory &&
        card.openHistory.forEach((openTime) => {
          if (date.toDateString() === openTime.toDateString()) {
            counterTwo++;
          }
        });

        let innerContainer = createElement('div', '', {display: 'flex', /*flexDirection: 'column',*/ marginBottom: '10px'})
      // child1.innerText = `Deck ${deck}:`;
      // child2.innerText = `${counterTwo} cards studied`;
      cardsStudied.append(resultContainer);
      resultContainer.append(innerContainer)
      innerContainer.append(child1);
      innerContainer.append(child2);











      
    });
  }

  console.log(counterTwo + " counterTwo");

  if (counterTwo === 0) {
    cardsStudied.style.textAlign = "center";
    cardsStudied.innerHTML = "No cards studied today";
    cardsStudied.style.removeProperty("border");
    cardsStudied.style.removeProperty("overflow");
  }

  if (counterTwo < 7) {
    cardsStudied.style.removeProperty("border");
    cardsStudied.style.removeProperty("overflow");
  }

  /*not sure if it does anything*/
  // for (let deck in dataBase.DeckNames) {

  //   card.openHistory && card.openHistory.forEach(openTime=> {
  //     if (date.toDateString() === openTime.toDateString()) {

  //   let container = document.createElement('div');
  //   container.style.border = '1px black solid'
  //   container.className = 'flexSpaceBetween'
  //   let child1 = document.createElement('div');
  //   let child2 = document.createElement('div');

  //   child1.innerText = `Deck ${deck}:`;
  //   child2.innerText = `${counterTwo} cards studied`;
  //   cardsStudied.append(container);
  //   container.append(child1);
  //   container.append(child2);
  // }
  //   })
  // };

  /*<----*/

  theWordTodayContainer.append(theWordToday);
  theWordTodayContainer.appendChild(cardsStudied);

  todayAndCardsStudiedContainer.appendChild(theWordTodayContainer);

  theWordCalendarContainer.appendChild(theWordCalendar);
  rightAndLeftButtonContainer.appendChild(buttonLeft);
  rightAndLeftButtonContainer.appendChild(year);
  rightAndLeftButtonContainer.appendChild(buttonRight);

  theWordCalendarContainer.append(rightAndLeftButtonContainer);
  theWordCalendarContainer.append(yearBoxContainer);

  hourlyBreakdownContainer.append(theWordhourlyBreakdown);

  hourlyBreakdownContainer.append(radioButtonContainer);
  hourlyBreakdownContainer.append(diagramHourlyBreakDownContainer);

  todayAndCardsStudiedContainer.appendChild(theWordCalendarContainer);
  todayAndCardsStudiedContainer.append(hourlyBreakdownContainer);
  redCrossAndStatsContainer.appendChild(theWordStats);
  redCrossAndStatsContainer.appendChild(redCross);

  innerWindow.appendChild(redCrossAndStatsContainer);
  innerWindow.appendChild(todayAndCardsStudiedContainer);

  mainWindow.append(innerWindow);
  anchorElement.appendChild(mainWindow);


  handleOutsideClick(mainWindow);
  redCross.onclick = () => close(mainWindow, anchorElement)

  closeMenu();
}
