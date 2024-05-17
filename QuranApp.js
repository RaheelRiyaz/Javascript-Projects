let surahs;
const surahsContainer = document.querySelector(".surahs");
const url = "https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_bn.json";

let favList = localStorage.getItem("fav-surahs")
  ? JSON.parse(localStorage.getItem("fav-surahs"))
  : [];
const getSurahs = async () => {
  (await fetch(url)).json().then((res) => {
    surahs = res;
    window.scrollTo(0, 0);
    updateSurahs(surahs);
  });
};
function updateSurahs(surahs) {
  surahsContainer.innerHTML = ``;
  surahs.map((_, index) => {
    surahsContainer.innerHTML += `
              <div class="card m-2 cursor-pointer">
    <div class="card-body" onclick="show(${_.id})">
      ${_.transliteration}
    </div>
    <i class="ms-3 mb-2  ${checkFav(
      _.id
    )} fa-heart" onclick="togglefavSurah(event,${index})"></i>;
  </div>`;
  });
}
getSurahs();

function show(id) {
  window.scrollTo(0, 0);
  let surah = surahs.find((_) => _.id === id);
  surahsContainer.innerHTML = `
  <div class="card mt-5 mx-auto" style="width: 78rem;">
  <div class="card-body">
    <h5 class="card-title">${surah.transliteration}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">${surah.name}</h6>
    <p style="font-size: 3rem;">${surah.verses.map((_) => {
      return _.text + " . ";
    })}</p>
  </div>
</div>`;
}

function checkFav(id) {
  if (favList.some((_) => _.id === id)) {
    return `fa-solid`;
  }
  return `fa-regular`;
}

function togglefavSurah(e, i) {
  if (!favList.some((_) => _.id === surahs[i].id)) {
    favList.push(surahs[i]);
  } else {
    favList.splice(i, 1);
  }
  localStorage.setItem("fav-surahs", JSON.stringify(favList));
  toggleClass(e);
}

function toggleClass(e) {
  e.target.classList.contains("fa-regular")
    ? e.target.classList.replace("fa-regular", "fa-solid")
    : e.target.classList.replace("fa-solid", "fa-regular");
}
function showFavs() {
  if (favList.length > 0) updateSurahs(favList);
  else {
    surahsContainer.innerHTML = `<div class="alert mt-2 alert-primary" role="alert">
    No favourite surah please add!
  </div>`;
  }
}
function searchSurah() {
  const input = document.querySelector("input");
  if (input.value) {
    let s = surahs.filter((_) =>
      _.transliteration
        .toLowerCase()
        .replace("-", "").replace("'","")
        .startsWith(input.value.toLowerCase())
    );
    updateSurahs(s);
  }
}
