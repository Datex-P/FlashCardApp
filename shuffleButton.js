import {dataBase} from "./dataBase.js";

export default function shuffle(item,index=null) {
 

  function questionNumber(random) {

    if  (dataBase.DeckNames[item].pauseSwitch === false) {

     // console.log(dataBase.DeckNames[item].data.filter(x=>x.pause === true)[random].question, 'paused true')
      return dataBase.DeckNames[item].data[random].question;
    } else {
//      console.log(dataBase.DeckNames[item].data.filter(x=>x.pause === true)[0].question, 'paused true')

      return dataBase.DeckNames[item].data.filter(x=>x.pause === true)[0]?.question;

    }

  }
  let randomInScope = index || random();

  if(!dataBase.DeckNames[item].data[randomInScope]?.openHistory){
    dataBase.DeckNames[item].data[randomInScope].openHistory = [];
    
  }
  dataBase.DeckNames[item].data[randomInScope].openHistory.push(new Date());
  console.log(dataBase)


  function answerNumber(random) {
   

    if  (dataBase.DeckNames[item].pauseSwitch === false) {

       return dataBase.DeckNames[item].data[random].answer;
     } else {
    //   console.log(dataBase.DeckNames[item].data.filter(x=>x.pause === true)[0].answer, 'paused true')
 
       return dataBase.DeckNames[item].data.filter(x=>x.pause === true)[0]?.answer;
  }
}

  function random() {
    
    return Math.floor(
      Math.random() * dataBase.DeckNames[item].data.length
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