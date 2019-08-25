$(document).ready(function(){
    getAllHotels(function(data){
        renderHandleBar(data,'hotelsListing','hotelsListingTemplate');
    })
})

var renderHandleBar = function(data,id,templateId)
{
    var source   = document.getElementById(templateId).innerHTML;
    var template = Handlebars.compile(source);
    var html = template(data);
    $('#'+id).html(html);
}




