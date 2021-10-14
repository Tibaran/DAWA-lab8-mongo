const express = require('express');
const router = express.Router();
const {User} = require('../schemas/userModel');
const {Rol} = require('../schemas/rolModel');
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    //console.log('Time: ', Date.now());
    next();
  });
router.get('/', async(req, res)=>{
    const Users = await User.find();
    res.render('layout', {vista: 'users', user: Users});  
});
router.get('/add', async(req, res)=>{
    const Rols = await Rol.find();
    res.render('layout', {vista: 'usersAdd', rol: Rols});
});
router.post('/add', async(req, res)=>{
    const {txtNombre, txtCorreo, txtPass, txtImg, txtRol, txtEstado}= req.body;
    const id = await User.estimatedDocumentCount()+1;
    const newUser = new User({_id: id, rol: txtRol, nombre: txtNombre, correo: txtCorreo, password: txtPass, img: txtImg, estado: txtEstado=='on'?true:false});
    await newUser.save();
    res.redirect('/users');
});

module.exports = router;