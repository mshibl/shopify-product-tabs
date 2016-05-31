ShopifyApp.configure do |config|
  config.api_key = ENV['API_KEY']
  config.secret = ENV['SECRET']
  config.scope = "read_script_tags, write_script_tags, read_products, write_products"
  # config.redirect_uri = "https://shopify-tabs.herokuapp.com/auth/shopify/callback"
  config.embedded_app = true

  config.scripttags = [
  	{event:'onload', src: 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js'}
  ]
end
