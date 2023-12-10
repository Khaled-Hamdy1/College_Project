const initialPhotoes = [
  { id: 1, src: "../images/wallpaperflare.com_wallpaper (2).jpg" },
  { id: 2, src: "../images/wallpaperflare.com_wallpaper (1).jpg" },
  { id: 3, src: "../images/wallpaperflare.com_wallpaper (3).jpg" },
  { id: 4, src: "../images/wallpaperflare.com_wallpaper (4).jpg" },
  { id: 5, src: "../images/wallpaperflare.com_wallpaper (5).jpg" },
  { id: 6, src: "../images/wallpaperflare.com_wallpaper (6).jpg" },
  { id: 7, src: "../images/wallpaperflare.com_wallpaper (7).jpg" },
  { id: 8, src: "../images/wallpaperflare.com_wallpaper (8).jpg" },
  { id: 9, src: "../images/wallpaperflare.com_wallpaper (9).jpg" },
  { id: 10, src: "../images/wallpaperflare.com_wallpaper (10).jpg" },
  { id: 11, src: "../images/wallpaperflare.com_wallpaper (11).jpg" },
  { id: 12, src: "../images/wallpaperflare.com_wallpaper (12).jpg" },
  { id: 13, src: "../images/wallpaperflare.com_wallpaper (13).jpg" },
  { id: 14, src: "../images/wallpaperflare.com_wallpaper (14).jpg" },
  { id: 15, src: "../images/wallpaperflare.com_wallpaper (15).jpg" },
  { id: 16, src: "../images/wallpaperflare.com_wallpaper (16).jpg" },
  { id: 17, src: "../images/wallpaperflare.com_wallpaper (17).jpg" },
  { id: 18, src: "../images/wallpaperflare.com_wallpaper (18).jpg" },
  { id: 19, src: "../images/wallpaperflare.com_wallpaper (19).jpg" },
  { id: 20, src: "../images/wallpaperflare.com_wallpaper (20).jpg" },
  { id: 21, src: "../images/wallpaperflare.com_wallpaper (21).jpg" },
  { id: 22, src: "../images/wallpaperflare.com_wallpaper (22).jpg" },
  { id: 23, src: "../images/wallpaperflare.com_wallpaper (23).jpg" },
  { id: 24, src: "../images/wallpaperflare.com_wallpaper (24).jpg" },
];

const photos = document.querySelector("main");

const users = JSON.parse(localStorage.getItem("users")) || {
  public: { all: initialPhotoes, fav: [] },
};
const user = JSON.parse(localStorage.getItem("user")) || "public";

function renderData() {
  const arr = users[user].all.filter((item) =>
    users[user].fav.includes(item.id)
  );
  let str = "";
  arr.forEach((photo) => {
    str += `
      <div class="relative mb-4 w-fit bg-slate-900 rounded-lg shadow-xl item">
        <div
          class="flex gap-2 absolute flex-row-reverse right-2 top-2 image-buttons"
        >
          <button
          onclick = "pressLike('${photo.id}')"
          id = "like-btn${photo.id}"
            class="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-lg like-btn"
          >
          <i class="fa-solid fa-heart text-red-700"></i>
          </button>
        </div>
        <div>
          <img
            class="rounded-lg"
            src="${photo.src}"
          />
        </div>
        <div>
          <h1
            class="absolute left-1 bottom-2 capitalize text-white font-semibold text-sm image-buttons"
          >
            ${photo.src}
          </h1>
        </div>
      </div>
      `;
  });
  photos.innerHTML = str;
}

window.addEventListener("load", () => {
  photos.innerHTML = "";
  renderData();
});

function pressLike(id) {
  const favListFiltered = users[user].fav.filter((favId) => favId != id);
  users[user].fav = favListFiltered;
  localStorage.setItem("users", JSON.stringify(users));
  photos.innerHTML = "";
  renderData();
}
