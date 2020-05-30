var Car;
var ground, invisibleGround, groundImage;
var Cari;
var Cari2;
var groundi;
var demon;
var demond;
var fuel;
var health;
var lizard;
//var Dragon;
//Dragoni;
var Medusa;
var monstersGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;



function preload(){
 // Cari=loadImage("Images/Car.png");
groundi=loadImage("Images/final.png");

demon=loadAnimation("Images/DWalk6.png","Images/DWalk5.png","Images/DWalk4.png","Images/DWalk3.png",
"Images/DWalk2.png","Images/DWalk1.png","Images/DIdle3.png","Images/DIdle2.png","Images/DIdle1.png",
"Images/DAttack4.png");

demond=loadAnimation("Images/Death6.png");

//Dragoni=loadAnimation("Images/DrAttack1.png","Images/DrAttack2.png","Images/DrAttack3.png","Images/DrAttack4.png")

Lizard=loadAnimation("Images/LWalk6.png","Images/LWalk5.png","Images/LWalk4.png","Images/LWalk3.png",
"Images/LWalk2.png","Images/LWalk1.png","Images/LIdle3.png","Images/LIdle2.png","Images/LIdle1.png",
"Images/LAttack1.png","Images/LAttack2.png","Images/LAttack3.png","Images/LAttack4.png","Images/LAttack5.png");

Medusa=loadAnimation("Images/MWalk1.png","Images/MWalk2.png","Images/MWalk3.png",
"Images/MWalk4.png","Images/MAttack1.png","Images/MAttack2.png","Images/MAttack3.png","Images/MAttack4.png",
"Images/MAttack5.png","Images/MAttack6.png");

Cari=loadImage("Images/car1.png");
Cari2=loadAnimation("Images/car1.png","Images/car2.png");

}

function setup() {
  createCanvas(displayWidth, displayHeight);
  Car=createSprite(displayWidth/7.7,displayHeight/1.49,30,20);
  ground=createSprite(displayWidth/2,displayHeight-150,displayWidth,10);
 // Dragon=createSprite(displayWidth/1,displayHeight/5,20,10);
  //Dragon.addAnimation("d",Dragoni);
 

 fuel=50;
 health=50;
  Car.addAnimation("c",Cari);
  Car.addAnimation("t",Cari2);
  ground.addImage(groundi);
  Car.scale=0.5;
  //Dragon.velocityX=-8;
  monstersGroup=new Group();
}

function draw() {
  background(200);
  fill("red");
  text("Fuel: "+ fuel, displayWidth/9, displayHeight/10);
  text("Health: "+ health, displayWidth/5, displayHeight/10);
  //textSize(300);
  if(gameState === PLAY){
   
    if(keyDown(RIGHT_ARROW)){
      ground.velocityX=-15;
      fuel = fuel -  Math.round(getFrameRate()/62);
      Car.changeAnimation("t",Cari2);
    }
    if(keyWentUp(RIGHT_ARROW)){
      ground.velocityX=0;
      Car.changeAnimation("c",Cari);
     fuel = fuel  //  Math.round(getFrameRate()/10000);
    }
    
     if(ground.x<0){
       ground.x=ground.width/2;
       
     }

    spawnMonsters();



    if(monstersGroup.isTouching(Car)){
    health=health-10;
    
      }
     

    Car.setCollider("circle",0,0,5);
    
    if (fuel===0){
      gameState = END;
    }
    if (health===0){
      gameState = END;
    }
    }

    else if(gameState === END) {

      if(keyDown(RIGHT_ARROW)){
      ground.velocityX=0;
    
    }
    if(keyWentUp(RIGHT_ARROW)){
      ground.velocityX=0;
    
    }
   // monstersGroup.setVelocityXEach(0);
    Car.changeAnimation("c",Cari);
      
       }    
  
    

 drawSprites();
    }
 

    function spawnMonsters() {
      if(frameCount % 120 === 0) {
        var monsters= createSprite(displayWidth/1,displayHeight/1.54,10,40);
        monsters.velocityX = -12;
        
       
        var rand = Math.round(random(1,3));
       switch(rand){
         case 1:monsters.addAnimation(demon);
         break;
         case 2:monsters.addAnimation(Medusa);
         break;
         case 3:monsters.addAnimation(Lizard);
         break;
        // case 4:obstacle.addImage(ob4);
       //  break;
       //  case 5:obstacle.addImage(ob5);
       //  break;
       //  case 6:obstacle.addImage(ob6);
        // break;
         default:break;
       }
        
                 
        //monsters.scale = 0.5;
      //  monsters.lifetime = 100;
        monstersGroup.add(monsters);
      }
    }