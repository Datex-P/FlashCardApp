import {
  dataBase
} from "./dataBase.js";
import {
  redCross as redCrossIcon
} from "./svgs.js";

export default function stats() {

  let anchorElement = document.querySelector("#questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let mainWindow = document.createElement("div");
  mainWindow.className = "addQuestionsToDeck";
  mainWindow.style.overflow = 'scroll';
  mainWindow.style.overflowX = 'hidden';
  //mainWindow.style.marginTop = '20px';

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

  let todayAndCardsStudiedContainer = document.createElement("div");
  todayAndCardsStudiedContainer.style.marginTop = "30px";
  todayAndCardsStudiedContainer.style.display = "flex";
  todayAndCardsStudiedContainer.style.flexDirection = "column";
  todayAndCardsStudiedContainer.style.alignItems = "center";

  let cardsStudied = document.createElement("div");
  //cardsStudied.style.display = "flex";
  //cardsStudied.style.justifyContent = "space-between";
  //cardsStudied.style.border = '1px solid black';
  //cardsStudied.style.width = "200px";
  cardsStudied.style.maxHeight = '110px';
  cardsStudied.style.overflow = 'scroll';
  cardsStudied.style.marginBottom = '5px';

  let theWordTodayContainer = document.createElement("div");
  theWordTodayContainer.style.display = "flex";
  theWordTodayContainer.style.flexDirection = "column";
  theWordTodayContainer.style.alignItems = "center";
  theWordTodayContainer.style.marginBottom = "10px";

  let theWordToday = document.createElement("div");
  theWordToday.innerHTML = "Today";
  theWordToday.style.fontWeight = "bold";
  theWordToday.style.marginBottom = '5px';

  let theWordCalendarContainer = document.createElement("div");
  theWordCalendarContainer.style.display = "flex";
  theWordCalendarContainer.style.flexDirection = "column";
  theWordCalendarContainer.style.alignItems = 'center';

  let theWordCalendar = document.createElement("div");
  theWordCalendar.style.marginTop = "10px";
  theWordCalendar.style.marginBottom = '5px';
  theWordCalendar.innerHTML = "Calendar";
  theWordCalendar.style.fontWeight = "bold";

  let rightAndLeftButtonContainer = document.createElement("div");
  rightAndLeftButtonContainer.style.display = "flex";


  let buttonLeft = document.createElement("button");
  buttonLeft.className = "calendarButtons";
  buttonLeft.style.marginRight = "5px";
  buttonLeft.innerHTML = "<";
  buttonLeft.style.marginBottom = '5px';

  let buttonRight = document.createElement("button");
  buttonRight.className = "calendarButtons";
  buttonRight.style.marginLeft = "5px";
  buttonRight.innerHTML = ">";


  let yearOfStudy = new Date();
  let year = document.createElement("div");
  year.innerText = yearOfStudy.getFullYear();

  let dec = 0;

  function decrease() {
    dec--;
    year.innerText = yearOfStudy.getFullYear() + dec;
  }

  function increase() {
    dec++;
    year.innerText = yearOfStudy.getFullYear() + dec;
  }

  buttonLeft.onclick = function () {
    decrease();
  };

  buttonRight.onclick = function () {
    increase();
  };


  let container = document.createElement("div");
  container.style.templateRows = "30px";
  container.style.templateColumns = "20px";

  
  let yearBoxContainer = document.createElement('div');
  yearBoxContainer.style.display = 'flex';
  yearBoxContainer.style.flexWrap = 'wrap'
  //yearBoxContainer.style.width = '300px';
  yearBoxContainer.style.width = '270px';
  yearBoxContainer.style.height = '210px';
  yearBoxContainer.style.border = '1px solid black';


  let hourlyBreakdownContainer = document.createElement('div');
      hourlyBreakdownContainer.style.display = 'flex';
      hourlyBreakdownContainer.style.flexDirection = 'column';

  let theWordhourlyBreakdown = document.createElement('div');
      theWordhourlyBreakdown.innerText = 'Hourly Breakdown'
      theWordhourlyBreakdown.style.marginTop = '10px';
      theWordhourlyBreakdown.style.fontWeight = 'bold';

  let radioButtonContainer  = document.createElement('div');
      radioButtonContainer.style.display = 'flex';

  



  let thisYear = new Date(`January 1, ${+year.innerText}`);

  while (thisYear.getMonth() != 0 || thisYear.getDate() != 1 || thisYear.getFullYear() == +year.innerText) {
    let day = document.createElement('div');
    day.classList.add('day')

    let date = thisYear.toDateString()
    day.onclick = function () {

      console.log(date)
    }

    for (let deck in dataBase.DeckNames) {
      if (dataBase.DeckNames[deck].some(item => new Date(item.lastOpen).toDateString() == date)) {
        day.style.backgroundColor = 'red'
      }
    }
    thisYear.setDate(thisYear.getDate() + 1)

    yearBoxContainer.appendChild(day)
  }






  /*
  seconds studied in total
    const counterSecStudied = Object.values(counter);

    let secStudied = document.getElementById("secondsStudied");
    secStudied.innerHTML = counterSecStudied.reduce((acc, cur) => acc + cur);
  */

  for (let deck in dataBase.counter) {
    cardsStudied.innerHTML += `Deck ${deck}: ${dataBase.counter[deck]} cards studied<br/>`;
    //   cardsStudied += `<div>Deck ${deck}: ${dataBase.counter[deck]} cards studied<br/></div>`
  }

  //console.log(dataBase.counter.Literature)

  // console.log(dataBase.DeckNames.Literature.cardsStudied)
  if (cardsStudied.innerHTML === "") {
    cardsStudied.innerHTML = "No cards studied today";
  }

  /*
  let arr = Object.keys(obj);
  let numberOfSeconds.innerHTML = arr.forEach((item) => {
      (item + item.seconds)
  });
*/

  theWordTodayContainer.append(theWordToday);
  theWordTodayContainer.appendChild(cardsStudied);
  
  todayAndCardsStudiedContainer.appendChild(theWordTodayContainer);
  
  theWordCalendarContainer.appendChild(theWordCalendar);
  rightAndLeftButtonContainer.appendChild(buttonLeft);
  rightAndLeftButtonContainer.appendChild(year);
  rightAndLeftButtonContainer.appendChild(buttonRight);
  
  theWordCalendarContainer.append(rightAndLeftButtonContainer);
  
  theWordCalendarContainer.append(yearBoxContainer)
  
  hourlyBreakdownContainer.append(theWordhourlyBreakdown)
  todayAndCardsStudiedContainer.appendChild(theWordCalendarContainer);
  todayAndCardsStudiedContainer.append(hourlyBreakdownContainer);
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
