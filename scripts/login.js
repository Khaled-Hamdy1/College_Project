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
//** Declare variables
const wrapper = document.querySelector(".wrapper"),
  signupHeader = document.querySelector(".signup header"),
  loginHeader = document.querySelector(".login header"),
  signupForm = document.querySelector(".signup form"),
  loginForm = document.querySelector(".login form"),
  video = document.getElementById("video"),
  audio = document.getElementById("audio");

// get users from local storage
const users = JSON.parse(localStorage.getItem("users")) || {
  public: { all: initialPhotoes, fav: [] },
};
// get current user from local storage
const user = localStorage.getItem("user") || "public";

//** Event Listeners
// switch login and signup forms animation
loginHeader.addEventListener("click", () => {
  wrapper.classList.add("active");
});
signupHeader.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
// reduce video speed
(() => {
  document.querySelector("video").playbackRate = 0.5;
})();

// // Signup form submit
// signupForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   // get username and password
//   let [{ value: fullName }, { value: username }, { value: password }] =
//     signupForm;

//   // Check if username already exists
//   const userExists = username in users;

//   if (userExists) {
//     audio.play();
//     alert("Username already exists");
//     return;
//   } else {
//     audio.play();
//     alert("Account created successfully");
//   }

//   // add user to local storage
//   users[username] = { fullName, password, all: [], fav: [] };
//   localStorage.setItem("users", JSON.stringify(users));
//   localStorage.setItem("user", username);

//   // redirect to login page
//   window.location.href = "./index.php";
// });

// // Login form submit
// loginForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   // get username and password from login form
//   let [{ value: username }, { value: password }] = loginForm;

//   // check if username and password are correct
//   const user = users[username]?.password === password ? users[username] : null;

//   if (!user) {
//     alert("Username or password is incorrect");
//     return;
//   }

//   localStorage.setItem("user", username);
//   // redirect to home page
//   window.location.href = "./index.php";
// });
