let arr = [];
for (let i = 0; i<100; i++){
  arr.push({
    question: `question${i}`,
    answer: `answer${i}`
  })
};


export let dataBase = {
  DeckNames: {
    
    Literature: arr,
    Literature2: [
      {
        question: 'question1',
        answer: 'answer1'
      },
      {
        question: 'question2',
        answer: 'answer2'
      }
      
    ]
    
  },
  queue: []
};