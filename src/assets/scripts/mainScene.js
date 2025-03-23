import Phaser from "phaser";
import { Player } from "./player.js";
import { Mesa } from "./mesa.js";
import { BagCoffee } from "./bagCoffee.js";
import { Truck } from "./truck.js";

export class MainScene extends Phaser.Scene{
    constructor(){
        super("MainScene");

        this.score = 0;

        
        /**
         * Pixeles de la escena
         * 872
         * 470
         */

    }

    preload(){
        this.load.image("scene","src/assets/sprites/scene/1.png");

        this.load.image("bag0","src/assets/sprites/bag/1.png");
        this.load.image("bag1","src/assets/sprites/bag/2.png");
        this.load.image("bag2","src/assets/sprites/bag/3.png");

        this.load.image("bag-table-0","src/assets/sprites/bag/497.png");
        this.load.image("bag-table-1","src/assets/sprites/bag/496.png");
        this.load.image("bag-table-2","src/assets/sprites/bag/511.png");
  
        
        this.load.image("player-free","src/assets/sprites/player/1.png");
        this.load.image("player-coffe1","src/assets/sprites/player/2.png");
        this.load.image("player-coffe2","src/assets/sprites/player/3.png");
        this.load.image("player-coffe3","src/assets/sprites/player/4.png");
        this.load.image("player-coffe4","src/assets/sprites/player/5.png");
        this.load.image("player-coffe5","src/assets/sprites/player/6.png");
        this.load.image("player-coffe-tired","src/assets/sprites/player/7.png");
        this.load.image("player-anvil","src/assets/sprites/player/8.png");
        this.load.image("player-fish","src/assets/sprites/player/9.png");
        this.load.image("player-vase","src/assets/sprites/player/10.png");

        this.load.image("player-cry-0","src/assets/sprites/player/111.png");
        this.load.image("player-cry-1","src/assets/sprites/player/112.png");
        this.load.image("player-cry-2","src/assets/sprites/player/113.png");


        this.load.image("mesa","src/assets/sprites/mesa/1.png");
        this.load.image("nieve","src/assets/sprites/scene/342.png");
        this.load.image("nieve-piso","src/assets/sprites/scene/529.png");
        this.load.image("truck","src/assets/sprites/camion/1.png");

        this.load.audio("beanbagLand","src/assets/sounds/13_sound_beanbagLand.mp3");
        this.load.audio("beanbagPlace","src/assets/sounds/12_sound_beanbagPlace.mp3");
        this.load.audio("beanCounters","src/assets/sounds/1_sound_beanCounters.mp3");
        
    }
    create(){

        this.sound.play("beanCounters");
        
        //  Cargamos el escenario base
        this.add.image(0, 0, "scene").setOrigin(0, 0);


        //Caargamos la nieve del piso
        this.add.image(140, 380, "nieve-piso").setOrigin(0, 0);

        //Cargamos el jugador
        //new Player(*Envio escena actual*, *Posicion x*, *Posicion y*, *Envio Textura*);
        this.player = new Player(this, 400, 350, "player-free");
        
        
        //Cargamos la mesa
        this.mesa = new Mesa(this,0, 372, "mesa");
        this.mesa.setOrigin(0,0)

        //Cargamos la nieve
        this.add.image(0, 435, "nieve").setOrigin(0, 0);

        //Cargamos el camion
        this.truck = new Truck(this, 590, 70, "truck");
        this.truck.setOrigin(0, 0);


        //Creo un grupo de colisiones de las bolsas de cafe
        //this.bagsCoffee = this.physics.add.group();
        this.bagsCoffee = this.physics.add.group({
            classType: BagCoffee,
            /*defaultKey: "bag0",*/
            runChildUpdate: true,
        });
        

        //Cargamos la bolsa de cafe
        this.input.keyboard.on("keydown-" + "SPACE", (e) => {
            
            this.truck.spawnOfBags();

            console.log(`lanzar bolsa de cafe: ${this.bagsCoffee.getLength()}`);
            /*
            let bagCoffee = new BagCoffee(this, 600, 300, "bag0");

            this.bagsCoffee.add(bagCoffee);
            bagCoffee.setOrigin(0,0);
            */

        });
        

        //Agregar colision al grupo de bolsas de cafe
        
        //Overlap se usa mejor para recoletar objetos
        this.physics.add.overlap(this.player, this.bagsCoffee, (player, bag) => 
            {
            player.handleCollisionWithBag(bag);
            },null,this.player);
        
        //Collider se usa mejor para interactuar con objetos golpes
        this.physics.add.collider(this.player, this.mesa,this.player.handleCollisionWithTable,null,this.player);
        
        this.physics.add.collider(this.player,this.truck);

        /*
        this.physics.add.overlap(this.player, this.bagsCoffee, this.player.handleCollisionWithBag, null, this.player);
        */
        
        

        
        

       

        /**
         * Crear variable local
         * var fondo = this.add.image(0, 0, "scene").setOrigin(0, 0); 
         * 
         * Crea variable global
         * this.fondo = this.add.image(0, 0, "scene").setOrigin(0, 0);
         */

    }
    update(){
        
        console.log(`vidas del pinguino: ${this.player.lives}`)
        this.player.update();

        //Reproducir musica

        
        
        

        
    }
}