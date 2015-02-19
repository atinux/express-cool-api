# express-cool-api
Build a "cool" API by being less restrictive on your JSON validation.

# Installation
```
npm install express-cool-api
```

# Usage
```js
var cool = require('express-cool-api');

app.post('/api/articles', cool.sanitize(schemaSanitization), cool.validate(schemaValidation), function (req, res) {
	// Get req.hash with a perfect JSON as you expected
	console.log(req.hash);
});
```

# API
```
// Transform the given json as a cool hash
cool.sanitize(schema);
// Aliases: cool.s(schema), cool.sanitization(schema)

// Validate the given json to respect your standards
cool.sanitize(schema);
// Aliases: cool.s(schema), cool.sanitization(schema)
```
