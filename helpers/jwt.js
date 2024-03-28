require("dotenv").config();
const { expressjwt: jwt } = require("express-jwt");
const secret = process.env.SECRET;
const api = process.env.API_URL;
console.log(`${api}`);

function authJwt() {
  return jwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      `${api}/users/register`,
      `${api}/users/login`,
    ],
  });
}

module.exports = authJwt;
