var checkbox = document.querySelector('input[type="checkbox"]');
var menu = document.querySelector(".menu");
var vector = document.querySelector(".bgFigur");
var melding = document.querySelector(".tekstBoks");
var sendKnapp = document.querySelector(".btnSend");
var links = document.querySelectorAll(".menu li");
var form = document.querySelector("#toFirestoreForm");
var storyCover = document.querySelector(".cover");
var storyBildeBg = document.querySelector(".bildeBg");
var navnboks = document.querySelector(".navnBoks");

links.forEach((e) => {
  e.addEventListener("click", () => {
    menu.style.visibility = "hidden";
    menu.style.pointerEvents = "none";
    checkbox.checked = false;
  });
});

//sjekker om checkbox (burger) er trykka og endrer opacity til menu
checkbox.addEventListener("click", () => {
  if (!checkbox.checked) {
    menu.style.pointerEvents = "none";
    menu.style.visibility = "hidden";
  } else {
    menu.style.pointerEvents = "auto";
    menu.style.visibility = "visible";
  }
});

window.addEventListener("mousemove", parralaxContainer);

//funksjon til aa bevege bgvectors
function parralaxContainer(e) {
  moving_value = -5;
  var x = ((e.clientX - window.innerWidth / 2) * moving_value) / 100;
  var y = ((e.clientY - window.innerHeight / 2) * moving_value) / 100;
  vector.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
}

//kanpp funksjon on click til database
sendKnapp.addEventListener("click", sendToFirestore);

//funksjon til å sende til firestore
function sendToFirestore() {
  console.log("KJORER KNAPP FUNC");
  if (melding.value == "") {
    // alert("You haven't written anything to Luna&Ludo :(");
  } else {
    console.log("ikke tom");
    addMessages();
    form.reset();
  }

  //Animation on click
  sendKnapp.classList.add("flyAnimation");
  setTimeout(() => {
    sendKnapp.classList.remove("flyAnimation");
  }, 5000);
}

// Click&Drag logic
const slider = document.querySelector(".glassWrapper");
let isDown = false;
let startX;
let scrollTop;
let scrollSpeed = 1;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft; // Position of click
  scrollTop = slider.scrollTop; // Position of scrollbar
  slider.classList.add("grabbing");
});

slider.addEventListener("mouseleave", (e) => {
  isDown = false;
  slider.classList.remove("grabbing");
});

slider.addEventListener("mouseup", (e) => {
  isDown = false;
  slider.classList.remove("grabbing");
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return; // stop function from running when not holding down
  e.preventDefault(); // Prevent unwanted behaviour like marking text etc.
  const x = e.pageX - slider.offsetLeft; // Current position of mouse
  const walk = (x - startX) * scrollSpeed; // calculate pixels moved from initial click
  slider.scrollTop = scrollTop - walk;
});
