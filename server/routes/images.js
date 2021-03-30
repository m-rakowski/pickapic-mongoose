const multer = require("multer");
const Image = require("../model/image");
const path = require("path");
const fs = require("fs");

module.exports = (router) => {
  router.get("/images/:id", (req, res) => {
    Image.findById(req.params.id)
      .sort({ createdOn: 1 })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({
          message: "Errorrrr",
          error: err,
        })
      );
  });
  router.get("/images", (req, res) => {
    Image.find()
      .sort({ createdOn: 1 })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({ message: "Error finding images", error: err })
      );
  });

  const upload = multer({
    dist: path.join(__dirname, "..", "public", "uploads").toString(),
    limits: { fieldSize: 10 * 1024 * 1024 },
  });
  router.post("/images", upload.single("uploaded_file"), function (req, res) {
    Image.create(
      {
        type: req.file.mimetype,
        name: req.file.originalname,
      },
      (err, image) => {
        console.log("image is", image);
        fs.writeFileSync(
          path.join(__dirname, "..", "public", "uploads", image._id.toString()),
          req.file.buffer
        );

        // Image.findByIdAndUpdate(image._id.toString(),{});
        res.status(200).json(image);
      }
    );
    console.log(path.join(__dirname, "public", "uploads"));
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any
    console.log(req.file, req.body);
  });
};
