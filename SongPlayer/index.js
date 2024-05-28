const thumbnail = document.querySelector("#thumbnail");
const songName = document.querySelector("#song-name");
const artistName = document.querySelector("#artist-name");
const range = document.querySelector("#range");
const playBtn = document.querySelector("#play");
const durationEL = document.querySelector("#duration");
const currentDuration = document.querySelector("#currentDuration");
const popUp = document.querySelector("#pop-up");

let loopMode = 1;
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

function handleLoop(e) {
  if (e.target.classList.contains("fa-arrow-right-arrow-left")) {
    e.target.classList.replace("fa-arrow-right-arrow-left", "fa-arrows-rotate");
    loopMode = 2;
    popUp.innerHTML = "Playlist is looped";
  } else if (e.target.classList.contains("fa-arrows-rotate")) {
    e.target.classList.replace("fa-arrows-rotate", "fa-arrows-spin");
    popUp.innerHTML = "Current song is looped";
    loopMode = 3;
  } else {
    e.target.classList.replace("fa-arrows-spin", "fa-arrow-right-arrow-left");
    loopMode = 1;
    popUp.innerHTML = "Random mode is on";
  }
  popUp.classList.remove("hide");
  setTimeout(() => {
    popUp.classList.add("hide");
  }, 1000);
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

audio.addEventListener("ended", (e) => {
  switch (loopMode) {
    case 2:
      playNext();
      break;
    case 3:
      index = index;
      updateMusicSection(songsList);
      console.log(index);
      break;
    default:
      index = Math.floor(Math.random() * songsList.length);
      updateMusicSection(songsList);
      break;
  }
  audio.play();
});

const array = [
  { name: "name" },
  { name: "age" },
  { name: "contactNo" },
  { name: "age" },
];

var obj = {
  name: "raheel",
  age: "120",
};

const keys = Object.keys(obj);
function checkName() {
  for (const element of array) {
    const isExists = keys.some(_ => _ === element.name);
    if (!isExists) {
      return `${element.name} is required`; 
    }
  }

  return true;
}

console.log(checkName());

