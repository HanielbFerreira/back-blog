const Pages = require("../models/page.model");

exports.createPost = (req, res) => {
  const { title, message } = req.body;
  const { filename: photo } = req.file;

  Pages.create({
    title,
    message,
    photo
  })
    .then(page => {
      res.status(201).send(page);
    })
    .catch(err => res.status(500).send("Some error ocurred"));
};

exports.getAllPosts = (req, res) => {
  Pages.find()
    .exec()
    .then(pages => {
      res.send(pages);
    });
};

exports.getOnePost = (req, res) => {
  Pages.findById(req.params.id)
    .exec()
    .then(page => res.send(page))
    .catch(err => res.status(404).send("Post doesn't exists"));
};

exports.deletePost = (req, res) => {
  Pages.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.send("Post deleted"))
    .catch(err => res.status(404).send("Post doesn't exists"));
};

exports.updatePost = (req, res) => {
  const { title, message } = req.body;
  const { filename: photo } = req.file;
  Pages.findByIdAndUpdate(req.params.id)
    .exec()
    .then(page => {
      page.title = title;
      page.message = message;
      page.photo = photo;
      page.save();
      res.send(page);
    })
    .catch(err => res.status(404).send("Post doesn't exists"));
};
