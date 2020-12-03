export let dataBase = {
  DeckNames: {},
  queue: [],
  userStylePreferences:[],
  showDeleteFrame: true,
  leftTimeValue : null,
  middleTimeValue: null,
  rightTimeValue : null,
  toStudyGoal: 0,
  toReviewGoal: 0

};





for (let i = 0; i<7; i++){
  let arr = [];
  for (let i = 0; i<100; i++){
    arr.push({
      question: `question${i}`,
      answer: `answer${i}`
    })
  };
  dataBase.DeckNames[`Literature${i}`] = arr
};


