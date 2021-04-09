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
    }
};
const player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['f1', 'f2', 'f3'],
    attack: function () {
        console.log(this.name + ' Fight...');
    }
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

function changeHP() {
    const player = (getRandom(1, 2) == 1) ? player1 : player2;
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    const damage = getDamage(30);
    player.hp -= damage;
    if (player.hp < 0) {
        player.hp = 0;
        $playerLife.style.width = player.hp + '%'
        $randomButton.disabled = true;
        const name = (player.player === 1) ? player2.name : player1.name;
        $arenas.appendChild(playerWin(name));
        if (confirm('Replay?')) {
            resetPlayer(player1);
            resetPlayer(player2);
            removeElement('.loseTitle');
            $randomButton.disabled = false;
        }
        return;
    }
    $playerLife.style.width = player.hp + '%'
}
function playerLose(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' lose'
}
function playerWin(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' Win';
    return $loseTitle;
}
function removeElement(className) {
    document.querySelector(className).remove();
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$randomButton.addEventListener('click', function () {
    changeHP()
})