const sendHttpError = (req, res, next) => {
    res.sendHttpError = function (error) {

        res.status(error.status);
        if (res.req.headers['x-requested-with'] == 'XMLHttpRequest') {
            res.json(error);
        } else {
            res.send(`error ${error}`);
        }
    };

    next();
}

export default sendHttpError;