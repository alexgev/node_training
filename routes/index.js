import User from '../models/user';
import HttpError from '../error';
import { ObjectID } from 'mongodb';

const routes = (app) => {    
    app.get('/', (req, res, next) => {
        res.render('index', {
            body: '<b>Hello</b>'
        });
    });

    app.get('/users', (req, res, next) => {
        User.find({}, function(err, docs) {
            if (err) return next(err);
            res.json(docs);
        })
    });

    app.get('/user/:id', (req, res, next) => {
        try {
            const id = ObjectID(req.params.id);
        } catch(e) {
            next(404);
            return;
        }
        
        User.findById(req.params.id, function(err, docs) {
            if (err) return next(err);
            if (!docs) {
                next(new HttpError(404, "User not Found"));
            }
            res.json(docs);
        })
    })
}

export default routes;