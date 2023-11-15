const express = require("express");
const Firma = require("../models/firma");
const router = express();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("firma"), async (req, res) => {
  let id_mason = req.body.id_mason;
  if (id_mason == "") {
    res.json({
      status: "FAILED",
      message: "No se encontro el id del tecnico",
    });
  }
  const firma = new Firma({
    id_mason,
    name: req.file.originalname,
    firma: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
  });

  //save firma
  await firma.save();

  firma.save().then((result) => {
    res.json({
      status: "SUCCESS",
      message: "Firma guardada",
      data: result
      });
    });
  });
 

//leer firmas guardadas
router.get("/read", async (req, res) => {
  Firma.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.json({
      status: "SUCCESSS",
      message: "Firmas encontradas",
      data: result
    });
  });
});

//ver firmas
router.get("/view/:id_mason", async (req, res) => {
  try {
    const id_mason = req.params.id_mason;

    const firmas = await Firma.find({ id_mason: id_mason });

    if (firmas.length > 0) {
      const imageDataArray = firmas.map((firma) => ({
        id: firma._id,
        contentType: firma.firma.contentType,
        data: firma.firma.data.toString("base64"),
      }));

      res.json({
        status: "SUCCESS",
        message: "Firmas found",
        data: imageDataArray,
      });
    } else {
      res.status(404).json({
        status: "ERROR",
        message: "No images found for the given mason ID",
        data: null,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "ERROR",
      message: "Internal Server Error",
      data: null,
    });
  }
});

module.exports = router;