"use strict";

module.exports.SecurityInvalidUser = function SecurityInvalidUser(message, code, status) {
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = status || 401;
    this.code = code || 401;
    this.message = message || "Authentication required";
};

require('util').inherits(module.exports, Error);