var inspector = require('schema-inspector');

var sendError = function (res, error) {
	res.append('Content-Type', 'application/json');
	res.status(400);
	res.send({
		status: 400,
		error: 'Bad Request',
		message: error,
	});
};

var getHash = function (req) {
	if (req.hash)
		return req.hash;
	var hash = {};
	hash = req.query || {};
	for (var key in req.body) { hash[key] = req.body[key]; }
	for (var key in req.params) { hash[key] = req.params[key]; }
	return hash;
};

function sanitize (schema) {
	schema = schema || {};
	return function (req, res, next) {
		var hash = getHash(req);
		inspector.sanitize(schema, hash, function (err, result) {
			if (err) return sendError(res, err.message);
			req.hash = hash;
			next();
		});
	}
}

function validate (schema) {
	return function (req, res, next) {
		var hash = getHash(req);
		inspector.validate(schema, hash, function (err, result) {
			if (err) return sendError(res, err.message);
			if (!result.valid) return sendError(res, result.format());
			next();
		});
	}
}

exports.sanitization = sanitize;
exports.sanitize = sanitize;
exports.s = sanitize;

exports.validation = validate;
exports.validate = validate;
exports.v = validate;
