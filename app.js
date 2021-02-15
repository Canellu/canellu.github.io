var checkbox = document.querySelector('input[type="checkbox"]');
var menu = document.querySelector(".menu");

//sjekker om checkbox (burger) er trykka og endrer opacity til menu
checkbox.addEventListener("click", () => {
  if (!checkbox.checked) {
    menu.style.opacity = 0;
  } else {
    menu.style.opacity = 1;
  }
});
