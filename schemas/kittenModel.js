const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kittySchema = new Schema({
    name: String
});
  // Metodo de un esquema
kittySchema.methods.speak = function speak() {
      const greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
      console.log(greeting);
};

const Kitten = mongoose.model('Kitten', kittySchema);
module.exports = {
  Kitten
};