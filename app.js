var app = require('koa')();
var path = require('path');
var serve = require('koa-static-server');
var logger = require('koa-logger');

app.use(logger());

app.use(serve({rootDir: './browser/src', rootPath: ''}));

app.on('error', function (err, ctx) {
    console.log(err);
});

app.listen(3000);
console.log('[ui server] listening on port 3000');