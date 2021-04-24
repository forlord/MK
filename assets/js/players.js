/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

export const player1 = {
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
export const player2 = {
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


function changeHP(damage) {
   
    this.hp -= damage;
    if (this.hp < 0) {
        console.log('vbye')
        this.hp = 0;
    }
}
function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}
function renderHP() {
    this.elHP().style.width = this.hp + '%';

}