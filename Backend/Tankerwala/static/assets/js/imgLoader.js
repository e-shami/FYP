$(document).ready(function() {

    $(".profile").click(function(){

$("#modal").find('.body').empty();
$("#modal").find("footer").empty();
    var imgSrc = $(this).attr('src')
    var cont = document.getElementById("modal");
    var link = "<a href='"+imgSrc+"' target='_blank' class='w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple' >View In New Tab </a>"
    var img = "<img style=';margin-left: auto;margin-right: auto;display: block;max-width:70%' src='"+imgSrc+"'>"
    $("#modal").find('.body').append(img)
    $("#modal").find("footer").append(link)
    $('#modalButton').click();
})
});


