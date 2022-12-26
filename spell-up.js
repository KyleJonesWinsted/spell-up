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
    GuessField.focus();
    for (const child of ModalPopup.children) {
        ModalPopup.removeChild(child);
    }
}
function RulesView() {
    return htmlToElement(/*html*/ `
        <div id="rules-view">
            <button onclick="closePopup()">×</button>
            <h1>Spell Up!</h1>
            <p>
                The goal of the game is to spell as many words as possible. But there's a catch. Each word you spell must meet the following requirements:
            </p>
            <ol>
                <li>Words must be longer than 2 letters.</li>
                <li>All of the letters in the word must be in alphabetical order. (Ex: boot, copy, ghost) </li>
                <li>Each word guessed must be alphabetically after the most recent valid guess.</li>
            </ol>
            <p>After 3 wrong guesses, the game is over.</p>
            <p>
                This game is inspired by <a href="https://roosterteeth.com/watch/f-kface-2022-12-14" target="_blank">episode 132 of the F**kFace podcast.</a>
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
    if (strikes > 200) { // FIXME:
        GuessField.removeEventListener('keyup', handleSubmit);
        GuessField.blur();
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
        <div id="final-score">
            <button onclick="closePopup()">×</button>
            <div>
                <h1>Game Over!</h1>
                <h2>First Word: ${firstWord}</h2>
                <h2>Score: ${score}</h2>
            </div>
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
    const startingWords = allWords.filter(w => w.length > 3);
    const firstWord = startingWords[getRandomInt(0, startingWords.length / 3 * 2)];
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
const allWords = ['aaa', 'aah', 'aahs', 'aal', 'aals', 'aam', 'aaru', 'aas', 'abb', 'abbe', 'abbey', 'abbes', 'abbess', 'abbest', 'abby', 'abbot', 'abbott', 'abbr', 'abc', 'abcess', 'abd', 'abdest', 'abe', 'abey', 'abel', 'aberr', 'abet', 'abhor', 'abhors', 'aby', 'abilo', 'abir', 'abit', 'abl', 'ably', 'ablow', 'abn', 'abo', 'abort', 'abos', 'abow', 'abox', 'abp', 'abr', 'abs', 'abt', 'abu', 'abuzz', 'abv', 'acc', 'acce', 'accel', 'accent', 'accept', 'access', 'accloy', 'accoy', 'accost', 'acct', 'ace', 'acer', 'aces', 'ach', 'achy', 'achill', 'achoo', 'achor', 'acy', 'acis', 'ack', 'acknow', 'aclu', 'acop', 'acor', 'acost', 'acpt', 'acrux', 'act', 'actu', 'add', 'addeem', 'adder', 'adders', 'addy', 'addio', 'addis', 'addn', 'addr', 'adds', 'addu', 'ade', 'adeem', 'adeems', 'adeep', 'adelops', 'adempt', 'aden', 'adeps', 'adept', 'adet', 'adfix', 'adhort', 'ady', 'adin', 'adios', 'adipsy', 'adit', 'adj', 'adjt', 'adm', 'admov', 'admrx', 'ado', 'adoors', 'adopt', 'ador', 'ados', 'adoxy', 'adp', 'adry', 'ads', 'adv', 'adz', 'aegilops', 'aegir', 'aegis', 'aeq', 'aer', 'aery', 'aes', 'aet', 'aff', 'affy', 'affix', 'afflux', 'afft', 'aflow', 'afoot', 'aft', 'aggry', 'agy', 'agin', 'agio', 'agios', 'agist', 'agit', 'agly', 'aglow', 'agnosy', 'ago', 'agos', 'agr', 'agst', 'agt', 'ahi', 'ahint', 'ahir', 'aho', 'ahoy', 'ahs', 'aht', 'ahu', 'aik', 'ail', 'aillt', 'ails', 'aim', 'aims', 'ain', 'ains', 'aint', 'ainu', 'air', 'airy', 'airs', 'airt', 'ais', 'ait', 'aix', 'aknow', 'ako', 'akov', 'aku', 'aly', 'all', 'ally', 'allo', 'alloy', 'alloo', 'alloquy', 'allot', 'allow', 'alloxy', 'alls', 'almost', 'alms', 'aln', 'alo', 'alop', 'alow', 'alp', 'alps', 'als', 'alt', 'alw', 'amy', 'ammo', 'ammos', 'ammu', 'amoy', 'amor', 'amort', 'amos', 'amp', 'amps', 'amt', 'amu', 'any', 'ann', 'anno', 'annoy', 'annot', 'anopsy', 'ans', 'ansu', 'ant', 'antu', 'aor', 'app', 'appt', 'apr', 'apt', 'apx', 'ary', 'arr', 'arry', 'ars', 'art', 'arty', 'aru', 'arx', 'ass', 'asst', 'ast', 'att', 'atty', 'aux', 'bbl', 'bbls', 'bbs', 'bcd', 'bcf', 'bch', 'bchs', 'bde', 'bdft', 'bdl', 'bdls', 'bds', 'bee', 'beef', 'beefy', 'beefily', 'beefin', 'beefs', 'beek', 'been', 'beent', 'beep', 'beeps', 'beer', 'beery', 'beers', 'bees', 'beest', 'beet', 'beety', 'bef', 'befist', 'befit', 'befop', 'beg', 'begin', 'begins', 'begirt', 'bego', 'begorry', 'begot', 'begs', 'behint', 'behn', 'behoot', 'bey', 'bein', 'bekko', 'beknot', 'beknow', 'bel', 'bely', 'bell', 'belly', 'bello', 'belloot', 'bellow', 'bells', 'below', 'bels', 'belt', 'ben', 'benn', 'benny', 'beno', 'bens', 'bent', 'benty', 'benu', 'ber', 'berry', 'bert', 'bes', 'bess', 'bessy', 'best', 'bet', 'betty', 'bevy', 'bevvy', 'bhikku', 'bhil', 'bhoy', 'bhoot', 'bhp', 'bijou', 'bijoux', 'bill', 'billy', 'billot', 'billow', 'billowy', 'bills', 'bilo', 'bilos', 'bim', 'bin', 'binny', 'bino', 'bins', 'bint', 'bio', 'biopsy', 'bios', 'birr', 'birrs', 'birsy', 'birt', 'bis', 'bist', 'bit', 'bitt', 'bitty', 'bivvy', 'biz', 'bizz', 'bklr', 'bkpr', 'bkpt', 'bks', 'bkt', 'blo', 'bloop', 'bloops', 'blot', 'blotty', 'blow', 'blowy', 'bls', 'boy', 'boo', 'boor', 'boors', 'boort', 'boos', 'boosy', 'boost', 'boot', 'booty', 'bop', 'bops', 'bor', 'bors', 'bort', 'borty', 'bortz', 'bos', 'boss', 'bossy', 'bot', 'bott', 'bottu', 'bouw', 'bow', 'box', 'boxy', 'bps', 'bpt', 'brr', 'brrr', 'bruzz', 'btu', 'buy', 'buz', 'buzz', 'ccitt', 'cckw', 'ccm', 'ccw', 'cdf', 'cdg', 'cdr', 'cee', 'cees', 'ceil', 'ceils', 'ceint', 'cell', 'cello', 'cellos', 'cells', 'celt', 'cen', 'cent', 'cep', 'ceps', 'cert', 'certy', 'cess', 'cest', 'cestuy', 'cfh', 'cfi', 'cfm', 'cfs', 'cgm', 'cgs', 'chi', 'chil', 'chill', 'chilly', 'chillo', 'chills', 'chimp', 'chimps', 'chimu', 'chin', 'chinny', 'chino', 'chinos', 'chins', 'chint', 'chintz', 'chiot', 'chip', 'chippy', 'chips', 'chirr', 'chirrs', 'chirt', 'chiru', 'chis', 'chit', 'chitty', 'chiv', 'chivy', 'chivvy', 'chivw', 'chizz', 'chlor', 'chm', 'chmn', 'chn', 'cho', 'choy', 'choop', 'choosy', 'chop', 'choppy', 'chops', 'chort', 'chott', 'chou', 'choux', 'chow', 'chry', 'chs', 'cill', 'cir', 'cis', 'cissy', 'cist', 'cit', 'city', 'civ', 'civy', 'civvy', 'ckw', 'cly', 'clo', 'cloy', 'cloop', 'cloot', 'clop', 'clops', 'clos', 'clot', 'clotty', 'clou', 'clow', 'clr', 'coy', 'coo', 'coop', 'coops', 'coopt', 'coos', 'coost', 'coot', 'cooty', 'cop', 'copy', 'coppy', 'copps', 'copr', 'cops', 'copsy', 'copt', 'cor', 'cory', 'corr', 'corsy', 'cort', 'corv', 'cos', 'cosy', 'coss', 'cost', 'cot', 'cott', 'cotty', 'cow', 'cowy', 'cox', 'coxy', 'coz', 'cps', 'cpt', 'cpu', 'cry', 'crs', 'cru', 'crux', 'cst', 'csw', 'cuvy', 'ddt', 'dee', 'deek', 'deem', 'deems', 'deeny', 'deep', 'deeps', 'deer', 'deers', 'dees', 'deess', 'def', 'defi', 'defy', 'defis', 'defix', 'deflow', 'deflux', 'defs', 'deft', 'deg', 'deglory', 'degu', 'dehors', 'dehort', 'dei', 'dey', 'deil', 'deils', 'deimos', 'deino', 'deinos', 'deis', 'deist', 'deity', 'dekko', 'dekkos', 'del', 'dely', 'dell', 'delly', 'dells', 'deloo', 'dels', 'dem', 'demy', 'demo', 'demos', 'demot', 'den', 'deny', 'dens', 'dent', 'denty', 'dep', 'depr', 'dept', 'der', 'derry', 'derv', 'des', 'dess', 'det', 'deux', 'dev', 'dew', 'dewy', 'dex', 'dft', 'dhikr', 'dhikrs', 'dhoty', 'dhow', 'dhu', 'dikkop', 'dil', 'dill', 'dilly', 'dills', 'dilo', 'dilos', 'diluvy', 'dim', 'dimmy', 'dimps', 'dimpsy', 'dims', 'din', 'dino', 'dinos', 'dins', 'dint', 'dioxy', 'dip', 'dippy', 'dipppy', 'dips', 'dipsy', 'dipt', 'dir', 'dirt', 'dirty', 'dis', 'diss', 'dist', 'disty', 'dit', 'ditt', 'ditty', 'div', 'divvy', 'dix', 'dixy', 'dizz', 'dkl', 'dkm', 'dks', 'dlr', 'dlvy', 'doo', 'door', 'doors', 'dop', 'dopy', 'dor', 'dory', 'dorr', 'dorrs', 'dors', 'dort', 'dorty', 'dos', 'doss', 'dossy', 'dost', 'dot', 'doty', 'dotty', 'doux', 'dow', 'dowy', 'doxy', 'doz', 'dpt', 'dry', 'druxy', 'dux', 'eel', 'eely', 'eels', 'een', 'eer', 'eery', 'eff', 'efflux', 'effort', 'effs', 'efik', 'efl', 'efs', 'eft', 'egg', 'egghot', 'eggy', 'eggs', 'egilops', 'egis', 'ego', 'egos', 'eir', 'eiry', 'ejoo', 'ell', 'ellops', 'ells', 'elm', 'elmy', 'elms', 'elops', 'els', 'elt', 'emm', 'emmy', 'emory', 'emp', 'empt', 'empty', 'ems', 'emu', 'ennoy', 'enos', 'enow', 'ens', 'env', 'envy', 'eos', 'eppy', 'err', 'errs', 'ers', 'erst', 'ess', 'est', 'esu', 'ety', 'fgn', 'fil', 'fill', 'filly', 'fills', 'film', 'filmy', 'films', 'filo', 'fils', 'filt', 'fin', 'finn', 'finny', 'finns', 'fino', 'fins', 'fiot', 'fip', 'fir', 'firy', 'firry', 'firs', 'first', 'fist', 'fisty', 'fit', 'fitty', 'fitz', 'fix', 'fiz', 'fizz', 'fly', 'fll', 'flo', 'floor', 'floors', 'floosy', 'flop', 'floppy', 'flops', 'flor', 'flory', 'floss', 'flossy', 'flot', 'flow', 'flu', 'flux', 'fmt', 'foy', 'foo', 'foot', 'footy', 'fop', 'foppy', 'fops', 'for', 'forst', 'fort', 'forty', 'forz', 'foss', 'fot', 'fou', 'fow', 'fox', 'foxy', 'fps', 'fry', 'frs', 'frt', 'fruz', 'frwy', 'fuzz', 'ggr', 'ghi', 'ghis', 'ghost', 'ghosty', 'ghuz', 'gil', 'gill', 'gilly', 'gillot', 'gills', 'gilo', 'gilpy', 'gils', 'gilt', 'gilty', 'gim', 'gimmor', 'gimp', 'gimpy', 'gimps', 'gin', 'ginn', 'ginny', 'gins', 'gio', 'gip', 'gippy', 'gips', 'gipsy', 'girr', 'girt', 'gis', 'gist', 'git', 'gizz', 'gloy', 'glop', 'gloppy', 'glops', 'glor', 'glory', 'glos', 'gloss', 'glossy', 'glost', 'glow', 'glt', 'gnow', 'gns', 'gnu', 'goy', 'goo', 'goop', 'goopy', 'goops', 'goos', 'goosy', 'gor', 'gory', 'gorry', 'gorsy', 'gorst', 'gos', 'goss', 'gossy', 'got', 'gou', 'gov', 'gox', 'gps', 'gpss', 'gry', 'grr', 'grs', 'grx', 'gtt', 'guy', 'guv', 'guz', 'hill', 'hilly', 'hillo', 'hillos', 'hills', 'hilt', 'him', 'himp', 'hin', 'hinny', 'hins', 'hint', 'hip', 'hippy', 'hips', 'hir', 'hirst', 'his', 'hiss', 'hissy', 'hist', 'hit', 'hizz', 'hny', 'hoy', 'hoo', 'hoop', 'hoops', 'hoot', 'hop', 'hoppy', 'hops', 'hor', 'hory', 'horry', 'hors', 'horsy', 'horst', 'hort', 'hoss', 'host', 'hot', 'how', 'hox', 'hrs', 'huzz', 'hvy', 'hwy', 'iii', 'ijo', 'ill', 'illy', 'ills', 'ilot', 'immy', 'immov', 'imp', 'impy', 'imps', 'impv', 'imu', 'inn', 'inns', 'ino', 'ins', 'inst', 'int', 'inv', 'ios', 'iou', 'ipr', 'ips', 'iqs', 'irs', 'ist', 'isz', 'ivy', 'jms', 'jnt', 'joy', 'jos', 'joss', 'jot', 'jotty', 'jovy', 'jow', 'juv', 'kln', 'klop', 'klops', 'knop', 'knoppy', 'knops', 'knorr', 'knot', 'knotty', 'know', 'knox', 'kop', 'kops', 'kor', 'kory', 'kors', 'kos', 'koss', 'kou', 'krs', 'kru', 'lnr', 'loy', 'loo', 'loop', 'loopy', 'loops', 'loory', 'loos', 'loot', 'lop', 'loppy', 'lops', 'loq', 'lor', 'lory', 'lorry', 'lors', 'loss', 'lossy', 'lost', 'lot', 'lou', 'low', 'lowy', 'lox', 'lst', 'lux', 'lxx', 'mmmm', 'moy', 'moo', 'moop', 'moor', 'moory', 'moors', 'moos', 'moost', 'moot', 'mop', 'mopy', 'moppy', 'mops', 'mopsy', 'mor', 'mors', 'mort', 'morw', 'mos', 'moss', 'mossy', 'most', 'mot', 'mott', 'motty', 'mou', 'mow', 'mrs', 'mru', 'mss', 'mtx', 'mux', 'muzz', 'noy', 'noo', 'noop', 'nor', 'norry', 'nos', 'nosy', 'nosu', 'not', 'nou', 'nov', 'now', 'nowy', 'nox', 'oooo', 'oops', 'oory', 'oos', 'oot', 'opp', 'ops', 'opsy', 'opt', 'ory', 'ors', 'ort', 'oxy', 'ppr', 'pps', 'ppt', 'pry', 'prs', 'psst', 'pst', 'psw', 'pty', 'ptt', 'puy', 'puxy', 'qqv', 'qrs', 'qty', 'rtw', 'rux', 'rwy', 'ssu', 'sty', 'stu', 'suu', 'suz', 'swy', 'tty', 'tuy', 'tux', 'xyz', 'xxx'];
