import {  dataBase} from "./dataBase.js";

export default function shuffle(item) {
  //cardsStudied++
  
  //dataBase.DeckNames[item].cardsStudied = 1;
  console.log(dataBase)

  function questionNumber(random) {
    return dataBase.DeckNames[item][random].question
  }
  let randomInScope = random();

  function answerNumber(random) {
    return  dataBase.DeckNames[item][random].answer
  }

  function random() {
    return Math.floor(
      Math.random() * dataBase.DeckNames[item].length
    );
  }

  return [questionNumber(randomInScope),answerNumber(randomInScope)];
  
};