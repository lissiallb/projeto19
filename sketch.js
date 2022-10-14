var gameState = 1;
var play = 1;
var end = 0;

var score = 0;
var scenario;

var alice, aliceImage;

var bunny, bunnyAnimation;

var card;
var car1Img;
var card2Img;
var card3Img;
var card4Img;
var cardGroup;
var r;

var clock;
var clock1Img;
var clock2Img;

var backgroundalice;
var backgroundbunny;

var ground;

function preload()
{
  aliceImage = loadAnimation("run1a.png", "run2a.png");
  
  backgroundalice = loadImage("backgrounda.png");
  backgroundbunny = loadImage("gameover.png")

  bunnyAnimation = loadAnimation("run1c.png", "run2c.png");

  card1Img = loadImage("coração.png");
  card2Img = loadImage("espada.png");
  card3Img = loadImage("ouro.png");
  card4Img = loadImage("paus.png");

  clock1Img =loadImage("clock1.png");
  clock2Img = loadImage("clock2.png");
}




function setup() 
{
  createCanvas(windowWidth, windowHeight);

  scenario = createSprite(windowWidth/2, windowHeight/2);
  scenario.addImage(backgroundalice);
  scenario.scale = 2.3;

  ground = createSprite(windowWidth/2, windowHeight-200, windowWidth, 1);

  alice = createSprite(100, windowHeight-300);
  alice.addAnimation("moving", aliceImage);
  alice.scale = 0.2;

  bunny = createSprite(windowWidth-100, windowHeight-300);
  bunny.addAnimation("moving", bunnyAnimation);
  bunny.setCollider("rectangle",0,0,150,100);
  //bunny.debug = true;

  cardGroup = new Group();
  clockGroup = new Group(); 
}




function draw() 
{
  background(255);
  
  if(gameState === play)
  {
    score = score + Math.round(frameCount/400);
    scenario.velocityX = -(5 + frameCount/100);
    if(scenario.x < 500)
    {
      scenario.x = windowWidth-500;
    }

    alice.collide(ground);
    alice.velocityY = alice.velocityY+(0.5+ frameCount/10000);
    if(keyDown(32) && alice.y > 600)
    {
      alice.velocityY = -25;
    }
    if(alice.y < alice.height/2)
    {
      alice.y = alice.height/2;
    }
  
    bunny.x = bunny.x-(frameCount/1000);
    bunny.velocityY = bunny.velocityY+(0.5+frameCount/10000);
    bunny.collide(ground);
    //bunny.collide(cardGroup);
    alice.collide(cardGroup);
    if(bunny.isTouching(cardGroup))
    {
      bunny.velocityY = -25;
    }
    if(bunny.y < bunny.height/2)
    {
      bunny.y = bunny.height/2;
    }

    cards();

    if(alice.isTouching(bunny))
    {
      bunny.destroy();
      alice.destroy();
      //bunny.x = -100;

      //ground.y = windowHeight-40;

  

      //alice.addAnimation("moving", bunnyAnimation);
      //alice.x = 100;
      //alice.y = windowHeight-100;
      //alice.scale = 1;
      //alice.setCollider("rectangle", 0, 0, 150, 100);

      scenario.addImage(backgroundbunny);
      if(scenario.x <= 0)
      {
        scenario.x = windowWidth/2;
      }
      scenario.scale = 0.5;
      cardGroup.destroyEach();
      //cardGroup.velocityX = 0;

      clocks();


    }
 
  }
  
  drawSprites();
  
  fill(255);
  textSize(25);
  text("Score:" + score, windowWidth - 150, 50);
}

function cards()
{
  if(frameCount%(150-Math.round(frameCount/10000))===0)
  {
    card = createSprite(windowWidth+100, windowHeight-300);
    card.velocityX = scenario.velocityX-0.5;
    card.setLifetime = 300;
    cardGroup.add(card);

    r = Math.round(random(1,4));
    if(r === 1)
    {
      card.addImage(card1Img);
    }
    else if(r === 2)
    {
      card.addImage(card2Img);
    }
    else if(r === 3)
    {
      card.addImage(card3Img);
    }
    else if(r === 4)
    {
      card.addImage(card4Img);
    }
  }
}

function clocks()
{
  if(frameCount%400===0)
  {
    clock = createSprite(windowWidth,400);
    clock.velocityX = scenario.velocityX-0.5;
  }
}