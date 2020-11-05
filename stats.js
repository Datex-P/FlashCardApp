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
  //mainWindow.style.marginTop = '100px';
  /*
  mainWindow.style.overflow = 'scroll';
  mainWindow.style.overflowX = 'hidden';
*/
  //mainWindow.style.marginTop = '20px';

  let innerWindow = document.createElement("div");
  innerWindow.style.marginTop = "20px";
  innerWindow.style.marginLeft = "30px";
  innerWindow.style.marginRight = '3px';
  innerWindow.style.marginBottom = '20px';
  innerWindow.style.overflow = 'scroll';
  innerWindow.style.overflowX = 'hidden';

  let redCrossAndStatsContainer = document.createElement("div");
  redCrossAndStatsContainer.style.display = "flex";
  redCrossAndStatsContainer.style.justifyContent = "space-between";
  redCrossAndStatsContainer.style.height = "20px";
  redCrossAndStatsContainer.style.width = "290px";
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

  cardsStudied.style.display = "flex";
  cardsStudied.style.justifyContent = "space-between";
  cardsStudied.style.border = '1px solid black';

  cardsStudied.style.width = "200px";
  cardsStudied.style.height = '100px'

  //cardsStudied.style.maxHeight = '110px';
  cardsStudied.style.overflow = 'scroll';
  cardsStudied.style.overflowX = 'hidden';
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
  hourlyBreakdownContainer.style.alignItems = 'center';

  let theWordhourlyBreakdown = document.createElement('div');
  theWordhourlyBreakdown.innerText = 'Hourly Breakdown'
  theWordhourlyBreakdown.style.marginTop = '10px';
  theWordhourlyBreakdown.style.fontWeight = 'bold';

  let radioButtonContainer = document.createElement('div');
  radioButtonContainer.style.display = 'flex';
  radioButtonContainer.style.border = '1px black solid';
  radioButtonContainer.style.marginTop = '10px'

  let oneMonthRadioButton = document.createElement('input')
  oneMonthRadioButton.setAttribute('type', 'radio');

  let threeMonthRadioButton = document.createElement('input');
  threeMonthRadioButton.setAttribute('type', 'radio');

  let oneYearRadioButton = document.createElement('input');
  oneYearRadioButton.setAttribute('type', 'radio');

  let oneMonth = document.createElement('div');
  oneMonth.innerText = '1 month';

  let threeMonths = document.createElement('div');
  threeMonths.innerText = '3 months';

  let oneYear = document.createElement('div');
  oneYear.innerText = '1 year';

  // let usageChartContainer = document.createElement('div');
  // usageChartContainer.style.marginTop = '10px';
  // usageChartContainer.style.width = '270px';
  // usageChartContainer.style.height = '190px';
  // usageChartContainer.style.border = '1px black solid';
  // usageChartContainer.style.display = 'flex';
  // usageChartContainer.style.gridTemplateColumns = 'repeat(24, 1fr)';
  // usageChartContainer.style.gridTemplateRows = 'repeat(4, 1fr)';
  // usageChartContainer.style.gridGap = '5px';
  // usageChartContainer.style.backgroundColor = 'blue';

  let usageChartCaption = document.createElement('div');
  // usageChartCaption.style.marginTop = '10px';
  // usageChartCaption.style.width = '270px';
  usageChartCaption.style.height = '190px';
  usageChartCaption.style.border = '1px black solid';
  usageChartCaption.style.display = 'flex';
  usageChartCaption.style.overflowY = 'scroll'
  // usageChartCaption.style.gridTemplateColumns = 'repeat(24, 1fr)';

  // usageChartCaption.style.gridGap = '2px';


  for (let i = 0; i < 24; i++) {
    let time = document.createElement('div');
    time.innerText = `${i}`;
    time.classList.add('hourAmount')
    usageChartCaption.append(time)

    let chartBar = document.createElement('div');
    chartBar.classList.add('hourLevel')
    let j = i%2?3:4
    for (let i = 1; i <= j; i++) {
      let level = document.createElement('div');
      level.classList.add('level')
      chartBar.appendChild(level)
    }
    time.append(chartBar)
  }

  let clickToView = document.createElement('button');
  clickToView.style.height = '40px';
  clickToView.style.width = '20px';
  clickToView.innerHTML = 'Click to View';

  clickToView.onclick = function () {
    let newWindow = document.createElement('div');
    newWindow.className = 'transformWindow';
    //innerWindow.style.transform = 'rotate(90deg)';
    // newWindow.append(usageChartContainer);
    newWindow.append(usageChartCaption);
    hourlyBreakdownContainer.append(newWindow)

    document.getElementById('mainMenu').style.transform = '90deg';
  }





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

  let chart1 = document.createElement('div');
  chart1.style.backgroundColor = 'blue'

  let chart2 = document.createElement('div');
  chart2.style.backgroundColor = 'green'


  



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
  theWordCalendarContainer.append(yearBoxContainer);

  hourlyBreakdownContainer.append(theWordhourlyBreakdown);

  radioButtonContainer.append(oneMonthRadioButton);
  radioButtonContainer.append(oneMonth);
  radioButtonContainer.append(threeMonthRadioButton);
  radioButtonContainer.append(threeMonths);
  radioButtonContainer.append(oneYearRadioButton);
  radioButtonContainer.append(oneYear);


  hourlyBreakdownContainer.append(radioButtonContainer);

  //usageChartContainer.append(chart2)
  //usageChartContainer.append(chart1)
  hourlyBreakdownContainer.append(clickToView);
  hourlyBreakdownContainer.append(usageChartCaption);
  // hourlyBreakdownContainer.append(usageChartContainer);

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
