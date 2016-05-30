var express = require('express');
var path = require('path');
var app = express();
var shopifyAPI = require('shopify-node-api');
var request = require('request');
var options

var publicPath = path.resolve(__dirname, 'public');
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 5000;

if (isProduction){
	app.use(express.static(publicPath));
} else {
	app.use(express.static(publicPath));
}

var config = {
	  shop: 'product-tabs-3', // MYSHOP.myshopify.com
	  shopify_api_key: process.env.API_KEY, // Your API key
	  shopify_shared_secret: process.env.SHARED_SECRET, // Your Shared Secret
	  shopify_scope: 'write_script_tags',
	  redirect_uri: 'https://shopify-product-tabs.herokuapp.com/finish_auth.html', 
	  nonce: Math.random() // you must provide a randomly selected value unique for each authorization request
	}

// Shopify Configuration
	var Shopify = new shopifyAPI(config);

	var auth_url = Shopify.buildAuthURL();

	app.get('/',function(req,res){
		res.redirect(auth_url);
	})
// End of Shopify Configuration

app.get('/finish_auth.html', function(req, res) {
	var Shopify = new shopifyAPI(config);
	query_params = req.query;
	console.log(query_params)

	// var request = require("request");

	var options = { method: 'POST',
	  url: 'https://'+query_params.shop+'/admin/oauth/access_token',
	  headers: 
	   { 'postman-token': 'cd655cd7-b903-081a-8a30-47fb74d18ac5',
	     'cache-control': 'no-cache',
	     'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
	  formData: 
	   { client_id: '46942b166f1bc0a61f53ac5da1afaf1b',
	     client_secret: 'b9e7e0fa3fc3e082266045c2ea1e5695',
	     code: query_params.code } };

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  console.log(body);
	});



	// request.post(
	// 	'https://'+query_params.shop+'/admin/oauth/access_token',
	// 	{
	// 		// body: {
	// 			"client_id": process.env.API_KEY,
	// 			"client_secret": process.env.SHARED_SECRET,
	// 			"code": query_params.code
	// 		// }
	// 	},
	// 	function (error, response, body) {
	// 		console.log('*****************************')
	// 		if(response){
	// 			// console.log(response)
	// 			console.log(response.access_token)
	// 		} else if (error) {
	// 			console.log(error)
	// 		} else {
	// 			// console.log(body)
	// 		}
	// 		console.log('*****************************')
	// 	}
	// )

	// request.post(
	// 	'https://'+query_params.shop+'/admin/oauth/access_token',
	// 	{
	// 		body: {
	// 			client_id: process.env.API_KEY,
	// 			client_secret: process.env.SHARED_SECRET,
	// 			code: query_params.code
	// 		}
	// 	},
	// 	function (error, response, body) {
	// 		console.log('*****************************')
	// 		if(response){
	// 			// console.log(response)
	// 			console.log(response.access_token)
	// 		} else if (error) {
	// 			console.log(error)
	// 		} else {
	// 			// console.log(body)
	// 		}
	// 		console.log('*****************************')
	// 	}
	// )



	// Shopify.exchange_temporary_token(query_params, function(err, data){
	// 	// console.log('*****************************')
	// 	// console.log('data:')
	// 	// console.log(data)
	// 	// console.log('*****************************')
	// 	// console.log('error:')
	// 	// console.log(err)
	// 	// console.log('*****************************')
	// 	// This will return successful if the request was authentic from Shopify
	// 	// Otherwise err will be non-null.
	// 	// The module will automatically update your config with the new access token
	// 	// It is also available here as data['access_token']
	// });
	

	// request.post(
	// 	'https://'+query_params.shop+'/admin/script_tags.json',
	// 	{
	// 	  "script_tag": {
	// 	    "event": "onload",
	// 	    "src": "https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/jqueryui\/1.11.4\/i18n\/jquery-ui-i18n.js"
	// 	  }
	// 	},
	//     function (error, response, body) {
	//     	if (error) {console.log(error)}
	//     	// if (response) {console.log(response)}
 //    	    // if (!error && response.statusCode == 200) {console.log(body)}
 //    	}
	// );


  	res.sendFile(__dirname + '/finish_auth.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
  	isProduction ? console.info("==> 🌎  Application up and running", port) : console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
