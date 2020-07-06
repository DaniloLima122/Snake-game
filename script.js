let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = ["",""];

let score = 0;

snake[0] = {

    x: 8 * box,
    y: 8 * box
}

let jogo = "";
let direcao = "right";
let food = {

    x: Math.floor(Math.random() * 15 * + 1) * box,
    y: Math.floor(Math.random() * 15 * + 1) * box,
}

function criarBG() {

    context.fillStyle = "#4cb354";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {

        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function desenharComida() {

    let imgComida = new Image();

    imgComida.src = "apple.png";

    context.drawImage(imgComida,food.x, food.y);

}

function preparaComeço(){

  
    document.getElementById("menuStart").classList.add("começar")
    setTimeout(function(){
        jogo = setInterval(iniciarJogo, 100);
    },80);
}


document.getElementById("comecar").addEventListener("click",function(){
    
    preparaComeço();
});

document.getElementById("playnovamente").addEventListener("click",function(){

    score=0;
    document.getElementById("fim_de_jogo").style.display = "none";
    document.getElementById("fim_de_jogo").style.opacity = 0;
    preparaComeço()
})

document.addEventListener("keydown", update);

function update(event) {
    
    if (event.keyCode == 37 && direcao != "right") direcao = "left";
    if (event.keyCode == 38 && direcao != "down") direcao = "up";
    if (event.keyCode == 39 && direcao != "left") direcao = "right";
    if (event.keyCode == 40 && direcao != "up") direcao = "down";
}

function iniciarJogo() {
    

    if (snake[0].x > 15 * box && direcao == "right") snake[0].x = 0;
    if (snake[0].x < 0 * box && direcao == "left") snake[0].x = 16 * box;
    
    if (snake[0].y > 15 * box && direcao == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direcao == "up") snake[0].y = 16 * box;

    for (let i = 1; i < snake.length; i++) {

        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            
            clearInterval(jogo);    
            document.getElementById("fim_de_jogo").style.display = "flex";
            document.getElementById("fim_de_jogo").style.opacity = 1;
            document.getElementById("score").innerText = "Pontuação: " + score;
            console.log(snake.splice(2,snake.length - 2));
            
        }
    }

    criarBG();
    criarCobrinha();
    desenharComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direcao == "right") snakeX += box;
    if (direcao == "left") snakeX -= box;

    if (direcao == "up") snakeY -= box;
    if (direcao == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {

        snake.pop();

    } else {

        food.x = Math.floor(Math.random() * 15 * + 1) * box;
        food.y = Math.floor(Math.random() * 15 * + 1) * box;

        score +=1;
    }


    let newhead = {

        x: snakeX,
        y: snakeY
    }

    snake.unshift(newhead);
}



