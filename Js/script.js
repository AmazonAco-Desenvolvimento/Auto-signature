const toggleEl = document.getElementById("toggleLight");
const sunEl = document.getElementById("sunIco");
const moonEl = document.getElementById("moonIco");
const customerCodeEl = document.getElementById("customerCode");
const sendEl = document.getElementById("sendForm");
const listEl = document.getElementById("data-list");
toastEl = document.getElementById("liveToast");

let userData = {
  username: "",
  cargo: "",
  setor: "",
  email: "",
};

function firstUpperCase(string) {
  let aux = string.toLowerCase().split(" ");
  let stringCapitalized = [];
  for (let str of aux) {
    stringCapitalized.push(str.split("")[0].toUpperCase() + str.slice(1));
  }
  return stringCapitalized.join(" ");
}

const form = document.querySelector(".needs-validation");
form.addEventListener("submit", (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
  } else {
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

async function checkUsername(name) {
  if (name.value.length > 0) {
    await get_ad_userdata(name.value);
    userData.username = responseUser[0].values[0];
    userData.cargo = firstUpperCase(
      responseUser[1].values[0] ? responseUser[1].values[0] : "n"
    );
    userData.setor = firstUpperCase(
      responseUser[1].values[0] ? responseUser[2].values[0] : "n"
    );
    userData.email = responseUser[3].values[0];
    console.log(responseUser);
    console.log(userData);

    if (responseVerification) {
      listEl.innerHTML = `<li class="list-group-item">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Nome: ${userData.username}</li>
                  <li class="list-group-item">Cargo: ${userData.cargo}</li>
                  <li class="list-group-item">Setor: ${userData.setor}</li>
                  <li class="list-group-item">E-mail: ${userData.email}</li>
                </ul>
              </li>`;
    } else if (!responseVerification) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastEl);
      toastBootstrap.show();
    }
  }
}
