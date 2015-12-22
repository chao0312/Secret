$(document).ready(function(){

    var url =[];
    var urlArray;
    var amount = 3;
    var speed = 2;
    var gifSpeed = 0.2;

//update image size on window resize

function updateH() {
    var layerH = $('.backdrop').width();
    $('.backdrop').css({'height': layerH});
    $('input').css({'width': layerH * 0.7});

}


var token = "186366128.1677ed0.1266e331f1ef4e8ebf8a0c8bfea20244",
    access_parameters = {
        access_token: token
    };

//search for tag

$("input").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        var p = $("input").val();
        if(p.length) {
            console.log(p);
            grabImages(p, amount, access_parameters);
        }
    }
});

//toggle

$('#collage').click(function() {
    $('#collage').addClass("selected");
    $('#gif').removeClass("selected");
    var p = $("input").val();
        if(p.length) {
            console.log(p);
            grabImages(p, amount, access_parameters);
        }
});

$('#gif').click(function() {
    $('#gif').addClass("selected");
    $('#collage').removeClass("selected");
    var p = $("input").val();
        if(p.length) {
            console.log(p);
            grabImages(p, amount, access_parameters);
        }
});

$('#onB').click(function() {
    $('#onB').addClass("selected");
    $('#offB').removeClass("selected");

    $('#text').addClass("border");
    $('#text').removeClass("borderNone");
});



$('#offB').click(function() {
    $('#offB').addClass("selected");
    $('#onB').removeClass("selected");

    $('#text').removeClass("border");
    $('#text').addClass("borderNone");
});



//Slider

    $("#sliderBlur").slider({
        range: "min",
        value: 1,
        min: 1,
        max: 15,
        slide: function( event, ui ) {

            $('img').each(function(){
                var vague = $(this).Vague({intensity: ui.value});
                vague.blur();
            })

        }
    });

    $("#sliderNum").slider({
        range: "min",
        value: 3,
        min: 1,
        max: 10,

        slide: function( event, ui ) {
            var p = $("input").val();
            $("#target").empty();

            if(p.length) {
                console.log(p);
                amount = ui.value;
                grabImages(p, ui.value, access_parameters);
            }
        }
    });

    $("#sliderSpeed").slider({
        range: "min",
        value: 2,
        min: 1,
        max: 10,

        slide: function( event, ui ) {
            var p = $("input").val();
            $("#target").empty();

            if(p.length) {
                console.log(p);
                speed = ui.value;
                gifSpeed = speed * 0.1;
                grabImages(p, amount, access_parameters);
            }
        }
    });



//instagram API

function grabImages(tag, count, access_parameters) {
    var instagramUrl = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&count=' + count;
    $.getJSON(instagramUrl, access_parameters, onDataLoaded);
}


function onDataLoaded(instagram_data) {

    var target = $("#target");
    var targetGif = $("#targetGif");
    url = [];
    if (instagram_data.meta.code == 200) {
        var photos = instagram_data.data;

        if (photos.length > 0) {

            target.empty();

            function img(){
                for (var key in photos) {
                    var photo = photos[key];
                    target.append('<img class="instaFeed" src="' + photo.images.standard_resolution.url + '">');
                }
            }


            function gif(){
                for (var key in photos) {
                    var photo = photos[key];
                    url.push(photo.images.standard_resolution.url);
                }

                urlArray = url;

                gifshot.createGIF({
                        gifWidth: 500,
                        gifHeight: 500,
                        images: urlArray,
                        interval: gifSpeed
                }, function (obj) {
                    if (!obj.error) {
                        var image = obj.image, animatedImage = document.createElement('img');
                        animatedImage.src = image;
                        $("#target").append(animatedImage);
                    }
                });
            }

            if($('#collage').hasClass('selected')){
                img();
            }else if($('#gif').hasClass('selected')){
                gif();
            }else{
                console.log('wtf?');
            }


        } else {
            alert("no images with this tag!");
        }
    } else {
        var error = instagram_data.meta.error_message;
        console.log(error);
    }
}



updateH();

$(window).resize(function() {
    updateH();
});



});


