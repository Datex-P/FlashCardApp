export let dataBase = {
  DeckNames: {},
  queue: [],
  userStylePreferences: [],
  showDeleteFrame: true,
  toStudyGoal: 20,
  toReviewGoal: 0,
  timeValues: { left: 2, middle: 5, right: 10 },
  nameValues: {leftName: 'again', middleName: 'good', rightName: 'easy'},
  studyTime : 0,
  //cardsToday : 0

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


