/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {player1, player2} from './players.js';
import {generateLogs, logs} from './logs.js';
import {$formFight, $arenas, setBorder, playerWin, createElement, removeElement, createPlayer, gameOver} from './functions.js';
import {getRandom} from './random.js';

const HIT = {
    head: 70,
    body: 75,
    foot: 70
};
const ATTACK = ['head', 'body', 'foot'];

class Game {
    fighters;
    constructor() {


    }
    start() {
        $arenas.appendChild(createPlayer(player1));
        $arenas.appendChild(createPlayer(player2));
        this.initPlayres();
        this.initButtons();
    }
    initButtons() {
        $formFight.addEventListener("submit", (e) => {
            e.preventDefault();
            this.fight()
        }, false);
    }
    initPlayres() {
        this.fighters = getRandom(1, 2) == 1 ? {enemy: player1, player: player2} : {enemy: player2, player: player1};
        setBorder(this.fighters.enemy.player, '2px solid #f00');
        generateLogs('start', this.fighters.enemy, this.fighters.player);
    }
    reInitPlayres() {
        setBorder(1, 'none');
        setBorder(2, 'none');
        initPlayres();
    }
    fight() {
        const enemy = this.enemyAttack();
        const player = this.playerAttack();
        const damageEnemmy = enemy.defence !== player.hit ? player.value : 0;
        const damagePlayer = player.defence !== enemy.hit ? enemy.value : 0;

        this.fighters.enemy.changeHP(damageEnemmy);
        this.fighters.enemy.renderHP();

        this.fighters.player.changeHP(damagePlayer);
        this.fighters.player.renderHP();

        if (damageEnemmy) {
            generateLogs('hit', this.fighters.enemy, this.fighters.player, -damageEnemmy);
        } else {
            generateLogs('defence', this.fighters.enemy, this.fighters.player);
        }

        if (damagePlayer) {
            generateLogs('hit', this.fighters.player, this.fighters.enemy, -damagePlayer);
        } else {
            generateLogs('defence', this.fighters.player, this.fighters.enemy);
        }

        if (this.fighters.player.hp === 0 && this.fighters.enemy.hp > 0) {
            gameOver(this.fighters.enemy);
            generateLogs('end', this.fighters.enemy, this.fighters.player);
        } else if (this.fighters.enemy.hp === 0 && this.fighters.player.hp > 0) {
            gameOver(this.fighters.player);
            generateLogs('end', this.fighters.player, this.fighters.enemy);
        } else if (this.fighters.player.hp === 0 && this.fighters.enemy.hp === 0) {
            gameOver();
            generateLogs('draw', this.fighters.enemy, this.fighters.player);
        }

    }
    enemyAttack() {
        const hit = ATTACK[getRandom(0, 2)];
        const defence = ATTACK[getRandom(0, 2)];
        return {
            value: getRandom(1, HIT[hit]),
            hit,
            defence
        };
    }
    playerAttack() {
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
}

export default Game;




