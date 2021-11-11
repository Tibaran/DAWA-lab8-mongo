const express = require('express');
const router = express.Router();
const {Rol} = require('../schemas/rolModel');
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    //console.log('Time: ', Date.now());
    next();
  });
// Listar Rols
router.get('/', async(req, res)=>{
    const Rols = await Rol.find();
    res.render('layout', {vista: 'rols', rol: Rols});   
});

// Agregar Rol
router.route('/add')
.get( async(req, res)=>{
    const id = await Rol.estimatedDocumentCount()+1;
    const rol = new Rol({_id: id});
    res.render('layout', {vista: 'rolsAdd', rol: rol});
})
.post( async(req, res)=>{
    const {txtId, txtRol}= req.body;
    const newRol = new Rol({_id: txtId, rol: txtRol});
    await newRol.save();
    res.redirect('/rols');
});

// Editar Rol
router.route('/edit/:id')
.get(async(req, res)=>{
    const {id} = req.params;
    const rol = await Rol.findById(id);
    res.render('layout', {vista: 'rolsAdd', rol: rol});
}).post(async(req, res)=>{
    const {txtId, txtRol}= req.body;
    const updatedRol = new Rol({_id: txtId, rol: txtRol});
    await Rol.updateOne({_id: txtId}, updatedRol);
    res.redirect('/rols');
});

// Eliminar un Rol
router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    await Rol.findByIdAndDelete(id);
    res.redirect('/rols');
});

module.exports = router;