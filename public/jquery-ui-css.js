$("head").append("{{ 'tabs.scss' | asset_url | stylesheet_tag }}")

$("head").append("<link rel=stylesheet href=https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css>")
$("head").append("<script>$(function() { $( '#tabs' ).tabs();})</script>")
