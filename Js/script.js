const toggleEl = document.getElementById("toggleLight");
const sunEl = document.getElementById("sunIco");
const moonEl = document.getElementById("moonIco");
const customerCodeEl = document.getElementById("customerCode");

const sendEl = document.getElementById("sendForm");

const form = document.querySelector(".needs-validation");
form.addEventListener("submit", (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
  } else {
    console.log(customerCodeEl.value);
    e.preventDefault();
  }

  form.classList.add("was-validated");
});

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