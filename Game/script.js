var player = document.querySelector(".palyer")
var game = document.querySelector("#game")
var playerRadius = 50
var gameWidth = game.clientWidth
var death = 0
var pontszam = 0
const overlay = document.querySelector('.overlay')
const restart = document.querySelector('.overlay .r')
const score = document.querySelector("#score")

document.onmousemove = function(event) {
    if(event.clientX-playerRadius-10 < 100){
        event.clientX = 255    
      }
    else if(event.clientX+playerRadius > 1600+10){
        event.clientX = 1700-playerRadius
    }
    else if(event.clientY-playerRadius < 20){
        event.clientY = 70
    }
    else if(event.clientY + playerRadius > 820){
        event.clientY = 920-playerRadius
    }
    else{
        myFunction(event)
    }
};

function enemies() {
    let pos1 = Math.floor(Math.random() * (gameWidth-80) + 110);
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
        if (element.offsetTop < 20) {
            element.remove()
        }
    });
    let enemies = document.querySelectorAll(".enemy")
    enemies.forEach(element => {
        if(pontszam < 10){
            element.style.top = element.offsetTop + 2 + "px"
        }
        if(pontszam >= 10 && pontszam < 20){
            element.style.top = element.offsetTop + 3 + "px"
        }
        if(pontszam >= 20){
            element.style.top = element.offsetTop + 4 + "px"
        }
        if (element.offsetTop > 700) {
            element.remove()
            death++
            if(death == 1){
                GameOver()
            }
        }
    });
    score.innerText = `${pontszam}`
    ammos.forEach(element => {
        enemies.forEach(element2 => {
            if(isCollide(element,element2)){
                element.remove();
                element2.remove()
                if(death < 1){
                    pontszam++
                }
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

function AddCity(){
    let image = document.createElement('img')
    image.src = "./images/city2.png"
    image.width = gameWidth
    image.style.height = 200 + "px"
    image.style.marginTop = 600 + 'px'
    game.append(image)
}

function GameOver(){
    overlay.classList.remove("hidden")
}

restart.addEventListener("click", ()=>{
    location.reload()
})

if(death == 0){
    setInterval(enemies, 500)
    setInterval(move, 5)
    setInterval(shoot, 200)
    AddCity()
}


