const mongoose = require('mongoose');

const AdministratorSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    telefono: Number,
    password: String,
});

const administrator = mongoose.model('administrator', AdministratorSchema);
module.exports = administrator;