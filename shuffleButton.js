import { dataBase } from "./dataBase.js";

export default function shuffle(item, index = null) {


  function questionNumber(random) {

    if (dataBase.DeckNames[item].pauseSwitch === false) {
      //console.log(1,dataBase.DeckNames[item].data[random].question)
      return dataBase.DeckNames[item].data[random].question;

    } else if (dataBase.DeckNames[item].skippedPausedCards !==0) { //needed to skip cards when they are kept in pause mode

      let num = dataBase.DeckNames[item].skippedPausedCards  
    //  console.log(2,dataBase.DeckNames[item].data.filter(x=>x.pause === true)[num]?.question)
      return dataBase.DeckNames[item].data.filter(x=>x.pause === true)[num]?.question;

    }  else {
      //console.log(3,dataBase.DeckNames[item].data.filter(x => x.pause === true)[0]?.question)
      return dataBase.DeckNames[item].data.filter(x => x.pause === true)[0]?.question;
    }
  }

  let randomInScope = index || random();

  if (!dataBase.DeckNames[item].data[randomInScope]?.openHistory) {
    dataBase.DeckNames[item].data[randomInScope].openHistory = [];
  }

  let date = new Date()

  let rand = Math.floor(Math.random()*10)

  date.setHours(date.getHours() - rand)
 //  date.setDate(rand)

  dataBase.DeckNames[item].data[randomInScope].openHistory.push(date);  //before it was new Date()
 // dataBase.DeckNames[item].data[randomInScope].openHistory.push(new Date(('January 01, 2020')))
//method to check different dates


  function answerNumber(random) {

    if (dataBase.DeckNames[item].pauseSwitch === false) {

      return dataBase.DeckNames[item].data[random].answer;
  
    } else if (dataBase.DeckNames[item].skippedPausedCards >0) {
      
      let num = dataBase.DeckNames[item].skippedPausedCards
      return dataBase.DeckNames[item].data.filter(x=>x.pause === true)[num]?.answer;

    } else {

      return dataBase.DeckNames[item].data.filter(x => x.pause === true)[0]?.answer;
    }
  }

  function random() {

    return Math.floor(
      Math.random() * dataBase.DeckNames[item].data.length
    );
  }

  // if  (dataBase.DeckNames[item][random].sleepy === false) {
  if (dataBase.queue[0] && dataBase.queue[0].timeLeft == 0) {
    return Object.values(dataBase.queue.shift())
  } else {
     dataBase.currentQuestionAndAnswerArr = [questionNumber(randomInScope), answerNumber(randomInScope), randomInScope];
    return [questionNumber(randomInScope), answerNumber(randomInScope), randomInScope];
  }

  // }
  // else {
  //   //invoke shuffle again
  // }
};