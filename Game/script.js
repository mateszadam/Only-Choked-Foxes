var player = document.querySelector(".palyer")
var game = document.querySelector("#game")
var playerRadius = 50
var gameWidth = game.clientWidth

document.onmousemove = function(event) {
    if(event.clientX-playerRadius-10 < 200){
        event.clientX = 255
        console.log("hello")
      }
    else if(event.clientX+playerRadius > 1700+10){
        event.clientX = 1700-playerRadius
        console.log("bello")
    }
    else if(event.clientY-playerRadius < 20){
        event.clientY = 70
    }
    else if(event.clientY + playerRadius > 920){
        event.clientY = 920-playerRadius
    }
    else{
        myFunction(event)
    }
};

function enemies() {
    let pos1 = Math.floor(Math.random() * (gameWidth-80) + 210);
    console.log(pos1);
    let div = document.createElement("div")
    div.style.left = pos1 + "px"
    div.className = "enemy"
    game.prepend(div)
}

function shoot() {
    div = document.createElement("div")
    div.className = "ammo"
    div.style.top = player.offsetTop +"px"
    div.style.left = player.offsetLeft + 45 +"px"

    game.prepend(div)

}

function move() {
    let ammos = document.querySelectorAll(".ammo")
    ammos.forEach(element => {
        
        element.style.top = element.offsetTop - 10 + "px"
        if (element.offsetTop < 0) {
            element.remove()
        }
    });
    let enemies = document.querySelectorAll(".enemy")
    enemies.forEach(element => {
        element.style.top = element.offsetTop + 2 + "px"
        if (element.offsetTop > 800) {
            element.remove()
        }
    });
    ammos.forEach(element => {
        enemies.forEach(element2 => {
            if(isCollide(element,element2)){
                element.remove();
                element2.remove()
            }

        });
    });

}

function isCollide(a, b) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();

    return !(
        ((aRect.top + aRect.height) < (bRect.top)) ||
        (aRect.top > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width) < bRect.left) ||
        (aRect.left > (bRect.left + bRect.width))
    );
}


function myFunction(e) {
  let x = e.clientX;
  let y = e.clientY;
  player.style.top = y - playerRadius+ "px"
  player.style.left = x- playerRadius + "px"
}

setInterval(enemies, 500)
setInterval(move, 5)
setInterval(shoot, 200)

