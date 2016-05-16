var models = require('../models');

exports.articles = (req, res) => {
    
    models.Articles.all({order: [['creationDate', 'DESC']]}).then((articleList) => {
    			res.send(articleList);
  });
}