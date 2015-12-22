$("#menu").mouseenter(function() {
    // console.log("it worked!");
    $('#container').animate({
        top: "90vh"
    }, 1000);
    $('.title').animate({
        top: "80vh"
    }, 1000);
    $("#menu").animate({
        opacity: "0"
    }, 1000);
    $('.imgs').css('opacity','0.5');
    $('.imgs2').css('opacity','0.5');
});

$("#container").mouseleave(function() {
    // console.log("it worked!");
    $('.imgs').css('opacity','1');
    $('.imgs2').css('opacity','1');
    $('#container').animate({
        top: "100vh"
    }, 1000);
    $('.title').animate({
        top: "100vh"
    }, 1000);
    $("#menu").animate({
        opacity: "1"
    }, 1000);
    
});

$('#start').mousedown(function(){
    $('#stop').css({
        "opacity": 1 });
    $('#start').css({
        "z-index": -1});

});

$('#stop').mousedown(function(){
     $('#stop').css({
        "opacity": 0});
     $('#start').css({
        "z-index": 1});
   
});

function download() {
    var dt = canvas.toDataURL('image/jpeg');
    this.href = dt;
};
downloadLnk.addEventListener('click', download, false);

