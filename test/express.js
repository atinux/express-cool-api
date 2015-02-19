var express = require('express');
var bodyParser = require('body-parser');
var cool = require ('../');

var app = express();
app.use(bodyParser.json());

var sanitization = {
	postArticle: {
		type: 'object',
		strict: true,
		properties: {
			title: { type: 'string', rules: ['trim', 'ucfirst'], optional: false, def: '' },
			body: { type: 'string', rules: 'trim', optional: false, def: '' },
		}
	}
};


var validation = {
	postArticle: {
		type: 'object',
		strict: true,
		properties: {
			title: { type: 'string', minLength: 5 },
			body: { type: 'string' },
		}
	}
};

app.post('/api/articles', cool.s(sanitization.postArticle), cool.v(validation.postArticle), function (req, res) {
	res.send(req.hash);
});

app.listen(3000);
console.log('Server is working on port 3000');