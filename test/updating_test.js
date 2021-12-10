const assert = require('assert');
const List = require('../models/lists');

describe('Updating records', () => {
    beforeEach((done) => {
        const list = new List({
            title: 'Todo List 1',
            items: ['Item 1'],
        });
        list.save().then(() => {
            done();
        });
    });

    it('Should add an item to the "items" array from a record in the database', (done) => {
        List.findOneAndUpdate(
            { title: 'Todo List 1' },
            { $push: { items: ['Item 2', 'Item 3'] } }
        ).then(() => {
            List.findOne({ title: 'Todo List 1' }).then((result) => {
                assert(result.items.length === 3);
                done();
            });
        });
    });

    it('Should update the title from a record in the database', (done) => {
        List.findOneAndUpdate(
            { title: 'Todo List 1' },
            { title: 'Todo List 2' }
        ).then(() => {
            List.findOne({ title: 'Todo List 2' }).then((result) => {
                assert(result.title === 'Todo List 2');
                done();
            });
        });
    });
});
