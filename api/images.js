const express = require("express");
const Image = require("../models/images");
const router = express();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  let id_mason = req.body.id_mason;
  if (id_mason == "") {
    res.json({
      status: "FAILED",
      message: "No se encontro el id del tecnico",
    });
  }
  const image = new Image({
    id_mason,
    name: req.file.originalname,
    image: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
  });

  //save image
  await image.save();

  image.save().then((result) => {
    res.json({
      status: "SUCCESS",
      message: "Imagen guardada",
      data: result,
    });
  });
});

//leer imagenes guardadas
router.get("/readImage/:id", async (req, res) => {
  const id = req.params.id;
  Image.find({id_mason: id}, (err, result) => {
    console.log("")
    if (err) {
      res.send(err);
    }
    res.json({
      status: "SUCCESSS",
      message: "Imagenes encontradas",
      data: result,
    });
  });
});

//ver imagenes
router.get("/view", async (req, res) => {
  const images = await Image.find().sort({ _id: -1 });

  res.render("images", { images: images });
});
module.exports = router;
