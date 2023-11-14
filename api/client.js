const express = require("express");
const router = express.Router();
const client = require("../models/client");

//Creacion del cliente
router.post("/crearCliente", (req, res) => {
  let nombre = req.body.nombre;
  let apellido = req.body.apellido;
  let telefono = req.body.telefono;
  let calle = req.body.calle;
  let numero = req.body.numero;
  let ciudad = req.body.ciudad;
  let colonia = req.body.colonia;
  let codigo_postal = req.body.codigo_postal;
  if (
    nombre == "" ||
    apellido == "" ||
    telefono == "" ||
    calle == "" ||
    numero == "" ||
    ciudad == "" ||
    colonia == "" ||
    codigo_postal == ""
  ) {
    res.json({
      status: "FAILED",
      message: "Empty input fields",
    });
  } else if (
    !/[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]*$/.test(
      nombre
    )
  ) {
    res.json({
      status: "FAILED",
      message: "Invalid nombre entered",
    });
  } else if (
    !/[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]*$/.test(
      apellido
    )
  ) {
    res.json({
      status: "FAILED",
      message: "Invalid apellido entered",
    });
  } else {
    const newClient = new client({
      nombre,
      apellido,
      telefono,
      direccion: {
        calle,
        numero,
        ciudad,
        colonia,
        codigo_postal,
      }
    });
    newClient
      .save()
      .then((result) => {
        res.json({
          status: "SUCCESS",
          message: "Cliente creado",
          data: result,
        });
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An ocurred error while creating the client",
        });
      });
  }
});

//get client
router.get("/read", async (req, res) => {
  client.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.json({
      status: "SUCCESS",
      message: "Client succesful obtained",
      data: result,
    });
  });
});

module.exports = router;
