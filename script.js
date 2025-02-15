const appName = 'EldenBingo';
let container;
let nav;

function init() {
    createLayout();
    load();
    cards.forEach((card, index) => {
        createCard(card, index);
    })
}

function restart() {
    document.body.innerHTML = '';
    init();
}

function reset() {
    cards.forEach(card => card.checked = false);
    cards[freeParking.id].checked = true;
    save();
    restart();
}

function createCard(card, index) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = card.checked;
    checkbox.id = index;
    checkbox.onclick = (e) => {
        if (checkbox.id == freeParking.id) {
            cards[freeParking.id].checked = true;
            e.preventDefault();
        }

        if (checkbox.checked) {
            const mlg = new Audio('mlg-airhorn.mp3');
            mlg.volume = 0.05;
            mlg.play();
        }

        cards[checkbox.id].checked = checkbox.checked;
        save();
        validate();
    }

    const label = document.createElement("label")
    label.innerHTML = card.text;
    label.append(checkbox);
    container.append(label)
}

function createLayout() {
    container = document.createElement('main');
    nav = document.createElement('nav');

    document.body.append(container)
    document.body.append(nav);
    createButton(randomise)
    createButton(reset)
}

function createButton(delegate) {
    const button = document.createElement('button');
    button.textContent = delegate.name;
    nav.append(button);
    button.onclick = () =>  {
        if (window.confirm(`Are you sure you want to ${delegate.name}?`)) {
            delegate()
            restart()
        }
    }
}

function randomise() {
    if (cards.length > 24) { 
        cards.splice(freeParking.id, 1)
    }
    
    cards.forEach((_, i) => {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
    });
    cards.splice(freeParking.id, 0, freeParking)
    save();
}

function load() {
    const savedCards = localStorage.getItem(appName);
    if (!savedCards) {
        randomise();
    } else {
        cards = JSON.parse(savedCards);
    }
}

function save() {
    localStorage.setItem(appName, JSON.stringify(cards))
}


function bingo() {
    const gridSize = 5;
    let board = [];

    for (let i = 0; i < gridSize; i++) {
        board.push(cards.slice(i * gridSize, (i + 1) * gridSize).map(card => card.checked));
    }

    // Check rows
    for (let row of board) {
        if (row.every(cell => cell)) {
            return true;
        }
    }

    // Check columns
    for (let col = 0; col < gridSize; col++) {
        if (board.every(row => row[col])) {
            return true;
        }
    }

    // Check diagonals
    if (board.every((row, i) => row[i])) return true;
    if (board.every((row, i) => row[gridSize - 1 - i])) return true;

    return false;
}

function validate(){
    if (bingo()) {
        new Audio('bingo.mp3').play();
        window.alert("YOU DID IT!");
    }
}


const freeParking = {text: "Jan has his last chemo and shits his pants", checked: true, id: 12};
let cards = [
    {text: "Spends 10 or more minutes trying fruitlessly to fight the Tree Sentinel.", checked: false},
    {text: "Kills and important NPC on purpose or on accident.", checked: false},
    {text: "Gets killed by an NPC after attacking them on purpose or on accident.", checked: false},
    {text: "Jan says “dibs” after meeting a female NPC. ", checked: false},
    {text: "Jan's camera work makes Dante motion sick.", checked: false},
    {text: "Rides directly off a cliff;<br/> dies.", checked: false},
    {text: "Surprise! Flying Dragon Agheel!<br/> dies.", checked: false},
    {text: "Tries to run away after picking a fight he can't win;<br/> dies.", checked: false},
    {text: "Tries to swim; <br/> drowns.", checked: false},
    {text: "Surprise! Teleport chest.", checked: false},
    {text: "Follows advice from a player message;<br/> dies.", checked: false},
    {text: "Does damage with an Ash of War", checked: false},
    {text: "Tries to make a bow and arrow build work;<br/> dies.", checked: false},
    {text: "Complains about a boss being hard or unfair (boss is level and gear appropriate)", checked: false},
    {text: "Accidentally travels directly into Caelid the first chance he gets", checked: false},
    {text: "Contracts poison or scarlett rot;<br/> dies.", checked: false},
    {text: "[Boss name] deez NUTZ!<br/> dies.", checked: false},
    {text: `Surprise! <br/> Rune Bear! <br/>dies.`, checked: false},
    {text: "Loses a level-up's worth of runes.", checked: false},
    {text: "Bonk is best! You know it when you see it.", checked: false},
    {text: "Fat rolls for way longer than is okay (more than once)", checked: false},
    {text: "Surprise! <br/> Evergaol! <br/> dies!", checked: false},
    {text: "Complains about how he can't get somewhere after forgetting how to jump.", checked: false},
    {text: "[Location name] deez NUTZ!", checked: false},
];

//start it up!
init();
