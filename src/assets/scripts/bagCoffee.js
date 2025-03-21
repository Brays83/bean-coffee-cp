import Phaser from "phaser";

export class BagCoffee extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,texture){
        super(scene,x,y,texture);

        //Variables de la clase
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = texture;

        this.scene.physics.add.existing(this);

        this.scene.add.existing(this)

        this.setImmovable(true);
        if(!this.scene.anims.exists("bag-animations")){

            this.scene.anims.create({
                key: "bag-animations",
                frames: [
                    {key: "bag0"},
                    {key: "bag1"},
                    {key: "bag2"}
                ],
                frameRate: 5,
                repeat: -1  
            }); 

        }

        

        this.play("bag-animations");
    }
}