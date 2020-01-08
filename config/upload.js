const path = require("path");
const multer = require("multer");

/**
 * @author Haniel Barros
 * This class will be used on routes to do uploads of files
 */

/**
 * This method will be used as a middleware to allow only files with the extension PDF or DOC
 */
module.exports = {
  storage: new multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename: function(req, file, cb) {
      var filetypes = /jpg|jpeg|png/;
      var mimetype = filetypes.test(file.mimetype);
      var extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      if (mimetype && extname) {
        return cb(
          null,
          file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
      }
      cb("Error: Só são suportados esses tipos de arquivos -> " + filetypes);
    }
  })
};
