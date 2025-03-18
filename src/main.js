import Phaser from 'phaser';
import { Scene1 } from './assets/scripts/scene1';

const config = {
    type: Phaser.WEBGL,
    width: 872,
    height: 470,
    backgroundColor: 'green',
    scene: Scene1 
};

new Phaser.Game(config);
/*
function preload() {
  this.load.image('player','src/assets/sprites/1.png')
  this.load.image('scene','src/assets/sprites/scene/1.png')

}
function create() {
  this.add.image(400, 300, 'player')

}
function update() {

}*/


