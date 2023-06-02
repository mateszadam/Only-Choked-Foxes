var player = document.querySelector(".palyer")
var game = document.querySelector("#game")


document.onmousemove = function(event) {myFunction(event)};

function enemies() {
    let pos1 = Math.floor(Math.random() * screen.width - 100);
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
  player.style.top = y - 50+ "px"
  player.style.left = x- 50 + "px"
}

setInterval(enemies, 500)
setInterval(move, 5)
setInterval(shoot, 200)

