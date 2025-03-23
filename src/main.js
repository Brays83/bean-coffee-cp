import Phaser, { Physics } from 'phaser';
import { MainScene } from './assets/scripts/mainScene';

const config = {
    type: Phaser.WEBGL,
    width: 872,
    height: 470,
    physics:{
      default: 'arcade',
      arcade:{
        gravity: {y: 10},
        debug: true,
        
      }
    },
    backgroundColor: 'green',
    scene:  MainScene
};

new Phaser.Game(config);


