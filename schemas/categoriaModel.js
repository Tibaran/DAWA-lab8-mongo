const mongoose = require('mongoose');
const {User, userSchema} = require('./userModel');
const Schema = mongoose.Schema;

const categoriaSchema = Schema({
    _id: {type: String, require: true},
    nombre: {type: String, require: true},
    estado: {type: Boolean, require: true},
    usuario: {type: userSchema, required: true}
});
const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = {
    categoriaSchema,
    Categoria
}