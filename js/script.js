console.clear();
let keyPress = new Audio("music/key-press.mp3");
let gameMusic = new Audio("music/game-music.mp3");
let gameOver = new Audio("music/game-over.mp3");
let foodEat = new Audio("music/food-eat.mp3");
let speed = 10;
let lastTime = 0;
let score = 0;
let boardContainer = document.querySelector("#boardContainer");
let currentScore = document.querySelector("#current-score");
let highScore = document.querySelector("#high-score");
let moveDirection = "top";
let foodTimeOut = 0;
let nonFoodTimeOut = 0;
let hitCountNonFood = 0;

let snakeArr = [
  {
    x: 18,
    y: 18,
  },
];

//for food
let foodArr = {
  x: 3,
  y: 4,
};

//for non food
let nonFood = {
  x: 5,
  y: 7,
};
//snake direction on keypress
let direction = {
  x: 0,
  y: 0,
};

// snake mouth direction
let mouthDirection = (snakePart, spanLeft, spanRight) => {
  switch (moveDirection) {
    case "top":
      snakePart.style.borderTop = "5px solid #ef3b3be0";
      snakePart.style.borderTopLeftRadius = "50%";
      snakePart.style.borderTopRightRadius = "50%";
      //eyes position
      spanLeft.style.justifyContent = "center";
      spanRight.style.justifyContent = "center";
      break;
    case "left":
      snakePart.style.borderLeft = "5px solid #ef3b3be0";
      snakePart.style.borderTopLeftRadius = "50%";
      snakePart.style.borderBottomLeftRadius = "50%";
      //eyes position
      spanLeft.style.justifyContent = "start";
      spanRight.style.justifyContent = "start";
      spanLeft.style.alignItems = "center";
      spanRight.style.alignItems = "center";
      snakePart.style.flexDirection = "column";
      break;
    case "right":
      snakePart.style.borderRight = "5px solid #ef3b3be0";
      snakePart.style.borderTopRightRadius = "50%";
      snakePart.style.borderBottomRightRadius = "50%";
      //eyes position
      spanLeft.style.alignItems = "center";
      spanRight.style.alignItems = "center";
      spanLeft.style.justifyContent = "flex-end";
      spanRight.style.justifyContent = "flex-end";
      snakePart.style.flexDirection = "column";
      snakePart.style.alignItems = "end";
      break;
    case "bottom":
      snakePart.style.borderBottom = "5px solid #ef3b3be0";
      snakePart.style.borderBottomLeftRadius = "50%";
      snakePart.style.borderBottomRightRadius = "50%";
      // eyes position 
      spanLeft.style.justifyContent = "center";
      spanRight.style.justifyContent = "center";
      spanLeft.style.alignItems = "end";
      spanRight.style.alignItems = "end";
      snakePart.style.alignItems = "flex-end";
      snakePart.style.alignItems = "flex-end";
      break;
    default:
      snakePart.classList.add("eyes");
      break;
  }
};

// snake body funciton
let snakeBody = () => {
  snakeArr.forEach((e, i) => {
    var snakePart = document.createElement("div");
    snakePart.style.gridRowStart = e.y;
    snakePart.style.gridColumnStart = e.x;
    if (i == 0) {
      snakePart.classList.add("head");
      var spanLeft = document.createElement("span");
      var insideSpanLeft = document.createElement("span");
      spanLeft.append(insideSpanLeft);
      var spanRight = document.createElement("span");
      var insideSpanRight = document.createElement("span");
      spanRight.append(insideSpanRight);

      snakePart.appendChild(spanLeft);
      snakePart.appendChild(spanRight);
      mouthDirection(snakePart, spanLeft, spanRight);
    } else {
      snakePart.classList.add("body");
    }
    boardContainer.appendChild(snakePart);
  });
};

//showing food and non food item
let displayFood = () => {
  // food item
  var foodpart = document.createElement("div");
  foodpart.style.gridRowStart = foodArr.y;
  foodpart.style.gridColumnStart = foodArr.x;
  foodpart.classList.add("food");
  boardContainer.appendChild(foodpart);

  // non food item
  let nonFoodPart = document.createElement("div");
  nonFoodPart.style.gridRowStart = nonFood.y;
  nonFoodPart.style.gridColumnStart = nonFood.x;
  nonFoodPart.classList.add("non-food-part");
  boardContainer.appendChild(nonFoodPart);
};

let eatFood = () => {
  // for eating food logic
  if (snakeArr[0].x === foodArr.x && snakeArr[0].y === foodArr.y) {
    foodEat.play();
    hitCountNonFood = 0;
    foodTimeOut = 0;
    score++;
    
    snakeArr.unshift({
      x: snakeArr[0].x + direction.x,
      y: snakeArr[0].y + direction.y,
    });
    foodArr = {
      x: Math.round(Math.random() * 18 + 2),
      y: Math.round(Math.random() * 18 + 2),
    };
  }

  // for non food item eating logic
  if (snakeArr[0].x === nonFood.x && snakeArr[0].y === nonFood.y) {
    foodEat.play();
    hitCountNonFood++;
    let val = hitCountNonFood;
    score -= hitCountNonFood;
    while (val != 0) {
      snakeArr.pop();
      --val;
    }
    nonFood = {
      x: Math.round(Math.random() * 18 + 2),
      y: Math.round(Math.random() * 18 + 2),
    };
  }
  
  if (foodTimeOut >= 80) {
    foodArr = {
      x: Math.round(Math.random() * 18 + 2),
      y: Math.round(Math.random() * 18 + 2),
    };
    foodTimeOut = 0;
  }
  if (nonFoodTimeOut >= 80) {
    nonFood = {
      x: Math.round(Math.random() * 18 + 2),
      y: Math.round(Math.random() * 18 + 2),
    };
    nonFoodTimeOut = 0;
  }
};

let isCollide = () => {
  if (snakeArr.length <= 0) {
    return true;
  }

  for (var i = 1; i < snakeArr.length; ++i) {
    if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
      return true;
    }
  }
  
  // checking if snake outside board container then return true
  if (
    snakeArr[0].x === 21 ||
    snakeArr[0].x === -1 ||
    snakeArr[0].y === 21 ||
    snakeArr[0].y === -1
    ) {
      console.log("true");
      return true;
    }
    
    return false;
  };
  
  // game start loop
  function gameStart() {
    // inserting game in boardContainer
    boardContainer.innerHTML = "";

    //score update
    currentScore.innerHTML = score;
    let storage = JSON.parse(localStorage.getItem("score"));
    if(storage === null) {
      let maxScore = {
        scores : 0
      }
      localStorage.setItem("score",JSON.stringify(maxScore));
    }
    else {
      if(score >= storage.scores) {
        storage.scores = score;
        localStorage.setItem("score",JSON.stringify(storage));
      }
      highScore.innerHTML = storage.scores;
    }

    // gameMusic.play();
    if (isCollide()) {
      gameMusic.pause();
      gameOver.play();
      direction = {
      x: 0,
      y: 0,
    };
    score = 0;
    alert("Game over!");
    snakeArr = [
      {
        x: 18,
        y: 18,
      },
    ];
  }
  //move snake
  for (var i = snakeArr.length - 2; i >= 0; --i) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += direction.x;
  snakeArr[0].y += direction.y;
  //calling required function
  displayFood();
  eatFood();
  snakeBody();
}


// main function 
function main(time) {
  window.requestAnimationFrame(main);
  if ((time - lastTime) / 1000 < 1 / speed) {
    return;
  }
  lastTime = time;
  foodTimeOut++;
  nonFoodTimeOut++;
  gameStart();
}


/*adding event listener on click of key
  this function can used for showing sname direction
*/
window.addEventListener("keydown", (e) => {
  direction = {
    x: 0,
    y: 1,
  };
  //key press music
  keyPress.play();
  var eye = document.querySelector(".head");
  switch (e.key) {
    case "ArrowUp":
      direction.x = 0;
      direction.y = -1;
      moveDirection = "top";
      break;
    case "ArrowRight":
      direction.x = 1;
      direction.y = 0;
      moveDirection = "right";
      break;
    case "ArrowLeft":
      direction.x = -1;
      direction.y = 0;
      moveDirection = "left";
      break;
    case "ArrowDown":
      direction.x = 0;
      direction.y = 1;
      moveDirection = "bottom";
      break;
  }
});
window.requestAnimationFrame(main);
// checking window size 
if(window.innerWidth <= 1300) {
  alert("This game not developed for mobile and tablet devices. you can open greater than 1300px like Desktop and laptop");
  document.querySelector("html").style.display = "none";
}
