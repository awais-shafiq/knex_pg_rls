const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');
const {
	ValidationError,
	NotFoundError,
	// DBError,
	// ConstraintViolationError,
	UniqueViolationError,
	NotNullViolationError,
	// ForeignKeyViolationError,
	// CheckViolationError,
	// DataError
} = require('objection');
// const { getStandardString } = require("./Utility");

/**
 * @summary Handles Objection exceptions
 * @param {object} err Objection js error object
 * @example getError(err : ValidationError)
 * @returns JavaScript object which includes message, error type, data
 */
const getError = function (err) {


	if (err instanceof UniqueViolationError) {
		return {
			status: 409,
			message: err.columns.length > 0 ? `${err.columns[0].replace(/_|:|-/g, ' ').replace(/ +(?= )/g, '')} already exists` : 'Unknown Error',
			// message: err.columns.length > 0 ? getStandardString(`${err.columns[0]} already exists`) : "Unknown Error",
		};
	}

	if (err instanceof NotFoundError) {
		return {
			status: 404,
			message: err.message,
		};
	}

	if (err instanceof NotNullViolationError) {
		return {
			status: 400,
			message: err.columns.length > 0 ? `${err.columns[0].replace(/_|:|-/g, ' ').replace(/ +(?= )/g, '')} cannot be null` : 'Unknown Error',
		};
	}

	if (err instanceof JsonWebTokenError) {
		return {
			status: 403,
			message: 'Invalid Token'
		};
	}

	if (err instanceof TokenExpiredError) {
		return {
			status: 401,
			message: 'Token expired'
		};
	}

	if (err instanceof ValidationError) {
		return {
			status: 400,
			message: err.message.replace(/_|:|-/g, ' ').replace(/ +(?= )/g, '')
		};
	}


	return {
		status: 404,
		message: err.message
	};

};

module.exports = { getError };