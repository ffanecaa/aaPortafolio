console.clear();

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const message = 'Developer';
  const message1 = 'marta';
  const fontSize = '220';
  
  ctx.fillStyle = 'yellow'; //white
  ctx.font = `bold ${fontSize}px Montserrat`;
  ctx.fillText(message, 80, 300);  //200 300
  ctx.fillText(message1, 150, 500);  //200 300
  // ctx.filter = 'blur(1px) contrast(1.1)';
  const textCoordinates = ctx.getImageData(0,0,canvas.width,canvas.height);
  
  const mouse = {
    x: canvas.width * 2,
    y: canvas.height * 2,
    radius: 400
  }
  
  const textSize = {
    width: null,
    height: null
  }
  
  let particleArr = [];
  
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 10 + 1;
      this.flag = false;
      this.counter = 0;
    }
    update() {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx**2 + dy**2);
      let fDirectionX = dx / distance;
      let fDirectionY = dy / distance;
      let maxDistance = mouse.radius;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = fDirectionX * force * this.density;
      let directionY = fDirectionY * force * this.density;
      if (!this.flag) {
        if (Math.random() >= 0.5) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() > 0.5 ? canvas.height + Math.random() * 500 : Math.random() * -500;
        } else {
          this.x = Math.random() > 0.5 ? canvas.width + Math.random() * 500 : Math.random() * -500;
          this.y = Math.random() * canvas.height;
        }
        this.flag = !this.flag;
      }
      if (distance < mouse.radius && this.counter > 125) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 30;
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy / 30;
        }
      }
      this.counter++;
    }
    draw() {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }
  function init() {
    const star = 8;
    for (let y = 0, y2 = textCoordinates.height; y < y2; y += star) {
      for (let x = 0, x2 = textCoordinates.width; x < x2; x += star) {
        if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
          let posX = x;
          textSize.width = textSize.width < posX || textSize === null ? posX : textSize.width;
          let posY = y;
          textSize.height = textSize.height < posY || textSize === null ? posY : textSize.height;
          let size = 1;
          particleArr.push(new Particle(posX * size, posY * size))
        }
      }
    }
    console.log(textSize);
  }
  init();
  
  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    connect();
    
    particleArr.forEach(particle => {
      particle.update();
      particle.draw();
    })
    
    requestAnimationFrame(animate);
  }
  animate();

  const handleMouseMove = e => {
    mouse.x = e.x;
    mouse.y = e.y;
  }
  const handleScreenResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function connect(){
    let degradado = 1;
    for (let a = 0; a < particleArr.length; a++) {
        for (let b = a; b < particleArr.length; b++) {
            let distance = (( particleArr[a].x - particleArr[b].x) * (particleArr[a].x - particleArr[b].x))
            + ((particleArr[a].y - particleArr[b].y) * (particleArr[a].y - particleArr[b].y));
            const lineDistance = 500;
            if (distance < lineDistance) {
                degradado = 1 - (distance/(lineDistance));
                let dx = mouse.x - particleArr[a].x;
                let dy = mouse.y - particleArr[a].y;
                let mouseDistance = Math.sqrt(dx*dx+dy*dy);
                if (mouseDistance < mouse.radius * 0.66) {
                  ctx.strokeStyle=`rgbs(146, 28, 10,${degradado})`;
                } else if (mouseDistance < mouse.radius - 25) {
                  ctx.strokeStyle=`rgba(215, 47, 13,${degradado})`;
                } else if (mouseDistance < mouse.radius) {
                  ctx.strokeStyle=`rgba(215, 47, 13,${degradado})`;
                } else  {
                ctx.strokeStyle=`rgba(215, 47, 13,${degradado})`;
                }
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(particleArr[a].x, particleArr[a].y);
                ctx.lineTo(particleArr[b].x, particleArr[b].y);
                ctx.stroke();
            }
        }
    
      }
  }

  window.addEventListener('mousemove', handleMouseMove)

  window.addEventListener('resize', handleScreenResize)
})
