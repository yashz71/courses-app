let mongoose = require('mongoose');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
let Schema = mongoose.Schema;

let CoursesSchema = Schema({
    id: Number,
    title: String,
    desc: String,
    img: String,
    l_desc: String,
    price:Number
});
CoursesSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Courses', CoursesSchema);
