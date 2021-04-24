/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

export const $formFight = document.querySelector('.control');
export const $arenas = document.querySelector('.arenas');
export const getDamage = (max) => getRandom(1, max);

export const getRandom = (min, max) => min + Math.round(Math.random() * (max - min));

export const setBorder = (player, style) => {
    const $enemy = document.querySelector('.player' + player + ' .character');
    $enemy.style.borderBottom = style;
}

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

export const removeElement = (className) => document.querySelector(className).remove();

export const playerWin = (name) => {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' Wins';
    return $loseTitle;
}

export function createPlayer(plObject) {

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

function playerLose(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' lose';
}

function resetPlayer(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp = 100;
    $playerLife.style.width = player.hp + '%';
}


export function gameOver(player) {
    $formFight.style.display = 'none';
    const name = player ? player.name : 'Draw';
    $arenas.appendChild(playerWin(name));
    createReloadButton();
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText = 'Restart';
    $reloadWrap.appendChild($button);
    $arenas.appendChild($reloadWrap);

    $reloadWrap.addEventListener('click', function () {
        window.location.reload();
        /*
         но можно красиво все убрать
         */
        /*resetPlayer(player1);
         resetPlayer(player2);
         removeElement('.loseTitle');
         
         $formFight.style.display = 'block';
         removeElement('.reloadWrap');
         reInitPlayres();*/
    });
}

