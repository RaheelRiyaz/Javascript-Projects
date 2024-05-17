// #region Global Declarations
const boxContainer = document.querySelector(".boxes");
const spans = document.querySelectorAll("span");
const array = ["A", "B", "C", "F", "Y", "E", "P", "O"];
array.push(...array);
// #endregion Global Declarations

// #region Randomise values of an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
}
shuffleArray(array);
// #endregion Randomise values of an array

// #region Update Body
function updateGameBody() {
  array.map((_) => {
    const div = document.createElement("div");
    div.className = "box";
    div.innerHTML = `<span class="collapse">${_}</span>`;
    boxContainer.appendChild(div);
  });
}
window.onload = updateGameBody();
// #endregion Update Body

// #region Variables
const boxes = document.querySelectorAll(".box");
let firstVal = "";
let firstBoxIndex = -1;
let secondBoxIndex = -1;
let SecondVal = "";
let clickTimes = 0;
//#endregion Variables
// #region Game Logic
boxes.forEach((box, index) => {
  box.addEventListener("click", (e) => {
    clickTimes++;
    if (clickTimes === 1) {
      firstBoxIndex = index;
      firstVal = e.target.firstChild.innerText;
    }

    if (clickTimes === 2) {
      secondBoxIndex = index;
      SecondVal = e.target.firstChild.innerText;
    }

    e.target.firstChild.classList?.remove("collapse");
    e.target.classList?.add("show");

    if (clickTimes === 2) {
      setTimeout(() => {
        if (firstVal !== SecondVal) {
          boxes[firstBoxIndex].firstChild.classList.add("collapse");
          boxes[secondBoxIndex].firstChild.classList.add("collapse");
          boxes[firstBoxIndex].classList.remove("show");
          boxes[secondBoxIndex].classList.remove("show");
        }
        clickTimes = 0;
        firstVal = "";
        SecondVal = "";
        firstBoxIndex = -1;
        secondBoxIndex = -1;
      }, 400);
    }
  });
});

// #endregion Game Logic

