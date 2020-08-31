class Partical {
    constructor(x, y) {
        this.x = x + 25;
        this.y = y + 25;
        this.radius = Math.random() * 20 + 1; //Random number between 1 and 20
        this.opacity = 1;
        this.directionX = Math.random() * 1 - 0.5; //Random number between -0.5 and 0.5 in x -ve numbers will move paticales in left direction
        this.directionY = Math.random() * 1 - 0.5;
    }
    draw() {
        ctx3.fillStyle = `rgba(150,150,150,${this.opacity})`;
        ctx3.beginPath();
        ctx3.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx3.fill();
        ctx3.closePath();
    }
    update() {
        this.x += this.directionX;
        this.y += this.directionY;
        if (this.opacity > 0.1) {
            this.opacity -= 0.9;
        }
        if (this.radius > 0.15) {
            this.radius -= 0.14;
        }
    }
    drawRipples() {
        ctx1.strokeStyle = `rgba(255 , 255 , 255 , ${this.opacity})`;
        ctx1.beginPath();
        ctx1.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx1.stroke();
        ctx1.closePath();
    }
    updateRipples() {
        if (this.radius < 50) {
            this.radius += 0.7;
            this.x -= 0.03;
            this.y -= 0.03;
        }
        if (this.opacity > 0) {
            this.opacity -= 0.02;
        }
    }
}

function handleParticle() {
    //dust
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    if (particlesArray.length > maxParticles) {
        for (let i = 0; i < 30; i++) {
            particlesArray.pop();  //if we have more than max particles remove 30 particales
        }
    }
    if ((keys[37] || keys[38] || keys[39] || keys[40]) && frogger.y > 250 && particlesArray.length < maxParticles + 10) {
        for (let i = 0; i < 10; i++) {
            particlesArray.unshift(new Partical(frogger.x, frogger.y));
        }
    }
}
function handleRipple() {
    //water rippler
    for (let i = 0; i < ripplesArray.length; i++) {
        ripplesArray[i].updateRipples();
        ripplesArray[i].drawRipples();
    }
    if (ripplesArray.length > 20) {
        for (let i = 0; i < 5; i++) {
            particlesArray.pop();  //if we have more than max particles remove 30 particales
        }
    }
    if ((keys[37] || keys[38] || keys[39] || keys[40]) && 100 < frogger.y < 250) {
        for (let i = 0; i < 20; i++) {
            ripplesArray.unshift(new Partical(frogger.x, frogger.y));
        }
    }
}

