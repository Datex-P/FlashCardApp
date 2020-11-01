import {redCross as redCrossIcon} from './svgs.js';

let num = null;

export default function stats () {
  // let anchorElement = document.getElementById('stats');
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


  let todayAndCardsStudiedContainer = document.createElement('div');
      todayAndCardsStudiedContainer.style.marginTop = '100px';
      todayAndCardsStudiedContainer.style.display = 'flex';
      todayAndCardsStudiedContainer.style.flexDirection = 'column';
      //todayAndCardsStudiedContainer.style.alignItems = 'center';


  let theWordToday = document.createElement('div');
      theWordToday.innerHTML = 'Today';
      theWordToday.style.fontWeight = 'bold'

  let cardsStudied = document.createElement('div');
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


      todayAndCardsStudiedContainer.appendChild(theWordToday);
      todayAndCardsStudiedContainer.appendChild(cardsStudied);
      redCrossAndStatsContainer.appendChild(todayAndCardsStudiedContainer)
      redCrossAndStatsContainer.appendChild(stats);
      redCrossAndStatsContainer.appendChild(redCross);
      innerWindow.appendChild(redCrossAndStatsContainer);

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