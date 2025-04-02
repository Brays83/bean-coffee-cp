import Phaser, { Physics } from 'phaser';
import { MainScene } from './assets/scripts/mainScene';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './assets/styles/style.css'





const config = {
    type: Phaser.WEBGL,
    width: 872,
    height: 470,
    physics:{
      default: 'arcade',
      arcade:{
        gravity: {y: 10},
        debug: false,
        
      }
    },
    backgroundColor: 'green',
    scene:  MainScene
};

new Phaser.Game(config);

