import { dataBase } from "./dataBase.js";

import {
  createElement,
  handleOutsideClick,
  closeMenu,
  close,
  redCross,
  deleteCardQuestionBox, setThreeDotsOpen, threeDots
} from "./exportFunctions.js";







export default function stats() {
  let anchorElement = document.querySelector("#questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let mainWindow = createElement("div", "", {}, "addQuestionsToDeck");

  let innerWindow = createElement("div", "", {
     overflow: "scroll", overflowX: "hidden"});

  let redCrossAndStatsContainer = createElement(
    "div", "", {},"flexSpaceBetweenAlignCenter redCrossAndStatsContainer"
  );

  let theWordStats = createElement("div", "Stats", { fontWeight: "bold", fontSize: '22px' });

  let todayAndCardsStudiedContainer = createElement(
    "div",
    "",
    { marginTop: "30px" },
    "flexColumnAlignCenter"
  );

  let theWordTodayContainer = createElement(
    "div",
    "",
    { marginBottom: "10px", border: "1px black solid" },
    "flexColumnAlignCenter"
  );



  let canvas = createElement('canvas', '', {width: '270px', height: '200px', overflow: 'hidden', borderRadius: '5px'}, 'pieChart')
  
  theWordTodayContainer.append(canvas)

  let todayStudyContainer = createElement('div', "Today's study breakdown", {width: '105px', textAlign: 'center', fontWeight: 'bold', fontSize: '17px'})
   
  let todayDate = new Date();




var config = {
type: 'doughnut',
data: {
  labels: [
    "Red",
    "Green",
    "Yellow"
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
      "#FF6384",
      "#36A2EB",
      "#FFCE56"
    ],
    borderColor: [
   'rgba(184, 156, 110, 0.95)',
   'rgba(184, 156, 110, 0.95)',
   'rgba(184, 156, 110, 0.95)'
    ],
    borderWidth: 1,
    hoverBackgroundColor: [
      "#FF6384",
      "#36A2EB",
      "#FFCE56"
    ]
  }]
},
options: {
  elements: {
    center: {
      text: `Data from ${todayDate.toLocaleString('de-DE', { day: 'numeric',
      month:  'numeric',
      year:   'numeric',})  }`,
      //color: '#FF6384', // Default is #000000
      color: 'black',
      fontStyle: 'Arial', // Default is Arial
      sidePadding: 2, // Default is 20 (as a percentage)
      minFontSize: 14, // Default is 20 (in px), set to false and text will not wrap.
      lineHeight: 19,
       // Default is 25 (in px), used for when text wraps
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
  layout : {
    padding: {
      top: 10
    },
   border: 'none'
  }
}
};

//console.log(config.data.datasets[0].data)

function updateChart() {
  config.data.datasets[0].data = [10,20,30,40,50];
  config.data.datasets[0].backgroundColor = ['green', 'blue', 'yellow', 
'purple', 'red'];
  config.data.datasets[0].borderColor = ['green', 'blue', 'yellow', 
  'purple', 'red']
  config.data.hoverBackgroundColor = ['green', 'blue', 'yellow', 
  'purple', 'red']
  config.data.labels = ['green', 'blue', 'yellow', 
  'purple', 'red']

  //config.update()
}

updateChart()





// function addData(chart, label, data) {
//   chart.data.labels.push(label);
//   chart.data.datasets.forEach((dataset) => {
//       dataset.data.push(data);
//   });
//   chart.update();
// }

// addData()













//let pieChart  = canvas.getContext('2d')

var ctx = canvas.getContext("2d");
var myChart = new Chart(ctx, config);




console.log(todayDate)



  let theWordCalendarContainer = createElement("div", "",{}, "flexColumnAlignCenter"
  );

  let theWordCalendar = createElement("div", "Calendar", {fontSize: '18px'}, 'theWordCalendar');

  let rightAndLeftButtonContainer = createElement("div", "", {
    display: "flex",
  });

  let [buttonLeft, buttonRight] = ["<", ">"].map((el) => {
    return createElement(
      "div",
      el,
      { cursor: "pointer", marginBottom: "4px" },
      "calendarButtons flexCenter"
    );
  });

  buttonLeft.style.marginRight = "5px";
  buttonRight.style.marginLeft = "5px";



  let cardThreeDots = threeDots()

  let anchorThreeDots = cardThreeDots(

    {reset: ()=>{
    
    
  deleteCardQuestionBox(() => {


    for (let deck in dataBase.DeckNames) {

      dataBase.DeckNames[deck].data.forEach((card) => {

        if (card.openHistory) {
          delete card.openHistory
        }
      })
    }
  }

    //breakdown has to be resetted as well
    , () => {

    }, 'Reset current progress', 'reset the calendar and the hourly breakdown', { marginLeft: '40px', fontSize: '18px' })
    
    , { marginLeft: '40px', fontSize: '18px' }, 'Reset progress'
    
  }} , {top: '2px'}
    )
  

anchorThreeDots.style.height = '29px'
anchorThreeDots.style.right = '-68px';
anchorThreeDots.style.top = '0px'



  let yearBoxContainer = createElement("div", "", {}, 'yearBoxContainer'
  );

  let hourlyBreakdownContainer = createElement(
    "div",
    "",
    { marginTop: "20px", width: "330px" },
    "flexColumnAlignCenter"
  );

  let theWordhourlyBreakdown = createElement("div", "Hourly Breakdown", {}, 'theWordhourlyBreakdown');

  let radioButtonContainer = createElement("div", "", {
  
  }, 'radioButtonContainer');

  ["1 month", "3 month", "12 month"].forEach((radio) => {
    let radioBtn = createElement("input", "", { cursor: "pointer" });
    let label = createElement("label", radio, {});
    radioBtn.value = radio;
    radioBtn.setAttribute("type", "radio");
    radioBtn.name = "month";
    radioBtn.onchange = function (event) {
      let { value } = event.target;
      console.log(value);
    };
 
    radioButtonContainer.append(radioBtn, label);
  });

  let diagramHourlyBreakDownContainer = createElement(
    "div", "", {}, "flexColumnSpaceAround diagramHourlyBreakDownContainer"
  );


  let studyGoal = 80
  let timeObj = {
    5: 15,
    9: 20,
    17: 14
  }


  let timeAndProgressContainer = createElement('div', '', { display: 'flex' });
  let time = createElement("div", 'Study Goal', { marginLeft: '10px', border: '1px solid black', width: '82px' });

  let progressBar = createElement('div', '', {}, 'progressBar');

  progressBar.style.marginLeft = '6px'




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
  timeAndProgressContainer.append(time, progressBar, progressNumber)
  progressBar.append(innerprogress);


  let arr = [];
  let previousWidthVar = 0

  for (let i = 5; i <= 25; i += 4) {


    if (i in timeObj) {


      arr.push(i)
      let timeAndProgressContainer = createElement('div', '', { display: 'flex' });



      let widthVar = (timeObj[i] || 0) / studyGoal * 100

      let time = createElement("div", '', {}, 'time');

      let progressBar = createElement('div', '', {}, 'progressBar')
      let innerprogress = createElement('div', '', { marginLeft: `${previousWidthVar}%`, backgroundColor: 'orange', width: `${widthVar}%`, height: '10px'});

      previousWidthVar+=widthVar

      if (i === 21) {
        time.innerHTML = `
        <div>${21} - ${24}</div>
      `;
      } else if (i === 25) {
        time.innerHTML = `
        <div>${24} - ${5}</div>
      `;
      } else if (i <= 9) {
        time.innerHTML = `
      <div>${'0'+i} - ${'0'+(i + 4)}</div>
    `;
        if (i<=9 && i+4 >9) {
          time.innerHTML = `
          <div>${'0'+i} - ${(i + 4)}</div>`
        }
      }
      else {
        time.innerHTML = `
      <div>${i} - ${i + 4}</div>
    `;
      }


      diagramHourlyBreakDownContainer.append(timeAndProgressContainer);
      timeAndProgressContainer.append(time, progressBar)
      progressBar.append(innerprogress);

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


  let cardsStudiedCounter = 0;

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


        //if  (dataBase.DeckNames.calendarReset !== false) {

        //let date = dataBase.DeckNames.calendarReset.value()
        //don t use dates before this date
        //}



        dataBase.DeckNames[deck].data.forEach((card) => {
          card.openHistory &&
            card.openHistory.forEach((openTime) => {
              if (date === openTime.toDateString()) {
                cardsStudiedCounter++;
              }
            });
        });
      }

      for (let deck in dataBase.DeckNames) {
        if (
          dataBase.DeckNames[deck].data.find(
            (item) => new Date(item.openHistory).toDateString() == date
          )
        ) {
          day.style.backgroundColor = "red";
          day.style.cursor = "pointer";
          day.title = 'Click to see the study stats of this date'

          day.onclick = function (event) {
            event.stopPropagation();
            yearBoxContainer
              .querySelectorAll(".day")
              .forEach((day) => (day.innerHTML = ""));
            let dayInner = createElement('div', '', {lineHeight: '22px', width: '120px'})
            // let time = Math.round(
            //   Object.values(dataBase.studyTime).reduce(
            //     (acc, cur) => acc + cur, 0
            //   ) / 60
            // );


            let time = Math.floor(dataBase.studyTime/60)
            console.log(cardsStudiedCounter)
            
       
            dayInner.innerText = `${date} Time: ${time
              .toString()
              .padStart(3, "⠀")} min \n  Review${cardsStudiedCounter !== 1 ? 's' : ''}: ${cardsStudiedCounter} card${cardsStudiedCounter !== 1 ? 's' : ''}`; 
            console.log(cardsStudiedCounter);
            day.append(dayInner);
          };
        }
      }

   

      thisYear.setDate(thisYear.getDate() + 1);

      yearBoxContainer.appendChild(day);
      yearBoxContainer.onclick = function () {
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

  

  let timeToday = new Date();
  let cardsOpenLastThree = 0;
  let cardsOpenLastTwelve = 0;
  let cardsOpenLastOne = 0;

 for (let deck in dataBase.DeckNames) {
 
  dataBase.DeckNames[deck].data.forEach( (card) => {

    card.openHistory && card.openHistory.forEach((openTime) => {

      if(openTime>timeToday.setMonth(timeToday.getMonth() - 1)) {
        cardsOpenLastOne++;
      }       
      else if(openTime>timeToday.setMonth(timeToday.getMonth() - 3)) {

        cardsOpenLastThree++;
      }  
      else if (openTime>timeToday.setMonth(timeToday.getMonth() - 12)) {

        cardsOpenLastTwelve++;
      }
  }
  )
 }
  )

 }

 console.log(cardsOpenLastOne)

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
  redCross.onclick = () => close(mainWindow, anchorElement)

  closeMenu();
}

Chart.pluginService.register({
  beforeDraw: function(chart) {
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













































  //let counterOne = 0
  // for (let deck in dataBase.DeckNames) {
  //   let counterTwo = 0;
  //   dataBase.DeckNames[deck].forEach((card) => {
      
  //     card.openHistory &&
  //       card.openHistory.forEach((openTime) => {
  //         if (date.toDateString() === openTime.toDateString()) {
  //           console.log(deck)
  //           counterTwo++;
  //         }
  //       });
  //     })
  //   }

        
      // child1.innerText = `Deck ${deck}:`;
      // child2.innerText = `${counterTwo} cards studied`;
      
      
    // });
    // if(counterTwo){
    //   counterOne++
     // let child1 = createElement("div", `Deck ${deck}:`, {});
    //  let child1 = createElement("div", `${deck}`, {});

      

    //   let child2 = createElement("div", `${counterTwo} cards studied`, {color: 'white'});

     

    //   if (counterOne === 1) {
   
    
    //   }
    //   else if (counterOne >= 2) {


    //   }

    // }
    
  



  // if (counterOne === 0) {
  //   cardsStudied.style.textAlign = "center";
  //   cardsStudied.innerHTML = "No cards studied today";
  //   cardsStudied.style.removeProperty("border");
  //   cardsStudied.style.removeProperty("overflow");
  // }

  // if (counterOne <= 7) {
  //   cardsStudied.style.removeProperty("border");
  //   cardsStudied.style.removeProperty("overflow");
  // }






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







