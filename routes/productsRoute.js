const express = require('express');
const router = express.Router();
const {User} = require('../schemas/userModel');
const {Categoria} = require('../schemas/categoriaModel');
const {Product} = require('../schemas/productModel');

// Listar Productos
router.get('/', async(req, res)=>{
    const Products = await Product.find();
    res.render('layout', {vista: 'products', product: Products});  
});
// Agregar Producto
router.route('/add')
.get( async(req, res)=>{
    const users = await User.find();
    const categories = await Categoria.find();
    const id = await Product.estimatedDocumentCount()+1;
    const product = new Product({_id: id});
    res.render('layout', {vista: 'productsAdd', user: users, category: categories, product: product});
})
.post( async(req, res)=>{
    const {txtId, txtNombre, txtEstado, txtUser, txtPrecio, txtCategoria, txtDesc, txtDisponible, txtImg} = req.body;
    const usuario = await User.findById(txtUser);
    const categoria = await Categoria.findById(txtCategoria);
    const newProduct = new Product({_id: txtId, nombre: txtNombre, estado: txtEstado=='on'?true:false, usuario: usuario, precio: txtPrecio, categoria: categoria, descripcion: txtDesc, disponible: txtDisponible, img: txtImg});
    await newProduct.save();
    res.redirect('/products');
});

// Editar Producto
router.route('/edit/:id')
.get( async(req, res)=>{
    const users = await User.find();
    const categories = await Categoria.find();
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('layout', {vista: 'productsAdd', user: users, category: categories, product: product});
})
.post( async(req, res)=>{
    const {txtId, txtNombre, txtEstado, txtUser, txtPrecio, txtCategoria, txtDesc, txtDisponible, txtImg} = req.body;
    const usuario = await User.findById(txtUser);
    const categoria = await Categoria.findById(txtCategoria);
    const updatedProduct = new Product({_id: txtId, nombre: txtNombre, estado: txtEstado=='on'?true:false, usuario: usuario, precio: txtPrecio, categoria: categoria, descripcion: txtDesc, disponible: txtDisponible, img: txtImg});
    await Product.updateOne({_id: txtId}, updatedProduct);
    res.redirect('/products');
});

// Eliminar Producto
router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
});

module.exports = router;