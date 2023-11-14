const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    id_client:{type: mongoose.Schema.Types.ObjectId, ref: "client"},
    nombre: String,
    apellido: String,
    telefono: Number,
    direccion: {
        calle: {type: String},
        numero: {type: Number},
        ciudad: {type: String},
        colonia: {type: String},
        codigo_postal: {type: Number},
    }, 
});

const Client = mongoose.model("Client",clientSchema);
module.exports = Client;