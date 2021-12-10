const assert = require('assert');
const List = require('../models/lists');

describe('Finding records', () => {
    let list;
    beforeEach((done) => {
        list = new List({
            title: 'Todo List 1',
        });
        list.save().then(() => {
            done();
        });
    });

    it('Finds one record from the database', (done) => {
        List.findOne({ title: 'Todo List 1' }).then((result) => {
            assert(result.title === 'Todo List 1');
            done();
        });
    });

    it('Finds one record by ID from the database', (done) => {
        List.findOne({ _id: list._id }).then((result) => {
            assert(result._id.toString() === list._id.toString());
            done();
        });
    });
});
