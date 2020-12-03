export let dataBase = {
  DeckNames: {},
  queue: [],
  userStylePreferences: [],
  showDeleteFrame: true,
  toStudyGoal: 0,
  toReviewGoal: 0,
  timeValues: { left: 2, middle: 5, right: 10 }

};





for (let i = 1; i < 7; i++) {
  let arr = [];
  for (let i = 1; i < 10; i++) {
    arr.push({
      question: `question${i}`,
      answer: `answer${i}`
    })
  };
  dataBase.DeckNames[`Literature${i}`] = arr
};


