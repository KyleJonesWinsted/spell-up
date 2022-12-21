"use strict";
const validGuesses = [];
let strikes = 0;
const GuessField = document.getElementById('guess');
const GuessListView = document.getElementById('guesses');
const ModalPopup = document.getElementById('modal-popup');
window.addEventListener('DOMContentLoaded', () => {
    setStartingWord();
});
GuessField.addEventListener('keyup', handleSubmit);
document.getElementById('view-rules')?.addEventListener('click', () => {
    displayRules();
});
function displayRules() {
    ModalPopup.appendChild(RulesView());
    ModalPopup.style.visibility = 'visible';
}
function closePopup() {
    ModalPopup.style.visibility = 'hidden';
    for (const child of ModalPopup.children) {
        ModalPopup.removeChild(child);
    }
}
function RulesView() {
    return htmlToElement(/*html*/ `
        <div>
            <button onclick="closePopup()">×</button>
            <h1>Spell Up!</h1>
            <p>
                The goal of the game is to spell as many words as possible. But there's a catch. Each word you spell must meet the following requirements:
            </p>
            <ol>
                <li>All of the letters in the word must be in alpabetical order. (Ex: boot, copy, ghost) </li>
                <li>Each word guessed must be alphabetically after the most recent valid guess.</li>
            </ol>
            <p>After 3 wrong guesses, the game is over.</p>
            <p>
                This game is inspired by <a href="https://roosterteeth.com/watch/f-kface-2022-12-14">episode 132 of the F**kFace podcast.</a>
            </p>
        </div>
    `);
}
function handleSubmit(e) {
    if (e.key !== 'Enter')
        return;
    const guess = GuessField.value;
    if (!guess)
        return;
    const isValid = isWordValid(guess);
    if (!isValid)
        addStrike();
    addWordToList(guess, isValid);
    GuessField.value = '';
}
function isWordValid(guess) {
    const latestWord = validGuesses[0].trim().toLowerCase();
    guess = guess.trim().toLowerCase();
    if (!allWords.includes(guess))
        return false;
    if (!areCharsAlpabetical(guess))
        return false;
    return guess.localeCompare(latestWord) > 0;
}
function areCharsAlpabetical(word) {
    let currentMin = 0;
    for (let i = 0; i < word.length; ++i) {
        const code = word.charCodeAt(i);
        if (currentMin > code) {
            return false;
        }
        currentMin = code;
    }
    return true;
}
function addStrike() {
    strikes += 1;
    if (strikes > 2) {
        GuessField.removeEventListener('keyup', handleSubmit);
        displayFinalScore();
    }
}
function displayFinalScore() {
    const firstWord = validGuesses[validGuesses.length - 1];
    ModalPopup.appendChild(FinalScore(firstWord, validGuesses.length - 1));
    ModalPopup.style.visibility = 'visible';
}
function FinalScore(firstWord, score) {
    return htmlToElement(/*html*/ `
        <div>
            <h1>Game Over!</h1>
            <h2>First Word: ${firstWord}</h2>
            <h2>Score: ${score}</h2>
        </div>
    `);
}
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}
function setStartingWord() {
    const firstWord = allWords[getRandomInt(0, allWords.length / 3 * 2)];
    addWordToList(firstWord, true);
}
function addWordToList(guess, isValid) {
    const cell = WordCell(guess, isValid);
    GuessListView.appendChild(cell);
    if (isValid) {
        validGuesses.unshift(guess);
    }
}
function WordCell(guess, isValid) {
    const p = document.createElement('p');
    p.innerHTML = guess;
    p.className = isValid ? 'good' : 'bad';
    return p;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const allWords = ['aal', 'aam', 'aaru', 'abb', 'abbess', 'abbey', 'abbot', 'abby', 'abdest', 'abe', 'abel', 'abet', 'abey', 'abhor', 'abilo', 'abir', 'ablow', 'ably', 'abo', 'abort', 'abox', 'abu', 'abu', 'abuzz', 'aby', 'accent', 'accept', 'access', 'accloy', 'accost', 'accoy', 'ace', 'acer', 'ach', 'achill', 'achor', 'achy', 'acis', 'acknow', 'acor', 'acrux', 'act', 'actu', 'add', 'adder', 'addu', 'addy', 'ade', 'ade', 'adeem', 'adeep', 'adelops', 'adept', 'adet', 'adfix', 'adin', 'adipsy', 'adit', 'ado', 'adopt', 'adoxy', 'adry', 'ady', 'adz', 'aegis', 'aer', 'aery', 'aes', 'affix', 'afflux', 'affy', 'aflow', 'afoot', 'aft', 'aggry', 'agio', 'agist', 'aglow', 'agnosy', 'ago', 'agy', 'ahint', 'ahir', 'aho', 'ahoy', 'aht', 'ahu', 'ail', 'aillt', 'aim', 'aint', 'ainu', 'air', 'airt', 'airy', 'ait', 'aix', 'ako', 'akov', 'aku', 'all', 'alloquy', 'allot', 'allow', 'alloy', 'ally', 'ally', 'almost', 'alms', 'aln', 'alo', 'alop', 'alow', 'alp', 'alt', 'aly', 'ammo', 'ammu', 'amor', 'amort', 'amos', 'amoy', 'amp', 'amt', 'amy', 'amy', 'ann', 'ann', 'annoy', 'ansu', 'ant', 'antu', 'antu', 'any', 'apt', 'arry', 'art', 'art', 'arty', 'aru', 'arx', 'ary', 'ass', 'ast', 'bee', 'bee', 'beef', 'beefily', 'beefin', 'beefy', 'beek', 'been', 'beer', 'beery', 'bees', 'beest', 'beet', 'beety', 'befist', 'befit', 'befop', 'beg', 'begin', 'bego', 'begorry', 'behint', 'behn', 'behoot', 'bekko', 'beknow', 'bel', 'bel', 'bell', 'bellow', 'belly', 'below', 'belt', 'bely', 'ben', 'ben', 'benn', 'benny', 'benny', 'beno', 'bent', 'benty', 'benu', 'ber', 'berry', 'bert', 'bes', 'bess', 'bessy', 'best', 'bet', 'betty', 'betty', 'bevy', 'bey', 'bhikku', 'bhil', 'bhoy', 'bijou', 'bijoux', 'bill', 'bill', 'billot', 'billow', 'billowy', 'billy', 'billy', 'bilo', 'bim', 'bin', 'bino', 'bint', 'biopsy', 'bios', 'birr', 'birsy', 'bis', 'bit', 'bitt', 'bitty', 'biz', 'bizz', 'blo', 'bloop', 'blot', 'blotty', 'blow', 'blowy', 'boo', 'boor', 'boort', 'boost', 'boosy', 'boot', 'booty', 'bop', 'bor', 'bort', 'borty', 'bortz', 'bos', 'boss', 'bossy', 'bot', 'bott', 'bouw', 'bow', 'boxy', 'boy', 'bruv', 'bruzz', 'buy', 'buzz', 'cee', 'ceil', 'cel', 'cell', 'cello', 'celt', 'celt', 'cent', 'cep', 'ceps', 'certy', 'cess', 'cest', 'chi', 'chil', 'chill', 'chillo', 'chilly', 'chimu', 'chin', 'chin', 'chinny', 'chino', 'chint', 'chintz', 'chiot', 'chip', 'chip', 'chippy', 'chips', 'chirr', 'chit', 'chitty', 'chlor', 'cho', 'choop', 'choosy', 'chop', 'choppy', 'chort', 'chott', 'chou', 'chow', 'cist', 'cit', 'city', 'civvy', 'cloop', 'cloot', 'clop', 'clot', 'clotty', 'clow', 'cloy', 'cly', 'coo', 'coop', 'coos', 'coost', 'coot', 'cop', 'coppy', 'copr', 'copsy', 'copt', 'copy', 'cor', 'cory', 'cos', 'coss', 'cost', 'cosy', 'cot', 'cotty', 'cow', 'cowy', 'cox', 'coxy', 'coy', 'coz', 'crux', 'cry', 'cuvy', 'dee', 'deem', 'deep', 'deer', 'deft', 'defy', 'deg', 'degu', 'dehors', 'dehort', 'deimos', 'deino', 'deinos', 'deist', 'deity', 'dekko', 'del', 'dell', 'demos', 'demy', 'den', 'dent', 'denty', 'deny', 'derry', 'dess', 'dev', 'dew', 'dewy', 'dey', 'dhow', 'dhu', 'dikkop', 'dill', 'dilly', 'dilo', 'dim', 'dimps', 'dimpsy', 'din', 'dint', 'dioxy', 'dip', 'dirt', 'dirty', 'dis', 'diss', 'dit', 'ditty', 'div', 'divvy', 'dixy', 'door', 'dop', 'dor', 'dor', 'dorty', 'dory', 'dory', 'dos', 'doss', 'dot', 'dot', 'dotty', 'dotty', 'doty', 'dow', 'doxy', 'druxy', 'dry', 'dux', 'eel', 'eely', 'eer', 'efflux', 'effort', 'efik', 'eft', 'egg', 'egghot', 'eggy', 'egilops', 'ego', 'ejoo', 'ell', 'ellops', 'elm', 'elmy', 'elops', 'els', 'elt', 'emm', 'empt', 'empty', 'emu', 'enos', 'enow', 'ens', 'envy', 'eppy', 'err', 'ers', 'ess', 'fill', 'filly', 'film', 'filmy', 'filo', 'fils', 'fin', 'fin', 'finn', 'finny', 'fiot', 'fip', 'fir', 'firry', 'first', 'fist', 'fisty', 'fit', 'fitty', 'fix', 'fizz', 'flo', 'floor', 'flop', 'floppy', 'flory', 'floss', 'flossy', 'flot', 'flow', 'flu', 'flux', 'fly', 'foo', 'foot', 'footy', 'fop', 'foppy', 'for', 'for', 'forst', 'fort', 'forty', 'fot', 'fou', 'fow', 'fox', 'foxy', 'foy', 'fry', 'fuzz', 'ghost', 'ghosty', 'ghuz', 'gil', 'gill', 'gill', 'gilly', 'gilo', 'gilpy', 'gilt', 'gim', 'gimp', 'gin', 'ginny', 'ginny', 'gio', 'gip', 'gippy', 'girr', 'girt', 'gist', 'git', 'gizz', 'glop', 'glor', 'glory', 'gloss', 'glossy', 'glost', 'glow', 'gloy', 'gnu', 'goo', 'goop', 'goosy', 'gor', 'gor', 'gorry', 'gorsy', 'gory', 'gos', 'gossy', 'got', 'goy', 'grr', 'guy', 'guy', 'guz', 'hill', 'hilly', 'hilt', 'him', 'himp', 'hin', 'hinny', 'hint', 'hip', 'hippy', 'his', 'hiss', 'hist', 'hit', 'hizz', 'hoop', 'hoot', 'hop', 'hoppy', 'horst', 'horst', 'horsy', 'hory', 'host', 'hot', 'how', 'hox', 'hoy', 'huzz', 'ijo', 'ill', 'illy', 'ilot', 'imp', 'impy', 'imu', 'inn', 'ino', 'ist', 'ivy', 'jos', 'joss', 'jot', 'jotty', 'jow', 'joy', 'klop', 'klops', 'knop', 'knoppy', 'knot', 'knotty', 'know', 'kop', 'kor', 'kory', 'kos', 'kou', 'kru', 'loo', 'loop', 'loopy', 'loot', 'lop', 'loppy', 'lorry', 'lors', 'lory', 'loss', 'lost', 'lot', 'lot', 'lou', 'low', 'lowy', 'lox', 'loy', 'lux', 'moo', 'moop', 'moor', 'moor', 'moors', 'moory', 'moost', 'moot', 'mop', 'moppy', 'mopsy', 'mor', 'mort', 'moss', 'mossy', 'most', 'mot', 'mott', 'mott', 'mou', 'mow', 'moy', 'mrs', 'mru', 'mux', 'muzz', 'noop', 'nor', 'nosu', 'nosy', 'not', 'nou', 'now', 'nowy', 'noy', 'opsy', 'opt', 'ort', 'ory', 'oxy', 'pry', 'pst', 'puxy', 'rux', 'ssu', 'stu', 'sty', 'suu', 'suz', 'tux'];
