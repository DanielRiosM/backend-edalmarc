const mongoose = require('mongoose');

const masonsSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    password: String,
    tipo_empleo: String,
    telefono: Number, 
});



const masons = mongoose.model("masons",masonsSchema);
module.exports = masons;