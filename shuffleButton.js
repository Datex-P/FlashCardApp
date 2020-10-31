import {  dataBase} from "./dataBase.js";

// let key = null;
export default function shuffle(item) {

  dataBase.DeckNames[item].cardsStudied += 1

  function questionNumber(random) {
    let questionFieldTextArea = document.getElementById("questionFieldTextArea");
    questionFieldTextArea.innerText = `${
        dataBase.DeckNames[item][random].question
        }`;
    // key = random;
  }
  let randomInScope = random();

  function answerNumber(random) {
    let answerFieldTextArea = document.getElementById("answerFieldTextArea");

    answerFieldTextArea.innerText = `${
        dataBase.DeckNames[item][random].answer
        }`;
    // key = random;
  }

  function random() {
    return Math.floor(
      Math.random() * dataBase.DeckNames[item].length
    );
  }
  questionNumber(randomInScope);
  answerNumber(randomInScope);
};