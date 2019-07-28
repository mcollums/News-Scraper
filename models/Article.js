var mongoose = require("mongoose");

//Save a reference to the Schema constructor
var Schema = mongoose.Schema;

//Using the schema constructor, create a new UserSchema object
var ArticleSchema = new Schema({
    //Title is required and is a string
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    //"Link" is required and is a string
    link: {
        type: String,
        required: true
    },
    //Image is not required and is a string
    image: {
        type: String,
        required: false
    },
    //Note is an object that stores the Note Id
    //
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "note"
    }],

    favorite: {
        type: Boolean,
        default: false
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;