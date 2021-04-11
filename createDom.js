import questAnswerTrainOverv from './questAnswerTrainOverv.js';
import addQuestionsToDeck from './addQuestionsToDeck.js';
import { dataBase } from './dataBase.js';
import { createElement, deleteCardQuestionBox, threeDots } from './exportFunctions.js'
import {play, plusSvg} from "./svgs.js";


export default function createDom(obj) {
  console.log('create Dom was rendered')
  listOfDecks.innerHTML = '';
  let arr = Object.keys(obj);

  let decksThatArenotCompleted = arr.filter(item=>!obj[item].thisDeckCompleted)


  let edited = false;

  decksThatArenotCompleted.forEach((item, index) => {
  //  console.log(item, 'item')
    let newDeckContainer = createElement('div', '', {
      backgroundColor: dataBase.DeckNames[item].color,
      transform: `rotate(${index * -2}deg)`
    }, 'newDeckContainer');

    //dataBase.DeckNames[item].deckPauseActive = false; not sure if this value is needed here

    let nameOfNewDeck = createElement("div", dataBase.DeckNames[item].name, { //most upper deck after rendering name of deck 
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
      'div', '', {}, 'flexColumnSpaceEvenlyAlignCenter addEditDeleteContainer', '', newDeckContainer
    )

    let toStud = 'To Study:' //field on each card on the main screen

    let inputToStudy = createElement('input', '', {}, 'inputToStudy')

    inputToStudy.type = 'number';
    inputToStudy.value = `${dataBase.DeckNames[item].data.length - dataBase.DeckNames[item].data.filter(x => x.pause === true).length || 0}`
    inputToStudy.min = '1'
    inputToStudy.max = `${dataBase.DeckNames[item].data.length - dataBase.DeckNames[item].data.filter(x => x.pause === true).length || 0}`


    let [toStudy] = [`${toStud.padEnd(7, '⠀')}`,
    
    `Progress:⠀${(((dataBase.DeckNames[item].data.
      filter(x => x.openHistory).length || 0) * 100) / inputToStudy.value).toFixed(0).padStart(2, '⠀')} %`].
      map(el => {

        return createElement('div', el, {}, 'decksizeStudyRev')
      });



    toStudy.append(inputToStudy)


    let [toStudyContainer, decksizeContainer] = ['', ''].map(el => {
        return createElement('div', el, {}, 'studyReviewDecksize')
      });


    let Decksize = 'Decksize:';

    let decksize = createElement('div', `${Decksize.padEnd(10, '⠀')}${dataBase.DeckNames[item].data.length}`, {}, 'decksizeStudyRev');


    let changeNameofDeckInput = createElement('input', '', { //input field that gets active when deckname is changed
    }, 'changeNameOfDeckInput');


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

    let canvasContainer = createElement('div', '', {  }, 'canvasContainer')
 
    document.querySelectorAll('.canvasContainer').forEach(item => {
      document.querySelector('#mainMenu').removeChild(item)
    })
  
    let canvas = createElement('canvas', '', {}, 'pieChart canvasStyling')

    let mainThreeDots = threeDots()
    let threeDotsContainer = null
    if (dataBase.DeckNames[item].data.length) {

      threeDotsContainer = mainThreeDots({


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
          //littleModalWindow.style.display = 'block'

          if (!edited) { //edited was pressed in three dots /default false

            window.onclick = ''
            window.addEventListener('click', () => clickOutsideHandle(saveIcon))
            editIconContainer.replaceChild(saveIcon, editIcon) //saveIcon replaces  editIcon //replaceChild(newChild, oldchild)
            newDeckContainer.replaceChild(changeNameofDeckInput, nameOfNewDeck);
            changeNameofDeckInput.value = nameOfNewDeck.innerText;
            console.log('here it is')
            littleModalWindow.style.display = 'block'

            changeNameofDeckInput.oninput = function () {  //this function checks whether the input length is bigger than 3  and smaller than 13
              if (this.value.length > 12 || this.value.length <3) {
                littleModalWindow.style.display = 'none'
              } else {

               // edited = true;
                window.onclick = ''
                littleModalWindow.style.display = 'block'
                console.log('hello helloo hello')
              }
            }
            edited = true;
            

          } else {

            editIconContainer.replaceChild(editIcon, saveIcon) //editIcon replaces  saveIcon //replaceChild(newChild, oldchild)
            newDeckContainer.replaceChild(nameOfNewDeck, changeNameofDeckInput);
            dataBase.DeckNames[item].name = changeNameofDeckInput.value;
            edited = false;
            nameOfNewDeck.innerText = changeNameofDeckInput.value;
            setTimeout(function () {
              window.onclick = outsideClickClosehandler
            }, 10);
            createDom(dataBase.DeckNames) //rerender Dom so that the deckname is changed when cards are added to the deck right away
           // console.log('I rerendered')
          }
        },

        pause: (container, playIcon, pauseIcon, edited
        ) => {

          window.onclick = ''
          edited = true;
          threeDotsContainer.style.display = 'none' //hides the three dots when pause was pressed
          nameOfNewDeck.style.background = dataBase.DeckNames[item].color


          dataBase.DeckNames[item].deckPauseActive = true;

          nameOfNewDeck.classList.remove('pointer')
          addToDeckIcon.removeEventListener('click', addToDeckHandler) //to remove event listener


          if (dataBase.DeckNames[item].pause == false) {

            addEditDeleteContainer.style.display = 'none'
            pauseInfoField.style.display = 'block'
            addToDeckIcon.style.cursor = 'default' //grey Circle and plus Icon not 'obviously clickable
            plusIcon.style.cursor = 'default'
            //newDeckContainer.querySelector('.nameOfNewDeck').classList.add('nameOfDeckChangedPausedMode') not sure what it is needed for 11.04
           // newDeckContainer.replaceChild(nameOfNewDeck, changeNameofDeckInput);
         
         
           editIconContainer.replaceChild(editIcon, saveIcon) 

          } else {
            dataBase.DeckNames[item].pause = true

          }
          return edited

        }

        ,

        delete: () => {
      
          if (dataBase.showDeleteFrame) {
            deleteCardQuestionBox(() => {

              delete dataBase.DeckNames[item]

            }, createDom, 'Delete deck', 'delete this deck')
          } else {
            
            delete dataBase.DeckNames[item]
            createDom(dataBase.DeckNames)
            
            window.onclick = '' //otherwise you had to click double on three dots as some event listener was still active
          }

        }
      }, { top: '3px', left: '13px' }, 'deck'
      )
    } else {
      threeDotsContainer = mainThreeDots({

        delete: () => {
          if (dataBase.showDeleteFrame) {
            deleteCardQuestionBox(() => {

              delete dataBase.DeckNames[item]
            }, createDom, 'Delete deck', 'delete this deck')
          } else {
            delete dataBase.DeckNames[item]
            
            console.log('newstate', dataBase.DeckNames)
            setTimeout(()=>createDom(dataBase.DeckNames),0)
            setTimeout(()=>createDom(dataBase.DeckNames),1000)
            window.onclick = '' //otherwise you had to click double on three dots as some event listener was still active
          }
        }
      }, { top: '3px', left: '13px' }, 'deck'
      )
    }

    

 
     threeDotsContainer.classList.add('threeDotsContainer')  
 


    let plusIcon = createElement('div', '+', {}, 'plusIcon');

    let openDeck = createElement('button', 'Open Deck', {}, 'openDeck');


    let pauseInfoField = createElement('div', 'To unpause press:', {
      backgroundColor: dataBase.DeckNames[item].color
    }, 'pauseInfoField')

    pauseInfoField.style.display = 'none'

    let deckIsEmptyField = createElement('div', 'Click the plus button to add cards to the deck', {
      backgroundColor: dataBase.DeckNames[item].color
    }, 'deckIsEmptyField')

    let plusButtonInsidePause = createElement('div', plusSvg, {width: '20px', height: '20px'}
    )

    deckIsEmptyField.append(plusButtonInsidePause)


    let playIconContainer = createElement('button', plusSvg, {}, 'playIconContainer')

    let playText = createElement('div', "Right now, this deck doesn't count to the study goal.", {}, 'playText')



    playIconContainer.onclick = function () { //play button that appears inside the card  when it is put on pause
      document.querySelector('.plusIcon').style.cursor = 'pointer' //plus Icon pointable again
      document.querySelector('.orangeCircle').style.cursor = 'pointer' //plus Icon pointable again
      threeDotsContainer.style.display = 'block'  //three dots container is shown again
      newDeckContainer.style.background = dataBase.DeckNames[item].color
      pauseInfoField.style.display = 'none';
      globalThreeDotsOpen = false;
      addEditDeleteContainer.style.display = 'flex'
      addToDeckIcon.addEventListener('click', addToDeckHandler)
      dataBase.DeckNames[item].deckPauseActive = false;
      document.querySelector('.nameOfNewDeck').classList.remove('nameOfDeckChangedPausedMode')
    }

    function openDeckHandler() {

      if (dataBase.DeckNames[item].deckPauseActive !== true && dataBase.DeckNames[item].data.length !== 0) {
        if (edited) { //checks whether the input field is open and in that case it does not open the trainings overview
          document.querySelector('svg[data-icon="save"]').classList.add('blinkingIcon')
        } else {
          document.querySelector('.settingsIconContainer').classList.add('top')
          questAnswerTrainOverv(item); //here the questAnswertrainoverview gets started
          dataBase.openedToday = true
          dataBase.showDiagram = false //deck is opened and thus diagram with goals is not shown for the moment
          //console.log('hello I fired')
          createDom(dataBase.DeckNames)
          canvasContainer.style.display = 'none'
         
        }
      }
    };
    openDeck.addEventListener('click', openDeckHandler)

    if (dataBase.DeckNames[item].data.length === 0) {

      addEditDeleteContainer.style.display = 'none'
      openDeck.style.display = 'none'
      deckIsEmptyField.style.display = 'flex'

    } else {
      addEditDeleteContainer.style.display = 'flex'
      openDeck.style.display = 'block'
      deckIsEmptyField.style.display = 'none'
    }



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

    let today = new Date().toDateString()

    let cardsStudiedToday = dataBase.DeckNames[item].data.reduce((acc, card) => {
      let cardsForToday = card.openHistory?.filter(time => time?.toDateString() == today)
      // console.log(cardsForToday, 'cardsforToday')
      if (cardsForToday?.length) {
        acc += cardsForToday.length
      }
      return acc
    }, 0)



    newDeckContainer.append(pauseInfoField,deckIsEmptyField, nameOfNewDeck, threeDotsContainer, addToDeckIcon)
    addEditDeleteContainer.append(toStudyContainer, toStudy, decksizeContainer, openDeck)

    toStudyContainer.append(toStudy);

    decksizeContainer.append(decksize);

    listOfDecks.prepend(newDeckContainer);
    addToDeckIcon.append(plusIcon);

    pauseInfoField.append(playIconContainer, playText)


var config = {
        type: 'doughnut',
        data: {
          labels: [
            //  "Red",
            //  'Blue'
          ],
          datasets: [{
            data: [
              //'hi'
             // Object.keys(dataBase.DeckNames).length - dataBase.deckCompleted,
              //dataBase.deckCompleted
              //first value shows all decks that are left to study
              //second value shows decks that were already studied
            ],
            backgroundColor: [
              '#5aaa95', "#FF6384"
            ],
            borderColor: [
              '#5aaa95', "#FF6384",
            ],
            borderWidth: 1,
            hoverBackgroundColor: [
              // "#FF6384",
            ]
          }]
        },
        options: {
          elements: {
            center: {
              text: `Goal ${((dataBase.deckCompleted * 100) / Object.keys(dataBase.DeckNames).length)}`,
              //text: 'hello',
    
    
              fontStyle: 'Times', // Default is Arial
              // sidePadding: 2, // Default is 20 (as a percentage)
              minFontSize: 12, // Default is 20 (in px), set to false and text will not wrap.
    
              // lineHeight: 19,
              // Default is 25 (in px), used for when text wraps
            }
          },
          legend: {
            // position: 'bottom',
            // labels: {
            //   fontColor: 'black'
            // }
    
          },
          cutoutPercentage: 81,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 10
            },
            border: 'none'
          }
        }
      };


    if (((((cardsStudiedToday || 0) * 100) / inputToStudy.value).toFixed(0) >= 10) && dataBase.DeckNames[item].thisDeckCompleted === false
    &&  dataBase.showDiagram === true) {
      //when the study goal is fullfilled for 100 %
      
      dataBase.DeckNames[item].thisDeckCompleted = true
     // dataBase.showDiagram = true;
      dataBase.deckCompleted++
      newDeckContainer.style.display = 'none'
      config.data.datasets[0].data.push(
        Object.keys(dataBase.DeckNames).length - dataBase.deckCompleted,
       dataBase.deckCompleted)

       let decks= document.querySelectorAll('#listOfDecks .newDeckContainer')
       let length = Array.from(decks).length
       console.log(Array.from(decks))
       decks[length-1].querySelector('.orangeCircle').style.display = 'flex'
      config.data.datasets[0].data.push('config data')
    


  let ctx = canvas.getContext("2d");
  let myChart = new Chart(ctx, config);

  Chart.pluginService.register({
    beforeDraw: function (chart) {
      if (chart.config.options.elements.center) {
        // Get ctx from string
        var ctx = chart.chart.ctx;

        // Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || 'Arial';
        var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var maxFontSize = centerConfig.maxFontSize || 75;
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
        // Start with a base font of 30px
        ctx.font = "30px " + fontStyle;

        // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
        var minFontSize = centerConfig.minFontSize;
        var lineHeight = centerConfig.lineHeight || 25;
        var wrapText = false;

        if (minFontSize === undefined) {
          minFontSize = 20;
        }

        if (minFontSize && fontSizeToUse < minFontSize) {
          fontSizeToUse = minFontSize;
          wrapText = true;
        }

        // Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = fontSizeToUse + "px " + fontStyle;
        ctx.fillStyle = color;

        if (!wrapText) {
          ctx.fillText(txt, centerX, centerY);
          return;
        }

        var words = txt.split(' ');
        var line = '';
        var lines = [];

        // Break words up into multiple lines if necessary
        for (var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > elementWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }

        // Move the center up depending on line height and number of lines
        centerY -= (lines.length / 2) * lineHeight;

        for (var n = 0; n < lines.length; n++) {
          ctx.fillText(lines[n], centerX, centerY);
          centerY += lineHeight;
        }
        //Draw text in center
        ctx.fillText(line, centerX, centerY);
      }
    }
  });

  if (dataBase.showDiagram) {
    document.querySelector('#mainMenu').append(canvasContainer)
    canvasContainer.append(canvas)
  }
    }
   
  });






  if (Object.keys(dataBase.DeckNames).length === 0) { //if no deck is present, scrollbar dissapear and info to create a deck appears

    document.querySelector("#scrollable").style.display = 'none'
    document.querySelector(".arrowDown").style.display = "block";
    document.getElementById('createYourFirstDeckPrompt').style.display = 'block';

  } else {
    document.querySelector("#scrollable").style.display = 'block'
  }


  document.querySelector("#scrollable").onscroll = function (event) {

    if (edited) {
      document.querySelector('svg[data-icon="save"]').classList.add('blinkingIcon')
    }

    if (!edited) {

      document.querySelector('.littleModalWindow').style.display = 'none'
      let all = listOfDecks.querySelectorAll('.newDeckContainer')
      let allInArr= Array.from(all).filter(el=>el.style.display != 'none')
      let step = (1000 - all[0].getBoundingClientRect().height) / (allInArr.length - 1)
      let index = Math.floor(event.target.scrollTop / step)
      // index = (index > arr.length-1) ? arr.length-1 : index

      allInArr.reverse().forEach((item, index) => {
        item.style.zIndex = 0
        item.querySelector('.settingsIconContainer').style.display = 'none'
        item.querySelector('.nameOfNewDeck').style.display = 'none'
        item.querySelector('.orangeCircle').style.display = 'none'
        item.style.transform = `rotate(${(index * -2) || -2}deg)`;
      })

      allInArr[index].style.zIndex = 2;
      allInArr[index].style.transform = 'rotate(0deg)';
      allInArr[index].querySelector('.settingsIconContainer').style.display = 'block'
      allInArr[index].querySelector('.nameOfNewDeck').style.display = 'block'
      allInArr[index].querySelector('.orangeCircle').style.display = 'flex'
    }

  }

}