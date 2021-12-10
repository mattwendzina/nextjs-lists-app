const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const ListSchema = new Schema({
    title: String,
    items: Array,
});

// This checks to see if the model already exists and makes sure it doesn't try to recreate if it does.
// It was causing an error when the server restarted after making a change/saving code. Solution/problem
// can be found here https://nesin.io/blog/fix-mongoose-cannot-overwrite-model-once-compiled-error
module.exports = mongoose.models.list || mongoose.model('list', ListSchema);
