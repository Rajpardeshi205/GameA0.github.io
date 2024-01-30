let boxes = document.querySelectorAll(".box");
let resetGame = document.querySelector("#reset-game");
let newGame = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

let count = 0;

const winPat = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const reset = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (turnO) {
        box.style.backgroundImage = 'url("face1.png")';
        box.style.backgroundSize = 'cover'; // Set background size to cover
        box.style.backgroundPosition = 'center'; // Set background position to center
        turnO = false;
      } else {
        box.style.backgroundImage = 'url("face2.png")';
        box.style.backgroundSize = 'cover';
        box.style.backgroundPosition = 'center';
        turnO = true;
      }
      box.classList.add("image-set");
      box.disabled = true;
      checkWinner();
    });
  });

const matchDraw = (count) => {
  msg.innerText = `No Winner, Match Is Draw`;
  msgContainer.classList.remove("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    count++;
    console.log(count);
    if (count >= 9) {
      checkWinner() === false;
      matchDraw();
      console.log("DRAW");
      count = 0;
    } else {
      checkWinner();
    }
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundImage = ''; // Clear the background image
    box.classList.remove("image-set"); // Remove the class indicating an image is set
  }
};

const showWinner = (winner) => {
    const winnerImage = winner === 'face1.png' ? 'face1.png' : 'face2.png';
    const winnerImgElement = document.createElement('img');
    winnerImgElement.src = winnerImage;
    winnerImgElement.alt = 'Winner Image';
    winnerImgElement.classList.add('winner-image');

    msg.innerHTML = 'Congratulations, Winner Is ';
    msg.style.fontSize = "3.5rem"; // Set font size to 1rem
    msg.appendChild(winnerImgElement);

    msgContainer.classList.remove('hide');
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPat) {
        let pos1Val = boxes[pattern[0]].style.backgroundImage;
        let pos2Val = boxes[pattern[1]].style.backgroundImage;
        let pos3Val = boxes[pattern[2]].style.backgroundImage;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                // Pass the correct image path to showWinner
                showWinner(pos1Val.includes('face1.png') ? 'face1.png' : 'face2.png');
            }
        }
    }
};

newGame.addEventListener("click", reset);
resetGame.addEventListener("click", reset);
