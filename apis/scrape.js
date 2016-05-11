var request = require('request');
var cheerio = require('cheerio');
var urlParser = require("url");
var path = require("path");
var fs = require('fs');
var models = require('../models');

function replaceAndTrim(str){
   return str.replace(/(?:\r\n|\r|\n|\")/g, '').trim();
}

var download = function(uri, filename){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream('public/' + filename));
  });
};

function handleScrapElement(a, articleList, isMainBool){
		var json = { title : "",image:"", subTitle: "", text : "", author : "", creationDate : "", isMain : isMainBool};
		json.subTitle= replaceAndTrim(a.children('header').children('hgroup').children('h3').text());
                json.title = replaceAndTrim(a.children('header').children('hgroup').children('h2').text());
                json.author = replaceAndTrim(a.children('header').children('span').text().substring(2));
                json.text = replaceAndTrim(a.children('.intro').text());
		json.creationDate = a.children('header').children('time').attr('datetime');
		
		var imgUrl = a.children('a').children('img').attr('src').toString(); 	
                var parsed = urlParser.parse(imgUrl);
                json.image = 'img/' + path.basename(parsed.pathname);

		articleList.push(json);

		models.Articles
		      .build({
				title: json.title,
				subTitle: json.subTitle,
				author: json.author,
				text: json.text,
				creationDate: json.creationDate,
				isMain: json.isMain,
				image: json.image})
		      .save();

                download(imgUrl, json.image);
}

exports.scrape = function (req, res){
    
    var url = 'http://sportsport.ba/';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
	    var articleList = [];
            
	    models.Articles.destroy({truncate: true});

            $('#position_2345 article.news_intro').each(function(i, element){
		
      		var a = $(this);
		handleScrapElement(a, articleList, false);
      		
    	    });

	    $('#rpc_position_one').each(function(i, element){
		
      		var a = $(this);
		handleScrapElement(a, articleList, true);
      		
    	    });
	    res.send(articleList);        
        }
    })
   
}