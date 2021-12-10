const assert = require('assert');
const List = require('../models/lists');

describe('Saving records', () => {
    it('Saves a record to the database', (done) => {
        const list = new List({
            title: 'Todo List 1',
        });
        list.save().then(() => {
            // We need to know it's actually saved. Once the record has been saved
            // to the database, 'isNew' will return false
            assert(list.isNew === false);
            done();
        });
    });
});
