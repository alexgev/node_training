import express from 'express';
import path from 'path';
import http from 'http';
import config from './config';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './routes';
import middleware from './middleware/sendHttpError';
import HttpError from './error';

import log from './libs/log';
const logger = log(module);

const app = express();

app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

if (app.get('env') == 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('default'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(middleware)

routes(app);

app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(config.get('port'), () => {
    logger.info(`Server listening on port ${config.get('port')}`);
});


app.use((err, req, res, next) => {
    // NODE_ENV
    if (typeof err == 'number') {
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') == 'development') {
            res.status(500).send(err.stack);
        } else {
            logger.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});









// app.use((req, res, next) => {
//     if (req.url === '/') {
//         res.end('hello');
//     } else {
//         next();
//     }
// });

// app.use((req, res, next) => {
//     if (req.url === '/forbidden') {
//         next(new Error('wops, denied'));
//     } else {
//         next();
//     }
// });

// app.use((req, res, next) => {
//     if (req.url === '/test') {
//         res.send('Test');
//     } else {
//         next();
//     }
// });

// app.use((req, res) => {
//     res.status(404).send("Page not found");
// })