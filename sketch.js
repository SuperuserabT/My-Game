var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg, zombieGroup
var gameState = 1
var bulletCount = 20
var life = 3

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  bulletImg = loadImage("assets/bullet.png")
  heartImg = loadAnimation("assets/heart_3.png")
  heart2Img = loadAnimation("assets/heart_2.png")
  heart1Img = loadAnimation("assets/heart_1.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
hearts = createSprite(windowWidth-100,40)
hearts.addAnimation("Life:3",heartImg);
hearts.addAnimation("Life:2",heart2Img);
hearts.addAnimation("Life:1",heart1Img);
hearts.scale = 0.25
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   zombieGroup = new Group();
   bulletGroup = new Group();
}

function draw() {
  background(0); 
if (gameState === 1){



  //moving the player up and down and making the game mobile compatible using touches
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-15
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+15
  }


//release bullets and change the image of shooter to shooting position when space is pressed
  if(keyWentDown("space")){
 
    player.addImage(shooter_shooting)
    
  }

  //player goes back to original standing image once we stop pressing the space bar
  else if(keyWentUp("space")){
    player.addImage(shooterImg)
    bulletCount-=1
    spawnBullets()
  }
spawnZombies();
 for (var e = 0; e < bulletGroup.length; e++){
  for (var i = 0; i < zombieGroup.length; i++){
    if (bulletGroup.get(e)!=undefined && zombieGroup.get(i)!=undefined){
      if (bulletGroup.get(e).isTouching(zombieGroup.get(i))){
        zombieGroup.get(i).destroy();
        bulletGroup.get(e).destroy();
      }
    }
  }
 }

 if (bulletGroup.isTouching(bulletGroup)){
   bulletGroup.destroyEach();
 }

 for (var z = 0; z < zombieGroup.length; z++){
   if (zombieGroup.get(z)!=undefined){
     if (zombieGroup.get(z).isTouching(player)){
       zombieGroup.get(z).destroy()
       life-=1
       if (life == 2 ){
        hearts.changeAnimation("Life:2",heart2Img);
       }
       if (life == 1){
        hearts.changeAnimation("Life:1",heart1Img);
       }
     }
   }
 }

 if (bulletCount <1 || life == 0){
   gameState = 2
 }



}

if (gameState === 2){
  bg.visible=false;
  hearts.visible=false;
}
drawSprites();

textSize(25)
fill("Red")
textFont("robus")
text("Bullets: " + bulletCount, windowWidth/4, 20)


}

function spawnZombies(){
  if (frameCount % 60 === 0) {
    var zombie = createSprite(windowWidth+50,windowHeight-200,40,10);
    zombie.y = Math.round(random(windowHeight-100 ,windowHeight-400));
    zombie.addImage(zombieImg);
    zombie.scale = 0.15;
    zombie.velocityX = -3;
    zombieGroup.add(zombie);
  }
}

function spawnBullets(){
  bullet = createSprite(player.x+5,player.y-25,20,10);
  bullet.addImage(bulletImg)
  bullet.velocityX = 5
  bullet.scale = 0.03
  bulletGroup.add(bullet)
}