var checkbox = document.querySelector('input[type="checkbox"]');
var menu = document.querySelector(".menu");
var vector = document.querySelector(".bgFigur");
var melding = document.querySelector(".tekstBoks");
var sendKnapp = document.querySelector(".btnSend");
var links = document.querySelectorAll(".menu li");
var form = document.querySelector("#toFirestoreForm");
var storyCover = document.querySelector(".cover");
var storyBildeBg = document.querySelector(".bildeBg");

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
    alert("You haven't written anything to Luna&Ludo :(");
  } else {
    console.log("ikke tom");
    addMessages();
    form.reset();
  }
}
