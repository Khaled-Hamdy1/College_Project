const photos = document.querySelector("main");
let userId = localStorage.getItem("userId");
let images = [];

function renderData(images = [], searchValue = "") {
  let filteredImages = images.filter(({ is_fav }) => +is_fav);
  if (searchValue) {
    filteredImages = images.filter(({ title }) =>
      title.toLowerCase().includes(searchValue)
    );
  }

  let str = "";
  if (!filteredImages.length) {
    str = `<div class="absolute  justify-center items-center font-extrabold text-4xl max-w-[630px]"
    style=" width: 80%; margin: auto;">
      No photos yet.
      <label for="customFile" class="upload-link cursor-pointer">&nbsp;Upload your first photo&nbsp;</label>to get
      started!
    </div>`;
  }

  filteredImages.forEach(
    ({ id, title, base64_data, upload_date, user_id, is_fav }) => {
      str += `
      <div class="relative mb-4 w-fit bg-slate-900 rounded-lg shadow-xl item">
        <div
          class="flex gap-2 absolute flex-row-reverse right-2 top-2 image-buttons"
        >
          <button
          onclick = "pressLike('${id}', '${is_fav}')"
          id = "like-btn${id}"
            class="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-lg like-btn"
          >${
            +is_fav
              ? '<i class="fa-solid fa-heart text-red-700"></i>'
              : '<i class="fa-regular fa-heart"></i>'
          }
          </button>
        </div>
        <div>
          <img
            class="rounded-lg"
            src="${base64_data}"
          />
        </div>
        <div>
          <h1
            class="absolute left-1 bottom-2 capitalize text-white font-semibold text-sm image-buttons"
          >
            ${title}
          </h1>
        </div>
      </div>
      `;
    }
  );
  photos.innerHTML = str;
}

window.addEventListener("load", async () => {
  handleAcount();
  await getImages();
});

async function getImages() {
  try {
    const res = await fetch(`../php/home.php?userId=${userId}`);
    const data = await res.json();

    images = data;
    renderData(images);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function pressLike(id, isFav) {
  try {
    await fetch(`../php/home.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageId: +id,
        isFav: !+isFav,
        action: "update",
      }),
    });

    const likeBtn = document.getElementById(`like-btn${id}`);
    likeBtn.innerHTML = !isFav
      ? '<i class="fa-solid fa-heart text-red-700"></i>'
      : '<i class="fa-regular fa-heart"></i>';

    await getImages();
  } catch (error) {
    console.error("Error:", error);
  }
}

// --------------------- Remove User ---------------------
function removeUser() {
  localStorage.removeItem("userId");
  window.location.href = "../views/login.php";
}

///////////////////////Handle SignIn & SignOut////////////////////

function handleAcount() {
  const signIn = document.getElementById("signIn");
  const signOut = document.getElementById("signOut");

  if (!userId) {
    signIn.classList.remove("disabled-link");
    signOut.classList.add("disabled-link");
  } else {
    signIn.classList.add("disabled-link");
    signOut.classList.remove("disabled-link");
  }
}
