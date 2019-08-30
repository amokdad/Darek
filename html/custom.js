function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

$(document).ready(function(){
    
    /*getAllHotels(function(data){
        renderHandleBar(data,'hotelsListing','hotelsListingTemplate');
    })
    */

    $('#btnMokSubmit').click(function(){
        $(this).hide();
        $('#tdError').hide();
        $('#tdSuccess').hide();
        var data = {
            email:$('#inputEmail').val(),
            hotel:$('#inputHotel').val(),
            mobile:$('#inputMobile').val(),
            phone:$('#inputPhone').val(),
            description:$('#inputDescription').val(),
            password:$('#inputPassword').val()
        };

        postHotel(data,function(d){
            if(d.code){
                console.log(data);
                sendConfirmEmail(data,function(){
                    $('#tdSuccess').show();
                    $('#tdError').hide();
                    $('#btnMokSubmit').show();
                },
                function(err){
                    console.log(err);
                })
            }
            else{
                $('#tdSuccess').hide();
                $('#tdError').show();
                $('#btnMokSubmit').show();
            }
        });
    })

    $('#btnVerifySubmit').click(function(){
        $('#tdSuccess').show();
    })

})

var renderHandleBar = function(data,id,templateId)
{
    var source   = document.getElementById(templateId).innerHTML;
    var template = Handlebars.compile(source);
    var html = template(data);
    $('#'+id).html(html);
}





