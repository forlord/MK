/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const $randomButton = document.querySelector('.button');
function gameOverOld(player) {
    $randomButton.style.display = 'none';
    const name = (player.player === 1) ? player2.name : player1.name;
    $arenas.appendChild(playerWin(name));
    createReloadButton();
}
export const getDamage = (max) => getRandom(1, max);
/*
 $randomButton.addEventListener('click', function () {
 const player = (getRandom(1, 2) == 1) ? player1 : player2;
 player.changeHP(getDamage(30));
 player.renderHP();
 if (player.hp === 0)
 gameOver(this);
 });*/
