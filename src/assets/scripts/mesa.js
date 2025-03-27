import Phaser from "phaser";

export class Mesa extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,texture){
        super(scene,x,y,texture);
        

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = texture;

        this.bagsCoffee = 0;

        this.idAleatoryBag = 0;

        this.scene.score.setText(`Puntaje: ${this.bagsCoffee}`);

        this.scene.physics.add.existing(this);

        //Cambiar Box Collider
        this.setSize(160, 100)
        this.setOffset(0,0);

        //Hacer inamovible la mesa y con colision
        this.setImmovable(true);

        //la mesa existe en la escena
        this.scene.add.existing(this);

        //Desactivo las fisicas para el truck
        this.body.setAllowGravity(false);


    }

    handleCollisionWithPlayer(){
        console.log(`la mesa tiene ${this.bagsCoffee} bolsas de cafe`);
        
        //Agrego una bolsa a la mesa
        this.bagsCoffee += 1;

        this.scene.score.setText(`Puntaje: ${this.bagsCoffee*10}`);
        
        let newBagY = 358;
        let newBagX = 20;

        //Posicion del en el eje y para dibujar
        //en la 1era o 2da fila
        if(this.bagsCoffee < 20){
            newBagY = newBagY - (this.bagsCoffee * 10);
        }else{
            newBagY = 578 - (this.bagsCoffee * 10);

        }
    

        //Reseteo del contandor de id sprite
        if(this.idAleatoryBag > 2){
            this.idAleatoryBag = 0;
        }

        //Creacion de sacos con rotacion o sin esta
        if(this.idAleatoryBag<2 && this.bagsCoffee <=40){
            this.scene.add.image(newBagX,newBagY , `bag-table-${this.idAleatoryBag}`).setOrigin(0, 0);

        }else if(this.bagsCoffee <=40){
            let randomRotation = Math.random() < 0.5 ? -7 : 7;

            this.scene.add.image(newBagX,newBagY , `bag-table-${this.idAleatoryBag}`)
            .setOrigin(0, 0)
            .setRotation(Math.PI / 180 * randomRotation);
        }


        

        this.idAleatoryBag +=1;
        
        //this.scene.add.image(20,348, "bag-table-0").setOrigin(0, 0);
    }

}