const assert = require('assert');
const List = require('../models/lists');

describe('Deleting records', () => {
    let list;
    beforeEach((done) => {
        list = new List({
            title: 'Todo List 1',
        });
        list.save().then(() => {
            done();
        });
    });

    it('Deletes one record from the database', (done) => {
        List.findOneAndRemove({ title: 'Todo List 1' }).then(() => {
            List.findOne({ title: 'Todo List 1' }).then((result) => {
                assert(result === null);
                done();
            });
        });
    });
});
