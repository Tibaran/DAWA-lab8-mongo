const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolSchema = Schema({
    _id: {type: String, required: true},
    rol: {type: String, required: true}
});
const Rol = mongoose.model('Rol', rolSchema);
module.exports = {
    rolSchema,
    Rol
};