import {
  dataBase
} from "./dataBase.js";
import {
  redCross as redCrossIcon
} from "./svgs.js";


function createElement(tag='div',inner='', style={}, className=null, id=null) {

  let element = document.createElement(tag);

  element.innerHTML = inner;
  if (id) {
    element.id = id;
  }
  if (className) {
    element.className = className;
  }
  for (let prop in style) {
    element.style[prop] = style[prop]
  }
  


  return element
}

export default function stats() {

  let anchorElement = document.querySelector("#questAnswerTrainOverv");
  anchorElement.style.display = "flex";

  let mainWindow = document.createElement("div");
  mainWindow.className = "addQuestionsToDeck";

  let innerWindow = createElement('div', '',
    {
      margin: '20px',
      width: '100%',
      position: 'absolute',
      overflow: 'scroll',
      overflowX: 'hidden',
      // border: '1px black solid'   
    },
    'flexColumnAlignCenter'
  );
  
  mainWindow.append(innerWindow);
  anchorElement.append(mainWindow);

  let redCrossAndStatsContainer = createElement('div', '',
    {
      width: '290px',
      border: '1px black solid'
    },
    'flexSpaceBetween'
  );
  let redCross = createElement('div', redCrossIcon, {}, 'redCross');

    redCross.onclick = function () {
        mainWindow.parentNode.removeChild(mainWindow);
        anchorElement.style.display = "none";
      };

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
        

  let theWordStats = createElement('div', 'Stats', {fontWeight: 'bold'});

  innerWindow.append(redCrossAndStatsContainer);
  redCrossAndStatsContainer.append(theWordStats);
  redCrossAndStatsContainer.append(redCross);

  let theWordToday = createElement('div', 'Today', {fontWeight: 'bold', margin: '10px'});

  innerWindow.append(theWordToday);

  let cardsStudied = createElement('div', '6tg76iuzgt67tgzig7ig7i8g', {
  border:'1px black solid',
   width: '240px',
   maxHeight: '100px',
   height: 'fit-content',
   overflow: 'scroll',
   overflowX: 'hidden',
   flexDirection: 'column',
   marginBottom: '5px'}, 
   'flexCenter');

   innerWindow.append(cardsStudied);


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

















   let theWordCalendar = createElement('div', 'Calendar', {
     marginTop: '10px',
     marginBottom: '5px',
     fontWeight: 'bold',
   });
   innerWindow.append(theWordCalendar);

   let buttonLeft = createElement('button', '<', {}, 'calendarButtonStyling');

   let buttonRight = createElement('button', '>', {marginLeft: '5px'}, 'calendarButtonStyling');


  let yearOfStudy = new Date();

  let year = createElement('div', yearOfStudy.getFullYear(), {
  });


 

  let yearAndButtonContainer = createElement('div', '', {
    display: 'flex',
    justifyContent : 'center',
    width: '100%'
  });
    innerWindow.append(yearAndButtonContainer);
    yearAndButtonContainer.append(buttonLeft);
    yearAndButtonContainer.append(year);
    yearAndButtonContainer.append(buttonRight);


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
  

    let yearBoxContainer = createElement('div', '', {
      display: 'flex',
      flexWrap: 'wrap',
      width: '270px',
      height: '210px',
      // border: '1px black solid'
    })

    innerWindow.append(yearBoxContainer)

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
  
        thisYear.setDate(thisYear.getDate() + 1)
  
        yearBoxContainer.appendChild(day);
        yearBoxContainer.onclick = function (event) {
          alert('you do not have training in this day')
        }
      }
    }





//   let rightAndLeftButtonContainer = document.createElement("div");
//   rightAndLeftButtonContainer.style.display = "flex";




//   let container = document.createElement("div");
//   container.style.templateRows = "30px";
//   container.style.templateColumns = "20px";



//   let hourlyBreakdownContainer = document.createElement('div');
//   hourlyBreakdownContainer.className = 'flexColumnAlignCenter'

//   let theWordhourlyBreakdown = document.createElement('div');
//   theWordhourlyBreakdown.innerText = 'Hourly Breakdown'
//   theWordhourlyBreakdown.style.marginTop = '10px';
//   theWordhourlyBreakdown.style.fontWeight = 'bold';

//   let radioButtonContainer = document.createElement('div');
//   radioButtonContainer.style.display = 'flex';
//   radioButtonContainer.style.border = '1px black solid';
//   radioButtonContainer.style.marginTop = '10px';


//   ['1 month', '3 month', '12 month'].forEach(radio => {
//     let radioBtn = document.createElement('input')
//     let label = document.createElement('label');
//     label.innerText = radio;
//     radioBtn.value = radio;
//     radioBtn.style.cursor = 'pointer';
//     radioBtn.setAttribute('type', 'radio');
//     radioBtn.className = 'oneMonthThreeMonthButton'
//     radioBtn.name = 'month'
//     radioBtn.onchange = function (event) {
//       let { value } = event.target
//       console.log(value);
//     }
//     // radioBtn.onmouseover = function (event){
//     //   let {name,checked, value} = event.target
//     //   console.log(name,checked, value)
//     // }
//     radioButtonContainer.appendChild(radioBtn);
//     radioButtonContainer.appendChild(label)
//   });



//   let usageChartCaption = document.createElement('div');

//   usageChartCaption.style.height = '190px';
//   usageChartCaption.style.border = '1px black solid';
//   usageChartCaption.style.display = 'flex';
//   usageChartCaption.style.overflowY = 'scroll'


//   for (let i = 0; i < 24; i++) {
//     let time = document.createElement('div');
//     time.innerText = `${i}`;
//     time.classList.add('hourAmount')
//     usageChartCaption.append(time)

//     let chartBar = document.createElement('div');
//     chartBar.classList.add('hourLevel')
//     let j = i % 2 ? 3 : 4
//     for (let i = 1; i <= j; i++) {
//       let level = document.createElement('div');
//       level.classList.add('level')
//       chartBar.appendChild(level)
//     }
//     time.append(chartBar)
//   }

//   let clickToView = document.createElement('button');
//   clickToView.style.height = '40px';
//   clickToView.style.width = '20px';
//   clickToView.innerHTML = 'Click to View';

//   clickToView.onclick = function () {
//     let newWindow = document.createElement('div');
//     newWindow.className = 'transformWindow';
//     //innerWindow.style.transform = 'rotate(90deg)';
//     // newWindow.append(usageChartContainer);
//     newWindow.append(usageChartCaption);
//     hourlyBreakdownContainer.append(newWindow)

//     document.getElementById('mainMenu').style.transform = '90deg';
//   }


//   let yearOfStudy = new Date();
//   let year = document.createElement("div");
//   year.innerText = yearOfStudy.getFullYear();

//   let dec = 0;

//   function change(dec) {
//     let yearN = yearOfStudy.getFullYear() + dec;
//     year.innerText = yearN
//     renderDays(yearN)
//   };


//   buttonLeft.onclick = function () {
//     dec -= 1
//     change(dec);

//   };

//   buttonRight.onclick = function () {
//     dec += 1
//     change(dec);

//   };

//   let chart1 = document.createElement('div');
//   chart1.style.backgroundColor = 'blue';

//   let chart2 = document.createElement('div');
//   chart2.style.backgroundColor = 'green';


//   let counter = 0;

//   renderDays(2020);

//   function renderDays(year) {
//     yearBoxContainer.innerHTML = '';
//     let thisYear = new Date(`January 1, ${+year}`);

//     while (thisYear.getMonth() != 0 || thisYear.getDate() != 1 || thisYear.getFullYear() == +year) {
//       let day = document.createElement('div');
//       day.classList.add('day');
//       let date = thisYear.toDateString();

//       for (let deck in dataBase.DeckNames) {
//         dataBase.DeckNames[deck].forEach(card=>{
//           card.openHistory && card.openHistory.forEach(openTime=>{
//             if (date === openTime.toDateString()) {
//               counter++;
//             }
//           })
//         })        
//       }

//       for (let deck in dataBase.DeckNames) {
//         if (dataBase.DeckNames[deck].find(item => new Date(item.lastOpen).toDateString() == date)) {
//           day.style.backgroundColor = 'red';
//           day.style.cursor = 'pointer';

//           day.onclick = function (event) {
//             event.stopPropagation()
//             yearBoxContainer.querySelectorAll('.day').forEach(day => day.innerHTML = '');
//             let dayInner = document.createElement('div');
//             let time = Math.round(Object.values(dataBase.studyTime).reduce((acc, cur) => acc + cur) / 60)
//             dayInner.innerText = `${date} Time: ${time.toString().padStart(3,'⠀')} min \n Review: ${counter} cards`;
//             console.log(counter);
//             day.append(dayInner)
//           }
//         }
//       }


// /*
//       let dayToday = new Date();
//       let threeMonthsAgo = new Date();
//       threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
// */
//       // for (let deck in dataBase.DeckNames[deck].openHistory) {
//       //   if (deck.getMonth() + 3 >= dayToday.getMonth() && deck.getDate() >= dayToday.getMonth()) {


//       //   }
//       // }



//       thisYear.setDate(thisYear.getDate() + 1)

//       yearBoxContainer.appendChild(day);
//       yearBoxContainer.onclick = function (event) {
//         alert('you do not have training in this day')
//       }
//     }
//   }

//   function removePopUpwindow() {
//     yearBoxContainer.querySelectorAll('div').forEach(div=>div.innerHTML = '')
//   }
//   mainWindow.onclick = removePopUpwindow
  




//   /*when deck is deleted it should also be deleted out of stats*/

//   let counterTwo = 0;

//   let date = new Date();

// /*
//   for (let deck in dataBase.DeckNames) {
//     if (dataBase.DeckNames[deck].find(item => new Date(item.lastOpen).toDateString() == date)) {
// */
// let resultContainer = document.createElement('div');
// resultContainer.style.border = '1px black solid'
// resultContainer.className = 'flexSpaceBetween'
// cardsStudied.append(resultContainer);
//   for (let deck in dataBase.DeckNames) {
//     dataBase.DeckNames[deck].forEach(card=>{
//       let child1 = document.createElement('div');
//       let child2 = document.createElement('div');
//       card.openHistory && card.openHistory.forEach(openTime=>{
//         if (date.toDateString() === openTime.toDateString()) {
//           counterTwo++;
//         }
//       })
//       child1.innerText = `Deck ${deck}:`;
//       child2.innerText = `${counterTwo} cards studied`;
//       cardsStudied.append(resultContainer);
//       resultContainer.append(child1);
//       resultContainer.append(child2);
//     })        
//   }

//   console.log(counterTwo + ' counterTwo')

//   if (counterTwo === 0) {
//     cardsStudied.style.textAlign = 'center';
//     cardsStudied.innerHTML = "No cards studied today";
//     cardsStudied.style.removeProperty('border');
//     cardsStudied.style.removeProperty('overflow');
//   }

//   if (counterTwo < 7) {
//     cardsStudied.style.removeProperty('border');
//     cardsStudied.style.removeProperty('overflow');
//   }
// /*
//   for (let deck in dataBase.DeckNames) {

//     card.openHistory && card.openHistory.forEach(openTime=> {
//       if (date.toDateString() === openTime.toDateString()) {


//     let container = document.createElement('div');
//     container.style.border = '1px black solid'
//     container.className = 'flexSpaceBetween'
//     let child1 = document.createElement('div');
//     let child2 = document.createElement('div');

//     child1.innerText = `Deck ${deck}:`;
//     child2.innerText = `${counterTwo} cards studied`;
//     cardsStudied.append(container);
//     container.append(child1);
//     container.append(child2);
//   }
//     })
//   };
// */




};





  /*
        let dayToday = new Date();
        let threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  */
        // for (let deck in dataBase.DeckNames[deck].openHistory) {
        //   if (deck.getMonth() + 3 >= dayToday.getMonth() && deck.getDate() >= dayToday.getMonth()) {
  
  
        //   }
        // }