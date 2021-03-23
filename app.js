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

  sendItFlying();
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
var observer = new IntersectionObserver((entries) => {
  // isIntersecting is true when element and viewport are overlapping
  // isIntersecting is false when element and viewport don't overlap

  if (entries[0].isIntersecting === true) {
    gsap.from(".sun", {
      y: 200,
      duration: 1.2,
      delay: 0.4,
      ease: "elastic",
    });
  }
});
observer.observe(bioLudo);

// When function is called, the pink-plane will fly along the svg path
gsap.registerPlugin(MotionPathPlugin);
function sendItFlying() {
  gsap.to(".btnSend", {
    duration: 10,
    motionPath: {
      path:
        "M1131.86 625.89C1143.89 609.353 1146.5 587.98 1159.62 571.94C1166.66 563.34 1172.79 556.053 1182.18 549.683C1190.09 544.315 1198.47 540.331 1206.98 536.075C1223.33 527.901 1242.48 523.684 1257.6 513.212C1273.19 502.424 1290.46 491.697 1300.06 474.625C1305.97 464.126 1313.57 455.128 1318.57 444.021C1321.03 438.552 1323.2 432.41 1324.8 426.662C1326.82 419.371 1331.01 413.114 1332.42 405.494C1335.4 389.386 1337.62 373.926 1337.62 357.531C1337.62 341.185 1334.32 327.755 1330.85 312.109C1328.07 299.633 1320.42 283.24 1312.58 273.159C1308.06 267.348 1304.29 261.171 1299.52 255.498C1293.69 248.573 1285.68 242.875 1278.59 237.233C1247.63 212.61 1208.58 195.923 1170.21 187.395C1138.45 180.338 1108.28 168.016 1079.06 153.949C1055.58 142.646 1030.26 133.453 1011.56 114.757C1005.25 108.444 998.712 103.333 993.598 95.9466C987.959 87.8013 980.463 79.3036 973.457 72.2981C944.552 43.393 901.482 34.489 865.074 19.4973C842.844 10.344 816.712 7.39569 793.039 4.01385C774.545 1.37176 756.374 0.989746 737.698 0.989746C714.831 0.989746 692.097 5.62302 669.414 6.43313C658.768 6.81334 646.6 11.0587 636.33 14.0539C622.82 17.9945 607.579 20.2217 594.719 26.0293C578.956 33.1479 565.011 40.7783 551.595 51.9156C535.729 65.0878 525.089 82.8946 511.858 98.4263C500.614 111.626 491.282 126.955 481.073 140.945C470.595 155.304 461.194 170.216 450.409 184.371C430.344 210.707 402.955 230.704 374.383 247.031C330.422 272.151 279.276 288.497 229.105 294.691C202.015 298.035 173.868 296.021 146.607 296.021C117.526 296.021 89.3343 297.61 60.6017 302.311C45.009 304.863 29.4628 310.83 18.1433 322.149C3.72219 336.571 0.724434 352.658 0.724434 372.471C0.724434 390.396 3.68575 406.065 13.7886 421.219C24.7921 437.724 39.4558 453.612 56.7913 463.677C80.4011 477.386 104.482 489.187 130.761 497.185C158.536 505.638 187.404 512.234 215.738 518.595C266.704 530.037 321.31 534.155 368.697 557.848C386.54 566.769 406.499 575.9 420.954 589.964C426.637 595.493 433.201 600.034 438.856 605.689C443.469 610.302 447.214 615.681 451.558 620.507C463.753 634.057 474.782 648.452 486.698 662.301C499.483 677.159 508.877 693.95 520.265 709.719C530.778 724.275 542.34 739.333 558.671 747.762C568.776 752.977 579.735 755.362 590.787 757.62C611.845 761.922 632.84 764.994 654.294 766.572C688.071 769.055 720.851 770.714 754.633 767.418C780.169 764.927 808.209 762.077 832.716 754.112C843.908 750.475 855.457 748.107 866.283 743.467C878.632 738.175 891.632 733.165 904.326 728.77C920.967 723.01 938.207 717.966 953.922 709.96C970.696 701.415 986.301 693.926 1004.42 688.489C1016.67 684.815 1028.14 679.137 1040.41 675.728C1061.38 669.904 1082.63 666.775 1103.31 659.881C1111.17 657.264 1119.45 656.005 1127.02 652.563C1131.61 650.477 1141.91 647.749 1144.68 643.309C1146.36 640.62 1151.56 637.786 1154.18 635.688C1158.56 632.184 1160.17 628.145 1160.17 622.624",
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
