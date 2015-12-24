var express = require('express');
var router = express.Router();
var phantom = require('phantom');
var Pageres = require('pageres');


var basikCSS = '#outlook a { padding: 0; } /* line 7, ../scss/style.scss */ body { font-family: Helvetica, Arial, sans-serif; width: 100% !important; margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } /* line 16, ../scss/style.scss */ .ExternalClass { width: 100%; } /* line 18, ../scss/style.scss */ .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } /* line 28, ../scss/style.scss */ #backgroundTable { width: 100% !important; margin: 0; padding: 0; line-height: 100% !important; text-align: center; } /* line 36, ../scss/style.scss */ code { background-color: #eee; padding: 0 4px; font-family: Menlo, Courier, monospace; font-size: 12px; } /* line 43, ../scss/style.scss */ hr { border: 0; border-bottom: 1px solid #cccccc; } /* End reset */ /* line 50, ../scss/style.scss */ img { outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; } /* line 56, ../scss/style.scss */ a img { border: none; } /* line 60, ../scss/style.scss */ table { border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; } /* line 64, ../scss/style.scss */ table, table td { border-collapse: collapse; } /* line 70, ../scss/style.scss */ .ReadMsgBody { width: 100%; background-color: #ebebeb; } /* line 75, ../scss/style.scss */ .yshortcuts a { border-bottom: none !important; } /* SPECIFIC GLOBAL STYLES */ /* line 80, ../scss/style.scss */ #backgroundTable { background-color: #b4b4b4; padding: 0; margin: 0; } /* line 86, ../scss/style.scss */ .main-td { background-color: #b4b4b4; } /* line 90, ../scss/style.scss */ .container { width: 640px; max-width: 640px; background-color: #ffffff; } /* line 96, ../scss/style.scss */ .col { text-align: left; width: 100%; } /* line 101, ../scss/style.scss */ .col-right { text-align: right; width: 100%; } /* line 106, ../scss/style.scss */ .container-padding { padding-left: 10px; padding-right: 10px; } /* line 111, ../scss/style.scss */ .mobile-padding { padding-left: 0px; padding-right: 0px; } /* line 115, ../scss/style.scss */ .no-txt { padding-left: 10px; padding-right: 10px; } /* line 120, ../scss/style.scss */ .template-comment { padding: 50px; font-size: 30px; line-height: 100%; } /************************** ************************* PROJECT SCSS STYLES ************************* **************************/ /* RESPONSIVE STYLES */ @media screen and (max-width: 639px) { /* TABLE STRUCTURE */ /* line 135, ../scss/style.scss */ table[class*=&quot;force-row&quot;], table[class=&quot;container&quot;] { width: 100% !important; max-width: 100% !important; } /*---------------*/ /* line 141, ../scss/style.scss */ td[class*=&quot;mobile-padding&quot;] { padding-left: 10px !important; padding-right: 10px !important; } /* MOBILE IMAGES */ /* line 146, ../scss/style.scss */ img[class*=&quot;mobile-fluid-img&quot;] { width: 100%; height: auto; } /* line 150, ../scss/style.scss */ img[class*=&quot;mobile-hide&quot;], div[class*=&quot;mobile-hide&quot;], br[class*=&quot;mobile-hide&quot;], table[class*=&quot;mobile-hide&quot;] { display: none !important; visibility: hidden !important; } /* BACKGROUND IMAGES TO DISPLAY */ /* line 158, ../scss/style.scss */ /************************** ************************* PROJECT SCSS STYLES ************************* **************************/ } @media screen and (max-width: 400px) { /* line 174, ../scss/style.scss */ td[class*=&quot;container-padding&quot;] { padding-left: 12px !important; padding-right: 12px !important; } }'
var htmlHead = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html lang="fr">  <head>  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- So that mobile will display zoomed in -->  <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable media queries for windows phone 8 -->  <meta name="format-detection" content="telephone=no"> <!-- disable auto telephone linking in iOS -->    <title>email export</title>  <style media="screen">'+basikCSS+'</style></head>'
/* GET home page. */
router.post('/', function(req, res) {




phantom.create(function (ph) {
	ph.createPage(function (page) {
	page.set('viewportSize', {width:320, height: 100});

  	page.setContent(htmlHead+'<body style="width:320px; background-color=#ffffff; color=#000000">'+req.body.content+'</body></html>');
  	
  	var timestamp = new Date().getUTCMilliseconds();
  	var myFile = 'images/screens/test-screenshot-'+timestamp+'.png';
  	var height = page.evaluate(function() { return document.body.offsetHeight });

	page.render('public/'+myFile, function(){
		console.log('done');
		res.end(myFile);
		ph.exit();
	});
	 
  });
});


/*var timestamp = new Date().getUTCMilliseconds();
var myFile = 'images/screens/screenshot-'+timestamp;

var test = new Pageres({delay:0, filename:myFile })
    .src('www.rapp.com', ['640x480', 'iphone 4'], {crop: false})
    .dest('images/screens/')
    .run()
    .then();*/



});

module.exports = router;
