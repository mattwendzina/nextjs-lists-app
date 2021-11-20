const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    title: String,
    items: Array,
});
const UserListsSchema = new Schema({
    name: String,
    lists: [ListSchema],
});

const UserLists = mongoose.model('userLists', UserListsSchema);

module.exports = UserLists;
