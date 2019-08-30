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
var postHotel = function(data,callbak)
{
    $.ajax({
        type: "POST",
        url: "/api/hotels",
        data: data,
        success: function(data){callbak(data)},
        dataType: "json"
      });
}
var sendConfirmEmail = function(data,callback,error)
{
    data.type="register";
        $.ajax({
        type: "POST",
        url: "https://prod-56.westeurope.logic.azure.com:443/workflows/47b14b37d20142898a807116b14ba463/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=g9h_kXMNGzAMRZNHZLiPzKmmJ753ZrhDaqjW1RSlM5k",
        data: JSON.stringify(data),
        success: function(data){callback(data)},
        contentType: "application/json; charset=utf-8",
        error:function(data){error(data)}
    });
}