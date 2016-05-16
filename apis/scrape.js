var request = require('request');
var cheerio = require('cheerio');
var urlParser = require("url");
var path = require("path");
var fs = require('fs');
var models = require('../models');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config.json')[env];

let replaceAndTrim = (str) => {
   return str.replace(/(?:\r\n|\r|\n|\")/g, '').trim();
}

let download =(uri, filename, callback) => {
  request.head(uri, (err, res, body) => {
	if (err || res.statusCode !== 200) {
       callback(err || new Error(res.statusCode));
     } else {
	   request(uri).pipe(fs.createWriteStream('public/' + filename));
       callback(null, body);
     }
  });
};

 let handleScrapElement = (a, articleList, isMainBool) => {
		let json = { title : "",image:"", subTitle: "", text : "", author : "", creationDate : "", isMain : isMainBool};
		json.subTitle= replaceAndTrim(a.children('header').children('hgroup').children('h3').text());
                json.title = replaceAndTrim(a.children('header').children('hgroup').children('h2').text());
                json.author = replaceAndTrim(a.children('header').children('span').text().substring(2));
                json.text = replaceAndTrim(a.children('.intro').text());
		json.creationDate = a.children('header').children('time').attr('datetime');
		
		let imgUrl = a.children('a').children('img').attr('src'); 
		
		if(imgUrl !== 'undefined')
		{
			let parsed = urlParser.parse(imgUrl);
		    json.image = 'img/tmp/' + path.basename(parsed.pathname);
			download(imgUrl, json.image, (error, body) => {
			   if (error) {
				 console.error(error);
			   } else {
				 console.log(body);
			   }
			});
		}
		
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
}

exports.scrape = (req, res) => {
    
    let url = config.ScrapUrl;

    request(url, (error, response, body) => {
		if (error) {
			console.error(error);
		} else {
			let $ = cheerio.load(body);
			let articleList = [];
		
			models.Articles.destroy({truncate: true});

			$('#position_2345 article.news_intro').each((i, element) => {
				let a = $(element);
				handleScrapElement(a, articleList, false);
			});

			$('#rpc_position_one').each((i, element) => {
				let a = $(element);
				handleScrapElement(a, articleList, true);		
			});
			res.send(articleList);        
		}
    })
   
}