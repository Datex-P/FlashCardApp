export let dataBase = {
  DeckNames: {},
  queue: [],
  userStylePreferences:[],
  showDeleteFrame: true
};



let arr = [];
for (let i = 0; i<100; i++){
  arr.push({
    question: `question${i}`,
    answer: `answer${i}`
  })
};

for (let i = 0; i<7; i++){
  dataBase.DeckNames[`Literature${i}`] = arr
};


