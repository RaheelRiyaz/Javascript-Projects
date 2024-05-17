const opeartors = ["*", "-", "+", "/", "%"];
const cardTitle = document.querySelector(".card-title");
const cardSub = document.querySelector(".card-sub");
const btns = document.querySelectorAll("button");

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (btn.classList.contains("equals")) {
      cardSub.innerHTML = "";
      cardTitle.innerHTML = eval("0" + cardTitle.innerHTML);
    } else if (btn.classList.contains("clear")) {
      cardTitle.innerHTML = "";
      cardSub.innerHTML = "";
    } else if (btn.classList.contains("cut")) {
      cardTitle.innerHTML = cardTitle.innerHTML.slice(
        0,
        cardTitle.innerHTML.length - 1
      );
    } else {
      cardTitle.innerText += e.target.innerText;
      try {
        cardSub.innerHTML = eval("0" + cardTitle.innerHTML);
      } catch (err) {}
    }
    checkSameOperators(e);
  });
});

function checkSameOperators(e) {
  if (
    opeartors.includes(cardTitle.innerText[cardTitle.innerText.length - 1]) &&
    opeartors.includes(cardTitle.innerText[cardTitle.innerText.length - 2])
  ) {
    let text = cardTitle.innerHTML.slice(0, cardTitle.innerHTML.length - 1);
    cardTitle.innerText = text.replace(
      text[text.length - 1],
      e.target.innerHTML
    );
  }
}
