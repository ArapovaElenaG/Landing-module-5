let arrowLeft = document.querySelector('.arrowLeft');
let arrowRight = document.querySelector('.arrowRight');
let rectangle2_1 = document.querySelector('.rectangle2_1');
let rectangle2_2 = document.querySelector('.rectangle2_2');
let rectangle2_3 = document.querySelector('.rectangle2_3');

let arrowLeftMobile = document.querySelector('.arrow_left_mobile');
let arrowRightMobile = document.querySelector('.arrow_right_mobile');


let wrapperTitleSection2 = document.querySelector('.wrapper_right_section2');
let photoSection2 = document.querySelector('.photo_section2');
let photoSection2Mobile = document.querySelector('.photo_section2_mobile');
let wrapperDotsSection2 = document.querySelector('.wrapper_dots_section2');
let text2City = document.querySelector('.text2City');
let text2Area = document.querySelector('.text2Area');
let text2Time = document.querySelector('.text2Time');
let text2Cost = document.querySelector('.text2Cost');

// создали массив с данными слайдера
let arraySection2 = [
    {
        title: 'Rostov-on-Don, Admiral',
        city: 'Rostov-on-Don<br>LCD admiral',  
        time: '3,5 months',
        area: '81 m2',
        cost: 'Upon request',
        src: 'images/image2.1.jpg'
    },
    {
        title: 'Sochi Thieves',
        city: 'Sochi <br>Thieves',  
        time: '4 months',
        area: '105 m2',
        cost: 'Upon request',
        src: 'images/image2.2.jpg'
    }, 
    {
        title: 'Rostov-on-Don Patriotic',
        city: 'Rostov-on-Don  <br>Patriotic',  
        time: '3 months',
        area: '93 m2',
        cost: 'Upon request',
        src: 'images/image2.3.jpg'
    }];

// функция наполнения данными из массива секции2
function initSlider () {
    // перебираем массив данных 
    arraySection2.forEach (function (item, index) {

        // создали блоки с картинками по количеству массива с активным первым 
        photoSection2.insertAdjacentHTML('beforeend', `<div class="image_item nImg${index} ${index === 0 ? "active_image_section2" : ""}" data-index="${index}" id="imageId${index}" style="background-image: url(${item.src})"></div>`);

        // поставили фон у мобильной версии
        if (index === 0) {
            photoSection2Mobile.style = `background-image: url(${item.src})`;
        }

        // создали заголовки с активным первым
        wrapperTitleSection2.innerHTML += `<h5 class="title5_section2 nTtl${index} ${index === 0 ? "title5_section2_active" : ""}" data-index="${index}" tabindex="0">${item.title}</h5>`

        // заполнили таблицу данными из массива
        if (index === 0) {
            text2City.innerHTML = item.city;
            text2Area.innerHTML = item.area;
            text2Time.innerHTML = item.time;
            text2Cost.innerHTML = item.cost;
        }

        // вставили точки по количеству массива с актичной первой
        wrapperDotsSection2.innerHTML += `<img src="images/Rectangle2.svg" class="dotSection2 ${index === 0 ? "activeDotSection2" : ""} nDot${index}">`;
    })
}


// функции переключения по стрелкам
function goRight () {
    let activeImageSection2 = document.querySelector('.active_image_section2');
    let numActive = +activeImageSection2.getAttribute("data-index");
    let num;
    if (numActive < arraySection2.length - 1) {num = numActive + 1}
    else {num = 0};
    moveSlider(num);
}

function goLeft () {
    let activeImageSection2 = document.querySelector('.active_image_section2');
    let numActive = +activeImageSection2.getAttribute("data-index");
    let num;
    if (numActive == 0) {num = arraySection2.length - 1}
    else {num = numActive - 1};
    moveSlider(num);
}

// функция замены активных классов
function moveSlider (num) {
    // меняем активный класс у картинок
    let activeImageSection2 = document.querySelector('.active_image_section2');
    let newActiveImageSection2 = document.querySelector(`.nImg${num}`);
    activeImageSection2.classList.remove("active_image_section2");
    newActiveImageSection2.classList.add("active_image_section2");

    // меняем фон у картинок мобильной версии
    photoSection2Mobile.style = `background-image: url(${arraySection2[num].src})`;

    // меняем активный класс у заголовков
    let activeTitleSection2 = document.querySelector('.title5_section2_active');
    let newActiveTitleSection2 = document.querySelector(`.nTtl${num}`);
    activeTitleSection2.classList.remove("title5_section2_active");
    newActiveTitleSection2.classList.add("title5_section2_active");

    // меняем активный класс у точек
    let activeDotSection2 = document.querySelector('.activeDotSection2');
    let newActiveDotSection2 = document.querySelector(`.nDot${num}`);
    activeDotSection2.classList.remove("activeDotSection2");
    newActiveDotSection2.classList.add("activeDotSection2");

    // заполняем актуальными данными сетку
    text2City.innerHTML = arraySection2[num].city;
    text2Area.innerHTML = arraySection2[num].area;
    text2Time.innerHTML = arraySection2[num].time;
    text2Cost.innerHTML = arraySection2[num].cost;
}

// обработчик на загрузку страницы - не работает почему-то
// document.addEventListener("DOMContentLoaded", initSlider);
initSlider();

// автоплей слайдера
setInterval(goRight, 3000);


// обработчики на стрелки
arrowRight.addEventListener('click', goRight);
arrowLeft.addEventListener('click', goLeft);

// обработчики на стрелки для мобильной версии
arrowRightMobile.addEventListener('click', goRight);
arrowLeftMobile.addEventListener('click', goLeft);

arrowRightMobile.addEventListener('touchend', goRight);
arrowLeftMobile.addEventListener('touchend', goLeft);


// обработчики нажатия на стрелки Tab 
arrowRight.onkeydown = function(event) {
    if (event.key == 'Enter' || event.key == '/*Как поставить пробел?*/') {
        goRight();
    }
};

arrowLeft.onkeydown = function(event) {
    if (event.key == 'Enter') {
        goLeft();
    }
};


// обработчики на заголовки:
// все заголовки вывели в NodeList 
let arrTitlesSection2 = document.querySelectorAll(".title5_section2");
    
// навесили обработчик клика и нажатия ентер на все заголовки
arrTitlesSection2.forEach((item, index) => {
    item.addEventListener('click', function() {moveSlider(index)});
    item.addEventListener('keydown', function(event) {
        if (event.key == 'Enter') {moveSlider(index)}
    })
});


// обработчики на точки:
// все точки вывели в NodeList 
let arrDotsSection2 = document.querySelectorAll(".dotSection2");
    
// навесили обработчик клика на все точки
arrDotsSection2.forEach((item, index) => {
  item.onclick = function() {moveSlider(index)}
});