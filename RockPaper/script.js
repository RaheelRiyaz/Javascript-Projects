const icons = document.querySelector(".icons");
const heading = document.querySelector(".heading");
const topSection = document.querySelector(".top-section");
const gameOptions = [
  {
    icon: "fa-hand",
    value: 0,
  },
  {
    icon: "fa-hand-scissors",
    value: 1,
  },
  {
    icon: "fa-hand-back-fist",
    value: 2,
  },
];

function updateGameSection() {
  gameOptions.forEach((opt, i) => {
    icons.innerHTML += `<i class="fa-solid fa-3x ${opt.icon} fa-light pointer me-2 icon" onclick=userSelection(event,${i})></i>
    `;
  });
}

updateGameSection();

function userSelection(e, i) {
  const userChoice = gameOptions[i].value;
  computerSelection(userChoice);
  togglActiveClass(e);
}

function computerSelection(userChoice) {
  const randomNumber = Math.floor(Math.random() * gameOptions.length);
  const computerChoice = gameOptions[randomNumber].value;
  waitingIcons();
  setTimeout(() => {
    checkGameStatus(userChoice, computerChoice);
  }, 1000);
}

function checkGameStatus(userChoice, computerChoice) {
  topSection.innerHTML = `
  <i class="fa-regular ${gameOptions[userChoice].icon} fa-6x left-hand fa-purple"></i>
          <i
            class="fa-regular ${gameOptions[computerChoice].icon} fa-6x right-hand fa-purple"
          ></i>`;

  if (userChoice === computerChoice) {
    updateMessage("", true);
  } else if (userChoice === 0 && computerChoice === 1) {
    updateMessage("Computer");
  } else if (userChoice === 0 && computerChoice === 2) {
    updateMessage("Computer");
  } else if (userChoice === 1 && computerChoice === 0) {
    updateMessage("User");
  } else if (userChoice === 2 && computerChoice === 0) {
    updateMessage("User");
  } else if (userChoice === 1 && computerChoice === 2) {
    updateMessage("Computer");
  } else if (userChoice === 2 && computerChoice === 1) {
    updateMessage("User");
  }
}

function updateMessage(winner = "", isDrawn = false) {
  isDrawn
    ? (heading.innerHTML = `Match is drawn`)
    : (heading.innerHTML = `${winner} wins`);
}

function waitingIcons() {
  topSection.innerHTML = `<i class="fa-regular fa-hand-back-fist fa-6x left-hand fa-purple wavy-left"></i>
    <i
      class="fa-regular fa-hand-back-fist fa-6x right-hand fa-purple wavy-right"
    ></i>
    `;
  heading.innerHTML = "Waiting....";
}

function togglActiveClass(e) {
  document.querySelector(".active")?.classList.remove("active");
  e.target.classList.add("active");
}
