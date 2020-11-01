import {redCross} from './svgs.js';

export default  function stats () {
  let anchorElement = document.getElementById('stats');
  let mainWindow = document.createElement("div");
      mainWindow.id = 'addQuestionsToDeck';

  let innerWindow = document.createElement('div');
      innerWindow.style.marginTop = '20px';
      innerWindow.style.marginLeft = '20px'


  let redCrossAndStatsContainer = document.createElement('div');
      redCrossAndStatsContainer.style.display = 'flex';
      redCrossAndStatsContainer.style.marginLeft = '20px';
      redCrossAndStatsContainer.style.width = '300px';

  let redCross = document.createElement('img');
      redCross.innerHTML = redCross;
      redCross.style.height = '20px';
      redCross.style.width = '20px';

  let stats = document.createElement('stats');
      stats.innerHTML = 'Stats';

  let statsContainer = document.createElement('div');

  let  wordToday = document.createElement('div');
       wordToday.innerHTML = 'Today';
       wordToday.fontWeight = 'bold';
  
  let  cardCounts = document.createElement('div');
       cardCounts.innerHTML = 'Card Counts';
       cardCounts.fontWeight = 'bold';  


      redCrossAndStatsContainer.append(stats);
      redCrossAndStatsContainer.append(redCross);
      innerWindow.append(redCrossAndStatsContainer);

      mainWindow.append(innerWindow)
      anchorElement.append(mainWindow);

      document.getElementById('decks').onclick = function () {
        mainWindow.parentNode.removeChild(mainWindow)
      }
}