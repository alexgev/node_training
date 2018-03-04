import mongoose from './libs/mongoose';

const open = () => {
    return new Promise((resolve, reject) => {
        mongoose.connection.on('open', resolve);
    })
}

const dropDatabase = () => {
    const db = mongoose.connection.db;
    return db.dropDatabase();
}

const createUsers = () => {
    const User = require('./models/user');
    const vasya = new User({username: 'Vasya', password: 'supervasya'});
    const petya = new User({username: 'Petya', password: '123'});
    const admin = new User({username: 'admin', password: 'thetruehero'});
    return vasya.save().then(
        result => petya.save()
    ).then(
        result => admin.save()
    )
}

const close = () => {
    return mongoose.disconnect();
}
open()
    .then(dropDatabase)
    .then(createUsers)
    .then(close)
    .then(result => {
        console.log('Success');
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        mongoose.disconnect();
        process.exit(255);
    });


// mongoose.connection.on('open', function() {
//     const db = mongoose.connection.db;
//     db.dropDatabase().then(
//         result => {
//             const vasya = new User({username: 'Vasya', password: 'supervasya'});
//             return vasya.save();
//         }
//     ).then(
//         result => {
//             const petya = new User({username: 'Petya', password: '123'});
//             return petya.save();
//         }
//     ).then(
//         result => {
//             const admin = new User({username: 'admin', password: 'thetruehero'});
//             return admin.save();
//         }
//     ).then(
//         result => mongoose.disconnect(),
//     ).then(
//         result => console.log('Success')
//     ).catch(
//         err => console.log('err', err)
//     )
// })











// const user = new User({
//     username: 'Tester',
//     password: 'secret'
// });

// user.save().then(
//     (el) => console.log(el),
//     (err) => console.log(err)
// );