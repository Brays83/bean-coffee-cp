import Phaser from "phaser";

export class Scene1 extends Phaser.Scene{
    constructor(){
        super("Scene1");
    }

    preload(){
        this.load.image("scene","src/assets/sprites/scene/1.png");

    }
    create(){
        this.add.image(0, 0, "scene")
        .setOrigin(0, 0);

    }
    update(){

    }
}