var express = require('express');
var path = require('path');
var app = express();
var shopifyAPI = require('shopify-node-api');

var publicPath = path.resolve(__dirname, 'public');
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 5000;

if (isProduction){
	app.use(express.static(publicPath));
} else {
	app.use(express.static(publicPath));
}

var Shopify = new shopifyAPI({
  shop: 'product-tabs-3', // MYSHOP.myshopify.com
  shopify_api_key: process.env.API_KEY, // Your API key
  shopify_shared_secret: process.env.SHARED_SECRET, // Your Shared Secret
  shopify_scope: 'write_script_tags',
  redirect_uri: 'http://localhost:'+port+'/index.html',
  nonce: Math.random() // you must provide a randomly selected value unique for each authorization request
});

var auth_url = Shopify.buildAuthURL();

console.log(auth_url)

app.get('/',function(req,res){
	res.redirect(auth_url);
})

app.get('/index.html', function(req, res) {
  	res.sendFile(__dirname + '/index.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
  	isProduction ? console.info("==> 🌎  Application up and running", port) : console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
