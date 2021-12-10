const assert = require('assert');
const mongoose = require('mongoose');
const UserLists = require('../models/userLists');

describe('Nesting records', () => {
    let matt;

    beforeEach((done) => {
        mongoose.connection.collections.userlists.drop(() => done);
        matt = new UserLists({
            name: 'Matt Wendzina',
            lists: [
                { title: 'Shopping List', items: ['Eggs', 'Bacon'] },
                {
                    title: 'Holiday List',
                    items: ['Goggles', 'Swimming Trunks'],
                },
            ],
        });

        matt.save().then((result) => {
            done();
        });
    });

    it('Adds a new nested list to a user', (done) => {
        UserLists.findOneAndUpdate(
            { _id: matt._id },
            {
                $push: {
                    lists: [{ title: 'ToDo List', items: ['Renew Passport'] }],
                },
            }
        ).then(() => {
            UserLists.findOne({ _id: matt._id }).then((result) => {
                assert(result.lists.length === 3);
                done();
            });
        });
    });
});
