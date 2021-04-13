const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['f1', 'f2', 'f3'],
    attack: function () {
        console.log(this.name + ' Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
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
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
};



function createElement(tag, className) {
    const $tag = document.createElement(tag)
    if (className) {
        $tag.classList.add(className);
    }
    return $tag
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
    $playerLife.style.width = player.hp + '%'
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
    if (this.hp === 0)
        gameOver(this);
}
function gameOver(player) {
    $randomButton.style.display = 'none';
    const name = (player.player === 1) ? player2.name : player1.name;
    $arenas.appendChild(playerWin(name));
    createReloadButton();
}

function playerLose(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' lose'
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
        $randomButton.style.display = 'block';
        removeElement('.reloadWrap');

    });
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$randomButton.addEventListener('click', function () {
    const player = (getRandom(1, 2) == 1) ? player1 : player2;
    player.changeHP(getDamage(30));
    player.renderHP();
});