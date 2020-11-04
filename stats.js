import { dataBase } from './dataBase.js';
import {redCross as redCrossIcon} from './svgs.js';

export default function stats () {
  let anchorElement = document.querySelector("#questAnswerTrainOverv");
      anchorElement.style.display = 'flex';

  let mainWindow = document.createElement('div'); 
      mainWindow.className = 'addQuestionsToDeck'
   

  let innerWindow = document.createElement('div');
      innerWindow.style.marginTop = '20px';
      innerWindow.style.marginLeft = '30px';
      
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

  let theWordStats = document.createElement('div');
      theWordStats.innerHTML = 'Stats';
      theWordStats.style.fontWeight = 'bold';

  

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
     
/*
      for (let deck in dataBase.DeckNames){
        dataBase.DeckNames[deck].forEach(card=>{
        
        cardsStudied.innerHTML += `<div>${card.counter} from ${deck}</div>`;
        
        })
      }

*/

    /*
  seconds studied in total
    const counterSecStudied = Object.values(counter);

    let secStudied = document.getElementById("secondsStudied");
    secStudied.innerHTML = counterSecStudied.reduce((acc, cur) => acc + cur);
  */

      let secsStudied = document.createElement('div');


      for (let deck in dataBase.counter) {
          // secsStudied.innerHTML += `<div>${deck} ${dataBase.counter[deck]}</div>`
          console.log(`<div>${deck} ${dataBase.counter[deck]}</div>`)
        
      }

      //console.log(dataBase.counter.Literature)

      //console.log(dataBase)
     // console.log(dataBase.DeckNames.Literature.cardsStudied)
  

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

     // todayAndCardsStudiedContainer.appendChild(container);
// todayAndCardsStudiedContainer.appendChild(numberOfSeconds);
      todayAndCardsStudiedContainer.appendChild(theWordToday);
      todayAndCardsStudiedContainer.appendChild(cardsStudied);
      todayAndCardsStudiedContainer.appendChild(theWordCalendar)
      redCrossAndStatsContainer.appendChild(theWordStats);
      redCrossAndStatsContainer.appendChild(redCross);
      
      innerWindow.appendChild(redCrossAndStatsContainer);
      innerWindow.appendChild(todayAndCardsStudiedContainer)

      mainWindow.append(innerWindow)
      anchorElement.appendChild(mainWindow)
    

    setTimeout(function() {
     window.onclick = function handleOutsideClick(e) {
        if (mainWindow.contains(e.target)) {
          //alert("Clicked in Box");
        } else {
          //alert("Clicked outside Box");
          redCross.classList.add('blinkingIcon');
          setTimeout(()=>{
          redCross.classList.remove('blinkingIcon')}, 3000);
        }
      }
    }, 10);



      redCross.onclick = function () {
        mainWindow.parentNode.removeChild(mainWindow);
        anchorElement.style.display = 'none';
      };
  
}