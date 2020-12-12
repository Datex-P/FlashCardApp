
let base = {
  decks: [
    {
      to_stydy: Number,
      to_review: Number,
      cards: [
        {
          question: String,
          answer: String
        },
        ...
      ]
    },
    ...
  ],
  history:{
    '12.12.2020': [
      {
        deck: String,
        cardIndex: Number,
        spendTime: Number,
        timestamp: Date
      }
    ]
  },
  studySmartGoal: {
    amount: 100,
    topic: String,
    deadLine: Date
  }
} 
