import { dataBase } from "./dataBase.js";
import { redCross as redCrossIcon } from "./svgs.js";

export default function stats() {
  let anchorElement = document.querySelector("#questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let mainWindow = document.createElement("div");
  mainWindow.className = "addQuestionsToDeck";

  let innerWindow = document.createElement("div");
  innerWindow.style.marginTop = "20px";
  innerWindow.style.marginLeft = "30px";

  let redCrossAndStatsContainer = document.createElement("div");
  redCrossAndStatsContainer.style.display = "flex";
  redCrossAndStatsContainer.style.justifyContent = "space-between";
  redCrossAndStatsContainer.style.height = "20px";
  redCrossAndStatsContainer.style.width = "255px";
  redCrossAndStatsContainer.style.border = "1px black solid";

  let redCross = document.createElement("div");
  redCross.innerHTML = redCrossIcon;
  redCross.style.height = "20px";
  redCross.style.width = "20px";

  let theWordStats = document.createElement("div");
  theWordStats.innerHTML = "Stats";
  theWordStats.style.fontWeight = "bold";

  let container = document.createElement("div");
  container.style.display = "grid";
  //container.style.templateRows =  'repeat(7, 10px)';
  container.style.templateRows = "30px";
  container.style.templateColumns = "20px";

  //container.style.templateRows.border = '1px black solid'

  let todayAndCardsStudiedContainer = document.createElement("div");
  todayAndCardsStudiedContainer.style.marginTop = "100px";
  todayAndCardsStudiedContainer.style.display = "flex";
  todayAndCardsStudiedContainer.style.flexDirection = "column";
  todayAndCardsStudiedContainer.style.alignItems = "center";

  let theWordTodayContainer = document.createElement("div");
  theWordTodayContainer.style.display = "flex";
  theWordTodayContainer.style.flexDirection = "column";
  theWordTodayContainer.style.alignItems = "center";
  theWordTodayContainer.style.marginBottom = "10px";

  let theWordToday = document.createElement("div");
  theWordToday.innerHTML = "Today";
  theWordToday.style.fontWeight = "bold";

  let theWordCalendarContainer = document.createElement("div");
  theWordCalendarContainer.style.display = "flex";
  theWordCalendarContainer.style.flexDirection = "column";

  let buttonLeft = document.createElement("button");
  buttonLeft.className = "calendarButtons";
  buttonLeft.style.marginRight = "5px";
  buttonLeft.innerHTML = "<";
  let dec = 0;
  let yearOfStudy = new Date();
  function decrease() {
    dec--;
    year.innerHTML = yearOfStudy.getFullYear() + dec;
  }

  function increase() {
    dec++;
    year.innerHTML = yearOfStudy.getFullYear() + dec;
  }

  buttonLeft.onclick = function () {
    decrease();
    /*let dec = 1;
        console.log(typeof((yearOfStudy.getFullYear()+dec).toString()))
        */
  };

  let buttonRight = document.createElement("button");
  buttonRight.className = "calendarButtons";
  buttonRight.style.marginLeft = "5px";
  buttonRight.innerHTML = ">";

  buttonRight.onclick = function () {
    increase();
  };

  let rightAndLeftButtonContainer = document.createElement("div");
  rightAndLeftButtonContainer.style.display = "flex";

  let year = document.createElement("div");
  year.innerHTML = yearOfStudy.getFullYear();

  let theWordCalendar = document.createElement("div");
  theWordCalendar.style.marginTop = "10px";
  theWordCalendar.innerHTML = "Calendar";
  theWordCalendar.style.fontWeight = "bold";

  /*
  seconds studied in total
    const counterSecStudied = Object.values(counter);

    let secStudied = document.getElementById("secondsStudied");
    secStudied.innerHTML = counterSecStudied.reduce((acc, cur) => acc + cur);
  */

  let cardsStudied = document.createElement("div");
  cardsStudied.style.display = "flex";
  cardsStudied.style.justifyContent = "space-between";
  //cardsStudied.style.border = '1px solid black';
  cardsStudied.style.width = "300px";

  for (let deck in dataBase.counter) {
    cardsStudied.innerHTML += `Deck ${deck}: ${dataBase.counter[deck]} cards studied<br/>`;
    //   cardsStudied += `<div>Deck ${deck}: ${dataBase.counter[deck]} cards studied<br/></div>`
  }

  //console.log(dataBase.counter.Literature)

  // console.log(dataBase.DeckNames.Literature.cardsStudied)
  if (cardsStudied.innerHTML === "") {
    cardsStudied.innerHTML = "No cards studied today";
  }

  let wordToday = document.createElement("div");
  wordToday.innerHTML = "Today";
  wordToday.fontWeight = "bold";

  let cardCounts = document.createElement("div");
  cardCounts.innerHTML = "Card Counts";
  cardCounts.fontWeight = "bold";

  /*
  let arr = Object.keys(obj);
  let numberOfSeconds.innerHTML = arr.forEach((item) => {
      (item + item.seconds)
  });
*/

  theWordTodayContainer.append(theWordToday);
  theWordTodayContainer.appendChild(cardsStudied);

  todayAndCardsStudiedContainer.appendChild(theWordTodayContainer);

  todayAndCardsStudiedContainer.appendChild(theWordTodayContainer);

  theWordCalendarContainer.appendChild(theWordCalendar);
  rightAndLeftButtonContainer.appendChild(buttonLeft);
  rightAndLeftButtonContainer.appendChild(year);
  rightAndLeftButtonContainer.appendChild(buttonRight);
  theWordCalendarContainer.append(rightAndLeftButtonContainer);

  todayAndCardsStudiedContainer.appendChild(theWordCalendarContainer);
  redCrossAndStatsContainer.appendChild(theWordStats);
  redCrossAndStatsContainer.appendChild(redCross);

  innerWindow.appendChild(redCrossAndStatsContainer);
  innerWindow.appendChild(todayAndCardsStudiedContainer);

  mainWindow.append(innerWindow);
  anchorElement.appendChild(mainWindow);

  setTimeout(function () {
    window.onclick = function handleOutsideClick(e) {
      if (mainWindow.contains(e.target)) {
        //alert("Clicked in Box");
      } else {
        //alert("Clicked outside Box");
        redCross.classList.add("blinkingIcon");
        setTimeout(() => {
          redCross.classList.remove("blinkingIcon");
        }, 3000);
      }
    };
  }, 10);

  redCross.onclick = function () {
    mainWindow.parentNode.removeChild(mainWindow);
    anchorElement.style.display = "none";
  };
}
