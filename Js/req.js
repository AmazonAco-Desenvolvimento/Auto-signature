let responseUser = "";

async function get_ad_userdata() {
  const url = "http://localhost:3000/api/user/ricardo.pinheiro";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("response status: " + response.status);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error.message);
  }
}

get_ad_userdata();
