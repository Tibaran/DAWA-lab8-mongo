const express = require('express');
const router = express.Router();
const {Rol} = require('../schemas/rolModel');
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    //console.log('Time: ', Date.now());
    next();
  });
// Cargar todos los rols
router.get('/', async(req, res)=>{
    const Rols = await Rol.find();
    res.render('layout', {vista: 'rols', rol: Rols});   
});
// Carga la vista de formulario
router.get('/add', (req, res)=>{
    res.render('layout', {vista: 'rolsAdd'});
});
// Agrega un nuevo rol
router.post('/add', async(req, res)=>{
    const {txtRol}= req.body;
    const id = await Rol.estimatedDocumentCount()+1;
    const newRol = new Rol({_id: id, rol: txtRol});
    await newRol.save();
    res.redirect('/rols');
});
module.exports = router;