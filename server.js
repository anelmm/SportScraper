var restify = require('restify');
var path = require('path');
var logger = require('morgan');

var scrape = require('./apis/scrape');
var articles = require('./apis/articles');
var models = require('./models');

let app = restify.createServer();

var port = process.env.PORT || 3000;
app.use(logger('dev'));

app.use(restify.acceptParser(app.acceptable));
app.use(restify.queryParser());
app.use(restify.bodyParser());

app.get('/api/scrape', scrape.scrape);
app.get('/api/articles', articles.articles);

app.get(/.*/, restify.serveStatic({ directory: './public/', default: 'index.html' }));


app.use((err, req, res, next) => {
  console.log(err.stack.red); 
  res.status(err.status || 500);
  res.send({ message: err.message });
});


models.sequelize.sync().then(() => {
   app.listen(port,() => {
   console.log('Restify server listening on port ' + port);
  });
});

