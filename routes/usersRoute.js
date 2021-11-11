const express = require('express');
const router = express.Router();
const {User} = require('../schemas/userModel');
const {Rol} = require('../schemas/rolModel');
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    //console.log('Time: ', Date.now());
    next();
  });
// Listar usuarios
router.get('/', async(req, res)=>{
    const Users = await User.find();
    res.render('layout', {vista: 'users', user: Users});  
});
// Agregar Usuario
router.route('/add')
.get( async(req, res)=>{
    const Rols = await Rol.find();
    const id = await User.estimatedDocumentCount()+1;
    const usuario = new User({_id: id});
    res.render('layout', {vista: 'usersAdd', rol: Rols, user: usuario});
})
.post( async(req, res)=>{
    const {txtId, txtNombre, txtCorreo, txtPass, txtImg, txtRol, txtEstado} = req.body;
    const newUser = new User({_id: txtId, userol: txtRol, nombre: txtNombre, correo: txtCorreo, password: txtPass, img: txtImg, estado: txtEstado=='on'?true:false});
    await newUser.save();
    res.redirect('/users');
});

// Editar Usuario
router.route('/edit/:id')
.get( async(req, res)=>{
    const Rols = await Rol.find();
    const {id} = req.params;
    const usuario = await User.findById(id);
    res.render('layout', {vista: 'usersAdd', rol: Rols, user: usuario});
})
.post( async(req, res)=>{
    const {txtId, txtNombre, txtCorreo, txtPass, txtImg, txtRol, txtEstado} = req.body;
    const updatedUser = new User({_id: txtId, userol: txtRol, nombre: txtNombre, correo: txtCorreo, password: txtPass, img: txtImg, estado: txtEstado=='on'?true:false});
    await User.updateOne({_id: txtId}, updatedUser);
    res.redirect('/users');
});

// Eliminar Usuario
router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    await User.findByIdAndDelete(id);
    res.redirect('/users');
});

module.exports = router;