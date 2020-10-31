


export default function questAnswerTrainOverv () {

  let anchorElement = document.getElementById('questAnswerTrainOverv');
  let mainWindow = document.createElement("div");
      mainWindow.id = 'addQuestionsToDeck';

  let containerForButtons = document.createElement('div');
      containerForButtons.style.display = 'flex';
      containerForButtons.style.marginTop = '10px';
      containerForButtons.style.marginBottom = '10px';

  let shuffleButton = document.createElement("button");
      shuffleButton.innerHTML = "Shuffle";  
      shuffleButton.id = 'shuffleButton';

  let showOrHideButton = document.createElement("button");
      showOrHideButton.innerHTML = "ShowOrHide";
      showOrHideButton.id = "showOrHideButton";

  let insideFlashCardsContainer = document.createElement('div');
      insideFlashCardsContainer.style.marginTop = '30px'

  let theWordFlashCardsAndRedCrossContainer = document.createElement('div');
      theWordFlashCardsAndRedCrossContainer.style.display = 'flex';
      theWordFlashCardsAndRedCrossContainer.style.width = '255px';
      theWordFlashCardsAndRedCrossContainer.style.justifyContent = 'space-between'
     
  let theWordFlashCards = document.createElement('div');
      theWordFlashCards.innerHTML = 'Flashcards';    
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



/* wondering why it only fires once and not multiple times
  shuffleButton.onclick =  hello()

  function hello () {
    console.log('hi')
  }

*/
  let cardsStudied = 0;
  shuffleButton.onclick =  function() {

  
      cardsStudied++;
      dataBase.DeckNames[item].cardsStudied = cardsStudied;

      function questionNumber(random) {
          let questionFieldTextArea = document.getElementById("questionFieldTextArea");
          questionFieldTextArea.innerText = `${
          dataBase.DeckNames[item][random].question
          }`;
            key = random;
          }
        let randomInScope = random();

      function answerNumber(random) {
          let answerFieldTextArea = document.getElementById("answerFieldTextArea");

          answerFieldTextArea.innerText = `${
          dataBase.DeckNames[item][random].answer
          }`;
          key = random;
          }

      function random() {
              return Math.floor(
                    Math.random() * dataBase.DeckNames[item].length
              );
      }
      questionNumber(randomInScope);
      answerNumber(randomInScope);

};


  containerForButtons.append(showOrHideButton)
  containerForButtons.append(shuffleButton)
  

  insideFlashCardsContainer.append(theWordQuestion);
  insideFlashCardsContainer.append(questionFieldTextArea);
  insideFlashCardsContainer.append(containerForButtons);
  insideFlashCardsContainer.append(theWordAnswer);
  insideFlashCardsContainer.append(answerFieldTextArea);
  
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



/*

  questAnswerTrainOverv.style.display = "flex";
  createEditDeleteDeckPage.style.display = "none";
  document.getElementById(
    "nameOfDeckInTrainOverv"
  ).innerHTML = this.innerHTML;






  let childShuffleButton = document.createElement("button");
  childShuffleButton.innerHTML = "Shuffle";
  childShuffleButton.id = "shuffleButton";
  document
    .getElementById("shuffleContainer")
    .appendChild(childShuffleButton);

  let childShowOrHideButton = document.createElement("button");
  childShowOrHideButton.innerHTML = "ShowOrHide";
  childShowOrHideButton.id = "showOrHideButton";
  document
    .getElementById("showOrHideContainer")
    .appendChild(childShowOrHideButton);

  let cardsStudied = 0;

  childShowOrHideButton.onclick = function () {
    let answerBox = document.getElementById("answers");
    this.style.cursor = "pointer";
    //changes pointer when moved over shorOrHide Button
    // answerField.value = dataBase.DeckNames[newDeckText.innerText][key].answer;

    if (answerBox.style.display === "none") {
      answerBox.style.display = "flex";
      answerBox.style.justifyContent = "center";
      answerBox.style.flexDirection = "column";
    } else {
      answerBox.style.display = "none";
    }
  };

  childShuffleButton.onclick = function () {
    cardsStudied++;
    dataBase.DeckNames[newDeckText.innerText].cardsStudied = cardsStudied;

    function questionNumber(random) {
      let questionField = document.getElementById("questionField");
      questionField.innerText = `${
        dataBase.DeckNames[item][random].question
      }`;
      key = random;
    }

    let randomInScope = random();

    function answerNumber(random) {
      let answerField = document.getElementById("answerField");

      answerField.innerText = `${
        dataBase.DeckNames[item][random].answer
      }`;
      key = random;
    }

    function random() {
      return Math.floor(
        Math.random() * dataBase.DeckNames[item].length
      );
    }
    questionNumber(randomInScope);
    answerNumber(randomInScope);
  };

  redCross.onclick = function () {
    childShuffleButton.parentNode.removeChild(childShuffleButton);
    childShowOrHideButton.parentNode.removeChild(childShowOrHideButton);
    this.parentNode.removeChild(this);
  };

  // event
  timer = setInterval(() => {
    if (
      !counter[document.getElementById("nameOfDeckInTrainOverv").innerHTML]
    ) {
      counter[
        document.getElementById("nameOfDeckInTrainOverv").innerHTML
      ] = 0;
    }
*/
    /*new stuff down there*/
/*    
    let secondsDeckStudied = (counter[
      document.getElementById("nameOfDeckInTrainOverv").innerHTML
    ] += 1);
    dataBase.DeckNames[
      document.getElementById("nameOfDeckInTrainOverv").innerHTML
    ].seconds = secondsDeckStudied;

    method below logs the seconds that passed while studiying a specific deck to the counter

    console.log(counter);
  }, 1000);
  */