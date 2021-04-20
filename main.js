const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');
// выбор противников, кто Комп, а кто реальный
let fighters = {};

/*
 const $randomButton = document.querySelector('.button');
 */
const HIT = {
    head: 30,
    body: 25,
    foot: 20
};
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['f1', 'f2', 'f3'],
    attack: function () {
        console.log(this.name + ' Fight...');
    },
    changeHP,
    elHP,
    renderHP
};
const player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['f1', 'f2', 'f3'],
    attack: function () {
        console.log(this.name + ' Fight...');
    },
    changeHP,
    elHP,
    renderHP
};



function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

function createPlayer(plObject) {

    const $player = createElement('div', 'player' + plObject.player);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $life.style.width = plObject.hp + '%';
    $name.innerText = plObject.name;
    $img.src = plObject.img;

    $progressbar.appendChild($name);
    $progressbar.appendChild($life);
    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;

}
function getRandom(min, max) {
    return min + Math.round(Math.random() * (max - min));
}

function getDamage(max) {

    return getRandom(1, max);
}
function resetPlayer(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp = 100;
    $playerLife.style.width = player.hp + '%';
}

function changeHP(damage) {
    this.hp -= damage;
    if (this.hp < 0) {
        this.hp = 0;
    }
}
function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}
function renderHP() {
    this.elHP().style.width = this.hp + '%';

}
function gameOverOld(player) {
    $randomButton.style.display = 'none';
    const name = (player.player === 1) ? player2.name : player1.name;
    $arenas.appendChild(playerWin(name));
    createReloadButton();
}
function gameOver(player) {
    $formFight.style.display = 'none';
    const name = player ? player.name : 'Draw';
    $arenas.appendChild(playerWin(name));
    createReloadButton();
}

function playerLose(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' lose';
}
function playerWin(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' Wins';
    return $loseTitle;
}
function removeElement(className) {
    document.querySelector(className).remove();
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText = 'Restart';
    $reloadWrap.appendChild($button);
    $arenas.appendChild($reloadWrap);

    $reloadWrap.addEventListener('click', function () {
        /*window.location.reload();
         но можно красиво все убрать
         */
        resetPlayer(player1);
        resetPlayer(player2);
        removeElement('.loseTitle');
        /*$randomButton.disabled = false;*/
        $formFight.style.display = 'block';
        removeElement('.reloadWrap');
        reInitPlayres();
    });
}

function setBorder(player, style) {
    const $enemy = document.querySelector('.player' + player + ' .character');
    $enemy.style.borderBottom = style;
}

function reInitPlayres() {
    setBorder(1, 'none');
    setBorder(2, 'none');
    initPlayres();
}
/*Выделим комп красной чертой*/
function initPlayres() {
    fighters = getRandom(1, 2) == 1 ? {enemy: player1, player: player2} : {enemy: player2, player: player1};
    setBorder(fighters.enemy.player, '2px solid #f00');
    generateLogs('start', fighters.enemy, fighters.player);
}
/*
 $randomButton.addEventListener('click', function () {
 const player = (getRandom(1, 2) == 1) ? player1 : player2;
 player.changeHP(getDamage(30));
 player.renderHP();
 if (player.hp === 0)
 gameOver(this);
 });*/

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
initPlayres();

function fight() {
    const enemy = enemyAttack();
    const player = playerAttack();
    const damageEnemmy = enemy.defence !== player.hit ? player.value : 0;
    const damagePlayer = player.defence !== enemy.hit ? enemy.value : 0;

    fighters.enemy.changeHP(damageEnemmy);
    fighters.enemy.renderHP();

    fighters.player.changeHP(damagePlayer);
    fighters.player.renderHP();

    if (damageEnemmy) {
        generateLogs('hit', fighters.enemy, fighters.player, -damageEnemmy);
    } else {
        generateLogs('defence', fighters.enemy, fighters.player);
    }

    if (damagePlayer) {
        generateLogs('hit', fighters.player, fighters.enemy, -damagePlayer);
    } else {
        generateLogs('defence', fighters.player, fighters.enemy);
    }


    if (fighters.player.hp === 0 && fighters.enemy.hp > 0) {
        console.log('enemy wins')
        gameOver(fighters.enemy);
        generateLogs('end', fighters.enemy, fighters.player);
    } else if (fighters.enemy.hp === 0 && fighters.player.hp > 0) {
        console.log('player wins')
        gameOver(fighters.player);
        generateLogs('end', fighters.player, fighters.enemy);
    } else if (fighters.player.hp === 0 && fighters.enemy.hp === 0) {
        console.log('draw')
        gameOver();
        generateLogs('draw', fighters.enemy, fighters.player);
    }

}

function enemyAttack() {
    const hit = ATTACK[getRandom(0, 2)];
    const defence = ATTACK[getRandom(0, 2)];
    return {
        value: getRandom(1, HIT[hit]),
        hit,
        defence
    };
}
function playerAttack() {
    const attack = {};
    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(1, HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }
    return attack;
}

function generateLogs(type, player1, player2, damage) {
    //player1 - attack
    //player2 - protection

    let text = '';
    let timeLog = '';
    if (!damage) {
        damage = '';
    }
    let damageStatus = '';
    let date = new Date();
    const timeActive = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    timeLog = timeActive + ' - ';
    switch (type) {
        case 'start':
            timeLog = '';
            text = logs['start'].replace('[time]', timeActive).replace('[player1]', player1.name).replace('[player2]', player2.name);
            break;
        case 'hit':
            text = logs['hit'][getRandom(0, 18)].replace('[playerDefence]', player1.name).replace('[playerKick]', player2.name);
            damageStatus = `[${player1.hp}/100]`;
            break;
        case 'defence':
            text = logs['defence'][getRandom(0, 8)].replace('[playerDefence]', player1.name).replace('[playerKick]', player2.name);
            break;
        case 'draw':
            timeLog = '';
            text = logs['draw'].replace('[playerDefence]', player1.name).replace('[playerKick]', player2.name);
            break;

        case 'end':
            timeLog = '';
            text = logs['end'][getRandom(0, 2)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            break;


    }
    const el = `<p>${timeLog} ${text} ${damage} ${damageStatus}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);

}

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();

    fight();

});

