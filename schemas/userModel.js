const mongoose = require('mongoose');
const { rolSchema } = require('./rolModel');
const Schema = mongoose.Schema;

const userSchema = Schema({
    _id: {type: String, require: true},
    rol: {type: rolSchema, require: true},
    nombre: {type: String, required: true},
    correo: {type: String, required: true},
    password: {type: String, required: true},
    img: String,
    estado: {type: Boolean, required: true},
    google: {type: Boolean, required: true, default: false}
});
const User = mongoose.model('User', userSchema);

module.exports = {
    userSchema,
    User
}