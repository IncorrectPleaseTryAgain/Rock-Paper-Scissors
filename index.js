/*
*   Author: Michael Steenkamp
*   Date: 29-05-2023
*   Name: Rock Paper Scissors
*   Description: Simple implementation of the game
*                Rock Paper Scisors.
*/

/* GLOBAL VARIABLES */
const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

const EMOJI_CODES = {
    0: "🪨",
    1: "📜",
    2: "✂"
}

const RESULT_TITLES = {
    0: "W",
    1: "T",
    2: "L"
}

const WINS_DOM_OBJECT = document.querySelector('.p-wins');
const LOSSES_DOM_OBJECT = document.querySelector('.p-losses');
const TIES_DOM_OBJECT = document.querySelector('.p-ties');

const DIV_USER_SELECT = document.querySelector('.div-user-select');
const DIV_COMP_SELECT = document.querySelector('.div-comp-select');
const DIV_RESULT_TITLE = document.querySelector('.div-result-title');
const BTN_AUTO = document.querySelector('.btn-auto');

let wins = 0;
let losses = 0;
let ties = 0;

let intervalObject = null;
let autoActive = false;

/* EVENT FUNCTIONS */
document.querySelector('.btn-rock').onclick = function () {
    playGame(ROCK);
}

document.querySelector('.btn-paper').onclick = function () {
    playGame(PAPER);
}

document.querySelector('.btn-scissors').onclick = function () {
    playGame(SCISSORS);
}

document.querySelector('.btn-restart').onclick = function () {
    wins = 0;
    losses = 0;
    ties = 0;

    WINS_DOM_OBJECT.innerText = wins + " Wins";
    LOSSES_DOM_OBJECT.innerText = losses + " Losses";
    TIES_DOM_OBJECT.innerText = ties + " Ties";

    DIV_USER_SELECT.innerText = '❓';
    DIV_COMP_SELECT.innerText = '❓';
    DIV_RESULT_TITLE.innerText = '';
}

document.querySelector('.btn-auto').onclick = function () {

    const TIME_MS = 1000;

    if (!autoActive) {
        intervalObject = setInterval(() => {
            playGame(getRandomSelection());
        }, TIME_MS);
        autoActive = true;

        BTN_AUTO.setAttribute('style', 'animation: auto-active 2s infinite ease-in-out reverse;');
    }
    else {
        autoActive = false;
        clearInterval(intervalObject);

        BTN_AUTO.setAttribute('style', '');
    }
}

/* NON-EVENT FUNCTIONS */
function playGame(userSelection) {

    let result = null;

    const compSelection = getRandomSelection();
    compareSelections();
    displayresult();

    function compareSelections() {
        if (userSelection === compSelection) {
            console.log("TIE");
            ties++;
            TIES_DOM_OBJECT.innerText = ties + " Ties";
            result = 1;
        }
        else if (userSelection === ROCK && compSelection === SCISSORS) {
            console.log("WIN");
            wins++;
            WINS_DOM_OBJECT.innerText = wins + " Wins";
            result = 0;
        }
        else if (userSelection === PAPER && compSelection === ROCK) {
            console.log("WIN");
            wins++;
            WINS_DOM_OBJECT.innerText = wins + " Wins";
            result = 0;
        }
        else if (userSelection === SCISSORS && compSelection === PAPER) {
            console.log("WIN");
            wins++;
            WINS_DOM_OBJECT.innerText = wins + " Wins";
            result = 0;
        }
        else {
            console.log("LOSE");
            losses++;
            LOSSES_DOM_OBJECT.innerText = losses + " Losses";
            result = 2;
        }
    }

    function displayresult() {
        DIV_USER_SELECT.innerText = EMOJI_CODES[userSelection];
        DIV_COMP_SELECT.innerText = EMOJI_CODES[compSelection];
        DIV_RESULT_TITLE.innerText = RESULT_TITLES[result];
    }
}

function getRandomSelection() {
    return Math.floor(Math.random() * 3);
}