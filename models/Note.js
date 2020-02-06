var mongoose = require("mongoose");

//Referencing the schema constructor
var Schema = mongoose.Schema;

//Using this schema constructor, create a new NoteSchema object
var NoteSchema = new Schema({
    // date: {
    //     type: Date,
    //     default: Date.now
    // },
    body: String
});

//This creates out model from the above schema, using mongoose's model method.
var Note = mongoose.model("Note", NoteSchema);

//Export the Note model
module.exports = Note;