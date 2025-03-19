import Phaser from "phaser";
export class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture){
        super(scene,x,y,texture);

        //Variables de la clase
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = texture;

       

        //Añadir Fisicas
        this.scene.physics.add.existing(this);
        //Añadir existencia en la escena
        this.scene.add.existing(this);

        //Animacion
       


    }

    update(){
        // Capturo el puntero
        let pointer = this.scene.input.activePointer;
        //muevo al jugador
        this.scene.physics.moveTo(this, pointer.x, this.y,350);
        
        //detengo al jugador en x
        if (Math.abs(this.x - pointer.x) < 10) {
            this.setVelocityX(0);
        }

        
        
    }
}