var showLoading = function(){
    console.log("start loading");
}
var getAllHotels = function (callback)
{	
    $.ajax({
        type: 'Get',
        cache: false,
        url: "/api/hotels",
        beforeSend: showLoading(),
        success: function (data) {       
            callback(data);
         },
    });
}
var postHotel = function(data,callbak,error)
{
    $.ajax({
        type: "POST",
        url: "/api/hotels",
        data: data,
        success: function(data){callbak(data)},
        dataType: "json"
      });
}