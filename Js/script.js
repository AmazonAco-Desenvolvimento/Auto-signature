const toggleEl = document.getElementById("toggleLight");
const sunEl = document.getElementById("sunIco");
const moonEl = document.getElementById("moonIco");
const customerCodeEl = document.getElementById("customerCode");
const sendEl = document.getElementById("sendForm");
const listEl = document.getElementById("data-list");
const toastEl = document.getElementById("liveToast");

let userData = {
  username: "",
  cargo: "",
  setor: "",
  email: "",
  telefone: "",
  local: "",
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
      responseUser[4].values[0] ? responseUser[4].values[0] : "n"
    );
    userData.email = responseUser[5].values[0];
    userData.telefone = responseUser[3].values[0];
    userData.local = responseUser[2].values[0];
    console.log(responseUser);
    console.log(userData);

    if (responseVerification) {
      listEl.innerHTML = `<li class="list-group-item">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Nome: ${userData.username}</li>
                  <li class="list-group-item">Cargo: ${userData.cargo}</li>
                  <li class="list-group-item">Setor: ${userData.setor}</li>
                  <li class="list-group-item">E-mail: ${userData.email}</li>
                  <li class="list-group-item">Telefone: ${userData.telefone}</li>
                  <li class="list-group-item">Local: ${userData.local}</li>
                </ul>
              </li>`;
    } else if (!responseVerification) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastEl);
      toastBootstrap.show();
    }
  }
}

//Canva preview

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "/assets/imgs/Assinatura 21 Anos 1.png";
img.onload = function () {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText("Hello, World!", canvas.width / 2, canvas.height / 2);
};
