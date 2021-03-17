import questAnswerTrainOverv from './questAnswerTrainOverv.js';
import addQuestionsToDeck from './addQuestionsToDeck.js';
import { dataBase } from './dataBase.js';
import { createElement, deleteCardQuestionBox, threeDots, threeDotsOpen } from './exportFunctions.js'
import {
  edit, save, play
} from "./svgs.js";


export default function createDom(obj) {
  console.log('I do render')
  listOfDecks.innerHTML = '';
  let arr = Object.keys(obj);

  let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];
  let edited = false;

  arr.forEach((item, index) => {

    let newDeckContainer = createElement('div', '', {
      backgroundColor: colors[index % 5],
      transform: `rotate(${index * -2}deg)`
    }, 'newDeckContainer');

    dataBase.DeckNames[item].colorPlay = colors[index % 5];
    dataBase.DeckNames[item].deckPauseActive = false;




    let nameOfNewDeck = createElement("div", item, { //most upper deck after rendering name of deck 

    }, 'nameOfNewDeck')

    nameOfNewDeck.title = 'Click to open this deck'


    if (!dataBase.DeckNames[item].data.length) {
      nameOfNewDeck.onclick = function () {
        plusIcon.classList.remove('blinkingIcon');
        alert('Click on the blinking add icon');
        plusIcon.classList.add('blinkingIcon');


      }
    }


    let addEditDeleteContainer = createElement(
      'div', '', {}, 'flexColumnSpaceAroundAlignCenter addEditDeleteContainer', '', newDeckContainer
    )

    let hi = (dB) => dB[item].toStudyGoal - dB[item].cardsToday
    let toStud = 'To Study:'

    let input = createElement('input', '', {
      width: '49px',
      border: 'none'
    })
    input.type = 'number';
    input.value = hi(obj);


    let [toStudy, toReview] = [`${toStud.padEnd(9, '⠀')}`, `To Review: ${dataBase.queue.filter((obj) => obj.item === item).length}`].map(el => {
      return createElement('div', el, {}, 'decksizeStudyRev')
    });


    toStudy.append(input)
    input.oninput = function () {
      dataBase.DeckNames[item].toStudyGoal = this.value;
    }





    let [toStudyContainer, toReviewContainer, decksizeContainer] = ['', '', ''].map(el => {
      return createElement('div', el, {}, 'studyReviewDecksize')
    });


    let Decksize = 'Decksize:';

    let decksize = createElement('div', `${Decksize.padEnd(10, '⠀')} ${dataBase.DeckNames[item].data.length}`, {}, 'decksizeStudyRev');





    // trashIconContainer.onclick = () => {


    //   deleteCardQuestionBox(()=>{delete dataBase.DeckNames[item]},()=>{createDom(dataBase.DeckNames)})



    //   // delete dataBase.DeckNames[item];
    //   // createDom(dataBase.DeckNames)
    //   // if (!Object.keys(dataBase.DeckNames).length) {
    //   //   let arrowDown = document.querySelector(".arrowDown");
    //   //   arrowDown.style.display = "block";
    //   //   document.getElementById('createYourFirstDeckPrompt').style.display = 'block';


    // };

    let changeNameofDeckInput = createElement('input', '', { //input field that gets active when deckname is changed
      width: '32%',
      position: 'absolute',
      left: '83px',
      padding: '3px',
      top: '9px',
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




    //shows if edit button inside three dots on the mainscreen is pressed
  
    let mainThreeDots = threeDots()

    let threeDotsContainer = mainThreeDots(
        
      {
        edit: (event, editIconContainer, editIcon, saveIcon,
          outsideClickClosehandler, littleModalWindow) => {
          event.stopPropagation()

          threeDotsContainer.onclick = check

          function check() { //needed in case the changeNameofDeckINput is active and  three dots is clicked
            if (edited) {                            //default state is false
             
              newDeckContainer.replaceChild(nameOfNewDeck, changeNameofDeckInput);
              editIconContainer.replaceChild(editIcon, saveIcon)          //why does this line not fire up
              edited = false
            }
          }

          if (!edited) { //edited was pressed in three dots /default false

            window.addEventListener('click', () => clickOutsideHandle(saveIcon))


            editIconContainer.replaceChild(saveIcon, editIcon) //saveIcon replaces  editIcon //replaceChild(newChild, oldchild)
            newDeckContainer.replaceChild(changeNameofDeckInput, nameOfNewDeck);
            changeNameofDeckInput.value = nameOfNewDeck.innerText;
            edited = true;
            window.onclick = ''
            littleModalWindow.style.display = 'block'
            console.log('click like a edit')

           // openDeck.removeEventListener('click', openDeckHandler) //when changeNameOfDeckInput is active, deck can t be opened

          } else {

            //openDeck.addEventListener('click', openDeckHandler) //when changeNameOfDeckInput is active, deck can t be opened

            editIconContainer.replaceChild(editIcon, saveIcon) //editIcon replaces  saveIcon //replaceChild(newChild, oldchild)
            newDeckContainer.replaceChild(nameOfNewDeck, changeNameofDeckInput);


            edited = false;
            nameOfNewDeck.innerText = changeNameofDeckInput.value;
            setTimeout(function () {
              window.onclick = outsideClickClosehandler
            }, 10);

          }
        }, pause: (container, playIcon, pauseIcon, edited) => {
          if (!edited) { //edited was pressed in three dots /default false
            window.onclick = ''
            edited = true;
            threeDotsContainer.style.display = 'none' //hides the three dots when pause was pressed
            nameOfNewDeck.style.background = colors[index % 5]

            newDeckContainer.style.background = `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAe0lEQVQoU03PURECMQxF0RMbrIzFBjbQUR3YwAYrA2xkJ2l3hn61fZl7XwI7jkAyghd+5jtjBXvwwKgAN3zReZ0K3sGx3omtSDVQ2FE/MXWf7OskFaJw7Sxtcr9I3Wl1aGcQf6TudKEy2HKRSlmderuY2B4sXfK8tqlOJ205I9rLApoiAAAAAElFTkSuQmCC")
            ${colors[index % 5]} repeat`
            dataBase.DeckNames[item].deckPauseActive = true;

            nameOfNewDeck.classList.remove('pointer')

            addToDeckIcon.removeEventListener('click', addToDeckHandler) //to remove event listener
            //not sure why the line below does not
            document.querySelector('.orangeCircle').style.cursor = 'default' //grey Circle and plus Icon not 'obviously clickable
            document.querySelector('.plusIcon').style.cursor = 'default'
          
            document.querySelector('.addEditDeleteContainer').style.display = 'none' //hides decksize and the other divs when deck is paused
            pauseInfoField.style.display = 'block'
          } else {
           

            
            edited = false;

       
          //  container.replaceChild(pauseIcon, playIcon)
            newDeckContainer.style.border = 'none';
            newDeckContainer.style.background = colors[index % 5]
            document.querySelector('.addEditDeleteContainer').style.display = 'flex' //to study to review and decksize shown again


    


            newDeckContainer.style.backgroundColor = dataBase.DeckNames[item].colorPlay;
            dataBase.DeckNames[item].deckPauseActive = false;   //deck is not put put on pauseActive in dataBase anymore
          }
          return edited
        },
        delete: () => {
          deleteCardQuestionBox(() => {


            delete dataBase.DeckNames[item]
          }, createDom, 'Delete deck', 'delete this deck')

        }
      }, { top: '3px', left: '13px' }, 'deck'
    )





    threeDotsContainer.style.position = 'absolute'
    threeDotsContainer.style.top = '6px'
    threeDotsContainer.style.right = '95px'


    let plusIcon = createElement('div', '+', {  //field plus Icon on mainscreen
      color: 'white', cursor: 'pointer', fontSize: '18px'
    }, 'plusIcon');

    let openDeck = createElement('button', 'Open Deck', { //button Open Deck at mainscreen
      width: '100px', height: '27px',
      color: 'white', cursor: 'pointer', fontSize: '14px'
    }, 'openDeck');


    let pauseInfoField = createElement('div', 'Deck is paused. \n Press:', {
      backgroundColor: colors[index % 5],
      textAlign: 'center'
    }, 'pauseInfoField')

    pauseInfoField.style.display = 'none'

    let playIconContainer = createElement('button', play, {}, 'playIconContainer')

  


    let playText = createElement('div', 'to unpause the Deck', { textAlign: 'center' })

    newDeckContainer.append(pauseInfoField)
    pauseInfoField.append(playIconContainer)
    pauseInfoField.append(playText)

    playIconContainer.onclick = function () { //play button that appears inside the card  when it is put on pause
      document.querySelector('.plusIcon').style.cursor = 'pointer' //plus Icon pointable again
      document.querySelector('.orangeCircle').style.cursor = 'pointer' //plus Icon pointable again
      threeDotsContainer.style.display = 'block'  //three dots container is shown again
      newDeckContainer.style.background = colors[index % 5]
      pauseInfoField.style.display = 'none'
      document.querySelector('.addEditDeleteContainer').style.display = 'flex' //to study, decksize etc shown again
      addToDeckIcon.addEventListener('click', addToDeckHandler) 
      dataBase.DeckNames[item].deckPauseActive = false;
    }

    function openDeckHandler() {
        console.log('ok')
      //moved functionality to open deck
      if (dataBase.DeckNames[item].deckPauseActive !== true) {
        questAnswerTrainOverv(item);
      }
    };
    openDeck.addEventListener('click', openDeckHandler)



    openDeck.title = 'Click to open this deck'


    let addToDeckIcon = createElement('div', '', {
    }, 'orangeCircle');

    if (index === arr.length - 1) {
      addToDeckIcon.style.display = 'flex';
      newDeckContainer.style.zIndex = 2
      newDeckContainer.style.transform = 'rotate(0deg)'
    }
    addToDeckIcon.title = 'Add Questions to this deck';

    addToDeckIcon.addEventListener('click', addToDeckHandler)

    
    function addToDeckHandler() {
      addQuestionsToDeck(item)
      
    }

    



    newDeckContainer.append(nameOfNewDeck, threeDotsContainer, addToDeckIcon)

    addEditDeleteContainer.append(toStudyContainer, toStudy, toReviewContainer, decksizeContainer, openDeck)

    toStudyContainer.append(toStudy);
    toReviewContainer.append(toReview);
    decksizeContainer.append(decksize);

    addToDeckIcon.append(plusIcon);

    listOfDecks.prepend(newDeckContainer);

  });




  // let arr = Array(7).fill('M').map((item,k)=>{

  //   let div = createElement('div', hexagon, {width: '16px', height: '16px'}, 'item');

  //   return div
  // });












  document.querySelector("#scrollable").onscroll = function (event) {
    //if (!threeDotsOpen) {
      if (!edited) {

    //  newDeckContainer.replaceChild(nameOfNewDeck, changeNameofDeckInput);

  
      document.querySelector('.littleModalWindow').style.display='none'
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
//  }
  }
}