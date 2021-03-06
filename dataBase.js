export let dataBase = generateDefaultDB()

function generateDefaultDB(){
  let dataBase = {


    DeckNames: { /*deckname:[]*/ },
    queue: [],
    settingsClosed: false,
    showDiagram: true, //when clicked on the menu button or in questionAsnwerTrain it is set to false
    diagramWasTriggeredOnce: false,
    dateToday: new Date().setHours(0, 0, 0, 0),
    backgroundColorApp: 'default', //needed so that colors is switched accordingly in settings
    hourlyBreakdown: '1 month', //needed for stats.js so that it is certain which breakdown field is checked by default
    userStylePreferences: [],
    statsOpen: false,
    reset: false,
    cardsStudiedSinceInstallation: false,
    allLeftOverDecksPaused: false,
    timeValuesForButton: { left: 'min', middle: 'hrs', right: 'days' },
    installationDate: new Date(),
    currentQuestionAndAnswerArr: null, //is needed to compare whether question was changed by clicking on save button
    openedToday: false,
    statsOrSettingsOpened: false, //whenver questionanswertrain stats or settings is opened, the scrollbar in the back dissapears
    displayDeck: false, //when display deck is true the study goal of the deck is reached and thus it is not displayed anymore
    deckCompleted: 0, //counter goes up when study goal for the day is reached and deck is finished, thus no need to display it anymore
    showDeleteFrameQuestion: true,
    leftOverDeckPausedComplete: false,
    statsUpdated: false,
    showDeleteFrameOverview: true,
    questionAnswerOverview: false,
    showDeleteFrameStats: true,
    goalReached: {}, //percent and day
    timeValues: { left: 2, middle: 1, right: 2 },
    nameValues: { leftName: 'again', middleName: 'good', rightName: 'easy' },
    studyTime: 0,
    calendarReset: false,
    timeObj: {
      6: 0,
      12: 0,
      18: 0,
      24: 0
      // 12: deckItem.data.filter((item) => item.openHistory && item.openHistory.filter(item => new Date(item).getHours() < 18 && new Date(item).getHours() > 12).length).length,
      // 18: deckItem.data.filter((item) => item.openHistory && item.openHistory.filter(item => new Date(item).getHours() < 24 && new Date(item).getHours() > 18).length).length,
      // 24: deckItem.data.filter((item) => item.openHistory && item.openHistory.filter(item => new Date(item).getHours() < 6 ).length).length
    },
    weeklyTarget: 1,
    daysOfStudy: { day: 4 },
    overview: false,
    studied: [new Date()],
  
  };
  
  
  let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];
  
  var d = new Date();
  
  d.setHours(d.getHours() - 2)
  
  
  
  for (let i = 3; i < 6; i++) {
    let arr = [];
    for (let i = 1; i < 5; i++) {
      arr.push({
        question: `question${i}`,
        answer: `answer${i}`,
        // openHistory: [ d],
        pause: false
      })
    };
  
    dataBase.DeckNames[`Lit${i}`] = {
      data: arr, name: `Lit${i}`,
      cardsToday: 0,
      pause: false,
      color: colors[i % colors.length],
      toStudyValue: 2,
      pauseSwitch: false,
      studyGoal: 0,
      thisDeckCompleted: false, //shows whether the study goal of the particular deck is reached
      skippedPausedCards: 0,
      deckPauseActive: false //deck is not  paused right now
    }
  };
  fetch('http://localhost:8000/database', {
      method: 'POST',
      headers: {
        'Application-Type': 'application/json'
      },
      body: JSON.stringify(dataBase)
    })
      .then(j => j.json())
      .then(d => console.log(d))

  return dataBase
  
  
  
}

let old = { ...dataBase }
setInterval(() => {
  if (JSON.stringify(old) == JSON.stringify(dataBase)) {
    console.log('still the same')
  } else {
    console.log('new one')
    old = { ...dataBase }
    fetch('http://localhost:8000/database/60afb4c09525744d2608a7d5', {
      method: 'PUT',
      headers: {
        'Application-Type': 'application/json'
      },
      body: JSON.stringify(dataBase)
    })
      .then(j => j.json())
      .then(d => console.log(d))
  }
}, 2000)