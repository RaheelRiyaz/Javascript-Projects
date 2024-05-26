const thumbnail = document.querySelector("#thumbnail");
const songName = document.querySelector("#song-name");
const artistName = document.querySelector("#artist-name");
const range = document.querySelector("#range");
const playBtn = document.querySelector("#play");
const durationEL = document.querySelector("#duration");
const currentDuration = document.querySelector("#currentDuration");

const BASEURL = "./songs/";
let index = 0;
let songsList = [];
let audio = new Audio();

(async function fetchSongs() {
  const promise = await fetch("./songs.json");
  const songs = await promise.json();
  songsList = songs;
  updateMusicSection(songs);
})();

function updateMusicSection(songs) {
  thumbnail.src = songs[index].thumbnail;
  songName.innerHTML = songs[index].name;
  artistName.innerHTML = songs[index].artist;
  audio.src = `${BASEURL + songs[index].url}.mp3`;
}

playBtn.addEventListener("click", playMusic);
function playMusic(e) {
  if (e.target.classList.contains("fa-play")) {
    e.target.classList.replace("fa-play", "fa-pause");
    audio.play();
  } else {
    e.target.classList.replace("fa-pause", "fa-play");
    audio.pause();
  }
}

audio.addEventListener("timeupdate", updateDuration);

audio.addEventListener("loadedmetadata", displayDuration);

function displayDuration() {
  const duration = audio.duration;
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  range.max = duration;
  durationEL.innerHTML = `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}

function updateDuration() {
  const currentTime = audio.currentTime;
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  range.value = currentTime;
  currentDuration.innerHTML = `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}

function playNext() {
  index++;
  if (index > songsList.length - 1) index = 0;
  updateMusicSection(songsList);
  checkPlay();
}

function playPrevious() {
  index--;
  if (index < 0) index = songsList.length - 1;
  updateMusicSection(songsList);
  checkPlay();
}

range.addEventListener("input", () => {
  audio.currentTime = range.value;
});

function checkPlay() {
  const btn = document.querySelector("#play");
  if (btn.classList.contains("fa-pause")) {
    audio.play();
  }
}
