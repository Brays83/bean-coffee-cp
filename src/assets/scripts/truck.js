import Phaser from "phaser";

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

        this.body.setSize(130, 417);
        this.body.setOffset(80, 0);

        this.setImmovable(true);
    }

    handleMovementBags(){


    }

        
}