const gameOptions = [
  {
    hint: "A device used to capture and record images or videous",
    value: "painting",
  },
  {
    hint: "An art form using colors on a surface to create images or expression",
    value: "camera",
  },
];
let index = 0;
let wrong = 0;
let total = 6;

const res = document.querySelector(".result");
const gameContainer = document.querySelector(".top-section");
const btns = document.querySelectorAll("button");
const icons = document.querySelectorAll(".icon");
function updateGameSection() {
  gameContainer.innerHTML = `
    <div class="answers">
   
  </div>
  <p class="card-text fw-bold text-center">
    Hint: ${gameOptions[index].hint}
  </p>`;

  [...gameOptions[index].value].map((option) => {
    const span = document.createElement("span");
    span.classList.add("dash");
    span.innerHTML = "-";
    gameContainer.querySelector(".answers").append(span);
  });
}
updateGameSection();

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.target.disabled = true;
    const dashes = document.querySelectorAll(".dash");
    const target = e.target.innerHTML.toLowerCase();
    const indexes = getAllIndices(target);
    if (indexes.length > 0) {
      if (!indexes.every((_) => _ < 0)) {
        indexes.map((_) => {
          if (_ >= 0) {
            dashes[_].innerText = [...gameOptions[index].value][_];
          }
        });
      } else {
        wrong++;
        icons[wrong - 1].classList.remove("collapse");
        updateResultSection();
        if (wrong === total) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You have exceeded the guess limit please restart",
          });
          return restartGame();
        }
      }
    }
    checkWin();
  });
});

function checkWin() {
  const dashes = document.querySelectorAll(".dash");
  const answer = Array.from(dashes).map((_) => {
    return _.innerHTML.toLowerCase();
  });

  if (answer.join("") === gameOptions[index].value.toLowerCase()) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "You guessed one word correctly",
    });
    index++;
    index = index > gameOptions.length - 1 ? (index = 0) : index;
    wrong = 0;
    btns.forEach((btn) => (btn.disabled = false));
    updateResultSection();
    updateGameSection();
  }
}

const getAllIndices = (value) => {
  const indices = [...gameOptions[index].value].map((_, index) => {
    if (_ === value) return index;
    else return -1;
  });
  return indices;
};

function updateResultSection() {
  res.innerHTML = `${wrong}/${total}`;
}

function restartGame() {
  btns.forEach((btn) => (btn.disabled = false));
  index = 0;
  wrong = 0;
  updateResultSection();
  updateGameSection();
}
console.log();