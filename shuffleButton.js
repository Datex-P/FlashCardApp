import {dataBase} from "./dataBase.js";

export default function shuffle(item,index=null) {
 



  function questionNumber(random) {
    return dataBase.DeckNames[item][random].question;
  }
  let randomInScope = index || random();
  if(!dataBase.DeckNames[item][randomInScope]?.openHistory){
    dataBase.DeckNames[item][randomInScope].openHistory = [];
  }
  dataBase.DeckNames[item][randomInScope].openHistory.push(new Date());
  console.log(dataBase)


  function answerNumber(random) {
    return  dataBase.DeckNames[item][random].answer;
  }

  function random() {
    return Math.floor(
      Math.random() * dataBase.DeckNames[item].length
    );
  }

  // if  (dataBase.DeckNames[item][random].sleepy === false) {
  if(dataBase.queue[0] && dataBase.queue[0].timeLeft == 0){
    return Object.values(dataBase.queue.shift())
  }else{
    return [questionNumber(randomInScope),answerNumber(randomInScope),randomInScope];
  }
  
  // }
  // else {
  //   //invoke shuffle again
  // }
};