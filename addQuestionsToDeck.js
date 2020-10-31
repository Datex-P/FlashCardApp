
export default function addQuestionsToDeck () {

  let anchorElement = document.getElementById('questAnswerTrainOverv');
  let mainWindow = document.createElement("div");
      mainWindow.id = 'addQuestionsToDeck';
/*
  let containerForButtons = document.createElement('div');
      containerForButtons.style.display = 'flex';
      containerForButtons.style.marginTop = '10px';
      containerForButtons.style.marginBottom = '10px';

  let shuffleButton = document.createElement("button");
      shuffleButton.innerHTML = "Shuffle";  
      shuffleButton.id = 'shuffleButton';
*/
  let addToDeck = document.createElement("button");
      addToDeck.innerHTML = "Add to Deck";
      addToDeck.style.backgroundColor = '#545863';
      addToDeck.style.color = '#FFE3E3';  
      addToDeck.style.width = '70%';
      addToDeck.style.marginTop =  '10px';
    





      
  let insideFlashCardsContainer = document.createElement('div');
      insideFlashCardsContainer.style.marginTop = '30px'

  let theWordFlashCardsAndRedCrossContainer = document.createElement('div');
      theWordFlashCardsAndRedCrossContainer.style.display = 'flex';
      theWordFlashCardsAndRedCrossContainer.style.width = '255px';
      theWordFlashCardsAndRedCrossContainer.style.justifyContent = 'space-between'
     
  let theWordFlashCards = document.createElement('div');
      theWordFlashCards.innerHTML = item;    
      theWordFlashCards.style.fontWeight = 'bold';

  let redCross = document.createElement('img');
       redCross.src = 'redCross.svg';
       redCross.style.height = '20px';
       redCross.style.width = '20px';
  


  let theWordQuestion = document.createElement('div');
      theWordQuestion.innerHTML = 'Question';
      theWordQuestion.style.fontWeight = 'bold';
      theWordQuestion.style.marginBottom = '10px';

  let theWordAnswer = document.createElement('div');
      theWordAnswer.innerHTML = 'Answer'
      theWordAnswer.style.fontWeight = 'bold';
      theWordAnswer.style.marginBottom = '10px';


  let questionFieldTextArea = document.createElement('textarea');
      questionFieldTextArea.id = 'questionFieldTextArea';

  let answerFieldTextArea = document.createElement('textarea');


  let innerWindow = document.createElement('div');
    innerWindow.style.marginTop = '20px';
    innerWindow.style.marginLeft = '30px';


  

  insideFlashCardsContainer.append(theWordQuestion);
  insideFlashCardsContainer.append(questionFieldTextArea);
  insideFlashCardsContainer.append(theWordAnswer);
  insideFlashCardsContainer.append(answerFieldTextArea);
  insideFlashCardsContainer.append(addToDeck);
  
  theWordFlashCardsAndRedCrossContainer.append(theWordFlashCards);
  theWordFlashCardsAndRedCrossContainer.append(redCross);
  innerWindow.append(theWordFlashCardsAndRedCrossContainer)
  innerWindow.append(insideFlashCardsContainer);
  
  mainWindow.append(innerWindow);
  anchorElement.append(mainWindow);

  redCross.onclick = function () {

    mainWindow.parentNode.removeChild(mainWindow);
 
  };


  



}