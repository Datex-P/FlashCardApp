import { dataBase } from "./dataBase.js";

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
    "div", "", {},"flexSpaceBetweenAlignCenter redCrossAndStatsContainer"
  );

  let theWordStats = createElement("div", "Stats", { fontWeight: "bold" });

  let todayAndCardsStudiedContainer = createElement(
    "div",
    "",
    { marginTop: "30px" },
    "flexColumnAlignCenter"
  );

  let cardsStudied = createElement(
    "div", "", {}, "flexColumnCenter cardsStudied"
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

  let theWordCalendarContainer = createElement("div", "",{}, "flexColumnAlignCenter"
  );

  let theWordCalendar = createElement("div", "Calendar", {}, 'theWordCalendar');

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


  let yearBoxContainer = createElement("div", "", {}, 'yearBoxContainer'
  );

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
            let dayInner = document.createElement("div");
            // let time = Math.round(
            //   Object.values(dataBase.studyTime).reduce(
            //     (acc, cur) => acc + cur, 0
            //   ) / 60
            // );


            //let time = Math.round(dataBase.studyTime/60)

            
           // counter === 1 ? `${review}` =  'Review' :  `${review}` =  'Reviews';
            dayInner.innerText = `${date} Time: ${time
              .toString()
              .padStart(5, "⠀")} min \n  Reviews: ${counter} cards`; /*${review}*/
            console.log(counter);
            day.append(dayInner);
          };
        }
      }

   

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

  

  let timeToday = new Date();
  let cardsOpenLastThree = 0;
  let cardsOpenLastTwelve = 0;
  let cardsOpenLastOne = 0;

 for (let deck in dataBase.DeckNames) {
 
  dataBase.DeckNames[deck].forEach( (card) => {

    card.openHistory && card.openHistory.forEach((openTime) => {

      if(openTime>timeToday.setMonth(timeToday.getMonth() - 1)) {
        cardsOpenLastThree++;
      }       
      else if(openTime>timeToday.setMonth(timeToday.getMonth() - 3)) {

        cardsOpenLastOne++;
      }  
      else if (openTime>timeToday.setMonth(timeToday.getMonth() - 12)) {

        cardsOpenLastTwelve++;
      }
  }
  )
 }
  )

 }


  theWordTodayContainer.append(theWordToday, cardsStudied);


  todayAndCardsStudiedContainer.append(theWordTodayContainer, theWordCalendarContainer, hourlyBreakdownContainer);
  rightAndLeftButtonContainer.append(buttonLeft, year, buttonRight);

  theWordCalendarContainer.append(theWordCalendar, rightAndLeftButtonContainer, yearBoxContainer);

  hourlyBreakdownContainer.append(theWordhourlyBreakdown, radioButtonContainer, diagramHourlyBreakDownContainer);

  redCrossAndStatsContainer.append(theWordStats, redCross);

  innerWindow.append(redCrossAndStatsContainer, todayAndCardsStudiedContainer);

  mainWindow.append(innerWindow);
  anchorElement.appendChild(mainWindow);


  handleOutsideClick(mainWindow);
  redCross.onclick = () => close(mainWindow, anchorElement)

  closeMenu();
}





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
