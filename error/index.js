import path from 'path';
import util from 'util';
import http from 'http';

class HttpError {
    constructor(status, message) {
        Error.apply(this, [status, message]);
        Error.captureStackTrace(this, HttpError);
        this.status = status;
        this.message = message || http.STATUS_CODES[status] || 'Error';
    }
    
}

util.inherits(HttpError, Error);

HttpError.prototype.name = 'HttpError';

export default HttpError;