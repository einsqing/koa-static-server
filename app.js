var app = require('koa')();
var path = require('path');
var serve = require('koa-static-server');
var logger = require('koa-logger');

app.use(logger());

app.use(serve({rootDir: './browser/src/home', rootPath: ''}));
app.use(serve({rootDir: './browser/src/admin', rootPath: '/admin'}));
app.use(serve({rootDir: './browser/src/app', rootPath: '/app'}));
app.use(serve({rootDir: './browser/src/public', rootPath: '/public'}));
app.use(serve({rootDir: './browser/src/addon', rootPath: '/addon'}));
app.use(serve({rootDir: './browser/src/smart', rootPath: '/smart'}));

app.on('error', function (err, ctx) {
    console.log(err);
});

app.listen(3000);
console.log('[ui server] listening on port 3000');