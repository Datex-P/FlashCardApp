import { dataBase } from "./dataBase.js";

import {
  createElement,
  handleOutsideClick,
  closeMenu,
  close,
  redCross,
  deleteCardQuestionBox, threeDots
} from "./exportFunctions.js";

import createDom from "./createDom.js";


export default function stats() {

  document.querySelector('#scrollable').style.display = 'none'
  



  var todayCardsStudiedCounter = 0
  let anchorElement = document.querySelector("#questAnswerTrainOverv");
  anchorElement.style.display = 'flex';

  let mainWindow = createElement('div', '', {}, "addQuestionsToDeck");

  let innerWindow = createElement('div', '', {
    overflow: 'scroll', overflowX: "hidden",
  }); //scroll bar at the right side of the stats window

  let redCrossAndStatsContainer = createElement(
    'div', '', {}, "flexSpaceBetweenAlignCenter redCrossAndStatsContainer"
  );

  let theWordStats = createElement('div', 'Stats', { fontWeight: "bold", fontSize: '22px' });

  let todayAndCardsStudiedContainer = createElement(
    'div',
    '',
    { marginTop: "30px" },
    'flexColumnAlignCenter'
  );

  let theWordTodayContainer = createElement(
    'div', '',
    { }, 'flexColumnAlignCenter theWordTodayContainer'
  );




  let canvas = createElement('canvas', '', { width: '270px', height: '200px', overflow: 'hidden', borderRadius: '5px' }
  )

  theWordTodayContainer.append(canvas)

  let todayStudyContainer = createElement('div', "Today's study breakdown", {}, 'todayStudyContainer')

  let todayDate = new Date();


  var config = {
    type: 'doughnut',
    data: {
      labels: [
        // "Red",
      ],
      datasets: [{
        data: [
          // 300, 50
        ],
        backgroundColor: [
          // "#FF6384",
        ],
        borderColor: [
          // 'rgba(184, 156, 110, 0.95)',
        ],
        borderWidth: 0,
        hoverBackgroundColor: [
          // "#FF6384",
        ]
      }]
    },
    options: {
      elements: {
        center: {
          text:''
        }
      },
      legend: {
         position: 'bottom',
        labels: {
          fontColor: 'black'
        }

      },
      cutoutPercentage: 81,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 10
        },
        border: 'none'
      }
    }
  };



  let dateBetterFormatted = createElement('div', `${!dataBase.openedToday ? 'No cards studied today'
  :
  `Data from: <br/>${new Date().toLocaleDateString().replace(/\//g,'.')}`
}`, {
     
    
  }, 'dataBetterFormatted')

  todayStudyContainer.append(dateBetterFormatted)

  var ctx = canvas.getContext("2d");
  var myChart = new Chart(ctx, config);

  let theWordCalendarContainer = createElement("div", "", {}, "flexColumnAlignCenter");

  let theWordCalendar = createElement('div', 'Calendar', { fontSize: '18px' }, 'theWordCalendar');

  let rightAndLeftButtonContainer = createElement("div", "", {
    display: "flex",
  });

  let [buttonLeft, buttonRight] = ["<", ">"].map((el) => {
    return createElement(
      'div',
      el,
      { cursor: "pointer", marginBottom: "4px" },
      "calendarButtons flexCenter"
    );
  });

  buttonLeft.style.marginRight = "5px";
  buttonRight.style.marginLeft = "5px";

  let cardThreeDots = threeDots()

  let anchorThreeDots = cardThreeDots(

    {
      reset: (outsideClickClosehandler) => {       //when reset is clicked the window whether you want to reset the progress appears

        if (dataBase.showDeleteFrameStats) {

          setTimeout(function () {
            window.onclick = outsideClickClosehandler
          }, 10);

          deleteCardQuestionBox(() => {

            for (let time in dataBase.timeObj) {
              dataBase.timeObj[time] = 0
              console.log('i fired inside')
            }
            dataBase.deckCompleted = 0 //deck completed is set back to zero to reset the goal in the overview
            dataBase.goalReached = 0
            dataBase.reset = true
            dataBase.openedToday = false
           // dataBase.showDiagram = false
            //document.querySelector(".canvasContainer").style.display = "none";
           // dataBase.showDiagram = false;

            for (let deck in dataBase.DeckNames) {

              dataBase.DeckNames[deck].data.forEach((card) => {

                if (card.openHistory) {
                  delete card.openHistory
                  stats()
                  //createDom(dataBase.deckNames)
                }
              })
            }
          } 
          
          //remove
            //breakdown has to be resetted as well
            , () => {

            }, //refresh
            'Reset current progress', //header
            'reset the stats section?',  // body,
            { marginLeft: '40px', fontSize: '18px' }, //messageDeleteCardStyling
            false) //showmessageagaincontainercheckbox

            , { marginLeft: '40px', fontSize: '18px' }, 'Reset progress'
        } else {
          for (let deck in dataBase.DeckNames) {

            dataBase.DeckNames[deck].data.forEach((card) => {

              if (card.openHistory) {
                delete card.openHistory
              }
            })
          }
          for (let time in dataBase.timeObj) {
            dataBase.timeObj[time] = 0
            console.log('i fired inside')
          }
         
        }
        console.log('i fired finally you know')
      }
    }, { top: '4px' } //the position of the stats field after three dots is clicked
  )

    anchorThreeDots.classList.add('anchorThreeDots')


  let yearBoxContainer = createElement("div", "", {}, 'yearBoxContainer'
  );

  let hourlyBreakdownContainer = createElement(
    'div',
    '',
    { marginTop: "20px", width: "330px" },
    "flexColumnAlignCenter"
  );

  let theWordhourlyBreakdown = createElement("div", "Hourly Breakdown", {}, 'theWordhourlyBreakdown');

  let radioButtonContainer = createElement('div', '', {}, 'radioButtonContainer');

  ["1 month", "3 month", "12 month"].forEach((radio) => {
    let radioBtn = createElement("input", "", { cursor: "pointer" });
    let label = createElement("label", radio, {});
    radioBtn.value = radio;
    radioBtn.setAttribute("type", "radio");
    radioBtn.name = "month";
    radioBtn.onchange = function (event) {
      let { value } = event.target; //gets destructured because otherwise the whole input field is displayed

      dataBase.hourlyBreakdown = value

    
    };


   
  

    if (radioBtn.value === dataBase.hourlyBreakdown) { //sets the blue mark to 1 month by default
      radioBtn.checked = true
    }

    radioButtonContainer.append(radioBtn, label);
  });

  let diagramHourlyBreakDownContainer = createElement(
    'div', '', {}, "flexColumnSpaceAround diagramHourlyBreakDownContainer"
  );


  for (let deck in dataBase.DeckNames) {

    let deckItem = dataBase.DeckNames[deck]
    // if (deckItem.data.find((item) => new Date(item?.openHistory?.[0]).toDateString() == new Date().toDateString())) {
    //   todayCardsStudiedCounter++
    if (deckItem.data.filter((item) => item.openHistory && item.openHistory.filter(item => new Date(item).getHours() < 12 && new Date(item).getHours() > 6).length).length >0) {

      dataBase.timeObj[6]  = deckItem.data.filter((item) => item.openHistory && item.openHistory.filter(item => new Date(item).getHours() < 12 && new Date(item).getHours() > 6).length).length
    }

    if (deckItem.data.filter((item) => item.openHistory && item.openHistory.filter(item => new Date(item).getHours() < 18 && new Date(item).getHours() > 12).length).length >0) {
      dataBase.timeObj[12] = deckItem.data.filter((item) => item.openHistory && item.openHistory.filter(item => new Date(item).getHours() < 18 && new Date(item).getHours() > 12).length).length
    }

    if ( dataBase.timeObj[18] = deckItem.data.filter((item) => item.openHistory && item.openHistory.filter(item => new Date(item).getHours() < 24 && new Date(item).getHours() > 18).length).length > 0) {
      dataBase.timeObj[18] = deckItem.data.filter((item) => item.openHistory && item.openHistory.filter(item => new Date(item).getHours() < 24 && new Date(item).getHours() > 18).length).length
    }

    }

    



    console.log(dataBase.timeObj[6], 'wert von 6')
    console.log(dataBase.timeObj[12], 'wert von 12')
    console.log(dataBase.timeObj[18], 'wert von 18')



for (let deck in dataBase.DeckNames) {

  let deckItem = dataBase.DeckNames[deck]
  // if (deckItem.data.find((item) => new Date(item?.openHistory?.[0]).toDateString() == new Date().toDateString())) {
  //   todayCardsStudiedCounter++
    var firstVal = deckItem.data.filter((item) => item.openHistory && item.openHistory.filter(item => new Date(item).getHours() < 12 && new Date(item).getHours() > 6).length).length
    var secVal = deckItem.data.filter((item) => item.openHistory && item.openHistory.filter(item => new Date(item).getHours() < 18 && new Date(item).getHours() > 12).length).length
    var thirdVal = deckItem.data.filter((item) => item.openHistory && item.openHistory.filter(item => new Date(item).getHours() < 24 && new Date(item).getHours() > 18).length).length
    var fourthVal = deckItem.data.filter((item) => item.openHistory && item.openHistory.filter(item => new Date(item).getHours() < 6 ).length).length

    
    
  }


  console.log(firstVal, 'firstcval')
  console.log(secVal, 'secVal')
  console.log(thirdVal, 'thirdval')

 

  let timeAndProgressCont = createElement('div', '', {display:'flex'});
  let time = createElement("div", 'Monthly Goal', {}, 'studyGoal');

  let progressBar = createElement('div', '', {}, 'progressBar');

  progressBar.style.marginLeft = '16px' //first progress bar next to study goal

  
  let currentProgress = Object.keys(dataBase.goalReached).length >0 ?  Number(Object.keys(dataBase.goalReached)[0]) : 0
  
  let innerprogress = createElement('div', '', {
    backgroundColor: 'orange', color: 'black',
    width: `${currentProgress}%`, height: '10px'
  });


  let widthAdjusted = Math.round(currentProgress)+ 120




  let progressNumber = createElement('div', `${currentProgress.toFixed(0)}%`, { //number that is shown above the study goal progress bar
    left: `${widthAdjusted}px`, 
  }, 'progressNumber')


  diagramHourlyBreakDownContainer.append(timeAndProgressCont);
  timeAndProgressCont.append(time, progressBar, progressNumber)
  progressBar.append(innerprogress);


  let arr = [];
  let previousWidthVar = 0

  let stud = 100

  for (let i = 6; i <= 30; i += 6) {


    if (i in dataBase.timeObj) { //timeObj is list of precoded times above


      arr.push(i)
      let timeAndProgressContainer = createElement('div', '', {display:'flex'});


      let allProgress;
      if (Object.keys(dataBase.timeObj).filter(item=>dataBase.timeObj[item] !==0).length > 1) {
        allProgress = Number(Object.values(dataBase.timeObj).reduce((sum, i) => sum + i, 0))

      } else {
        allProgress = 1
      }




      console.log(allProgress, 'allprogress')
      console.log(currentProgress, 'currentprogress')

      
      let widthVar  = width()
      
      function width (){
      if (dataBase.timeObj[i]) {
        if (previousWidthVar === 0) {
          return ((((dataBase.timeObj[i] || 0)/ allProgress)*100) *1.4467*Number(currentProgress/100))    
        } else if(Object.keys(dataBase.timeObj).filter(item=>dataBase.timeObj[item] !==0).length === 1) {
          console.log('only one present')
        return 1.4467*Number(currentProgress/100)
          
          
          
        }else {
      
      return ((((dataBase.timeObj[i] || 0)/ allProgress)*100) *1.4467*Number(currentProgress/100) - previousWidthVar)
        }
      } else {
        return 0
      }
    
    }

    console.log(allProgress, 'allprogress 2')
      

      let time = createElement("div", '', {}, 'time flexCenterAlignCenter'); //container for the times 06-12 / 12-18 etc.

      let progressBar = createElement('div', '', {}, 'progressBar')
      let innerprogress = createElement('div', '', { marginLeft: `${previousWidthVar}%`,
       backgroundColor: 'orange', width: `${widthVar}%`, height: '10px' });

      previousWidthVar += widthVar

      if (i === 24) {

        time.innerHTML = `<div style='padding: 3px, font-size: 15px' >${24} - ${'0' + 6}</div>` //line gets not triggered for some reason

      } else if (i === 6) {

        time.innerHTML = `<div style='padding: 3px, font-size: 15px'>${'0' + i} - ${(i + 6)}</div>`
      } else {

        time.innerHTML = `<div style='font-size:'15px'>${i} - ${i + 6}</div>`
      }

      diagramHourlyBreakDownContainer.append(timeAndProgressContainer);
      timeAndProgressContainer.append(time, progressBar)
      progressBar.append(innerprogress);

    }
  }


  // for (let deck in dataBase.DeckNames) {

  //   if(dataBase.DeckNames[deck].data.find((card) =>  card.hasOwnProperty('openHistory'))) {
  //     let ele= document.querySelector('.timeAndProgressContain')
  //     console.log('helljkoijopoiuhihussco',ele)
  //     if (ele){
  //     ele.classList.remove('addDispNone')
  //     } 
  //   } 
     
  // }



//function openedInLastMonth() {

//   let dateToday = new Date()
//   let date1MonthAgo = new Date()
  
//   date1MonthAgo.setHours(0,0,0,0)

//   date1MonthAgo.setMonth(date1MonthAgo.getMonth() - 1);
  
//   /
// //}




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



  renderDays(2021);
  function leapyear(year) {
    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
  }



  function renderDays(year) {
    yearBoxContainer.innerHTML = "";
    let thisYear = new Date(`January 1, ${+year}`);

    let daysOfYear = 366 //because counter starts at 1 thus 365

    if (leapyear(year)) {
      daysOfYear = 367
    }




    let counter = 1
    while (
      counter < daysOfYear

    ) {
      counter++
      let day = document.createElement("div");
      day.classList.add("day");
      day.setAttribute( "id", `${counter}` ); //id equals the day of the year like january 1 is 1 december 31 is 365
      let date = thisYear.toDateString();



      let arr = []
      let cardsStudiedCounter = 0;

      for (let deck in dataBase.DeckNames) {

        let deckItem = dataBase.DeckNames[deck]
        if (deckItem.data.find((item) => new Date(item?.openHistory?.[0]).toDateString() == new Date().toDateString())) {
          todayCardsStudiedCounter++

        }
        if (deckItem.data.find((item) => new Date(item?.openHistory?.[0]).toDateString() == date)) {


          cardsStudiedCounter += deckItem.data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString() == date)).length

          arr.push(deckItem.name)
          config.data.labels.push(deckItem.name)
          config.data.datasets[0].data.push(deckItem.data.filter((item) => item?.openHistory?.some(item => new Date(item).toDateString() == date)).length)
          config.data.datasets[0].backgroundColor.push(deckItem.color)
          config.data.datasets[0].borderColor.push(deckItem.color)
          config.data.datasets[0].hoverBackgroundColor.push(deckItem.color)

          day.style.backgroundColor = "red";
          day.style.cursor = "pointer";
         day.title = 'Click to see the study stats of this date'

          day.onclick = function (event) {
            event.stopPropagation();



            let targetView = yearBoxContainer.getBoundingClientRect()
          
 
            yearBoxContainer
              .querySelectorAll(".day")
              .forEach((day) => (day.innerHTML = ""));
            let dayInner = createElement('div', '', { lineHeight: '22px', width: '120px' }
            )

            let time = Math.floor(dataBase.studyTime / 60)

            dayInner.innerText = `${date} Time: ${time
              .toString()
              .padStart(3, "⠀")} min \n  Review${cardsStudiedCounter !== 1 ? 's' : ''}: ${cardsStudiedCounter} card${cardsStudiedCounter !== 1 ? 's' : ''}`;

            day.append(dayInner);
            dayInner.title = 'Click outside the window to close it'


            let inner = dayInner.getBoundingClientRect()

             if (inner.right >targetView.right) { //when the outer right of the day inner field is bigger than the targetView
               dayInner.style.left = '-91px'
             }


             if (inner.left <targetView.left) { //when the outer right of the day inner field is bigger than the targetView
              dayInner.style.left = '-5px'
            }

             if (parseInt((day.id)) > 287 )  { //question ...why does this line not fire up without replace??
              //.replace(/[^0-9]/g,'')
              console.log('true bigger than 100')                //October 13 is the breakpoint aka day 287 where layout changes and box is shown above red point
               dayInner.style.top = '-104px'
             }
          };
        }
      }

      thisYear.setDate(thisYear.getDate() + 1);

      yearBoxContainer.appendChild(day); 
      innerWindow.onclick = function (e) {  //when you click something outside of the pop up study window, it closes
        this.querySelectorAll('.day div').forEach(day=>  //gets all divs with this special selector
          day.style.display = 'none'
        );
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



  let timeToday = new Date();
  let cardsOpenLastThree = 0;
  let cardsOpenLastTwelve = 0;
  let cardsOpenLastOne = 0;

  for (let deck in dataBase.DeckNames) { //needed for hourly breakdown

    dataBase.DeckNames[deck].data.forEach((card) => {

      card.openHistory && card.openHistory.forEach((openTime) => {

        if (openTime > timeToday.setMonth(timeToday.getMonth() - 1)) {
          cardsOpenLastOne++;
        //  console.log(cardsOpenLastOne)
        }
        else if (openTime > timeToday.setMonth(timeToday.getMonth() - 3)) {

          cardsOpenLastThree++;
        }
        else if (openTime > timeToday.setMonth(timeToday.getMonth() - 12)) {

          cardsOpenLastTwelve++;
        }
      }
      )
    }
    )
  }


  todayAndCardsStudiedContainer.append(todayStudyContainer)

  todayAndCardsStudiedContainer.append(theWordTodayContainer, theWordCalendarContainer, hourlyBreakdownContainer);
  rightAndLeftButtonContainer.append(buttonLeft, year, buttonRight);

  theWordCalendarContainer.append(theWordCalendar, rightAndLeftButtonContainer, yearBoxContainer);

  hourlyBreakdownContainer.append(theWordhourlyBreakdown, radioButtonContainer, diagramHourlyBreakDownContainer);

  redCrossAndStatsContainer.append(theWordStats, anchorThreeDots, redCross);

  innerWindow.append(redCrossAndStatsContainer, todayAndCardsStudiedContainer);

  mainWindow.append(innerWindow);
  anchorElement.appendChild(mainWindow);


  handleOutsideClick(mainWindow);
  redCross.onclick = () => {close(mainWindow, anchorElement)
 
      document.querySelector('.canvasContainer').style.display = 'block'; //diagram on main screen reappears

     dataBase.statsOpen = false; //needed to give the deletecardquestionbox a different top

     if (dataBase.deckCompleted > 0) {  //the inner percentages get shown again when there is a deck that is completed
     document.querySelector('.overDiagram').style.display='block'
     }
     if(dataBase.reset) {
     document.querySelector('.canvasContainer .chartjs-render-monitor').style.display='none'
     }
     createDom(dataBase.DeckNames)
     dataBase.reset = false
  }





  closeMenu();
}
Chart.pluginService.register({
  beforeDraw: function (chart) {
    if (chart.config.options.elements.center) {
      // Get ctx from string
      var ctx = chart.chart.ctx;

      // Get options from the center object in options
      var centerConfig = chart.config.options.elements.center;
      var fontStyle = centerConfig.fontStyle || 'Arial';
      var txt = centerConfig.text;
      var color = centerConfig.color || '#000';
      var maxFontSize = centerConfig.maxFontSize || 75;
      var sidePadding = centerConfig.sidePadding || 20;
      var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
      // Start with a base font of 30px
      ctx.font = "30px " + fontStyle;

      // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = (chart.innerRadius * 2);

      // Pick a new font size so it will not be larger than the height of label.
      var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
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
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      ctx.font = fontSizeToUse + "px " + fontStyle;
      ctx.fillStyle = color;

      if (!wrapText) {
        ctx.fillText(txt, centerX, centerY);
        return;
      }

      var words = txt.split(' ');
      var line = '';
      var lines = [];

      // Break words up into multiple lines if necessary
      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > elementWidth && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
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
  }
});
