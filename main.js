

import {player1, player2} from '../assets/js/players.js';
import {generateLogs, logs} from '../assets/js/logs.js';

import {$formFight, $arenas, getRandom, setBorder, playerWin, createElement, removeElement, createPlayer, gameOver} from '../assets/js/functions.js';

const HIT = {
    head: 70,
    body: 75,
    foot: 70
};
const ATTACK = ['head', 'body', 'foot'];

let fighters = {};

// выбор противников, кто Комп, а кто реальный





// только создание героев, лог старта и, функцию submit.


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
        gameOver(fighters.enemy);
        generateLogs('end', fighters.enemy, fighters.player);
    } else if (fighters.enemy.hp === 0 && fighters.player.hp > 0) {
        gameOver(fighters.player);
        generateLogs('end', fighters.player, fighters.enemy);
    } else if (fighters.player.hp === 0 && fighters.enemy.hp === 0) {
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





$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
initPlayres();

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    fight();
});

