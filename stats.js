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

  let todayAndCardsStudiedContainer = document.createElement("div");
  todayAndCardsStudiedContainer.style.marginTop = "100px";
  todayAndCardsStudiedContainer.style.display = "flex";
  todayAndCardsStudiedContainer.style.flexDirection = "column";
  todayAndCardsStudiedContainer.style.alignItems = "center";

  let cardsStudied = document.createElement("div");
  cardsStudied.style.display = "flex";
  cardsStudied.style.justifyContent = "space-between";
  //cardsStudied.style.border = '1px solid black';
  cardsStudied.style.width = "300px";

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
  //container.style.display = "grid";
  //container.style.templateRows =  'repeat(7, 10px)';
  container.style.templateRows = "30px";
  container.style.templateColumns = "20px";

  //container.style.templateRows.border = '1px black solid'

  let yearBoxContainer = document.createElement('div');
  yearBoxContainer.style.display = 'flex';
  yearBoxContainer.style.flexWrap = 'wrap'
  yearBoxContainer.style.width = '300px';
  yearBoxContainer.style.height = '210px';
  yearBoxContainer.style.border = '1px solid black';
  // yearBoxContainer.style.templateRows = '30px';
  // yearBoxContainer.style.templateColumns = '50px';

  // let daysInYearBox = document.createElement('div');
  // daysInYearBox.style.width = '10px';
  // daysInYearBox.style.height = '10px';
  // daysInYearBox.style.border = '1px black solid';
  /*
    let daysInYearBox2 = document.createElement('div');
        daysInYearBox2.style.width = '10px';
        daysInYearBox2.style.height = '10px';
        daysInYearBox2.style.border = '1px black solid';
  */

  let thisYear = new Date(`January 1, ${+year.innerText}`);
  
  // let nextYear = new Date(`January 1, ${+year.innerText + 1}`);
  // let daysOfThisYear = ((nextYear - thisYear) / 1000 / 3600 / 24);
  // console.log(daysOfThisYear)

  while (thisYear.getMonth() != 0 || thisYear.getDate()!=1 || thisYear.getFullYear() == +year.innerText) {
    let day = document.createElement('div');
    day.classList.add('day')
    
    let date = thisYear.toDateString()
    day.onclick = function () {
      
      console.log(date)
    }

    for(let deck in dataBase.DeckNames){
      if(dataBase.DeckNames[deck].some(item=>new Date(item.lastOpen).toDateString()==date)){
        day.style.backgroundColor = 'red'
      }
    }
    thisYear.setDate(thisYear.getDate()+1)

    yearBoxContainer.appendChild(day)

    // yearBoxContainer.append(daysInYearBox2)

  }




  // console.log(daysOfThisYear);




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
  todayAndCardsStudiedContainer.appendChild(theWordTodayContainer);

  theWordCalendarContainer.appendChild(theWordCalendar);
  rightAndLeftButtonContainer.appendChild(buttonLeft);
  rightAndLeftButtonContainer.appendChild(year);
  rightAndLeftButtonContainer.appendChild(buttonRight);

  theWordCalendarContainer.append(rightAndLeftButtonContainer);
  // yearBoxContainer.append(daysInYearBox)
  theWordCalendarContainer.append(yearBoxContainer)

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
