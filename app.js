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
var burger = document.querySelector(".burger");

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
  if (melding.value == "") {
    alert("You haven't written anything to Luna&Ludo :(");
  } else {
    addMessages();
    form.reset();
    sendItFlying();
  }
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

// Start gsap animation when its observed that bio is viewable
const bioLudo = document.querySelector("#bioLudo");
const bioLuna = document.querySelector("#bioLuna");
var observer = new IntersectionObserver((entries) => {
  // isIntersecting is true when element and viewport are overlapping
  // isIntersecting is false when element and viewport don't overlap

  if (entries[0].isIntersecting === true && entries[0].target.id == "bioLudo") {
    gsap.from(".sun", {
      y: 200,
      duration: 1.2,
      delay: 0.4,
      ease: "elastic",
    });
  }

  if (entries[0].isIntersecting === true && entries[0].target.id == "bioLuna") {
    gsap.from(".moon", {
      y: -200,
      duration: 1.2,
      delay: 0.4,
      ease: "elastic",
    });
    gsap.from(".cloud", {
      opacity: 0,
      duration: 1.2,
      delay: 1.6,
      ease: "power1.in",
    });

    gsap.from(".darkMode", {
      height: 0,
      duration: 1,
      delay: 0.6,
      ease: "back.in",
    });

    gsap.from("#bioLuna h1, p", {
      color: "#000",
      duration: 1,
      delay: 0.6,
      ease: "back.in",
    });
    gsap.from("tr td:first-child", {
      backgroundColor: "#FFCC99",
      duration: 1,
      delay: 0.6,
      ease: "back.in",
    });
  }
});
observer.observe(bioLudo);
observer.observe(bioLuna);

// When function is called, the pink-plane will fly along the svg path
gsap.registerPlugin(MotionPathPlugin);
function sendItFlying() {
  gsap.to(".btnSend", {
    duration: 8,
    motionPath: {
      path:
        "M807.62 600.373C807.62 600.373 1063.73 406.593 1008.2 298.937C952.669 191.281 624.038 -80.6924 417.792 24.6973C223.807 123.822 289.285 141.418 107.289 246.808C-31.9592 327.445 5.30006 425.857 5.30006 425.857C251.209 1046.86 784.956 616.238 784.956 616.238",
      align: "self",
      autoRotate: true,
    },
    onStart: () => {
      sendKnapp.style.pointerEvents = "none";
      sendKnapp.style.zIndex = "-1";
    },
    onComplete: () => {
      sendKnapp.style.pointerEvents = "auto";
      sendKnapp.style.zIndex = "auto";
    },
  });
}

pawButton.addEventListener("mouseover", () => {
  if (window.location.href.split("#")[1] == "StatisticsLuna") {
    pawButton.style.animation = "cycleColorsDark 1s infinite";
  } else {
    pawButton.style.animation = "cycleColors 1s infinite";
  }
});

pawButton.addEventListener("mouseleave", () => {
  pawButton.style.animation = "";
});
