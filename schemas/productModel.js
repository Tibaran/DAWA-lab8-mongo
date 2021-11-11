const mongoose = require('mongoose');
const { userSchema, User } = require('./userModel');
const { categoriaSchema, Categoria } = require('./categoriaModel');
const Schema = mongoose.Schema;

const productSchema = Schema({
    _id: {type: String, require: true},
    nombre: {type: String, require: true},
    estado: {type: Boolean, require: true},
    usuario: {type: userSchema, required: true},
    precio: {type: Number, required: true},
    categoria: {type: categoriaSchema, required: true},
    descripcion: String,
    disponible: {type: Number, required: true},
    img: String
});
const Product = mongoose.model('Product', productSchema);

module.exports = {
    productSchema,
    Product
}