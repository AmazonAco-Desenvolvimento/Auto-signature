const ActiveDirectory = require("activedirectory");
const axios = require("axios");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

const config = {
  url: process.env.BASE_URL,
  baseDN: process.env.BASE_DN,
  username: process.env.USER_NAME,
  password: process.env.AD_PASSWORD,
};

const username = process.env.USER_NAME;
const password = process.env.AD_PASSWORD;

const ad = new ActiveDirectory(config);

ad.authenticate(username, password, (err, auth) => {
  if (err) {
    console.log("ERROR:" + JSON.stringify(err));
    return;
  }
  if (auth) {
    console.log("authenticated");
  } else {
    console.log("authentication failed");
  }
});

ad.findUser("CN=Ricardo Victor Marques S Pinheiro,OU=TI,OU=USUARIOS,OU=MATRIZ,DC=amazonaco,DC=local", (err, user) => {
  if (err) {
    console.log("Error user: " + JSON.stringify(err));
  }
  if (user) {
    console.log("user found: " + user);
  } else {
    console.log("user not found");
  }
});

ad.findGroup("MATRIZ", (err, res) => {
  if (err) {
    console.log("matriz err: " + JSON.stringify(err));
    return;
  }

  if (res) {
    console.log(res);
  } else {
    console.log("group not found");
  }
});

const app = express();

app.get("/api/user/:username", (req, res) => {
  ad.findUser(req.params.username, (err, user) => {
    if (err) {
      console.log("Error user: " + JSON.stringify(err));
    }
    if (user) {
      console.log("user found: " + user);
    } else {
      console.log("user not found");
    }
    res.json(user);
  });
});

// app.listen(3000, ()=> console.log('server running on http://localhost:3000'))
