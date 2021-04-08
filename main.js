const SCORPION = {
    name: 'SCORPION',
    hp: 70,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['f1', 'f2', 'f3'],
    attack: function () {
        console.log(this.name + ' Fight...');
    }
};
const SUBZERO = {
    name: 'SUB-ZERO',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['f1', 'f2', 'f3'],
    attack: function () {
        console.log(this.name + ' Fight...');
    }
};

function createPlayer(plConst, plObject) {
    
    
    const $player = document.createElement('div');
    $player.classList.add(plConst);
    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = plObject.hp+'%';

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerHTML = plObject.name;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    
    $player.appendChild($progressbar);


    const $character = document.createElement('div');
    $character.classList.add('character');

    const $img = document.createElement('img');
    $img.src = plObject.img;

    $character.appendChild($img);
    $player.appendChild($character);

    const $root = document.querySelector('.arenas');
    $root.appendChild($player);

}
createPlayer('player1', SCORPION);
createPlayer('player2', SUBZERO);
