const express = require("express");
require("dotenv").config();
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const port = process.env.PORT;
app.use(bodyParser.json());
const corsOptions = {
  credentials: true,
  origin: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));
const http = require("http");
const routes = require("./api/routes");
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use("/api", routes);

const server = http.createServer(app);
server.listen(port, () => console.log(`Server listening on ${port}!`));
app.get("/", (req, res) => {
  return res.status(200).send({
    message: "Welcome to the beginning of nothingness.",
  });
});

module.exports = app;