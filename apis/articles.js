var models = require('../models');
var request = require('request');

function scrape(req) {
  return new Promise(function(resolve, reject) {
    request('http://' + req.headers.host + '/api/scrape', function(error, response, body) {
      if (error)
	{ 
		console.log(error);
		return reject(error);
	}
      resolve(body);
    });
  });
}

exports.articles = function(req, res){
    
    var p = scrape(req);

    models.Articles.all({order: [['creationDate', 'DESC']]}).then(function(articleList) {
    			res.send(articleList);
    
    
  });
}