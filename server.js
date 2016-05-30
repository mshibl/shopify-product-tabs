var express = require('express');
var path = require('path');
var app = express();
var shopifyAPI = require('shopify-node-api');
var request = require('request');

var publicPath = path.resolve(__dirname, 'public');
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 5000;

if (isProduction){
	app.use(express.static(publicPath));
} else {
	app.use(express.static(publicPath));
}

// Shopify Configuration
	var Shopify = new shopifyAPI({
	  shop: 'product-tabs-3', // MYSHOP.myshopify.com
	  shopify_api_key: process.env.API_KEY, // Your API key
	  shopify_shared_secret: process.env.SHARED_SECRET, // Your Shared Secret
	  shopify_scope: 'write_script_tags',
	  redirect_uri: 'https://shopify-product-tabs.herokuapp.com/finish_auth.html', 
	  nonce: Math.random() // you must provide a randomly selected value unique for each authorization request
	});

	var auth_url = Shopify.buildAuthURL();

	app.get('/',function(req,res){
		res.redirect(auth_url);
	})
// End of Shopify Configuration

app.get('/finish_auth.html', function(req, res) {
	// var Shopify = new shopifyAPI
	query_params = req.query;

	// console.log('*****************************')
	// console.log(query_params)
	// console.log('*****************************')

	request.post(
		'https://'+query_params.shop+'/admin/script_tags.json',
		{
		  "script_tag": {
		    "event": "onload",
		    "src": "https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/jqueryui\/1.11.4\/i18n\/jquery-ui-i18n.js"
		  }
		},
	    function (error, response, body) {
	    	if(error){console.log(error)}
    	    if (!error && response.statusCode == 200) {
        	    console.log(body)
        	}
    	}
	);


  	res.sendFile(__dirname + '/finish_auth.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
  	isProduction ? console.info("==> 🌎  Application up and running", port) : console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
