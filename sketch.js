var ground
var player,playerAnimation
var score = 0
var platForm
var lives = 3
var gamestate = "play"
var restart
function preload(){
playerAnimation = loadAnimation("frame0.png","frame_1.png","frame_2.png","frame_3.png")
//playerAnimation = loadAnimation("frame0.png")
//backgroundAnimation = addAnimation("background.png")
}


function setup() {
  createCanvas(1200,800);
  //createSprite(200,200,20,20)
player=new Player();
player.body.addAnimation("running",playerAnimation)
player.body.scale=0.2
player.body.debug = true
player.body.setCollider ("rectangle",0,0,50,300)
ground=new Ground();
 obstacleGroup = createGroup()
 trapGroup = createGroup()
platForm = createSprite(100,500,200,20)
restart = createSprite(600,250,20,20)
restart.visible=false

function draw() {
 background("brown");  
 text("score"+score,100,100)
  textSize(25)
  text("lives :"+lives,1000,100)
 if(gamestate==="play"){
  score = World.frameCount
  spawnObstacles()
  spawnTraps()
  if(keyDown("UP_ARROW")&&player.body.y>200){
    player.jump()
    if(platForm){
      platForm.destroy()
    }
  }
  if(platForm){
    player.body.collide(platForm)
  }
  if(keyDown("LEFT_ARROW")){
    player.body.x=player.body.x-10
    if(platForm){
      platForm.destroy()
    }
  }
  if(keyDown("RIGHT_ARROW")){
    player.body.x=player.body.x+10
    if(platForm){
      platForm.destroy()
    }
  }
  if(lives===0){
    gamestate="end"
  }
  for (var i=0;i<trapGroup.length;i++){
    if (trapGroup.get(i).isTouching(player.body)){
      player.body.x=100
      player.body.y=100
       trapGroup.get(i).destroy()
       platForm = createSprite(100,500,200,20)
      lives=lives-1
    }
  }
  if(player.body.isTouching(ground.body)){
    player.body.x=100
    player.body.y=100
   // player.get(i).destroy()
    lives=lives-1
    platForm = createSprite(100,500,200,20)
  }
 }
 else if(gamestate==="end"){
 obstacleGroup.setvelocityXEach(0)
 trapGroup.setvelocityXEach(0)
 //restart.visible=true
 }
  
  player.display()
  

player.body.collide(obstacleGroup)

  drawSprites();

}
function spawnObstacles() {
 
 if (frameCount%40===0){
  var rand = random(100,1200)
  var obstacle = createSprite (rand,800,80,10)
  obstacle.velocityY = -(5+score/300)
  obstacleGroup.add(obstacle)
 }

}
function spawnTraps() {
 
  if (frameCount%100===0){
   var rand = random(100,1200)
   var trap = createSprite (rand,800,80,10)
   trap.velocityY = -(5+score/100)
   trap.shapeColor = "red"
   trapGroup.add(trap)
  }
 
 }