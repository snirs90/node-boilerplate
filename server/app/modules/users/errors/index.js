"use strict";

module.exports.UserUniqueError = function UserUniqueError(message, code, status) {
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = status || 409;
    this.code = code || 409;
    this.message = message || "A user with this email already exists.";
};

module.exports.UserSecurityJWTMissingData = function SecurityJWTMissingData(message, code, status) {
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = status || 500;
    this.code = code || 500;
    this.message = message || "No user ID supplied for JWT token";
};

module.exports.UserMailMissingData = function UserMailMissingData(message, code, status) {
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = status || 500;
    this.code = code || 500;
    this.message = message || "Tried to sent email with missing data.";
};

require('util').inherits(module.exports, Error);