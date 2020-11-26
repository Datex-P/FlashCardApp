import { edit, save, trash} from './svgs.js';
import questAnswerTrainOverv from './questAnswerTrainOverv.js';
import addQuestionsToDeck from './addQuestionsToDeck.js';
import { dataBase } from './dataBase.js';
import {createElement} from './exportFunctions.js'


export default function createDom(obj) {

  listOfDecks.innerHTML = '';
  let arr = Object.keys(obj);

  let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];

  arr.forEach((item, index) => {

    let newDeckContainer = createElement('div', '', {
      backgroundColor: colors[index % 5],
      transform: `rotate(${index * -2}deg)`
    }, 'newDeckContainer');



    let nameOfNewDeck = createElement("div", item, {
      position: 'absolute', left: '77px'
    })

    nameOfNewDeck.title = 'Click to open this deck'


    nameOfNewDeck.onmouseover = function () {
      nameOfNewDeck.style.color = "rgb(200, 168, 115)";
      nameOfNewDeck.style.cursor = "pointer";
    };

    nameOfNewDeck.addEventListener("mouseleave", () => {
      nameOfNewDeck.style.color = "black";
    });

    if (!dataBase.DeckNames[item].length) {
      nameOfNewDeck.onclick = function () {
        plusIcon.classList.remove('blinkingIcon');
        alert('Click on the blinking add icon');
        plusIcon.classList.add('blinkingIcon');


      };
    } else {
      nameOfNewDeck.onclick = function () {
        questAnswerTrainOverv(item);
      };
    }

    let addEditDeleteContainer = createElement(
      'div', 
      '', 
      {
        justifyContent: 'space-around',
        width: '149px',
        height: '128px',
        marginTop: '20px',
        left: '77px',
        //border: '1px black solid',
        zIndex: '3',
        position: 'absolute'
      }, 
      'flexColumn',
      '',
      newDeckContainer
    )


    let toStudyContainer = createElement('div', '', {
      border: '1px black solid'
    });


    // let [toStudy, toReview, toReviewContainer]


    let toStudy = createElement('div', 'To Study:', {
      backgroundColor: 'white'
    });


    let toReviewContainer = createElement('div', '', {
      border: '1px black solid'
    });

    let toReview = createElement('div', 'To Review:', {
      backgroundColor: 'white'
    });

    let decksizeContainer = createElement('div', '', {
      border: '1px black solid',
    });

    let decksize = createElement('div', `Decksize: ${dataBase.DeckNames[item].length}`, {
      backgroundColor: 'white'
    });

      for (let i = 0; i<8; i++) {


      let blackLines = createElement('div', '', {
        width: '99%',
        marginTop: '15px',
        border: '0.5px #eee4e1 solid'
      });
      newDeckContainer.append(blackLines)
    }





    let trashIconContainer = createElement('div', '', {
      border: '1px black solid',
      padding: '1px',
      borderTop: '0px'
    }, 'flexSpaceAround trashIconContainer');

    
    let trashIcon = createElement('div', trash, { right: '5px' });

    let trashIconText = createElement('div', 'deck', {});


    trashIconContainer.onclick = () => {
      // newDeckContainer.parentNode.removeChild(newDeckContainer);

      // let all = listOfDecks.querySelectorAll('.newDeckContainer')

      // let lastIndex  = all.length - 1 
      // all[lastIndex].style.zIndex = 2;
      // all[lastIndex].querySelector('.threeDotsIcon').style.opacity = 1;
      // all[lastIndex].style.transform = 'rotate(0deg)';
      // all[lastIndex].querySelector('.orangeCircle').style.display = 'flex'


      delete dataBase.DeckNames[item];
      createDom(dataBase.DeckNames)
      if (!Object.keys(dataBase.DeckNames).length) {
        let arrowDown = document.querySelector(".arrowDown");
        arrowDown.style.display = "block";
        document.getElementById('createYourFirstDeckPrompt').style.display = 'block';

      }
    };

    let editIconContainer = createElement('div', '', {
      border: '1px black solid',
      padding: '1px'
    }, 'editIconContainer flexSpaceAround');


    let editIconText = createElement('div', 'name', {});


    let changeNameofDeckInput = createElement('input', '', {
      width: '30%',
      position: 'absolute',
      left: '76px',
      // borderLeft: 'none',
      // borderRight: 'none',
      // borderTop: 'none',
      // borderBottom: '2px solid black'
    });


    changeNameofDeckInput.onclick = function (event) {
      event.stopPropagation()
    }

    function clickOutsideHandle() {
      //alert("Clicked out Box")
      editIcon.classList.add('blinkingIcon')
      setTimeout(() => {
        editIcon.classList.remove('blinkingIcon')
      }, 3000)
    }

    let editIcon = createElement('div', edit, {});

    let edited = false;


    editIconContainer.onclick = function (event) {

      window.addEventListener('click', clickOutsideHandle)
      event.stopPropagation()
      this.innerHTML = ''
      if (!edited) {

        this.innerHTML = `${save} name`;

        newDeckContainer.replaceChild(changeNameofDeckInput, nameOfNewDeck);
        changeNameofDeckInput.value = nameOfNewDeck.innerText;
        edited = true;

        console.log('click like a edit')
      } else {

        editIconContainer.append(editIcon)
        editIconContainer.append(editIconText)
        

        //console.log('click like a save')
        newDeckContainer.replaceChild(nameOfNewDeck, changeNameofDeckInput);
        window.removeEventListener('click', clickOutsideHandle)
        edited = false;
        //send fetch=>saveToDataBase
        // if ok
        nameOfNewDeck.innerText = changeNameofDeckInput.value;
      }
    };



    [trashIcon, editIcon].forEach((el) => { el.style.cursor = 'pointer'; });


    let threeDotsContainer = createElement('div', '', {
      left: '223px',
      position: 'absolute',
      top: '4px',
      cursor: 'pointer'
    });
    threeDotsContainer.title = ' Click and edit deckname or delete deck'


    let threeDotsIcon = createElement('div', '...', {
      color: 'black',
      fontWeight: 'bold',
      transform: 'rotate(90deg)',
      fontSize: '24px',

    }, 'threeDotsIcon');



    let littleModalWindow = createElement(
      'div', '', { display: 'none', border: '1px solid black' }, 'littleModalWindow2');


    threeDotsContainer.onclick = function () {

      littleModalWindow.style.display = littleModalWindow.style.display === "none" ? "block" : "none";

      if (littleModalWindow.style.display === 'block') {
        setTimeout(function () {
          window.onclick = function (event) {
            if (!littleModalWindow.contains(event.target)) {
              littleModalWindow.style.display = 'none';
              window.onclick = ''
            }
          };
        }, 10);
      }
    };

    let plusIcon = createElement('div', '+', {
      color: 'white', cursor: 'pointer'
    });




    let addToDeckIcon = createElement('div', '', {
      cursor: 'pointer'
    }, 'orangeCircle');

     if (index ===  arr.length-1) {
      addToDeckIcon.style.display = 'flex';
      newDeckContainer.style.zIndex = 2
      newDeckContainer.style.transform = 'rotate(0deg)'
    }
    addToDeckIcon.title = 'Add Questions to this deck';

    addToDeckIcon.onclick = function () {
      addQuestionsToDeck(item)
    }


   


    newDeckContainer.append(nameOfNewDeck);

    newDeckContainer.append(threeDotsContainer);
    threeDotsContainer.append(littleModalWindow);

    littleModalWindow.append(editIconContainer)
    threeDotsContainer.append(threeDotsIcon);


    
    addEditDeleteContainer.append(toStudyContainer);
    addEditDeleteContainer.append(toStudy);


    editIconContainer.append(editIcon)
    editIconContainer.append(editIconText)

    littleModalWindow.append(trashIconContainer)
    trashIconContainer.append(trashIcon)
    trashIconContainer.append(trashIconText)





    toStudyContainer.append(toStudy)
    addEditDeleteContainer.append(toReviewContainer)
    toReviewContainer.append(toReview)
    addEditDeleteContainer.append(decksizeContainer)
    decksizeContainer.append(decksize)

    newDeckContainer.append(addToDeckIcon)
    addToDeckIcon.append(plusIcon);



    listOfDecks.prepend(newDeckContainer);

  });




  document.querySelector("#scrollable").onscroll = function (event) {
    let all = listOfDecks.querySelectorAll('.newDeckContainer')
    let step = (1000 - 140) / (all.length - 1)
    let index = Math.floor(event.target.scrollTop / step)
    // index = (index > arr.length-1) ? arr.length-1 : index

    
    Array.from(all).reverse().forEach((item, index) => {
      item.style.zIndex = 0
      item.querySelector('.threeDotsIcon').style.opacity = 0;
     // console.log(all[index])

      item.querySelector('.orangeCircle').style.display = 'none'
      item.style.transform = `rotate(${(index * -2)||-2}deg)`;
    })
    all[index].style.zIndex = 2;
    all[index].querySelector('.threeDotsIcon').style.opacity = 1;
    all[index].style.transform = 'rotate(0deg)';
    all[index].querySelector('.orangeCircle').style.display = 'flex'


   // console.log(event.target.scrollTop, index)
  }

  // document.querySelector("#scrollable").scrollTo(0,860);
}