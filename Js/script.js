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
  local: "",
  endereco: "",
  cep: "",
};

function resetName(name) {
  if (name.length >= 30 || name.length >= 20) {
    let arrAux = name.split(" ");
    firstName = arrAux[0];
    lastName = arrAux[arrAux.length - 1];
    let finalName = [firstName, , lastName];
    let middleNames = [];
    for (let j = 1; j < arrAux.length - 1; j++) {
      middleNames.push(arrAux[j]);
    }

    for (let i = 0; i < middleNames.length; i++) {
      middleNames[i] = middleNames[i][0] + ".";
      finalName[1] = middleNames.join(" ");
      if (finalName.join(" ").length < 27) {
        finalName = finalName.join(" ");
        console.log(finalName);
        return finalName;
        break;
      }
    }
  }
  return name;
}

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
    userData.username = resetName(responseUser[0].values[0]);
    userData.cargo = firstUpperCase(
      responseUser[1].values[0] ? responseUser[1].values[0] : "n"
    );
    userData.setor = firstUpperCase(
      responseUser[3].values[0] ? responseUser[3].values[0] : "n"
    );
    userData.email = responseUser[4]?.values[0] || "";
    userData.local = responseUser[2].values[0];

    if (userData.local === "MATRIZ") {
      userData.endereco = "AV. Puraquequara, 5328 | Puraquequara";
      userData.cep = "69009-000";
    } else if (userData.local === "LOJA-01 - SILVES") {
      userData.endereco = "Avenida Costa e Silva, 1257 | Raiz";
      userData.cep = "69068-010";
    } else if (userData.local === "LOJA-02 - ALVORADA") {
      userData.endereco = "Rua Prof.Abílio Alencar, 1337 | Alvorada I";
      userData.cep = "69043-150";
    } else if (userData.local === "LOJA-03 - GRANDE CIRCULAR") {
      userData.endereco = "Avenida Autaz Mirim, 7175 | Tancredo Neves";
      userData.cep = "69087-215";
    } else if (userData.local === "LOJA-04 - TIMBIRAS") {
      userData.endereco = "Avenida Timbiras, 350 | Cidade Nova";
      userData.cep = "69090-010";
    }

    if (responseVerification) {
    } else if (!responseVerification) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastEl);
      toastBootstrap.show();
    }
    //canva preview area
    console.log(userData);
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "/assets/imgs/Assinatura 21 Anos 1.png";
img.onload = function () {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  ctx.font = "bold 50px Montserrat";
  ctx.fillStyle = "white";
  ctx.textAlign = "start";
  ctx.textBaseline = "middle";
  ctx.fillText(`Ricardo V. M. S Pinheiro`, 700, 95);

  ctx.font = "bold 33px Montserrat";
  ctx.fillStyle = "white";
  ctx.textAlign = "start";
  ctx.textBaseline = "middle";
  ctx.fillText(`Estagiário superior`, 700, 150);

  ctx.font = "bold 20px Montserrat";
  ctx.fillStyle = "white";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(`W W W . A M A Z O N A C O . C O M . B R`, 1000, 380);

  ctx.font = "bold 27px Montserrat";
  ctx.fillStyle = "white";
  ctx.textAlign = "start";
  ctx.textBaseline = "middle";
  ctx.fillText(`ricardo.pinheiro@amazonaco.com.br`, 735, 326);
};
