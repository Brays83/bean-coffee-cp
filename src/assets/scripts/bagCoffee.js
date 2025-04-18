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

        this.setImmovable(false);

        //Objeto inactivo y invisible
        this.setActive(false);
        this.setVisible(false);

        this.body.setSize(102, 30);
        this.body.setOffset(0,10);

        //Activa la fisica
        this.body.setAllowGravity(true);


        
        
        if(!this.scene.anims.exists("bag-animations")){

            this.scene.anims.create({
                key: "bag-animations",
                frames: [
                    {key: "bag0"},
                    {key: "bag1"},
                    {key: "bag2"}
                ],
                frameRate: 5,
                repeat: 0  
            }); 

        }

        

        

        this.play("bag-animations");
    }

    

    update(){
        if (this.x < -50) {
            this.setActive(false);
            this.setVisible(false);
            this.destroy();
        }else if(this.y > 470){
            this.setActive(false);
            this.setVisible(false);
            this.destroy(); 
        }
    }

    handleCollisionWithNieve(){
        console.log("Bolsa toca el piso")
        this.body.enable = false;

        this.scene.sound.play("splopBag");

        //Cambiamos textura de la bolsa a destruida
        this.setTexture("bag_destroy");
        //Detenemos la bolsa
        this.setVelocity(0,0);
        //Ejecutamos funcion
        this.scene.tweens.add({
            targets: this,
            alpha: { from: 1, to: 0 }, // Opacidad de 100% a 0%
            duration: 1500, // Tiempo en milisegundos
            ease: "Linear",
            onComplete: () => { 
                this.destroy(); // Destruye el objeto cuando termine el tween
            }
        });
    }
}