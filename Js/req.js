let responseUser = "";
let responseVerification;

async function get_ad_userdata(username) {
  const url = `http://localhost:3000/api/user/${username}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("response status: " + response.status);
    }

    const json = await response.json();
    responseUser = json;
    responseVerification = true;
  } catch (error) {
    console.log(error.message);
    responseVerification = false;
  }
}
