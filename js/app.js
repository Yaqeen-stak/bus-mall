'use strict';

var names = [
    'bag',
    'banana',
    'bathroom',
    'boots',
    'breakfast',
    'bubblegum',
    'chair',
    'cthulhu',
    'dog-duck',
    'dragon',
    'pen',
    'pet-sweep',
    'scissors',
    'shark',
    'sweep',
    'tauntaun',
    'unicorn',
    'usb',
    'water-can',
    'wine-glass',
];
Image.clicked = 0;
var rounds = 25;
var imageNumber1EL = document.getElementById('image-number1');
var imageNumber2EL = document.getElementById('image-number2');
var imageNumber3EL = document.getElementById('image-number3');
var imagesSection = document.getElementById('images-section');
var result = document.getElementById('result');

function randomImage(max, min) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Image(name) {
    this.name = name;
    if (name === 'usb') {
        this.ext = '.gif';
    } else if (name === 'sweep') {
        this.ext = '.png';
    } else {
        this.ext = '.jpg';
    }
    this.path = 'img/' + this.name + this.ext;
    this.votes = 0;
    this.viewed = 0;
    Image.all.push(this);
}
Image.all = [];
for (let i = 0; i < names.length; i++) {
    new Image(names[i]);
}

function render() {
    var leftImage = randomImage(0, Image.all.length - 1);
    var middleImage = randomImage(0, Image.all.length - 1);
    var rightImage = randomImage(0, Image.all.length - 1);

    while(leftImage === rightImage || leftImage === middleImage || rightImage === middleImage){
        leftImage = names[randomNumber(0, names.length-1)];
        middleImage = names[randomNumber(0, names.length-1)];
        rightImage = names[randomNumber(0, names.length-1)];
      }
    
    // while (leftImage === middleImage || leftImage === rightImage) {
    //     leftImage = randomImage(0, Image.all.length - 1);
    // }
    // while (middleImage === rightImage) {
    //     middleImage = randomImage(0, Image.all.length - 1);
    // }

    imageNumber1EL.src = Image.all[leftImage].path;
    imageNumber2EL.src = Image.all[middleImage].path;
    imageNumber3EL.src = Image.all[rightImage].path;

    imageNumber1EL.alt = Image.all[leftImage].name;
    imageNumber2EL.alt = Image.all[middleImage].name;
    imageNumber3EL.alt = Image.all[rightImage].name;

    imageNumber1EL.title = Image.all[leftImage].name;
    imageNumber2EL.title = Image.all[middleImage].name;
    imageNumber3EL.title = Image.all[rightImage].name;
    Image.all[leftImage].viewed++;
    Image.all[middleImage].viewed++;
    Image.all[rightImage].viewed++;

}
console.log(Image.all)

imagesSection.addEventListener('click', clickHandler);

function clickHandler(event) {
    if (event.target.id !== 'images-section') {
        Image.clicked++;

        for (var m = 0; m < Image.all.length; m++) {
            if (Image.all[m].name === event.target.title) {
                Image.all[m].votes++;
            }
        }
        if (Image.clicked >= 25) {
            imagesSection.removeEventListener('click', clickHandler);
            createChart();
            // getResult();
        }
    }

    render();
}
render();
function getResult() {
    var ulEl = document.createElement('ul');
    result.appendChild(ulEl);
    for (var j = 0; j < Image.all.length; j++) {
        var msg = `${Image.all[j].name} had ${Image.all[j].votes} votes,and was shown ${Image.all[j].viewed} times .`;
        var liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = msg;
    }
}
function createChart() {
    var ctx = document.getElementById('myChart');
    const imageNames = [];
    const votes = [];
    const viewed = [];
    for (let i = 0; i < Image.all.length; i++) {
        imageNames.push(Image.all[i].name);
        votes.push(Image.all[i].votes);
        viewed.push(Image.all[i].viewed);

    }
    var chart = new Chart(ctx, {
        type: 'bar',

        data: {
            labels: imageNames,
            datasets: [{
                label: '# Of Votes',
                backgroundColor:
                    '#d8af61' ,
                borderColor: 'black',
                borderWidth:5,
                hoverBackgroundColor: 'pink',
                data: votes,
            },{
                label: '# Of Viewed',
                backgroundColor: '#b44454',
                borderColor: 'black',
                borderWidth:5,
                hoverBackgroundColor: 'pink',
                data: viewed,
            }
        ]
        },
    
        // Configuration options go here
        options: {
            // tooltips:{
            //     mode: 'index',
            // }
        }
    });
}
