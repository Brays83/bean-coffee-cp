import Phaser from "phaser";
import { BagCoffee } from "./bagCoffee.js";
import { Item } from "./item.js";
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

        this.velocitysXOptions = [-270,-200,-60];
        this.randonItem = ["fish","anvil","vase"];

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        //Desactivo las fisicas para el truck
        this.body.setAllowGravity(false);

        this.body.setSize(130, 417);
        this.body.setOffset(80, 0);

        this.setImmovable(true);
    }

    handleLaunchBag(bag){
        bag.setActive(true);
        bag.setVisible(true);

        //this.scene.physics.world.enable(bag);
        
        bag.body.setAllowGravity(true);
        let randonIndex = Phaser.Math.Between(0,2);

        let velocityX = this.velocitysXOptions[randonIndex];

        
        //Velocidad de la bolsa de café izquierda
        bag.setVelocity(velocityX, -500);

        //Aumento gravedad
        bag.body.setGravityY(900);

        
    }

    handleLaunchItems(item){
        item.setActive(true);
        item.setVisible(true);

        //this.scene.physics.world.enable(bag);
        
        item.body.setAllowGravity(true);

        let randonIndex = Phaser.Math.Between(0,2);

        let velocityX = this.velocitysXOptions[randonIndex];
        
        //Velocidad de la bolsa de café izquierda
        item.setVelocity(velocityX, -500);

        //Aumento gravedad
        item.body.setGravityY(950);

        
    }

    spawnOfItems(){
        //Variable para la probabilidad de que salga un objeto
        let probability = Phaser.Math.Between(0,100) <= 70; //Probabilidad del 70% salga bolsa
        let randomNumberY = Phaser.Math.Between(100,300);

        if(probability){
            let bag = new BagCoffee(this.scene, this.x + 50, randomNumberY, "bag0");
            this.scene.bagsCoffee.push(bag);
            this.scene.physics.add.existing(bag);
            this.handleLaunchBag(bag);
        }else{

            let probabilityItem = Phaser.Math.Between(0,100) ;
            let probabilityRango = [
                {max:60,type:"fish"},//60%
                {max:80,type:"anvil"},//20%
                {max:100,type:"vase"}//20%
            ]
            let chosenObjectType = null;
            
            for(let range of probabilityRango){
                if(probabilityItem <= range.max){
                    chosenObjectType = range.type;
                    break;
                }
            }

            //no se genera nada si es null
            if (!chosenObjectType) return;
            

            let item = new Item(this.scene,this.x + 50,randomNumberY,chosenObjectType);
            
            if (chosenObjectType === "fish") item.body.setSize(135, 30);
            if (chosenObjectType === "anvil") item.body.setSize(100, 30);
            if (chosenObjectType === "vase") item.body.setSize(45, 100);
            
            this.scene.items.push(item);
            this.scene.physics.add.existing(item);
            this.handleLaunchItems(item);
        }

    }

        
}