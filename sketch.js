var plane, enemy;
var bullet, bulletImg, planeimg, enemyImage;
var bulletSound;
var bulletGroup, enemyGroup;
var score = 0;
var defenceLine;

var x = [125, 210, 310, 555, 890, 1000, 15, 455]
function preload() {
  bulletImg = loadImage("Images/bullet.png");
  planeimg = loadImage("Images/Plane.jpg");
  enemyImage = loadImage("Images/Eplane.png");
  bulletSound = loadSound("Sounds/Laser.wav")
}

function setup() {
  createCanvas(1366, 625);
  plane = new Player(665, 510);
  bulletGroup = new Group();
  enemyGroup = new Group();
  defenceLine = createSprite(665, 535, 625 * 2 * 2, 1);
  defenceLine.visible = false;
}
function draw() {
  background("black");
  text(mouseX + "  , " + mouseY, 100, 100);
  textSize(15)
  text("Score : " + score ,100,40)

  if (keyDown("space")  ||mousePressedOver(plane.player) || keyDown(38))
  {
    bullet = createSprite(plane.player.position.x, 510, 15, 15)
    bullet.velocityY = -20
    bulletSound.play();
    bulletGroup.add(bullet);
  }

  if (frameCount % 75 === 0) {
    enemy = new Enemy(random([100, 300, 500, 900, 1200, 1000, 1300]), 0, 50, 50);

    enemyGroup.add(enemy.enm);
  }

  move();
  destroy();

  drawSprites();
}

function move() {
  if (keyDown(39)) {
    plane.player.position.x = plane.player.position.x + 20
  }
  else if (keyDown(37)) {
    plane.player.position.x = plane.player.position.x - 20
  }
}

function destroy() {
  if (bulletGroup.isTouching(enemyGroup)) {
    enemyGroup.destroyEach();
    score = score + 1;
  }
  
}
// function destroy2()
// {
//   if (defenceLine.isTouching(enemyGroup)) {
//     text("You Lost" , width/2 ,height/2 )
//   }
// }