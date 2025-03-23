import Phaser from "phaser";
import { BagCoffee } from "./bagCoffee.js";
export class Truck extends Phaser.Physics.Arcade.Sprite {

    /**
     * Pixeles de la escena
     * 872
     * 470
     */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = texture;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        //Desactivo las fisicas para el truck
        this.body.setAllowGravity(false);

        this.body.setSize(130, 417);
        this.body.setOffset(80, 0);

        this.setImmovable(true);
    }

    handleLaunch(bag){
        bag.setActive(true);
        bag.setVisible(true);

        //this.scene.physics.world.enable(bag);
        
        bag.body.setAllowGravity(true);

        let velocityRandom = Phaser.Math.Between(-100,-300);
        
        //Velocidad de la bolsa de café izquierda
        bag.setVelocity(velocityRandom, -500);

        //Aumento gravedad
        bag.body.setGravityY(900);

        
    }

    spawnOfBags(){
        let randomNumberY = Phaser.Math.Between(100,300);

        /*
        let bag = this.scene.bagsCoffee.get(
            this.scene.truck.x + 50 ,
            randomNumberY
        );*/
        let bag = new BagCoffee(this.scene, this.scene.truck.x + 50, randomNumberY, "bag0");
        this.scene.bagsCoffee.push(bag);

        this.scene.physics.add.existing(bag);

        if(bag){
            
            this.handleLaunch(bag);
        }


        

    }

        
}