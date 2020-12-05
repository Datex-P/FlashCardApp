import questAnswerTrainOverv from './questAnswerTrainOverv.js';
import addQuestionsToDeck from './addQuestionsToDeck.js';
import { dataBase } from './dataBase.js';
import { createElement, deleteCardQuestionBox, threeDots } from './exportFunctions.js'


export default function createDom(obj) {
  console.log('I do render')
  listOfDecks.innerHTML = '';
  let arr = Object.keys(obj);

  let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];

  arr.forEach((item, index) => {

    let newDeckContainer = createElement('div', '', {
      backgroundColor: colors[index % 5],
      transform: `rotate(${index * -2}deg)`
    }, 'newDeckContainer');

    dataBase.DeckNames[item].colorPlay = colors[index % 5];
    dataBase.DeckNames[item].deckPauseActive = false;
    dataBase.DeckNames[item].toStudyGoal = 20;


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
      'div', '', {}, 'flexColumnSpaceAround addEditDeleteContainer', '', newDeckContainer
    )

   //dataBase.Decknames[nameOfNewDeck].toStudyGoal

    let [toStudy, toReview] = [`To Study: ${0} / ${dataBase.DeckNames[item].toStudyGoal}`, `To Review: ${dataBase.queue.filter((obj) => obj.item === item).length}`].map(el => {
      return createElement('div', el, { backgroundColor: 'white', padding: '1px', width: '100%'})
    });

    let buttonUpAndDownContainer = createElement('div', '', {display: 'flex', flexDirection: 'column', position: 'absolute', right: '-18px', top:'-8px'});
    let buttonUp = createElement('button', '<', {display: 'flex', alignItems: 'center', width:'5px', transform: 'rotate(90deg)'});
    let buttonDown = createElement('button', '<', {display: 'flex', alignItems: 'center', width:'5px', transform: 'rotate(-90deg)'})


    let [toStudyContainer, toReviewContainer] = ['', ''].map(el => {
      return createElement('div', el, { border: '1px black solid', display: 'flex'})
    });


    let decksizeContainer = createElement('div', '', {
      border: '1px black solid',
    });


    let decksize = createElement('div', `Decksize: ${dataBase.DeckNames[item].length}`, {
      backgroundColor: 'white'
    });

    for (let i = 0; i < 8; i++) {

      let whiteLines = createElement('div', '', {}, 'whiteLines');

      newDeckContainer.append(whiteLines)
    }


    // trashIconContainer.onclick = () => {


    //   deleteCardQuestionBox(()=>{delete dataBase.DeckNames[item]},()=>{createDom(dataBase.DeckNames)})



    //   // delete dataBase.DeckNames[item];
    //   // createDom(dataBase.DeckNames)
    //   // if (!Object.keys(dataBase.DeckNames).length) {
    //   //   let arrowDown = document.querySelector(".arrowDown");
    //   //   arrowDown.style.display = "block";
    //   //   document.getElementById('createYourFirstDeckPrompt').style.display = 'block';


    // };

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

    function clickOutsideHandle(el) {
      //alert("Clicked out Box")
      el.classList.add('blinkingIcon')
      setTimeout(() => {
        el.classList.remove('blinkingIcon')
      }, 3000)
    }




    let edited = false;

    let mainThreeDots = threeDots()

    let threeDotsContainer = mainThreeDots((event, editIconContainer, editIcon, saveIcon,
      outsideClickClosehandler, littleModalWindow) => {
      event.stopPropagation()



      if (!edited) {

        window.addEventListener('click', () => clickOutsideHandle(saveIcon))


        editIconContainer.replaceChild(saveIcon, editIcon)
        newDeckContainer.replaceChild(changeNameofDeckInput, nameOfNewDeck);
        changeNameofDeckInput.value = nameOfNewDeck.innerText;
        edited = true;
        window.onclick = ''
        littleModalWindow.style.display = 'block'
        console.log('click like a edit')

      } else {

        editIconContainer.replaceChild(editIcon, saveIcon)
        newDeckContainer.replaceChild(nameOfNewDeck, changeNameofDeckInput);



        edited = false;
        nameOfNewDeck.innerText = changeNameofDeckInput.value;
        setTimeout(function () {
          window.onclick = outsideClickClosehandler
        }, 10);

      }
    },
      () => {
        deleteCardQuestionBox(() => { delete dataBase.DeckNames[item] }, createDom, 'Delete deck', 'delete this deck')

      }

      ,(container,playIcon,pauseIcon,edited) => {
        if (!edited) {
          container.replaceChild(playIcon, pauseIcon)
          window.onclick = ''
          edited = true;

          newDeckContainer.style.backgroundColor = 'grey'
          dataBase.DeckNames[item].deckPauseActive = true;

        }else {
          container.replaceChild(pauseIcon, playIcon)
          edited = false;
          newDeckContainer.style.border = 'none';
          
          newDeckContainer.style.backgroundColor =  dataBase.DeckNames[item].colorPlay;
          dataBase.DeckNames[item].deckPauseActive = false;
        }
        return edited
      },{ top: '0',left:'20px'}, 'deck'
      )
  



    threeDotsContainer.style.position = 'absolute'

    threeDotsContainer.style.top = '6px'
    threeDotsContainer.style.right = '85px'


    let plusIcon = createElement('div', '+', {
      color: 'white', cursor: 'pointer'
    });


    let addToDeckIcon = createElement('div', '', {
      cursor: 'pointer'
    }, 'orangeCircle');

    if (index === arr.length - 1) {
      addToDeckIcon.style.display = 'flex';
      newDeckContainer.style.zIndex = 2
      newDeckContainer.style.transform = 'rotate(0deg)'
    }
    addToDeckIcon.title = 'Add Questions to this deck';

    addToDeckIcon.onclick = function () {
      addQuestionsToDeck(item)
    }


    newDeckContainer.append(nameOfNewDeck, threeDotsContainer, addToDeckIcon)

    addEditDeleteContainer.append(toStudyContainer, toStudy, toReviewContainer, decksizeContainer)

    toStudyContainer.append(toStudy);
    addEditDeleteContainer.append(buttonUpAndDownContainer);
    buttonUpAndDownContainer.append(buttonUp)
    buttonUpAndDownContainer.append(buttonDown)
//    toStudyContainer.append(buttonUp);
  //  toStudyContainer.append(buttonDown);
    toReviewContainer.append(toReview);
    decksizeContainer.append(decksize);

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

      item.querySelector('.orangeCircle').style.display = 'none'
      item.style.transform = `rotate(${(index * -2) || -2}deg)`;
    })
    all[index].style.zIndex = 2;
    all[index].style.transform = 'rotate(0deg)';
    all[index].querySelector('.orangeCircle').style.display = 'flex'

  }
}