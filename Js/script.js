const toggleEl = document.getElementById("toggleLight");
const sunEl = document.getElementById("sunIco");
const moonEl = document.getElementById("moonIco");

toggleEl.addEventListener("click", () => {
  if (document.documentElement.getAttribute("data-bs-theme") == "light") {
    moonEl.classList.add("d-none");
    sunEl.classList.remove("d-none");
    document.documentElement.setAttribute("data-bs-theme", "dark");
  } else {
    moonEl.classList.remove("d-none");
    sunEl.classList.add("d-none");
    document.documentElement.setAttribute("data-bs-theme", "light");
  }
});
