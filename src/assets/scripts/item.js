import Phaser from "phaser";

export class Item extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture){
        super(scene,x,y,texture)


        //Variables de la clase
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = texture;

        this.scene.physics.add.existing(this);

        this.scene.add.existing(this);

        //Objeto inactivo y invisible
        this.setActive(false);
        this.setVisible(false);

        this.body.setSize(102, 30);
        this.body.setOffset(0,10);

        //Activa la fisica
        this.body.setAllowGravity(true);

        //Creamos Sprite para la colision con el player
        this.bangSprite = this.scene.add.sprite(this.x,this.y,"bang_0")
        .setVisible(false);

        this.scene.anims.create({
            key: "bang_animation",
            frames: [
                {key: "bang_0"},
                {key: "bang_1"},
                {key: "bang_2"},
                {key: "bang_3"},
                {key: "bang_4"},
                {key: "bang_5"},
                {key: "bang_6"}

            ],
            frameRate: 5,
            repeat: 0	
        })
    }

    startBangAnimation(){
        this.bangSprite.setVisible(true);
        this.bangSprite.play("bang_animation");
        
    }

    stopBangAnimation(){
        this.bangSprite.setVisible(false);
    }

    handleCollisionWithNieve(){
        //Desactivamos la colision
        this.body.enable = false;

        let anvil_crack = null;

       

        //Cambiamos textura
        if(this.texture === "anvil"){
            anvil_crack = this.scene.add.image(this.x,this.y+30,"anvil_crack")
            this.scene.sound.play("anvil_floor");
        }else if(this.texture ==="fish"){
            this.setTexture("fish_floor");
            this.scene.sound.play("fish_floor");

        }else{
            this.setTexture("vase_floor");
            this.scene.sound.play("vase_floor");
            

        }
        
        //Detenemos el objeto
        this.setVelocity(0,0);
        //Ejecutamos funcion
        this.scene.tweens.add({
            targets: this,
            alpha: { from: 1, to: 0 }, // Opacidad de 100% a 0%
            duration: 1500, // Tiempo en milisegundos
            ease: "Linear",
            onComplete: () => { 
                if(anvil_crack) anvil_crack.destroy();
                this.destroy(); // Destruye el objeto cuando termine el tween
            }
        });
    }
}