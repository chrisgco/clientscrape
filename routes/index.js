var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


/* GET home page. */
router.get('/:type', function(req, res) {
	var type = req.param("type");
	//var num = req.param("num");

	var root = 'http://www.yellowpages.com';
	var city = '/new-york-ny';
	var page = '?page='
	var count = 0;

	var url = root + city + "/" +type;

	request(url, function(err, res, html){
		if (err) {
			console.log(err)
		}
		else {
			var $ = cheerio.load(html);

			$("div.v-card").each(function(index, element){
				var links = [];
				var name = $(this).find(".info h3 a").text();
				var detail = $(this).find(".info h3 a").attr("href");

				$(this).find("div.info-section-wrapper div.info-section.info-secondary ul.links li a").each(function(index, element){
					links.push($(this).text());
				})

				if (links && links.indexOf('Website') == -1) {
					if(detail) {

						request(root + detail, function(err, res, html){
							if (err) {
								console.log(err)
							}
							else {
								var $$ = cheerio.load(html);
								var phone = $$("#main-content div.bottom-section section.contact-gallery div.contact p.phone").text() ? $$("#main-content div.bottom-section section.contact-gallery div.contact p.phone").text() : null;
								var email = $$("#main-content div.bottom-section footer a.email-business").attr("href") ? $$("#main-content div.bottom-section footer a.email-business").attr("href").slice(7) : null;
								var toprint = "\"" + name + "\"";
								if (email || phone) {
									if (email) toprint += "," + email
									else toprint += ","
									if (phone) toprint += "," + phone
									else toprint += ","
									toprint += "\n"
									fs.appendFile('output.csv', toprint, function(err){
        								console.log('Line successfully written! - ' + toprint);
        								count++;
        							})

								}
							}
						})

					}

				}
			})
			
    	}
    });
	res.send("Ummm...");
});

module.exports = router;
