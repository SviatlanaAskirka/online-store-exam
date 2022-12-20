const items = [{
        title: "LICKING CAT",
        description: "Любишь пушистых засранцев? Восхищаешься их грациозностью и чистоплотностью? Тогда эта пушистая жопка как раз для тебя!",
        price: 10,
        img: "./img/licking cat.jpg",
        popularity: 4.2,
    },
    {
        title: "BESTIE",
        description: "Хотите со своей BFF увековечить вашу дружбу на теле? Тогда выбирай этот эскиз!)",
        price: 8,
        img: "./img/bestie.jpg",
        popularity: 4.0,
    },
    {
        title: "DEBILITY",
        description: "Нет, 'debility' это не то, что ты там подумал. Это когда ты в своем познании настолько преисполнился, что этот мир тебе абсолютно понятен и ты ищешь лишь одно — покоя, умиротворения и вот этой гармонии",
        price: 12,
        img: "./img/debility.jpg",
        popularity: 5.0,
    },
    {
        title: "DUCK",
        description: "Проживаешь пубертатный кризис? Хочешь что-то набить, но не знаешь что? Тогда вот тебе — просто утка. Совет: бей там, где не спалит мама)",
        price: 6,
        img: "./img/duck.jpg",
        popularity: 3.2,
    },
    {
        title: "MATILDA",
        description: "Не знаешь кто это? Тогда лучше закрой эту страницу и иди делать уроки. Этот эскиз для тех, кто знает Матильду не только по мультфильму 'Малыш и Карлсон'. И нет, Жан Рено это не просто 'какой-то дед'! Пфф...",
        price: 18,
        img: "./img/leon.jpg",
        popularity: 5.0,
    },
    {
        title: "FCK U",
        description: "Все достали? Не держи в себе! Дай волю эмоциям! Выбирай этот эскиз и тебе всегда будет что ответить",
        price: 9,
        img: "./img/fck u.jpg",
        popularity: 4.0,
    },
    {
        title: "NON-BINARY PERSON",
        description: "Не можешь определиться на какой ты стороне? А это и не нужно. Живи, как чувтсвуешь. Выбирай этот эскиз.",
        price: 20,
        img: "./img/non-binary person.jpg",
        popularity: 5.0,
    },
    {
        title: "MOOD",
        description: "Устал от жизни? Хочется укутаться в теплый плед, взять кофе, сигаретку (курение вредит вашему здоровью) и усесться на уютный подоконник, смотреть на дождь под песни МакSим? Это однозначно твой эскиз",
        price: 19,
        img: "./img/mood.jpg",
        popularity: 4.5,
    },
    {
        title: "TOAD",
        description: "Жаба. Ну, жаба она и в Африке — жаба. Кто не любит жаб? Хм... наверное, многие. Но, если ты не они, то однозначно — бей!",
        price: 8,
        img: "./img/frog.jpg",
        popularity: 3.0,
    },
    {
        title: "HANDS UP!",
        description: "Руки вверх! Это ограбление! Пришли похитить твоё сердечко этим милым эскизом",
        price: 10,
        img: "./img/hands up.jpg",
        popularity: 4.1,
    },
    {
        title: "BUTTERFLY",
        description: "Снаружи нежный, но со стержнем внутри? Наш ответ бабочкам на пояснице. Не забывай, что мода циклична",
        price: 12,
        img: "./img/happiness.jpg",
        popularity: 3.7,
    },
    {
        title: "HEDGEHOG",
        description: "Нравится эскиз? Малыш, как ты обошел родительский конроль?",
        price: 6,
        img: "./img/smesharik.jpg",
        popularity: 1.8,
    },
];

let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });
    if (!arr.length) {
        nothingFound.textContent = "А оно тебе надо?";
    }
}

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function prepareShopItem(shopItem) {
    const { title, description, img, price, popularity } = shopItem;

    const item = itemTemplate.content.cloneNode(true);

    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}$`;

    const popularityContainer = item.querySelector(".popularity");
    for (let i = 0; i < popularity; i++) {
        const bolt = document.createElement("i");
        bolt.classList.add("fa", "fa-bolt");
        popularityContainer.append(bolt);
    }

    return item;
}

const searchInput = document.querySelector("#search-input");

const searchButton = document.querySelector("#search-btn");

function applySearch() {

    const searchString = searchInput.value.trim().toLowerCase();

    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );

    currentState.sort((a, b) => sortByAlphabet(a, b));
    renderItems(currentState);

    sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
        case "expensive":
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "popularity":
            {
                currentState.sort((a, b) => b.popularity - a.popularity);
                break;
            }
        case "alphabet":
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    renderItems(currentState);
});