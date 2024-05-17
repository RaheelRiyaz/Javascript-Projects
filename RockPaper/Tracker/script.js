const trackers = document.querySelectorAll(".track");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let track = 0;

prevBtn.addEventListener("click", (e) => {
  nextBtn.disabled = !true;
  if (track === 1) prevBtn.disabled = true;
  trackers[track].classList.remove("active");
  track--;
});

nextBtn.addEventListener("click", function (e) {
  prevBtn.disabled = false;
  track++;
  track === trackers.length - 1
    ? (this.disabled = true)
    : (this.disabled = false);
  trackers[track].classList.add("active");
});
