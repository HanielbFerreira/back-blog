const mongoose = require("mongoose");
const config = require("./config");

exports.connectDB = () => {
  mongoose
    .connect(config.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("MongoDB conectado");
    })
    .catch(err => console.log(err));
};
