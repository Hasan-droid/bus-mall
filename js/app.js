'use strict';
let imgSection = document.getElementById("images");
let image1 = document.getElementById("image1");
let image2 = document.getElementById("image2");
let image3 = document.getElementById("image3");
let results_btn = document.getElementById("results-btn");
let listsdiv = document.getElementById("lists");
let userValue=-1;


let index1, index2, index3;
let count = 0;

results_btn.style.visibility = 'hidden';

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
let images_names = ['bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum copy.jpg',
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

for (let i = 0; i < images_names.length; i++) {
    let point = images_names[i].indexOf(".");
    let name = images_names[i].substring(0, point);
    let extension = images_names[i].substring(point, images_names.length);
    // console.log(name , extension);
    new pic(name, extension);
}

//console.table(pic.all);

function renderImages() {
    for (let i = 1; i <= 3; i++) {
        let varname = 'image';
        let indexname = 'index';
        let num = random(0, pic.all.length - 1)
        eval(indexname + i + "=" + num);
        // eval(varname+1+"="+pic.all[1].name);
        // console.log(pic.all[eval(indexname+i)].path);
    }
    image1.src = pic.all[index1].path;
    image1.title = pic.all[index1].name;
    pic.all[index1].times++;

    if (index2 != index1) {
        image2.src = pic.all[index2].path;
        image2.title = pic.all[index2].name;
        pic.all[index2].times++;
    }
    else if (index2 == 0) {
        index2++;
        image2.src = pic.all[index2].path;
        image2.title = pic.all[index2].name;
        pic.all[index2].times++;
    }
    else {
        index2--;
        image2.src = pic.all[index2].path;
        image2.title = pic.all[index2].name;
        pic.all[index2].times++;
    }

    if (index3 != index1 && index3 != index2) {
        image3.src = pic.all[index3].path;
        image3.title = pic.all[index3].name;
        pic.all[index3].times++;
    }
    else if (index3 === 0) {
        while (index3 === index2 || index3 === index1)
            index3++;

        image3.src = pic.all[index3].path;
        image3.title = pic.all[index3].name;
        pic.all[index3].times++;

    }

    else {
        while (index3 === index2 || index3 === index1)
            index3--;

        image3.src = pic.all[index3].path;
        image3.title = pic.all[index3].name;
        pic.all[index3].times++;
    }
}

 let numOfClicks=prompt("how many time you want to click ? \n if you press ok it will be 25 times")
 console.log(numOfClicks);
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
                pic.all[index1].votes++;

            else if (events.target.id === image2.id)
                pic.all[index2].votes++;
            else
                pic.all[index3].votes++;
        }
        renderImages();
        count++;
        if (count <Number( numOfClicks))
        {
            results_btn.style.visibility='hidden';
            console.log(count);
        }
        else
        {
            results_btn.style.visibility='visible';
            console.log(count);
        }
    }
}

let ulLists=document.createElement('ul');
listsdiv.appendChild(ulLists);
results_btn.addEventListener('click' , handleResultsEvent);
 
function handleResultsEvent(event)
{
    for(let i=0 ; i<pic.all.length ; i++){
        let liE=document.createElement('li');
        liE.textContent=`${pic.all[i].name} had ${pic.all[i].votes} votes and was seen ${pic.all[i].times} times`;
        ulLists.appendChild(liE);
    }
}
