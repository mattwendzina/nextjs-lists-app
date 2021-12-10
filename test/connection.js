const mongoose = require('mongoose');

// Connect to the DB before tests run
before((done) => {
    // Connect to mongodb
    mongoose.connect('mongodb://localhost/testDatabase');
    console.log('CONNECTING TO MONGO...');
    mongoose.connection
        .once('open', () => {
            console.log('CONNECTION MADE...');
            done();
        })
        .on('error', (error) => {
            console.log('CONNECTION ERROR: ', error);
        });
});

// Drop (delete) lists collection before each test
beforeEach((done) => {
    mongoose.connection.collections.lists.drop(() => {
        done();
    });
});
