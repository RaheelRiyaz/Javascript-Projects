function hello() {
  document.body.style.background = "red";
}

function copyToClipBoard() {
  const input = document.querySelector("#inputBox");
  navigator.clipboard.writeText(input.value);
  console.log(window.getSelection())
}
