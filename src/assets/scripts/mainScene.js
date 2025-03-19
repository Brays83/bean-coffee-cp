import Phaser from "phaser";
import { Player } from "./player.js";
import { Mesa } from "./mesa.js";

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
        this.load.image("player","src/assets/sprites/player/1.png");
        this.load.image("mesa","src/assets/sprites/mesa/1.png");
        this.load.image("nieve","src/assets/sprites/scene/342.png");
        this.load.image("nieve-piso","src/assets/sprites/scene/529.png");
        this.load.image("camion","src/assets/sprites/camion/1.png");

    }
    create(){
        
        //  Cargamos el escenario base
        this.add.image(0, 0, "scene").setOrigin(0, 0);


        //Caargamos la nieve del piso
        this.add.image(140, 380, "nieve-piso").setOrigin(0, 0);

        //Cargamos el jugador
        //new Player(*Envio escena actual*, *Posicion x*, *Posicion y*, *Envio Textura*);
        this.player = new Player(this, 400, 350, "player");
        
        
        //Cargamos la mesa
        this.mesa = new Mesa(this,0, 372, "mesa");
        this.mesa.setOrigin(0,0)

        //Cargamos la nieve
        this.add.image(0, 435, "nieve").setOrigin(0, 0);

        //Cargamos el camion
        this.add.image(590, 70, "camion").setOrigin(0, 0);

        /**
         * Crear variable local
         * var fondo = this.add.image(0, 0, "scene").setOrigin(0, 0); 
         * 
         * Crea variable global
         * this.fondo = this.add.image(0, 0, "scene").setOrigin(0, 0);
         */

    }
    update(){
        this.player.update();
        
    }
}