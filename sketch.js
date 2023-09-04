//Failure to Load: mirror play

//photos
let base;
let mirror1;
let mirror2;
let mirror3;
let sil = [];
let shadows = [];
let patterns;
let EL1;
let EL2;

// change variables
let alp1 = 0;
let alp2 = 100;
let colour = 0;

// Tiles configuration
let tiles = [];
let cols = 5;
let rows = 5;
let w, h;

// Order of tiles
let board = [];

function preload(){
  base = loadImage('assets/MirrorMirror_base.png');
  mirror1 = loadImage('assets/MirrorMirror_mirror1.png');
  mirror2 = loadImage('assets/MirrorMirror_mirror2.png');
  mirror3 = loadImage('assets/MirrorMirror_mirror3.png');
  patterns = loadImage('assets/MirrorMirror_patterns.png');
  EL1 = loadImage('assets/MirrorMirror_EL1.png')
  EL2 = loadImage('assets/MirrorMirror_EL2.png')
  
  for (let i = 0; i < 2; i++){
    sil[i] = loadImage('assets/MirrorMirror_sil' + i + '.png');
  }

}
function setup() {
  createCanvas(base.width, base.height);
  colorMode(HSB, 360, 100, 100, 100);
  // background(0);
  frameRate(5);

  //Array of Shadows
  for (let k = 0; k < sil.length; k++){
    let images = new Shadow( random(0, width*.7), 0, -20, 255, sil[k]);
    shadows.push(images);
  }

  // pixel dimensions of each tiles
  w = width / cols;
  h = height / rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      let img = createImage(w, h);
      img.copy(patterns, x, y, w, h, 0, 0, w, h);
      let index = i + j * cols;
      board.push(index);
      let tile = new Tile(index, img);
      tiles.push(tile);
    }
  }
}

function draw() {
  background(random(360), 100, 100);

  //base
  push();
  tint(255, random(70,100));
  image(base, 0, 0);
  pop();

  //mirrors
  push();
  tint(255, random(70,100));
  image(mirror1, 0, 0);
  pop();

  blend(mirror2, 0, 0, mirror2.width, mirror2.height, 0, 0, width, height, LIGHTEST);

  blend(mirror3, 0, 0, mirror3.width, mirror3.height, 0, 0, width, height, SOFT_LIGHT);


  //patterns
  blend(patterns, 0, 0, patterns.width, patterns.height, 0, 0, width, height, DARKEST);

   //sils
   for (let j = 0; j < shadows.length; j++){
    shadows[j].edges();
    shadows[j].move();
    shadows[j].show();
  }
  

  //tile shuffle
 
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = int(random(16));
      let x = i * w;
      let y = j * h;
      let tileIndex = board[index];
      if (tileIndex > -1) {
        push()
        tint(random(255), alp1);
        let img = tiles
        [tileIndex].img;
        img.filter(INVERT);
        image(img, x, y, w, h);
        pop();
      }
    }
  }

  //Shooting ELs
  // push();
  // tint(255, alp2);
  // image(EL1, -15, 0);
  // pop();
  push();
  tint(colour, 100, 100, alp1);
  
  image(EL2, -15, 0);
  pop();

  // push();
  // tint(255, alp2);
  // scale(-1, 1);
  // image(EL1, -width, 0);
  // pop();

  push();
  tint(colour+180, 100, 100, alp1);
  scale(-1, 1);
  image(EL2, -width, 0);
  pop();

  if (frameCount%3==0){
    colour = random(180);
    //EL2.filter(INVERT);
  }

 

  

  //scene shift
  if (frameCount%int(random(20))==0){
  //EL.filter(INVERT);
  if (alp1 == 0){
    alp1 = 100;
    alp2 = 0;
  } else {
    alp1 = 0;
    alp2 = 100;
  }
}
}

class Shadow{
  constructor(x, y, inc, tint, silImg){
    this.x = x;
    this.y = y;
    this.inc = inc;
    this.tint = tint;
    this.sil = silImg;
  }
  edges(){
    if (this.x <= 0 || this.x >= width - this.sil.width){
      //this.inc *= -1;
      if (this.tint == 255){
        this.tint = 0;
      } else {
        this.tint = 255;
      }
    }

    if (this.x <= -this.sil.width){
      this.x = width;
    }
    // if (this.x >= width){
    //   this.x = -this.sil.width;
    // }
   
  }
  move(){
    this.x += this.inc;

  }
  show(){
    push();
    // tint(this.tint);
    // image(this.sil, this.x + random(-20,20), this.y + random(-20,20));
    // image(this.sil, this.x, this.y);
    blend(this.sil, 0, 0, this.sil.width, this.sil.height, this.x, this.y, this.sil.width, this.sil.height, DIFFERENCE);
    pop();
  }
}

class Tile {
  constructor(i, img) {
    this.index = i;
    this.img = img;    
  }
}
