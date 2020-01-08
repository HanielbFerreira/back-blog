const express = require("express");
const route = new express.Router();
const multer = require("multer");
const uploadConfig = require(`../../config/upload`);
const upload = multer(uploadConfig);
const PageController = require("../controllers/page.controller");
const passport = require("passport");
const checkRole = require("../middlewares/checkRole");

route.get("/page", PageController.getAllPosts);
route.get("/page/:id", PageController.getOnePost);
route.post(
  "/page",
  upload.single("photo"),
  passport.authenticate("jwt", { session: false }),
  checkRole,
  PageController.createPost
);
route.put(
  "/page/:id",
  upload.single("photo"),
  passport.authenticate("jwt", { session: false }),
  checkRole,
  PageController.updatePost
);
route.delete(
  "/page/:id",
  passport.authenticate("jwt", { session: false }),
  checkRole,
  PageController.deletePost
);

module.exports = route;