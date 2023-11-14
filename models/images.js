const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: String,
    id_mason:{type: mongoose.Schema.Types.ObjectId, ref: "masons"},
    image:{
        data: Buffer,
        contentType: String,
    },
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;