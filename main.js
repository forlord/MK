const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
// выбор противников, кто Комп, а кто реальный
let Fighters = {}; 

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
    Fighters = getRandom(1, 2) == 1 ? {enemy: player1, player: player2} : {enemy: player2, player: player1};
    setBorder(Fighters.enemy.player, '2px solid #f00');
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

    Fighters.enemy.changeHP(damageEnemmy);
    Fighters.enemy.renderHP();
    Fighters.player.changeHP(damagePlayer);
    Fighters.player.renderHP();
    if (Fighters.player.hp === 0 && Fighters.enemy.hp > 0) {
        console.log('enemy wins')
        gameOver(Fighters.enemy);
    } else if (Fighters.enemy.hp === 0 && Fighters.player.hp > 0) {
        console.log('player wins')
        gameOver(Fighters.player);
    } else if (Fighters.player.hp === 0 && Fighters.enemy.hp === 0) {
        console.log('draw')
        gameOver();
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

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    fight();
});

