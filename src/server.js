const express = require("express");
var app = express();
const passport = require("passport");
const config = require("../config/config");
const db = require("../config/db");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/user.route");
const pageRoute = require("./routes/page.route");

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());
app.use(morgan("combined"));

require("./middlewares/passport")(passport);

app.use(config.api_url, userRoute);
app.use(config.api_url, pageRoute);

db.connectDB();
app.get("/", (req, res) => {
  res.send("Main page");
});

app.get("*", function(req, res) {
  res.status(404).send("what???");
});

app.listen(config.serverPort, () => {
  console.log(`Server is running this port: ${config.serverPort}`);
});
