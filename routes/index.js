var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


/* GET home page. */
router.get('/:type/:num', function(req, res) {
	var type = req.param("type");
	var num = req.param("num");

	var root = 'http://www.yellowpages.com/';
	var city = 'new-york-ny/';

	var url = root + city + type;

	var data = {};

	request(root, function(err, res, html){
		if (err) console.
		else {
			var $ = cheerio.load(html);

			console.log($("div.v-card").length);

			$("div.v-card").each(function(index, element){
				var links = [];
				var name = $(this).find(".info h3 a").text();
				var detail = $(this).find(".info h3 a").attr("href");

				$(this).find("div.info-section-wrapper div.info-section.info-secondary ul.links li a").each(function(index, element){
					links.push($(this).text());
				})

				if (links && links.indexOf('Website') == -1) {
					console.log(index + " " + name + " " + detail);
					if(detail) {
						request(url + detail, function(err, res, html){
							if (err) console.log(err)
							else {
								var $$ = cheerio.load(html);
								var phone = $$("#main-content div.bottom-section section.contact-gallery div.contact p.phone").text();
								var email = $$("#main-content div.bottom-section footer a.email-business").attr("href").splice(6);
								if (email || phone) {
									
								}


							}
						})
					}

				}
			})

			


			/*
			var title, release, rating;
			var json = { title : "", release : "", rating : ""};

			$('.header').filter(function(){
		        var data = $(this);
		        title = data.children().first().text();            
                release = data.children().last().children().text();

		        json.title = title;
                json.release = release;
	        })

            $('.star-box-giga-star').filter(function(){
	        	var data = $(this);
	        	rating = data.text();

	        	json.rating = rating;
	        })
		}
        // To write to the system we will use the built in 'fs' library.
        // In this example we will pass 3 parameters to the writeFile function
        // Parameter 1 :  output.json - this is what the created filename will be called
        // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
        // Parameter 3 :  callback function - a callback function to let us know the status of our function

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

        	console.log('File successfully written! - Check your project directory for the output.json file');

        })*/

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!')
       }

     })
	
});

module.exports = router;
