import { edit, save, trash} from './svgs.js';
import questAnswerTrainOverv from './questAnswerTrainOverv.js';
import addQuestionsToDeck from './addQuestionsToDeck.js';
import { dataBase } from './dataBase.js';


function createElement(tag = 'div', inner = '', style = {}, className = null, id = null) {

  let element = document.createElement(tag);

  element.innerHTML = inner;
  if (id) {
    element.id = id;
  }
  if (className) {
    element.className = className;
  }
  for (let prop in style) {
    element.style[prop] = style[prop]
  }
  return element
}


export default function createDom(obj, length = "long") {

  listOfDecks.innerHTML = "";
  let arr = Object.keys(obj);








  let colors = ['#ffcdb2','#ffb4a2','#e5989b','#b5838d','#6d6875']
  
  arr.forEach((item, index) => {
    let newDeckContainer = document.createElement("div");
    newDeckContainer.className = 'newDeckContainer';

    newDeckContainer.style.backgroundColor = colors[index%5]

    newDeckContainer.style.transform =  `rotate(${index*-2}deg)`;

    // newDeckContainer.onmouseenter = function(){
    //   this.style.transform =  `rotate(0deg)`;
    //   this.classList.add('strapped')
    // }
    // newDeckContainer.onmouseleave = function(){
    //   this.style.transform =  `rotate(${index*-5}deg)`;
    //   this.classList.remove('strapped')
    // }

    let nameOfNewDeck = createElement("div", item, {
      position: 'absolute',
      left: '83px'
    })
        // nameOfNewDeck.innerText = item;
        // nameOfNewDeck.style.position = 'absolute';
        // //nameOfNewDeck.style.fontWeight = 'bold';
        // nameOfNewDeck.style.left = '83px';







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


    let addEditDeleteContainer = createElement('div', '', {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      width: '149px',
      height: '128px',
      marginTop: '20px',
      left: '84px',
      border: '1px black solid',
      zIndex: '3',
      position: 'absolute'
    })




    // let addEditDeleteContainer = document.createElement("div");
    // addEditDeleteContainer.style.display = "flex";
    // addEditDeleteContainer.style.flexDirection = 'column';
    // addEditDeleteContainer.style.justifyContent = "space-around";
    // addEditDeleteContainer.style.width = "149px";
    // addEditDeleteContainer.style.height = '128px';
    // addEditDeleteContainer.style.marginTop = '20px'
    // //addEditDeleteContainer.style.alignItems = "center";
    // addEditDeleteContainer.style.left = '84px';
    // addEditDeleteContainer.style.border = '1px black solid'
    // addEditDeleteContainer.style.zIndex = '3';
    // addEditDeleteContainer.style.position = 'absolute';


    let toStudyContainer = document.createElement('div');
        toStudyContainer.style.width = '100%';
        toStudyContainer.style.border = '1px black solid';

    let toStudy = document.createElement('div');
        toStudy.style.width = '100%';
        toStudy.innerHTML = 'To Study:'
        toStudy.style.backgroundColor = 'white';
    
    let toReviewContainer = document.createElement('div');
        toReviewContainer.style.width = '100%';
        toReviewContainer.style.border = '1px black solid';

    let toReview = document.createElement('div');
        toReview.style.width = '100%';
        toReview.innerHTML = 'To Review:'
        toReview.style.backgroundColor = 'white';

 
    let decksizeContainer = document.createElement('div');
        decksizeContainer.style.width = '100%';
        decksizeContainer.style.border = '1px black solid';

    let decksize = document.createElement('div');
        decksize.style.width = '100%';
        decksize.innerHTML = `Decksize: ${dataBase.DeckNames[item].length}`
        decksize.style.backgroundColor = 'white';


    // let blackLines = createElement('div', {
    //   width: '99%',
    //   border: '0.5px #eee4e1 solid'
    // },
    // newDeckContainer.append(blackLines)
    
    // )



    // let blackLines = document.createElement('div');
    //     blackLines.style.width = '99%';
    //     blackLines.style.border= '0.5px #eee4e1 solid'

    // let blackLines2 = document.createElement('div');
    //     blackLines2.style.marginTop = '15px';
    //     blackLines2.style.width = '99%';
    //     blackLines2.style.border= '0.5px #eee4e1 solid'

    // let blackLines3 = document.createElement('div');
    //     blackLines3.style.marginTop = '15px';
    //     blackLines3.style.width = '99%';
    //     blackLines3.style.border= '0.5px #eee4e1 solid'

    // let blackLines4 = document.createElement('div');
    //     blackLines4.style.marginTop = '15px';
    //     blackLines4.style.width = '99%';
    //     blackLines4.style.border= '0.5px #eee4e1 solid';

    // let blackLines5 = document.createElement('div');
    //     blackLines5.style.marginTop = '15px';
    //     blackLines5.style.width = '99%';
    //     blackLines5.style.border= '0.5px #eee4e1 solid';

    // let blackLines6 = document.createElement('div');
    //     blackLines6.style.marginTop = '15px';
    //     blackLines6.style.width = '99%';
    //     blackLines6.style.border= '0.5px #eee4e1 solid';

    // let blackLines7 = document.createElement('div');
    //     blackLines7.style.marginTop = '15px';
    //     blackLines7.style.width = '99%';
    //     blackLines7.style.border= '0.5px #eee4e1 solid';

    // let blackLines8 = document.createElement('div');
    //     blackLines8.style.marginTop = '15px';
    //     blackLines8.style.width = '99%';
    //     blackLines8.style.border= '0.5px #eee4e1 solid';

    let trashIcon = document.createElement("div");
    trashIcon.innerHTML = trash;
    trashIcon.style.right = "5px";


    let trashIconContainer = document.createElement('div');
        trashIconContainer.style.border = '1px black solid';
        trashIconContainer.style.display = 'flex';
        trashIconContainer.style.justifyContent = 'space-around';
        trashIconContainer.style.padding = '1px';
        trashIconContainer.classList.add('trashIconContainer');
        trashIconContainer.style.borderTop = '0px';

    let trashIconText = document.createElement('div');
        trashIconText.innerHTML = ' deck';


    let editIconContainer = document.createElement('div');
        editIconContainer.style.border = '1px black solid';
        editIconContainer.style.display = 'flex';
        editIconContainer.style.justifyContent = 'space-around';
        editIconContainer.style.padding = '1px';
        editIconContainer.classList.add('editIconContainer');

    let editIconText = document.createElement('div');
        editIconText.innerHTML = 'name';



    trashIconContainer.onclick = () => {
      newDeckContainer.parentNode.removeChild(newDeckContainer);
      delete dataBase.DeckNames[item];
      if (!Object.keys(dataBase.DeckNames).length) {
        let arrowDown = document.querySelector(".arrowDown");
        arrowDown.style.display = "block";
        document.getElementById('createYourFirstDeckPrompt').style.display = 'block';

      }
    };

    
  

    let changeNameofDeckInput = document.createElement("input");
        changeNameofDeckInput.style.width = '30%';
        changeNameofDeckInput.style.position = 'absolute';
        changeNameofDeckInput.style.left = '83px';
    changeNameofDeckInput.onclick = function(event){
      event.stopPropagation()
    }

    function clickOutsideHandle(){
      //alert("Clicked out Box")
      editIcon.classList.add('blinkingIcon')
      setTimeout(()=>{
        editIcon.classList.remove('blinkingIcon')
      },3000)
     
    }

    let editIcon = document.createElement("div");
 
    let edited = false;
    editIcon.innerHTML = edit;



    editIconContainer.onclick = function (event) {
    
        window.addEventListener('click',clickOutsideHandle)
      event.stopPropagation()

      if (!edited) {
       
        this.innerHTML = save;       
        
        newDeckContainer.replaceChild(changeNameofDeckInput, nameOfNewDeck);
        changeNameofDeckInput.value = nameOfNewDeck.innerText;
        edited = true;
    
       console.log('click like a edit')
      } else {
       
        editIconContainer.append(editIcon)
        editIconContainer.append(editIconText)


    
        //console.log('click like a save')
        newDeckContainer.replaceChild(nameOfNewDeck, changeNameofDeckInput);
        window.removeEventListener('click',clickOutsideHandle)
        edited = false;
        //send fetch=>saveToDataBase
        // if ok
        nameOfNewDeck.innerText = changeNameofDeckInput.value;
      }
    };



  [trashIcon, editIcon].forEach((el) => {

    el.style.cursor = 'pointer';
  });

  let threeDotsContainer = document.createElement('div');
      threeDotsContainer.style.left = '227px'
      threeDotsContainer.style.position = 'absolute';
      threeDotsContainer.style.top = '4px';
      threeDotsContainer.style.cursor = 'pointer';

  



    


    let littleModalWindow = createElement(
      'div',
      '',
      {
        // transform: 'rotate(-90deg)'
      },
      'littleModalWindow2'
    )


    let opened = false

    threeDotsContainer.onclick = function () {
      opened = !opened;
      littleModalWindow.style.display = opened ? "block" : "none";
  
      if (opened) {
        setTimeout(function () {
          window.onclick = function handleOutsideClick(e) {
            if (littleModalWindow.contains(e.target)) {
              //alert("Clicked in Box");
            } else {
              littleModalWindow.style.display = 'none';
              opened = false;
            }
          };
        }, 10);
      }
    }

    let plusIcon = document.createElement('div');
        plusIcon.innerText = '+';
        plusIcon.style.color = 'white';
        plusIcon.style.cursor = 'pointer';



let addToDeckIcon = document.createElement("div");
    addToDeckIcon.className = 'orangeCircle';
   //addToDeckIcon.innerText = "+";
   addToDeckIcon.style.cursor = 'pointer';
   if(index ===0){
    addToDeckIcon.style.display = 'flex';
    newDeckContainer.style.zIndex = 2
   }

   addToDeckIcon.onclick = function(){
    addQuestionsToDeck(item)
   }


    let threeDotsIcon = document.createElement("div");

   // let threeDotsIcon = document.createElement("div");
   // threeDotsIcon.className = 'orangeCircle';
   // threeDotsIcon.innerText = "+";
    threeDotsIcon.style.color = 'black'
    threeDotsIcon.fontWeight = 'bold'
    //threeDotsIcon.style.border = '1px solid grey';

    //threeDotsIcon.style.zIndex = '3';
    threeDotsIcon.style.transform = 'rotate(90deg)';
    threeDotsIcon.innerText='...';
    threeDotsIcon.style.fontSize = '24px'
    threeDotsIcon.style.fontWeight = 'bold';
  

    // threeDotsIcon.onclick = function () {
    //   this.classList.remove('blinkingIcon')
    //   addQuestionsToDeck(item);
    // }

    // threeDotsIcon.addEventListener('mouseover', function() {
    //   threeDotsIcon.style.cursor = 'pointer';
    // });


    newDeckContainer.appendChild(nameOfNewDeck);

    //newDeckContainer.append(editIcon)
    newDeckContainer.append(threeDotsContainer)


    threeDotsContainer.append(littleModalWindow)
    threeDotsContainer.append(threeDotsIcon)

    littleModalWindow.append(editIconContainer)
    editIconContainer.append(editIcon)
    editIconContainer.append(editIconText)

    littleModalWindow.append(trashIconContainer)
    trashIconContainer.append(trashIcon)
    trashIconContainer.append(trashIconText)



    if (length == "long") {
  

      // newDeckContainer.appendChild(blackLines);
      // newDeckContainer.appendChild(blackLines2);
      // newDeckContainer.appendChild(blackLines3);
      // newDeckContainer.appendChild(blackLines4);
      // newDeckContainer.appendChild(blackLines5);
      // newDeckContainer.appendChild(blackLines6);
      // newDeckContainer.appendChild(blackLines7);
      // newDeckContainer.appendChild(blackLines8);
    }

    newDeckContainer.appendChild(addEditDeleteContainer);
    addEditDeleteContainer.append(toStudyContainer)
    addEditDeleteContainer.append(toStudy)
    toStudyContainer.append(toStudy)
    addEditDeleteContainer.append(toReviewContainer)
    toReviewContainer.append(toReview)
    addEditDeleteContainer.append(decksizeContainer)
    decksizeContainer.append(decksize)

    newDeckContainer.append(addToDeckIcon)
    addToDeckIcon.append(plusIcon);



    listOfDecks.prepend(newDeckContainer);

  });


  document.querySelector("#scrollable").onscroll = function(event){
    let step = (1000-450)/arr.length
    let index = Math.floor(event.target.scrollTop/step)

    let all = listOfDecks.querySelectorAll('.newDeckContainer')
    Array.from(all).reverse().forEach((item,index)=>{
      item.style.zIndex = 0
      // item.classList.remove('strapped')
      item.querySelector('.orangeCircle').style.display = 'none'
      item.style.transform =  `rotate(${index*-2}deg)`;
    })
    all[index].style.zIndex = 2;
    all[index].style.transform = 'rotate(0deg)';
    all[index].querySelector('.orangeCircle').style.display = 'flex'
    // all[index].classList.add('strapped')

    console.log(event.target.scrollTop,index)


  }
}