const photos = document.querySelector("main");

let userId = localStorage.getItem("userId");
let images = [];

function renderData(images = [], searchValue = "") {
  let filteredImages = images;
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
          <button
            onclick = "deleteImage('${id}')"
            id = "delete-btn${id}"
            class="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-lg trash-btn"
          >
            <i class="fa-regular fa-trash-can"></i>
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

// --------------------- Search ---------------------
const searchInput = document.querySelector("input[data-search-input]");
const searchBtn = document.getElementById("form-submit");
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchValue = searchInput.value.toLowerCase();
  renderData(images, searchValue);
});

// --------------------- like button ---------------------
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

// --------------------- Handle SignIn & SignOut ---------------------

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

// --------------------- Add Image ---------------------
function previewImage() {
  const fileInput = document.getElementById("customFile");

  // Check if a file is not selected
  if (!fileInput.files.length) {
    alert("Please select an Image");
    return;
  }

  const [selectedFile] = fileInput.files;
  const reader = new FileReader();
  reader.readAsDataURL(selectedFile);

  reader.onloadend = async () => {
    const imageData = {
      userId: +localStorage.getItem("userId"),
      imageName: selectedFile.name.split(".").at(-2),
      imageData: reader.result,
      action: "upload",
    };

    try {
      const res = await fetch("../php/home.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imageData),
      });
      const data = await res.text();

      console.log(data);

      await getImages();
    } catch (error) {
      console.error("Error:", error);
    }
  };
}

// --------------------- Delete Image ---------------------
async function deleteImage(id) {
  const imageData = {
    userId: +localStorage.getItem("userId"),
    imageId: +id,
    action: "delete",
  };

  try {
    await fetch("../php/home.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageData),
    });

    await getImages();
  } catch (error) {
    console.error("Error:", error);
  }
}
