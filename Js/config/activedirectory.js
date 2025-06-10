const ActiveDirectory = require("activedirectory");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const config = {
  url: process.env.BASE_URL,
  baseDN: process.env.BASE_DN,
  username: process.env.USER_NAME,
  password: process.env.AD_PASSWORD,
};


const ad = new ActiveDirectory(config);
console.log(config);
module.exports = ad;
