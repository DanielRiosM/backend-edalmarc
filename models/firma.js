const mongoose = require('mongoose');

const firmaSchema = new mongoose.Schema({
    name: String,
    id_mason:{type: mongoose.Schema.Types.ObjectId, ref: "masons"},
    firma:{
        data: Buffer,
        contentType: String,
    },
});

const Firma = mongoose.model('Firma', firmaSchema);
module.exports = Firma;
