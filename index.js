// Canvas setup
 const canvas = document.getElementById('canvas1');
 const ctx = canvas.getContext('2d');
 canvas.width = 800;
 canvas.height = 500;

let score = 0; 
let gameFrame = 0;
ctx.font = '50px Georgia';
// Mouse Interactivity
let canvasPosition = canvas.getBoundingClientRect();
  const mouse = { 
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
  }
   canvas.addEventListener('mousedown', function(event){ 
    mouse.click = true; 
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
   });
   canvas.addEventListener('mouseup', function() {
      mouse.click = false;
   })
// Player
 class Player {
  constructor(){
    this.x = canvas.width;
    this.y = canvas.height/2;
    this.radius = 50;
    this.angle = 0;
    this.frameX = 0; 
    this.frameY = 0;
    this.frame = 0;
    this.spriteWidth = 498;
    this.spriteHeigh = 327;
  }  
  update() { 
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    if (mouse.x != this.x) { 
         this.x -= dx/30; // Тва 30 ти е един вид дилей ,, ЗА ДА ИМА АНИМАЦИЯ"
    }
    if (mouse.y != this.y) { 
        this.y -= dy/30;
    }
  }

  draw() {
    if (mouse.click) {
        ctx.lineWidth = 0.2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    } 
     // Sprite
     ctx.fillStyle = 'red';
     ctx.beginPath();
     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
     ctx.fill();
     ctx.closePath();
  }
 }

 const player = new Player()
// Bubbles
 const bubblesArray = [];
 class Bubble { 
  constructor() { 
    this.x = Math.random() * canvas.width; 
    this.y = canvas.height + 100;
    this.radius = 50;
    this.speed = Math.random() * 5 + 1;
    this.distance;

  }
    update() {
       this.y -= this.speed;
    }
    draw() { 
      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      ctx.stroke();
    }
 }
  function handlesBubbles () {
     if (gameFrame % 50 == 0) { 
       bubblesArray.push(new Bubble());
       console.log(bubblesArray.length);
     }
     for (let i= 0; i < bubblesArray.length; i++) { // Не е добра практика
          bubblesArray[i].update();
          bubblesArray[i].draw();
          
          for (let i = 0; i < bubblesArray.length; i++) { // Правим нов for loop за да върти анимацията в нов масив на балони тъй като нз за друг fix.
            if (bubblesArray[i].y < 0 - bubblesArray[i].radius * 2 ) { 
              bubblesArray.splice(i, 1);
           }            

          }
     }
  }

// Animation Loop
 function animate() { 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
   handlesBubbles ();
   player.update();
   player.draw();
   ctx.fillText('score: ' + score);
   gameFrame++;
   console.log(gameFrame);
   requestAnimationFrame(animate);
 }
 animate();