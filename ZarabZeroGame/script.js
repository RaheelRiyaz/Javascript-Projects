const squares = document.querySelectorAll(".square");
let initialValue = "X";

squares.forEach((square) => {
  square.addEventListener("click", function () {
    if (!this.innerHTML) {
      this.innerHTML = initialValue;
      initialValue = initialValue === "X" ? "O" : "X";
      checkWin(); // Check for win after updating square
    }
  });
});

function checkWin() {
  const probabilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  for (const probability of probabilities) {
    const squareValues = probability.map((index) => squares[index].innerHTML);
    if (
      squareValues.every((value) => value === "X") ||
      squareValues.every((value) => value === "O")
    ) {
      squares.forEach((_) => (_.disabled = true));
      const winner = squareValues[0];
      setTimeout(() => {
        const isPlayAgain = confirm(
          `${winner} wins! Do you want to play again?`
        );
        if (isPlayAgain) resetGame();
      }, 100);
      return;
    }
  }

  const allSquares = [...squares].every((_) => _.innerHTML !== "");
  if (allSquares) resetGame();
}

function resetGame() {
  setTimeout(() => {
    squares.forEach((square) => {
      square.innerHTML = "";
      square.disabled = false; // Enable squares for the new game
    });
    initialValue = "X"; // Reset initial value
  }, 100);
}

