import Phaser from 'phaser';

const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    
    scene: {
        preload,
        create,
        update
    }
};

new Phaser.Game(config);

function preload() {
  this.load.image('player','src/assets/sprites/1.png')
  this.load.image('scene','')

}
function create() {
  this.add.image(400, 300, 'player')

}
function update() {

}


