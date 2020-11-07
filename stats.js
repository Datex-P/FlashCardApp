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
  redCross.className = 'redCross';

  let theWordStats = document.createElement("div");
  theWordStats.innerHTML = "Stats";
  theWordStats.style.fontWeight = "bold";

  let todayAndCardsStudiedContainer = document.createElement("div");
  todayAndCardsStudiedContainer.style.marginTop = "30px";
  todayAndCardsStudiedContainer.className = 'flexColumnAlignCenter';

  let cardsStudied = document.createElement("div");
  cardsStudied.className = 'flexCenter'
 // cardsStudied.style.border = '1px solid black';
  cardsStudied.style.width = "270px";
  cardsStudied.style.height = '100px'
  
  cardsStudied.style.overflow = 'scroll';
  cardsStudied.style.overflowX = 'hidden';
  cardsStudied.style.marginBottom = '5px';


  let theWordTodayContainer = document.createElement("div");
  theWordTodayContainer.className = 'flexColumnAlignCenter';
  theWordTodayContainer.style.marginBottom = "10px";

  let theWordToday = document.createElement("div");
  theWordToday.innerHTML = "Today";
  theWordToday.style.fontWeight = "bold";
  theWordToday.style.marginBottom = '5px';

  let theWordCalendarContainer = document.createElement("div");
  theWordCalendarContainer.className = 'flexColumnAlignCenter';

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
  yearBoxContainer.style.width = '270px';
  yearBoxContainer.style.height = '210px';
  yearBoxContainer.style.border = '1px solid black';

  let hourlyBreakdownContainer = document.createElement('div');
  hourlyBreakdownContainer.className =  'flexColumnAlignCenter'

  let theWordhourlyBreakdown = document.createElement('div');
  theWordhourlyBreakdown.innerText = 'Hourly Breakdown'
  theWordhourlyBreakdown.style.marginTop = '10px';
  theWordhourlyBreakdown.style.fontWeight = 'bold';

  let radioButtonContainer = document.createElement('div');
  radioButtonContainer.style.display = 'flex';
  radioButtonContainer.style.border = '1px black solid';
  radioButtonContainer.style.marginTop = '10px';


  ['1 month','3 month','12 month'].forEach(radio=>{
    let radioBtn = document.createElement('input')
    let label = document.createElement('label');
    label.innerText = radio;
    radioBtn.value = radio;
    radioBtn.setAttribute('type', 'radio');
    radioBtn.className = 'oneMonthThreeMonthButton'
    radioBtn.name = 'month'
    radioBtn.onchange = function (event){
      let {value} = event.target
      console.log(value);
    }
    // radioBtn.onmouseover = function (event){
    //   let {name,checked, value} = event.target
    //   console.log(name,checked, value)
    // }
    radioButtonContainer.appendChild(radioBtn);
    radioButtonContainer.appendChild(label)
  });
  
  



  




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

  function change(dec) {
    let yearN = yearOfStudy.getFullYear() + dec;
    year.innerText = yearN
    renderDays(yearN)
  }


  buttonLeft.onclick = function () {
    dec-=1
    change(dec);

  };

  buttonRight.onclick = function () {
    dec+=1
    change(dec);
  };

  let chart1 = document.createElement('div');
  chart1.style.backgroundColor = 'blue'

  let chart2 = document.createElement('div');
  chart2.style.backgroundColor = 'green'


  
  renderDays(2020)
function renderDays(year){
  yearBoxContainer.innerHTML=''
  let thisYear = new Date(`January 1, ${+year}`);

  while (thisYear.getMonth() != 0 || thisYear.getDate() != 1 || thisYear.getFullYear() == +year) {
    let day = document.createElement('div');
    day.classList.add('day')

    let date = thisYear.toDateString()
    day.onclick = function () {
      let day1 = document.createElement('div');
          day1.style.display = 'flex';
          day1.innerText = `${date}`;
          day1.style.width = '30px';
          day1.style.backgroundColor = 'white';
          day1.style.zIndex = '2';
          day.append(day1)
    }

    for (let deck in dataBase.DeckNames) {
      if (dataBase.DeckNames[deck].some(item => new Date(item.lastOpen).toDateString() == date)) {
        day.style.backgroundColor = 'red'
      }
    }
    thisYear.setDate(thisYear.getDate() + 1)

    yearBoxContainer.appendChild(day)
  }
}

/*when deck is deleted it should also be deleted out of stats*/

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
    cardsStudied.style.removeProperty('border');
    cardsStudied.style.removeProperty('overflow');
  }
  
  if  (Object.keys(dataBase.counter).length <7 /*|| !(Object.keys(dataBase.counter))*/ ) {
    cardsStudied.style.removeProperty('border');
    cardsStudied.style.removeProperty('overflow');
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

  redCross.addEventListener('mouseover', function() {
    redCross.style.cursor = 'pointer';
  });
}
