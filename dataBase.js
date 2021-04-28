export let dataBase = {
DeckNames: { /*deckname:[]*/   },
  queue: [],
  showDiagram: true, //when clicked on the menu button or in questionAsnwerTrain it is set to false
  diagramWasTriggeredOnce: false, 
  backgroundColorApp: 'default',
  userStylePreferences: [],
  currentQuestionAndAnswerArr: null, //is needed to compare whether question was changed by clicking on save button
  openedToday: false,
  statsOrSettingsOpened: false, //whenver questionanswertrain stats or settings is opened, the scrollbar in the back dissapears
  displayDeck: false, //when display deck is true the study goal of the deck is reached and thus it is not displayed anymore
  deckCompleted: 0, //counter goes up when study goal for the day is reached and deck is finished, thus no need to display it anymore
  showDeleteFrameQuestion: true,
  showDeleteFrameOverview: true,
  showDeleteFrameStats: true,
  timeValues: { left: 2, middle: 5, right: 10 },
  nameValues: {leftName: 'again', middleName: 'good', rightName: 'easy'},
  studyTime : 0,
  calendarReset: false,
  weeklyTarget: 1,
  daysOfStudy : {day : 4},
  overview: false,
  studied: [new Date()],

};

let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];




for (let i = 3; i < 7; i++) {
  let arr = [];
  for (let i = 1; i < 5; i++) {
    arr.push({
      question: `question${i}`,
      answer: `answer${i}`,
      pause: false
    })
  };

  dataBase.DeckNames[`Literature${i}`] = {data: arr, name: `Literature${i}`,
    cardsToday:0, pause:false, color: colors[i%colors.length], 
    toStudyValue: 0,
    pauseSwitch: false, 
    studyGoal: 0,
    thisDeckCompleted: false, //shows whether the study goal of the particular deck is reached
    skippedPausedCards: 0,
    deckPauseActive: false //deck is not  paused right now
  }
};


