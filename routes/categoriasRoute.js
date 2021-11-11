const express = require('express');
const router = express.Router();
const {User} = require('../schemas/userModel');
const {Categoria} = require('../schemas/categoriaModel');

// Listar categorias
router.get('/', async(req, res)=>{
    const Categorias = await Categoria.find();
    res.render('layout', {vista: 'categorias', categorias: Categorias});  
});
// Agregar Usuario
router.route('/add')
.get( async(req, res)=>{
    const users = await User.find();
    const id = await Categoria.estimatedDocumentCount()+1;
    const categoria = new Categoria({_id: id});
    res.render('layout', {vista: 'categoriasAdd', user: users, category: categoria});
})
.post( async(req, res)=>{
    const {txtId, txtNombre, txtEstado, txtUser} = req.body;
    const usuario = await User.findById(txtUser);
    const newCategory = new Categoria({_id: txtId, nombre: txtNombre, estado: txtEstado=='on'?true:false, usuario: usuario});
    await newCategory.save();
    res.redirect('/categories');
});

// Editar Usuario
router.route('/edit/:id')
.get( async(req, res)=>{
    const users = await User.find();
    const {id} = req.params;
    const categoria = await Categoria.findById(id);
    res.render('layout', {vista: 'categoriasAdd', user: users, category: categoria});
})
.post( async(req, res)=>{
    const {txtId, txtNombre, txtEstado, txtUser} = req.body;
    const usuario = await User.findById(txtUser);
    const updatedCategory = new Categoria({_id: txtId, nombre: txtNombre, estado: txtEstado=='on'?true:false, usuario: usuario});
    await Categoria.updateOne({_id: txtId}, updatedCategory);
    res.redirect('/categories');
});

// Eliminar Usuario
router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    await Categoria.findByIdAndDelete(id);
    res.redirect('/categories');
});

module.exports = router;