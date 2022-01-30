var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
  ghost = createSprite(300, 300)
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.4; 
  spookySound.play(); 
}

function draw() {

  background("black");
  if(gameState==="play") {
  if(tower.y > 400){
      tower.y = 300
    }

    if (keyDown("space"))
    {
      ghost.velocityY = -3;
    }

    if (keyDown("right"))
    {
      ghost.x = ghost.x+3; 
    }

    if (keyDown("left"))
    {
      ghost.x = ghost.x -3; 
    }

    ghost.velocityY = ghost.velocityY+0.5; 

    if (climbersGroup.isTouching(ghost)) 
    {
      ghost.velocityY = 0; 
    }

    if (invisibleBlockGroup.isTouching(ghost)||ghost.y > 600)
    {
      ghost.destroy();
      gameState = "end"
    }

    spawn_doors();

    drawSprites();
  }

  if (gameState === "end") 
  {
    fill("yellow")
    textSize(33);
    text("GAME OVER!",300,300);
    
    

  }
}

function spawn_doors() 
{

  if (frameCount%300===0)
{
  door = createSprite(Math.round(random(100,500)), 0);
  door.addImage("door", doorImg);
  door.velocityY = 1;
  door.lifetime = 600;
  doorsGroup.add(door);
  climber = createSprite(door.x, 50)
  climber.addImage("climber", climberImg); 
  climber.velocityY = 1;
  climber.lifetime = 600;
  climbersGroup.add(climber); 
  invisibleBlock = createSprite(door.x, 60, 100 , 3);
  invisibleBlock.shapeColor = "red"
  invisibleBlock.velocityY = 1;
  invisibleBlock.lifetime = 600; 
  invisibleBlockGroup.add(invisibleBlock); 
  ghost.depth = door.depth;
  ghost.depth+=1;
}

}
