import Phaser from "phaser";
import { Player } from "./player.js";
import { Mesa } from "./mesa.js";
import { BagCoffee } from "./bagCoffee.js";
import { Truck } from "./truck.js";



export class MainScene extends Phaser.Scene{
    constructor(){
        super("MainScene");

        this.fontSettings = { 
            fontFamily: 'ui_Player', 
            fontSize: '32px',
            stroke: '#000000',
            color: '#ffffff',
            strokeThickness: 4 
        }

        this.score = 0;
        this.bagsCoffee = [];
        this.items = [];
        
        
        /**
         * Pixeles de la escena
         * 872
         * 470
         */

    }

    preload(){
        this.load.font("ui_Player","src/assets/fonts/16_Klickclack.ttf")

        this.load.image("scene","src/assets/sprites/scene/1.png");

        this.load.image("bag0","src/assets/sprites/bag/1.png");
        this.load.image("bag1","src/assets/sprites/bag/2.png");
        this.load.image("bag2","src/assets/sprites/bag/3.png");
        this.load.image("bag_destroy","src/assets/sprites/bag_destroy/1.png");

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

        this.load.image("bang_0","src/assets/sprites/Bang/1.png");
        this.load.image("bang_1","src/assets/sprites/Bang/2.png");
        this.load.image("bang_2","src/assets/sprites/Bang/3.png");
        this.load.image("bang_3","src/assets/sprites/Bang/4.png");
        this.load.image("bang_4","src/assets/sprites/Bang/5.png");
        this.load.image("bang_5","src/assets/sprites/Bang/6.png");
        this.load.image("bang_6","src/assets/sprites/Bang/7.png");

        this.load.audio("beanbagLand","src/assets/sounds/13_sound_beanbagLand.mp3");
        this.load.audio("beanbagPlace","src/assets/sounds/12_sound_beanbagPlace.mp3");
        this.load.audio("beanCounters","src/assets/sounds/1_sound_beanCounters.mp3");
        this.load.audio("splopBag","src/assets/sounds/6_sound_splopbag.mp3");

        this.load.audio("anvil_floor","src/assets/sounds/10_sound_anvil.mp3");
        this.load.audio("fish_floor","src/assets/sounds/5_sound_splop.mp3");
        this.load.audio("vase_floor","src/assets/sounds/9_sound_vase.mp3");

        this.load.audio("toon_hit","src/assets/sounds/3_sound_toonhit.mp3");
        
        

        this.load.image("anvil","src/assets/sprites/anvil/196.png");
        this.load.image("anvil_crack","src/assets/sprites/anvil/198.png");
        this.load.image("fish","src/assets/sprites/fish/202.png");
        this.load.image("fish_floor","src/assets/sprites/fish/204.png");
        this.load.image("vase","src/assets/sprites/vase/189.png");
        this.load.image("vase_floor","src/assets/sprites/vase/191.png");
        
        
    }
    create(){
        //Obtenemos el valor del formulario


        this.sound.stopAll();

        this.sound.play("beanCounters");
        
        //  Cargamos el escenario base
        this.add.image(0, 0, "scene").setOrigin(0, 0);


        //Caargamos la nieve del piso
        this.add.image(140, 380, "nieve-piso").setOrigin(0, 0);
        //this.physics.add.staticImage(140, 380, "nieve-piso").setOrigin(0, 0);

        //UI Player
        this.lives = this.add.text(50, 20, 'vidas:',this.fontSettings );
        this.score = this.add.text(200, 20, 'puntaje:',this.fontSettings );

        //Cargamos el jugador
        //new Player(*Envio escena actual*, *Posicion x*, *Posicion y*, *Envio Textura*);
        this.player = new Player(this, 400, 350, "player-free");
        
        
        //Cargamos la mesa
        this.mesa = new Mesa(this,0, 372, "mesa");
        this.mesa.setOrigin(0,0)

        //Cargamos la nieve
        //this.add.image(0, 435, "nieve").setOrigin(0, 0);
        this.nieve = this.physics.add.staticImage(0, 435, "nieve")
        .setOrigin(0, 0);
        this.nieve.body.setSize(872,50).setOffset(435,40);
        

        //Cargamos el camion
        this.truck = new Truck(this, 590, 70, "truck");
        this.truck.setOrigin(0, 0);


        //Cargamos la bolsa de cafe
        this.input.keyboard.on("keydown-" + "SPACE", (e) => {
            
            this.truck.spawnOfItems();
            console.log(`Objetos creados: ${this.objects}`);

        });
        

        //Agregar colision al grupo de bolsas de cafe
        
        //Overlap se usa mejor para recoletar objetos
        this.physics.add.overlap(this.player, this.bagsCoffee, (player, bag) => 
            {
            player.handleCollisionWithBag(bag);
            },null,this.player);
        
        this.physics.add.overlap(this.player,this.items,(player,item)=>{
            player.handleCollisionWithItem(item);

        },null,this.player);
        //Collider se usa mejor para interactuar con objetos golpes
        this.physics.add.collider(this.player, this.mesa, 
            (player, mesa) => player.handleCollisionWithTable(mesa), 
            null, 
            this
        );
        
        this.physics.add.collider(this.player,this.truck);

        this.physics.add.collider(this.bagsCoffee, this.nieve, (bag, nieve) => {
            
            bag.handleCollisionWithNieve();
            
        });

        this.physics.add.collider(this.items,this.nieve,(item) =>{
            item.handleCollisionWithNieve();
        })

        /**
         * Crear variable local
         * var fondo = this.add.image(0, 0, "scene").setOrigin(0, 0); 
         * 
         * Crea variable global
         * this.fondo = this.add.image(0, 0, "scene").setOrigin(0, 0);
         */

        // Evento para limpiar objetos cuando la escena se reinicia
        this.events.on('shutdown', () => {
            this.player.destroy();
            this.mesa.destroy();
        });

  

    }
    update(){
        
        
        this.player.update();
        console.log(`vidas: ${this.player.lives}`)
        console.log(`Bolsas cargadas: ${this.player.bagCoffee}`)

        //Reproducir musica 
    }

}