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

  let innerWindow = document.createElement("div");
  innerWindow.style.marginTop = "20px";
  innerWindow.style.marginLeft = "30px";
  innerWindow.style.marginRight = '3px';
  innerWindow.style.marginBottom = '20px';
  innerWindow.style.overflow = 'scroll';
  innerWindow.style.overflowX = 'hidden';

  let redCrossAndStatsContainer = document.createElement("div");
  redCrossAndStatsContainer.className = 'flexSpaceBetween';
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
  //cardsStudied.style.border = '1px solid black';
  cardsStudied.style.width = "240px";
  cardsStudied.style.maxHeight = '100px'
  cardsStudied.style.height = 'fit-content'
  cardsStudied.style.overflow = 'scroll';
  cardsStudied.style.overflowX = 'hidden';
  cardsStudied.style.marginBottom = '5px';
  cardsStudied.style.flexDirection = 'column';


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
  buttonLeft.style.cursor = 'pointer';
  buttonLeft.innerHTML = "<";
  buttonLeft.style.marginBottom = '5px';

  let buttonRight = document.createElement("button");
  buttonRight.className = "calendarButtons";
  buttonRight.style.marginLeft = "5px";
  buttonRight.style.cursor = 'pointer'
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
  hourlyBreakdownContainer.className = 'flexColumnAlignCenter'

  let theWordhourlyBreakdown = document.createElement('div');
  theWordhourlyBreakdown.innerText = 'Hourly Breakdown'
  theWordhourlyBreakdown.style.marginTop = '10px';
  theWordhourlyBreakdown.style.fontWeight = 'bold';

  let radioButtonContainer = document.createElement('div');
  radioButtonContainer.style.display = 'flex';
  radioButtonContainer.style.border = '1px black solid';
  radioButtonContainer.style.marginTop = '10px';


  ['1 month', '3 month', '12 month'].forEach(radio => {
    let radioBtn = document.createElement('input')
    let label = document.createElement('label');
    label.innerText = radio;
    radioBtn.value = radio;
    radioBtn.style.cursor = 'pointer';
    radioBtn.setAttribute('type', 'radio');
    radioBtn.className = 'oneMonthThreeMonthButton'
    radioBtn.name = 'month'
    radioBtn.onchange = function (event) {
      let { value } = event.target
      console.log(value);
    }
    // radioBtn.onmouseover = function (event){
    //   let {name,checked, value} = event.target
    //   console.log(name,checked, value)
    // }
    radioButtonContainer.appendChild(radioBtn);
    radioButtonContainer.appendChild(label)
  });



  let usageChartCaption = document.createElement('div');

  usageChartCaption.style.height = '190px';
  usageChartCaption.style.border = '1px black solid';
  usageChartCaption.style.display = 'flex';
  usageChartCaption.style.overflowY = 'scroll'


  for (let i = 0; i < 24; i++) {
    let time = document.createElement('div');
    time.innerText = `${i}`;
    time.classList.add('hourAmount')
    usageChartCaption.append(time)

    let chartBar = document.createElement('div');
    chartBar.classList.add('hourLevel')
    let j = i % 2 ? 3 : 4
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
  };


  buttonLeft.onclick = function () {
    dec -= 1
    change(dec);

  };

  buttonRight.onclick = function () {
    dec += 1
    change(dec);

  };

  let chart1 = document.createElement('div');
  chart1.style.backgroundColor = 'blue';

  let chart2 = document.createElement('div');
  chart2.style.backgroundColor = 'green';


  let counter = 0;

  renderDays(2020);

  function renderDays(year) {
    yearBoxContainer.innerHTML = '';
    let thisYear = new Date(`January 1, ${+year}`);

    while (thisYear.getMonth() != 0 || thisYear.getDate() != 1 || thisYear.getFullYear() == +year) {
      let day = document.createElement('div');
      day.classList.add('day');
      let date = thisYear.toDateString();

      for (let deck in dataBase.DeckNames) {
        dataBase.DeckNames[deck].forEach(card=>{
          card.openHistory && card.openHistory.forEach(openTime=>{
            if (date === openTime.toDateString()) {
              counter++;
            }
          })
        })        
      }

      for (let deck in dataBase.DeckNames) {
        if (dataBase.DeckNames[deck].find(item => new Date(item.lastOpen).toDateString() == date)) {
          day.style.backgroundColor = 'red';
          day.style.cursor = 'pointer';

          day.onclick = function (event) {
            event.stopPropagation()
            yearBoxContainer.querySelectorAll('.day').forEach(day => day.innerHTML = '');
            let dayInner = document.createElement('div');
            let time = Math.round(Object.values(dataBase.studyTime).reduce((acc, cur) => acc + cur) / 60)
            dayInner.innerText = `${date} Time: ${time.toString().padStart(3,'⠀')} min \n Review: ${counter} cards`;
            console.log(counter);
            day.append(dayInner)
          }
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



      thisYear.setDate(thisYear.getDate() + 1)

      yearBoxContainer.appendChild(day);
      yearBoxContainer.onclick = function (event) {
        alert('you do not have training in this day')
      }
    }
  }

  function removePopUpwindow() {
    yearBoxContainer.querySelectorAll('div').forEach(div=>div.innerHTML = '')
  }
  mainWindow.onclick = removePopUpwindow
  




  /*when deck is deleted it should also be deleted out of stats*/

  let counterTwo = 0;

  let date = new Date();

/*
  for (let deck in dataBase.DeckNames) {
    if (dataBase.DeckNames[deck].find(item => new Date(item.lastOpen).toDateString() == date)) {
*/
let resultContainer = document.createElement('div');
resultContainer.style.border = '1px black solid'
resultContainer.className = 'flexSpaceBetween'
cardsStudied.append(resultContainer);
  for (let deck in dataBase.DeckNames) {
    dataBase.DeckNames[deck].forEach(card=>{
      let child1 = document.createElement('div');
      let child2 = document.createElement('div');
      card.openHistory && card.openHistory.forEach(openTime=>{
        if (date.toDateString() === openTime.toDateString()) {
          counterTwo++;
        }
      })
      child1.innerText = `Deck ${deck}:`;
      child2.innerText = `${counterTwo} cards studied`;
      cardsStudied.append(resultContainer);
      resultContainer.append(child1);
      resultContainer.append(child2);
    })        
  }

  console.log(counterTwo + ' counterTwo')

  if (counterTwo === 0) {
    cardsStudied.style.textAlign = 'center';
    cardsStudied.innerHTML = "No cards studied today";
    cardsStudied.style.removeProperty('border');
    cardsStudied.style.removeProperty('overflow');
  }

  if (counterTwo < 7) {
    cardsStudied.style.removeProperty('border');
    cardsStudied.style.removeProperty('overflow');
  }

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

  hourlyBreakdownContainer.append(clickToView);
  hourlyBreakdownContainer.append(usageChartCaption);


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

  function closeMenu(){
    let all = document.querySelectorAll('.menuContainer>div')
    document.querySelector('.menuBox').style.display = 'none';
   // opened = false;
    window.onclick = '';
    all[0].classList.remove('transPlus');
    all[0].style.top = '0px'
    all[2].classList.remove('transMinus');
    all[2].style.top = '16px'
    document.getElementById('menuIcon2').style.display = 'block';
  }

closeMenu()



};