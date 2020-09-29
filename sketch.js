var dog, happyDog
var database
var foodS, foodStock

function preload()
{
  dog1IMG=loadImage("images/dogImg.png")
  dog2IMG=loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250,250,20,20);
  dog.addImage(dog1IMG);
  dog.scale = 0.15
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}

function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dog2IMG);
  }
  drawSprites();
  
  textSize(20);
  fill("white");
  stroke("white");
  text("Food Remaining:"+foodS,170,200);
  text("Note:Press UP_ARROW Key to Feed Drago Milk!",50,30);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}