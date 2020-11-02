import { dataBase } from './dataBase.js';
import {redCross as redCrossIcon} from './svgs.js';
//let eachWeekendOfMonth = require('date-fns/eachWeekendOfMonth');


let num = null;

export default function stats (obj) {
  let mainWindow = document.createElement("div");
      mainWindow.id = 'addQuestionsToDeck';

  let innerWindow = document.createElement('div');
      innerWindow.style.marginTop = '20px';
      innerWindow.style.marginLeft = '20px'


  let redCrossAndStatsContainer = document.createElement('div');
      redCrossAndStatsContainer.style.display = 'flex';
      redCrossAndStatsContainer.style.justifyContent = 'space-between';
      redCrossAndStatsContainer.style.height = '20px';
      redCrossAndStatsContainer.style.width = '255px';
      redCrossAndStatsContainer.style.border = '1px black solid';

  let redCross = document.createElement('div');
      redCross.innerHTML = redCrossIcon;
      redCross.style.height = '20px';
      redCross.style.width = '20px';

  let stats = document.createElement('div');
      stats.innerHTML = 'Stats';

      /*
  let res = (eachWeekendOfMonth(new Date(2022, 1, 1)))
  console.log(res)
*/

  let container = document.createElement('div');
      container.style.display = 'grid';
      //container.style.templateRows =  'repeat(7, 10px)';
      container.style.templateRows = '30px';
      container.style.templateColumns = '20px';
      //container.style.templateRows.border = '1px black solid'
/*
      for (let i =0; i<200; i++) {

      }
*/




  let todayAndCardsStudiedContainer = document.createElement('div');
      todayAndCardsStudiedContainer.style.marginTop = '100px';
      todayAndCardsStudiedContainer.style.display = 'flex';
      todayAndCardsStudiedContainer.style.flexDirection = 'column';
      todayAndCardsStudiedContainer.style.alignItems = 'center';


  let theWordToday = document.createElement('div');
      theWordToday.innerHTML = 'Today';
      theWordToday.style.fontWeight = 'bold';

  let theWordCalendar = document.createElement('div');
      theWordCalendar.style.marginTop = '10px';
      theWordCalendar.innerHTML = 'Calendar';
      theWordCalendar.style.fontWeight = 'bold'

  let cardsStudied = document.createElement('div');
      cardsStudied.style.marginTop = '10px';
      cardsStudied.innerHTML =  /*`${num}*/ '0 cards have been studied today.'

      if (num === 0) {
        cardsStudied.innerHTML = 'No cards have been studied today.'
      }

  let  wordToday = document.createElement('div');
       wordToday.innerHTML = 'Today';
       wordToday.fontWeight = 'bold';
  
  let  cardCounts = document.createElement('div');
       cardCounts.innerHTML = 'Card Counts';
       cardCounts.fontWeight = 'bold';  





/*
  let arr = Object.keys(obj);
  let numberOfSeconds.innerHTML = arr.forEach((item) => {
      (item + item.seconds)
  });
*/

      todayAndCardsStudiedContainer.appendChild(container);
// todayAndCardsStudiedContainer.appendChild(numberOfSeconds);
      todayAndCardsStudiedContainer.appendChild(theWordToday);
      todayAndCardsStudiedContainer.appendChild(cardsStudied);
      todayAndCardsStudiedContainer.appendChild(theWordCalendar)
      redCrossAndStatsContainer.appendChild(stats);
      redCrossAndStatsContainer.appendChild(redCross);
      
      innerWindow.appendChild(redCrossAndStatsContainer);
      innerWindow.appendChild(todayAndCardsStudiedContainer)

      mainWindow.appendChild(innerWindow)
      document.body.appendChild(mainWindow);


      function handleOutsideClick(e) {
        if (mainWindow.contains(e.target)) {
          alert("Clicked in Box");
        } else {
          alert("Clicked outside Box");
        }
      }



      redCross.onclick = function () {
        console.log('ok')
        mainWindow.parentNode.removeChild(mainWindow);     
      };
  
}