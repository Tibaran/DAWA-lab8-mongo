const express = require('express');
const router = express.Router();
const {Rol} = require('../schemas/rolModel');
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    //console.log('Time: ', Date.now());
    next();
  });
router.get('/', async function(req, res){
    const Rols = await Rol.find();
    res.render('layout', {vista: 'rols', rol: Rols});
    //find(res).catch(err => console.log(err));
    
});
router.get('/add', (req, res)=>{
    res.render('layout', {vista: 'rolsAdd'});
});
router.post('/add', async function(req, res){
    const {txtRol}= req.body;
    const id = await Rol.estimatedDocumentCount()+1;
    const newRol = new Rol({_id: id, rol: txtRol});
    await newRol.save();
    //save(newRol).catch(err => console.log(err));
    res.redirect('/rols');
});
async function find(res){
    const Rols = await Rol.find();
    res.render('layout', {vista: 'rols', rol: Rols});
}
async function save(rol)
{
    await rol.save();
}
async function newId(){
    return await Rol.estimatedDocumentCount()+1;
}
module.exports = router;