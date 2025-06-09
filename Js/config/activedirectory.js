const ActiveDirectory = require("activedirectory");
const dotenv = require("dotenv");

dotenv.config();

const config = {
  url: "",
  baseDN: "",
  username: "testname",
  password: "12345",
};

const ad = new ActiveDirectory(config);
console.log(ad);
module.exports = ad;
