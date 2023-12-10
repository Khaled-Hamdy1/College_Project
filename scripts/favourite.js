const photos = document.querySelector("main");

const users = JSON.parse(localStorage.getItem("users")) || {
  public: { all: [], fav: [] },
};
const user = localStorage.getItem("user") || "public";

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
            ${photo.name}
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
