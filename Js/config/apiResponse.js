let ldapJs = require("ldapjs");
let env = require("dotenv");
let express = require("express");
let cors = require("cors");

const app = express();
env.config();
app.use(cors({ origin: "*", methods: ["GET"] }));

const config = {
  url: process.env.BASE_URL,
  baseDN: process.env.BASE_DN,
  username: process.env.USER_NAME,
  password: process.env.AD_PASSWORD,
};

app.get("/api/user/:username", (req, res) => {
  let client = ldapJs.createClient({ url: config.url });
  let userfound = false;

  client.bind(config.username, config.password, (error) => {
    if (error) {
      console.log("Failed to bind: ", +JSON.stringify(error));
      return;
    }

    console.log("Successfully connected");
  });

  client.search(
    config.baseDN,
    {
      scope: "sub",
      filter: `sAMAccountname=${req.params.username}`,
      attributes: [
        "cn",
        "description",
        "department",
        "mail",
        "physicalDeliveryOfficeName",
      ],
    },
    (err, user) => {
      if (err) {
        res.status(500).json("Error");
        return;
      }
      user.on("searchEntry", (entry) => {
        userfound = true;
        res.json(entry.pojo.attributes);
        client.unbind((err) => {
          if (err) {
            console.log("error to unbind");
          } else {
            console.log("Disconnecting...");
          }
        });
      });

      user.on("error", (result) => {
        console.log("Status: ", result.status);
        client.unbind((err) => {
          if (err) {
            console.log("error to unbind");
          } else {
            console.log("Disconnecting...");
          }
        });
        res.status(404).json({ message: "LDAP error" });
      });
      user.on("end", (result) => {
        if (!userfound) {
          console.log("User not found");
          res.status(404).json({ error: "User not found" });
          client.unbind((err) => {
            if (err) {
              console.log("error to unbind");
            } else {
              console.log("Disconnecting...");
            }
          });
        }
      });
    }
  );
});

app.listen(3000, () => console.log(`Server running at http://localhost:3000`));
