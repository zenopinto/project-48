
var PLAY = 1
var END = 0
var gameState = PLAY

var obstacles, virus
var bgImg, bg
var jet, jetImg, obstaclesImg1, obstaclesImg2, obstaclesImg3, obstaclesImg4
var sound, slant, slant2, viruImg
var score = 0, obstaclesGroup, virusGroup
var gameOver, restart,img,gameoverImg,restartImg

var gamesound;

localStorage["HighestScore"] = 0;


function preload() {
  bgImg = loadImage("Img/bg.jpg")

  jetImg = loadAnimation("Img/jet1.png", "Img/jet 2.png", "Img/jet 3.png")

  sound = loadSound("sound/fly.mp3")
  gamesound = loadSound("sound/gameover.wav")


  img = loadAnimation("Img/jet1.png","Img/jet 2.png")


  obstaclesImg1 = loadImage("Img/zap1.png")
  obstaclesImg2 = loadImage("Img/zap2.png")
  obstaclesImg3 = loadImage("Img/zap3.png")
  obstaclesImg4 = loadImage("Img/zap4.png")

  viruImg = loadImage("Img/coronavirus_PNG7.png")

  gameoverImg = loadImage("Img/gameover.png");
  restartImg = loadImage("Img/restart.png");
}



function setup() {
  createCanvas(1500,850);






  //creating background
  bg = createSprite(0, 0, 1400, 600)
  bg.addImage(bgImg)
  bg.scale = 1
 
  bg.x = bg.width / 2

  //creating jet
  jet = createSprite(80, 300, 20, 30)
  jet.addAnimation("flying", jetImg)
  jet.scale = 0.9
  jet.setCollider("rectangle",0,0,20,80,-45);
  jet.debug=false;

// gameover restart
  gameOver = createSprite(800,150);
  gameOver.addImage(gameoverImg);
  gameOver.scale = 1;
  restart = createSprite(800,480);
  restart.addImage(restartImg);
  restart.scale = 0.1;
  
  

  gameOver.visible = false;
  restart.visible = false;



  //creating group
  obstaclesGroup = new Group();
  virusGroup = new Group();

}


function draw() {
  background("white");
 
  fill("red")
  stroke("blue")
  textSize(42);
  text("Score: " + score,700,810);
  
  

  console.log(score.y)
  if (gameState === PLAY) {
    
    score = score + Math.round(getFrameRate()/60);
    bg.velocityX = -(6 + 3*score/100);


    if (bg.x < 0) {
      bg.x = bg.width / 2

    }
    if (keyDown(UP_ARROW)) {
      jet.y = jet.y - 4
      sound.play()

    }
    if (keyDown(DOWN_ARROW)) {
      jet.y = jet.y + 4
      sound.play()
    }

    console.log(jet.position.y)
    //if(jet.isTouching(obstacles)){

    //}

    if (jet.y >= 560) {
      jet.position.y = 550
    }
    if (jet.y < 90) {
      jet.position.y = 100
    }

    if (obstaclesGroup.isTouching(jet) || virusGroup.isTouching(jet)) {
      gamesound.play()
     gameState = END
    }

    
    
    bg.velocity.x = -3

    //adding function
    Virus()
 
 

    Obstacles()
  }

  else if (gameState == END) {
    gameOver.visible = true;
    restart.visible = true;

  bg.velocityX=0
  obstaclesGroup.setVelocityXEach(0)
  virusGroup.setVelocityXEach(0)


  jet.changeAnimation("collided",img);

  if(mousePressedOver(restart)) {
    reset();

  }
  obstaclesGroup.setLifetimeEach(-1);
    virusGroup.setLifetimeEach(-1);
  }

 

  drawSprites();

}

function Obstacles() {
  if (frameCount % 400 === 0) {
    obstacles = createSprite(1450, 300, 10, 10)
    
    obstacles.velocityX = -2
    obstacles.y = Math.round(random(90, 560));
    var rand = Math.round(random(1, 4))
    switch (rand) {

      case 1: obstacles.addImage(obstaclesImg1)
        break;
      case 2: obstacles.addImage(obstaclesImg2)
        break;
      case 3: obstacles.addImage(obstaclesImg3)
        break;
      case 4: obstacles.addImage(obstaclesImg4)
        break;

      default: break;
    }
    obstacles.scale = 0.7
    obstacles.lifetime=750;

    obstaclesGroup.add(obstacles)
    

  }
}

function Virus() {

  if (frameCount % 309 === 0) {
    virus = createSprite(1300, 250, 10, 10)
    virus.velocityX = -(6 + 3*score/200);
    virus.addImage(viruImg)
    virus.scale = 0.2
    virus.velocityX = -2
    virus.y = Math.round(random(90, 560));
    virus.lifetime=750;
    virusGroup.add(virus)

  }
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();
  virusGroup.destroyEach();

  //gamesound.pause();

  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  score=0
}