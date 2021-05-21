'use strict';
let imgSection = document.getElementById("images");
let image1 = document.getElementById("image1");
let image2 = document.getElementById("image2");
let image3 = document.getElementById("image3");
let results_btn = document.getElementById("results-btn");
let listsdiv = document.getElementById("lists");
let userValue=-1;


let indx1, indx2, indx3;
let prevIndex1 , prevIndex2 , prevIndex3;
let viewsArr =[];
let votesArr=[];
let count = 0;

results_btn.style.visibility = 'hidden';

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function setItems(){
    let picturesItems =JSON.stringify(pic.all);
    localStorage.setItem('Pics',picturesItems);
  }

  function getItems(){

    let product = localStorage.getItem('Pics');
    if(product) {
      pic.all = JSON.parse(product);
      // console.log(pic.all);
  
      }
  
  }

  
let images_names = ['bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'water-can.jpg',
    'wine-glass.jpg'];


    pic.all = [];

function pic(name, extension) {
    this.name = name;
    this.extension = extension;
    this.path = `/img/${name}${extension}`
    this.times = 0;
    this.votes = 0;
    pic.all.push(this);
}


getItems();

for (let i = 0; i < images_names.length; i++) {
    let point = images_names[i].indexOf(".");
    let name = images_names[i].substring(0, point);
    let extension = images_names[i].substring(point, images_names.length);
    // console.log(name , extension);
    new pic(name, extension);
}

//console.table(pic.all);
// for (let i = 1; i <= 3; i++) {
        
//     let indexname = 'indx';
//    let num = random(0, pic.all.length - 1);
//   //  console.log("inside for" ,num)
//     eval(indexname + i + "=" + num);
//     // eval(varname+1+"="+pic.all[1].name);
//     // console.log(pic.all[eval(indexname+i)].path);
// } 

function renderImages() {
   
   
     // console.log("outside for" ,num)
     while(indx1 === prevIndex1 || indx1 === prevIndex2 || indx1 === prevIndex3 )
     { indx1=random(0,pic.all.length-1); 
     }
    
     
      console.log(prevIndex1);
     image1.src = pic.all[indx1].path;
     image1.title = pic.all[indx1].name;
     pic.all[indx1].times++;
 
     
 
     while(indx2 === prevIndex1 || indx2 === prevIndex2 || indx2 === prevIndex3 )
     {indx2=random(0,pic.all.length-1);}
 
     console.log(prevIndex2);
     if (indx2 !== indx1) {
         image2.src = pic.all[indx2].path;
         image2.title = pic.all[indx2].name;
         pic.all[indx2].times++;
     }
     else if (indx2 === 0) {
         indx2++;
         image2.src = pic.all[indx2].path;
         image2.title = pic.all[indx2].name;
         pic.all[indx2].times++;
     }
     else {
         indx2--;
         image2.src = pic.all[indx2].path;
         image2.title = pic.all[indx2].name;
         pic.all[indx2].times++;
     }
     while(indx3 === prevIndex1 || indx3 === prevIndex2 || indx3 === prevIndex3 )
     {indx3=random(0,pic.all.length-1); }
 
     console.log(prevIndex3);

     if (indx3 !== indx1 && indx3 !== indx2) {
         image3.src = pic.all[indx3].path;
         image3.title = pic.all[indx3].name;
         pic.all[indx3].times++;
     }
     else if (indx3 === 0) {
         while (indx3 === indx2 || indx3 === indx1)
             {indx3++;}
 
         image3.src = pic.all[indx3].path;
         image3.title = pic.all[indx3].name;
         pic.all[indx3].times++;
 
     }
 
     else {
         while (indx3 === indx2 || indx3 === indx1)
            { indx3--;}
 
         image3.src = pic.all[indx3].path;
         image3.title = pic.all[indx3].name;
         pic.all[indx3].times++;
     }

     console.log(indx1 , indx2 , indx3);
 
     prevIndex1=indx1;
     prevIndex2=indx2;
     prevIndex3=indx3;
}

 let numOfClicks=prompt("how many time you want to click ? \n if you press ok it will be 25 times")
 //console.log(numOfClicks);
renderImages();


//console.log("num of clicks "+numOfClicks)

if(numOfClicks === "" ){
    numOfClicks=25;
    alert(`you have ${numOfClicks} clicks`)
}
 
imgSection.addEventListener('click',handleEvent)
function handleEvent(events)
{ 
    if (count ===Number( numOfClicks)) { alert(`no more clicks , you have reached ${numOfClicks} click`) }
    else {
        if (events.target.id != 'images') {
            if (events.target.id === image1.id)
                pic.all[indx1].votes++;

            else if (events.target.id === image2.id)
                pic.all[indx2].votes++;
            else
                pic.all[indx3].votes++;
        }
        renderImages();
        count++;
        if (count <Number( numOfClicks))
        {
            results_btn.style.visibility='hidden';
           
        }
        else
        {
            results_btn.style.visibility='visible';
           
        }
    }
   setItems();
}

// let ulLists=document.createElement('ul');
// listsdiv.appendChild(ulLists);
results_btn.addEventListener('click' , handleResultsEvent);
 
function handleResultsEvent(event)
{
    for(let j=0 ; j<pic.all.length ; j++){
        // let liE=document.createElement('li');
        // liE.textContent=`${pic.all[i].name} had ${pic.all[i].votes} votes and was seen ${pic.all[i].times} times`;
        // ulLists.appendChild(liE);
        viewsArr.push(pic.all[j].times);
      console.log(pic.all[j].name , pic.all[j].times)
        votesArr.push(pic.all[j].votes);
    }
     
    let Charts = document.getElementById('Charts').getContext('2d');
  let chart = new Chart(Charts, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: images_names,
      datasets: [{
        label: 'Photo\'s Votes',
        backgroundColor: 'rgb(255, 230, 1)',
        borderColor: 'rgb(255, 99, 132)',
        data: votesArr
      },
      {
        label: 'Photo\'s Views',
        backgroundColor: 'tomato',
        borderColor: 'rgb(253, 46, 46)',
        data: viewsArr
      }]
    },

    // Configuration options go here
    options: {}
  });
}
getItems();