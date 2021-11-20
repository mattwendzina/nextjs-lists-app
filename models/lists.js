const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    title: String,
    items: Array,
});

const List = mongoose.model('list', ListSchema);

module.exports = List;
