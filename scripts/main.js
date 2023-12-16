const initialPhotoes = [
  {
    id: 1,
    src: "../images/wallpaperflare.com_wallpaper (2).jpg",
    name: "Photo 1",
  },
  {
    id: 2,
    src: "../images/wallpaperflare.com_wallpaper (1).jpg",
    name: "Photo 2",
  },
  {
    id: 3,
    src: "../images/wallpaperflare.com_wallpaper (3).jpg",
    name: "Photo 3",
  },
  {
    id: 4,
    src: "../images/wallpaperflare.com_wallpaper (4).jpg",
    name: "Photo 4",
  },
  {
    id: 5,
    src: "../images/wallpaperflare.com_wallpaper (5).jpg",
    name: "Photo 5",
  },
  {
    id: 6,
    src: "../images/wallpaperflare.com_wallpaper (6).jpg",
    name: "Photo 6",
  },
  {
    id: 7,
    src: "../images/wallpaperflare.com_wallpaper (7).jpg",
    name: "Photo 7",
  },
  {
    id: 8,
    src: "../images/wallpaperflare.com_wallpaper (8).jpg",
    name: "Photo 8",
  },
  {
    id: 9,
    src: "../images/wallpaperflare.com_wallpaper (9).jpg",
    name: "Photo 9",
  },
  {
    id: 10,
    src: "../images/wallpaperflare.com_wallpaper (10).jpg",
    name: "Photo 10",
  },
  {
    id: 11,
    src: "../images/wallpaperflare.com_wallpaper (11).jpg",
    name: "Photo 11",
  },
  {
    id: 12,
    src: "../images/wallpaperflare.com_wallpaper (12).jpg",
    name: "Photo 12",
  },
  {
    id: 13,
    src: "../images/wallpaperflare.com_wallpaper (13).jpg",
    name: "Photo 13",
  },
  {
    id: 14,
    src: "../images/wallpaperflare.com_wallpaper (14).jpg",
    name: "Photo 14",
  },
  {
    id: 15,
    src: "../images/wallpaperflare.com_wallpaper (15).jpg",
    name: "Photo 15",
  },
  {
    id: 16,
    src: "../images/wallpaperflare.com_wallpaper (16).jpg",
    name: "Photo 16",
  },
  {
    id: 17,
    src: "../images/wallpaperflare.com_wallpaper (17).jpg",
    name: "Photo 17",
  },
  {
    id: 18,
    src: "../images/wallpaperflare.com_wallpaper (18).jpg",
    name: "Photo 18",
  },
  {
    id: 19,
    src: "../images/wallpaperflare.com_wallpaper (19).jpg",
    name: "Photo 19",
  },
  {
    id: 20,
    src: "../images/wallpaperflare.com_wallpaper (20).jpg",
    name: "Photo 20",
  },
  {
    id: 21,
    src: "../images/wallpaperflare.com_wallpaper (21).jpg",
    name: "Photo 21",
  },
  {
    id: 22,
    src: "../images/wallpaperflare.com_wallpaper (22).jpg",
    name: "Photo 22",
  },
  {
    id: 23,
    src: "../images/wallpaperflare.com_wallpaper (23).jpg",
    name: "Photo 23",
  },
  {
    id: 24,
    src: "../images/wallpaperflare.com_wallpaper (24).jpg",
    name: "Photo 24",
  },
];

const photos = document.querySelector("main");

let users = JSON.parse(localStorage.getItem("users")) || {
  public: { all: initialPhotoes, fav: [] },
};
let user = localStorage.getItem("user") || "public";

function renderData(search = "") {
  const arr = !search
    ? users[user].all
    : users[user].all.filter((item) => item.name.includes(search));
  if (!arr.length) return;
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
          >${
            users[user].fav.includes(photo.id)
              ? '<i class="fa-solid fa-heart text-red-700"></i>'
              : '<i class="fa-regular fa-heart"></i>'
          }
          </button>
          <button
            onclick = "deleteImage('${photo.id}')"
            id = "delete-btn${photo.id}"
            class="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-lg trash-btn"
          >
            <i class="fa-regular fa-trash-can"></i>
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
  handleAcount();
  renderData();
});
// //////////////////Search//////////////////////
const searchInput = document.querySelector("input[data-search-input]");
const searchBtn = document.getElementById("form-submit");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  renderData(searchInput.value);
});
// //////////////////////like button/////////////////////////////

function pressLike(id) {
  const favList = users[user].fav;
  const favListFilter = favList.filter((item) => item !== +id);

  if (favList.length === favListFilter.length) {
    favListFilter.push(+id);
    document.getElementById(`like-btn${id}`).innerHTML =
      '<i class="fa-solid fa-heart text-red-700"></i>';
  } else {
    document.getElementById(`like-btn${id}`).innerHTML =
      '<i class="fa-regular fa-heart"></i>';
  }

  users[user].fav = favListFilter;
  localStorage.setItem("users", JSON.stringify(users));
}

////////////////////////Remove User////////////////////////////////
function removeUser() {
  localStorage.setItem("user", "public");
  user = "public";
  renderData();
}

///////////////////////Handle SignIn & SignOut////////////////////

function handleAcount() {
  const signIn = document.getElementById("signIn");
  const signOut = document.getElementById("signOut");

  if (user === "public") {
    signIn.classList.remove("disabled-link");
    signOut.classList.add("disabled-link");
  } else {
    signIn.classList.add("disabled-link");
    signOut.classList.remove("disabled-link");
  }
}

//////////////Add Image///////////////////////
function previewImage(event) {
  const fileInput = document.getElementById("customFile");

  // Check if a file is not selected
  if (!fileInput.files.length) {
    alert("Please select an Image");
    return;
  }

  const [selectedFile] = fileInput.files;
  const reader = new FileReader();
  reader.readAsDataURL(selectedFile);

  reader.onloadend = () => {
    const user = localStorage.getItem("user") || "public";

    users[user].all.push({
      id: users[user].all.length + 1,
      name: selectedFile.name.split(".").at(-2),
      src: reader.result,
    });
    localStorage.setItem("users", JSON.stringify(users));
    renderData();
  };
}
//////////////////////Delete Image///////////////////////
function deleteImage(id) {
  const filteredAllList = users[user].all.filter((item) => item.id != id);
  const filteredFavList = users[user].fav.filter((item) => item != id);
  users[user].all = filteredAllList;
  users[user].fav = filteredFavList;
  localStorage.setItem("users", JSON.stringify(users));
  renderData();
}
