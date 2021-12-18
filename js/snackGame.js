// Game Constant and Variable
let inputDir = {
    x : 0,
    y : 0,
};
const foodsound = new Audio("../music/food.mp3");
const gameover = new Audio("../music/gameover.mp3");
const moovsound = new Audio("../music/move.mp3");
const musicsound = new Audio("../music/music.mp3");
let lastPaintTime = 0;
let speed = 10;
let score = 0;
let max = 0;
let snakeArr = [{
    x : 13,
    y : 15,
}];


let food = {
    x : 5,
    y : 7,
};

// Game Function
//       curent Time Start Time for start The Game.           
//              ||
//              ||
//              ||
//              \/
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < (1/speed)){
        return;
    }
    lastPaintTime = ctime;
    gameEngin();
}

function isCollide(snake){
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
    return false;
}



function gameEngin(){
    // Part 1: Updeing The snake array
    if(isCollide(snakeArr)){
        gameover.play();
        musicsound.pause();
        inputDir = {
            x : 0,
            y : 0,
        }
        alert("Game Over : Press Any key To countinue"); 
        snakeArr = [{
            x : 13,
            y : 15,
        }];
        musicsound.play();
        score = 0;
        let s = String(score);
        console.log(s);
        let s1 = document.getElementsByClassName("scoreGame");
        String(s1[0].children[0].textContent);
        s1[0].children[0].textContent = `Score : ` + s;
    }


    // If you have The Enter the food, increment the score and regenerate the food

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x)
    {

        score = score + 1;
        // max = score;
        let s = String(score);
        console.log(s);
        let s1 = document.getElementsByClassName("scoreGame");
        String(s1[0].children[0].textContent);
        s1[0].children[0].textContent = `Score : ` + s;

        if(score >= max){
            max = score;
            s1[0].children[1].textContent = `Highest Score : ` + s;
        }

        

        snakeArr.unshift({x : snakeArr[0].x + inputDir.x, y : snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {
            x : Math.round(a + (b - a) * Math.random()),
            y : Math.round(a + (b - a) * Math.random()),
        };  


    }

    // Moving The Next
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = array[i];
        snakeArr[i + 1] = {...snakeArr[i]};
        
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    
    // Part 2: display and Render the snake and food
    
    board.innerHTML = "";
    snakeArr.forEach(function (e,index) {
            let snakEle = document.createElement("div");
            snakEle.style.gridRowStart = e.y;
            snakEle.style.gridColumnStart = e.x;
            if(index === 0){
                snakEle.classList.add("head");
            }
            else{
                snakEle.classList.add("snake");
            }

            let getboard = document.getElementById("board");
            getboard.appendChild(snakEle);
    });
        // Display the Food Element
        let foodEle = document.createElement("div");
        foodEle.style.gridRowStart = food.y;
        foodEle.style.gridColumnStart = food.x;
        foodEle.classList.add("food");
        let getboard = document.getElementById("board");
        getboard.appendChild(foodEle);

}




// Game Logic
window.requestAnimationFrame(main); // main ---> is the function as time stemp

window.addEventListener("keydown",(e) => {// e is the proparty and class
    inputDir = {
        x : 0,
        y : -1,
    };
    moovsound.play();
    // console.log(e);
    switch (e.key) {
        case "ArrowUp":
            {
                inputDir.x = 0;
                inputDir.y = -1;
                break;
            }
        case "ArrowDown":
            {
                inputDir.x = 0;
                inputDir.y = 1;
                break;
            }
        case "ArrowLeft":
            {
                inputDir.x = -1;
                inputDir.y = 0;
                break;
            }

        case "ArrowRight":
            {
                inputDir.x = 1;
                inputDir.y = 0;
                break;
            }
        default:
            {
                break;
            }
    }
});

