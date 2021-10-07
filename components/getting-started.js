const mongoose = require('mongoose');
const {Kitten} = require('../schemas/kittenModel');

main().catch(err => console.log(err));

async function main() {
    // Conexion a mongo
    await mongoose.connect('mongodb+srv://usuario:1234@clusterlab7.teydf.mongodb.net/dbLab7?retryWrites=true&w=majority');
    /*// Esquema para kitty
    const kittySchema = new mongoose.Schema({
      name: String
    });
    // Metodo de un esquema
    kittySchema.methods.speak = function speak() {
        const greeting = this.name
          ? "Meow name is " + this.name
          : "I don't have a name";
        console.log(greeting);
      };
    // Cargamos el esquema a un modelo
    const Kitten = mongoose.model('Kitten', kittySchema);
    */
    // Usando modelo kitten.
    const silence = new Kitten({ name: 'Silence' });
    await silence.save();
    console.log(silence.name); // 'Silence'

    // Usando metodo almacenados
    const fluffy = new Kitten({ name: 'fluffy' });
    await fluffy.save(); // Guardando el documento en el db
    fluffy.speak(); // "Meow name is fluffy"

    // Con el modelo Kitten buscamos los documentos almacenados
    const kittens = await Kitten.find();
    console.log(kittens);
}