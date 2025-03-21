import Phaser from "phaser";
export class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture){
        super(scene,x,y,texture);

        //Variables de la clase
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = texture;

        this.bagCoffee = 0;
        this.lives = 3;

        

        //Añadir Fisicas
        this.scene.physics.add.existing(this);
        //Añadir existencia en la escena
        this.scene.add.existing(this);

        //Editar Box-Collider
        this.body.setSize(130, 130);
        this.body.setOffset(40, 50);

        //Creamos animacion del lloro
        this.crySprite = this.scene.add.sprite(this.x, this.y, "player-cry-0")
        .setVisible(false)
        .setDepth(10);


        if (!this.scene.anims.exists("cry")) {
            this.scene.anims.create({
                key: "cry",
                frames: [
                    { key: "player-cry-0" },
                    { key: "player-cry-1" },
                    { key: "player-cry-2" }
                ],
                frameRate: 3,
                repeat: -1  
            });
        }
        

        
    }

    
    


    update(){
        //Verificamos si tenemos vidas (Probar poner en la colision con sacos)
        if(this.lives > 0 && this.bagCoffee <=5){
                // Capturo el puntero
            let pointer = this.scene.input.activePointer;
            //muevo al jugador
            this.scene.physics.moveTo(this, pointer.x, this.y,350);
            
            //detengo al jugador en x
            if (Math.abs(this.x - pointer.x) < 10) {
                this.setVelocityX(0);
            }

            //Verificamos para detener animacion 
            if(this.bagCoffee < 4 || this.bagCoffee > 5){
                this.stopCrying();

            }
            
            //Mover el llanto 
            this.crySprite.x = this.x+5;
            this.crySprite.y = this.y+25;

        }
        
    }

    startCrying() {
        this.crySprite.setVisible(true);
        this.crySprite.play("cry");

        
    }

    stopCrying() { 
        this.crySprite.setVisible(false);
        this.crySprite.stop();
    }

    handleCollisionWithBag(){

        this.bagCoffee += 1;

        //Cambiamos la textura del jugador con menos sacos
        if (this.bagCoffee >= 6) {
            //Destruimos el ultimo saco
            this.scene.bagCoffee.destroy();

            //Restamos una vida
            this.lives -= 1;
            
            //Cambiamos textura
            this.setTexture("player-coffe-tired");
            //Reseteamos la carga de sacos del player
            this.bagCoffee = 0;
            console.log(`sacos de cafe despues de la caida ${this.bagCoffee}`)

            //Esperamos 3 segundos
            if(this.lives <= 0){
                this.scene.time.delayedCall(5000, () => {
                    this.scene.scene.restart();
                });
            }else{
                this.scene.time.delayedCall(5000, () => {
                    this.setTexture("player-free");
                });
            }
            
        } else {
            this.setTexture("player-coffe" + this.bagCoffee);
            this.scene.bagCoffee.destroy();
        }

        //Verificamos si el jugador tiene que llorar
        if(this.bagCoffee >= 4){
            this.startCrying();

        }
    }

    resetBagCoffee(){
        this.setTexture("player-free");
        this.bagCoffee = 0;
    }

    handleCollisionWithTable(){

        //bandera que usamos para evitar que el evento de clic 
        //se registre múltiples veces dentro de la funcion

        if(!this.scene.isClickListenerActive){

            this.scene.isClickListenerActive = true;

            //El click solo se activa una vez
            this.scene.input.once("pointerdown", () => {
                //Verificamos q el jugador tenga sacos
                if (this.bagCoffee >= 1) { 
                    this.bagCoffee -= 1;
                    console.log(`Bolsas de cafe luego de entregar: ${this.bagCoffee}`);

                    //Añadimos una bolsa de cafe a la mesa
                    this.scene.mesa.handleCollisionWithPlayer();
                    
                    //Cambiamos la textura del jugador el jugador solo carga 5 sacos
                    if (this.bagCoffee >= 1 && this.bagCoffee<=5) {
                        this.setTexture("player-coffe" + this.bagCoffee);
                    } else {
                        this.setTexture("player-free");
                    }
                }

                this.scene.isClickListenerActive = false; 
                
            });

            
        }
    }

    
}