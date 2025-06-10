const axios = require("axios");

axios
  .get("https://jsonplaceholder.typicode.com/todos/99")
  .then((res) => console.log(res))
  .then((error) => console.log(error));