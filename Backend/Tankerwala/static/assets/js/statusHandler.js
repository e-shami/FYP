$(document).ready(function() {
    $(".pkgact").click(function(){
    var  id = $(this).closest('td').attr('id')
    status = "deactivate"
    $('#mainBox').load("packages/?statuss="+status+"&pkgid="+id)
    })
    $(".userStatus").click(function(){
    var  id = $(this).closest('td').attr('id')
    $('#mainBox').load("staff/?usid="+id)
    })

    $(".pkgde").click(function(){
    var  id = $(this).closest('td').attr('id')

    status = "activate"
    $('#mainBox').load("packages/?statuss="+status+"&pkgid="+id)
    })
    /////////////////////////////////////////////////////////////
    $('.blockus').click(function(){
    var  val = $(this).closest('td').attr('id')
    reloadHome('BLOCKED',val)
    })
    $('.approvec').click(function(){
        var  val = $(this).closest('td').attr('id')
        reloadHome('APPROVED',val)
    })
    $('.wasblock').click(function(){
        var  val = $(this).closest('td').attr('id')

        changeStatus('APPROVED',val)
    })
    $('.wasapprove').click(function(){
        var  val = $(this).closest('td').attr('id')

        changeStatus('BLOCKED',val)
    })
    $('#memDate').click(function(){
        var date = $('#datePicker').val();
        var branch = $('.branch').attr('id');
        $("#memberCard").load("/attendance/?branch="+branch+"&clicked="+date);
    })
    $('#staffDate').click(function(){

        var date = $('#staffDatePicker').val();

        $("#staffAttendanceBox").load("/staffAttendance/?clicked="+date);
    })

})
function reloadHome(status,id)
{
$("#modal").find('.body').empty();
var confirm = "<h3 class='my-6 text-xl font-semibold text-gray-700 dark:text-gray-200'>Are You Sure You Want To Perform This Action?</h3>"
$("#modal").find('.body').append(confirm);
if (status == "APPROVED")
{
    var yes = "<button id=" +id+ " class='yeshhh w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple'>Yes</button>"
}
else
{
var yes = "<button id="+id+" class='nopee w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-purple'>Yes</button>"
}
var no = "<button @click='closeModal' class='cemodals w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray'>Cancel</button>"

$("#modal").find("footer").empty();
$("#modal").find("footer").append(no);
$("#modal").find("footer").append(yes);


$('#modalButton').click()
$(".yeshhh").click(function(){
        $("#modal").find('.cemodals').click()
        status="APPROVED"
        id = $(this).attr('id')
        $('#mainBox').load("home/?first="+status+"&id="+id)
        })

$(".nopee").click(function(){
        $("#modal").find('.cemodals').click()
        status="BLOCKED"
        id = $(this).attr('id')
        $('#mainBox').load("home/?first="+status+"&id="+id)
        })
}
function blockall()
{

        $("#modal").find("footer").empty();
        $("#modal").find('.body').empty();
        var confirm = "<h3 class='my-6 text-xl font-semibold text-gray-700 dark:text-gray-200'>Are You Sure You Want To <strong class='text-red-600'>Block</strong> All Pending Clients??</h3>"
            var yes = "<button class='blocallye w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-purple'>Yes</button>"
            var no = "<button @click='closeModal' class='cemodals w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray'>Cancel</button>"

$("#modal").find("footer").append(no);
$("#modal").find("footer").append(yes);
$("#modal").find('.body').append(confirm);
$('#modalButton').click()

    $(".blocallye").click(function(){

        $('#mainBox').load("home/?first=allblock")
        $("#modal").find('.cemodals').click()

        })
    }
function accpetall()
{

        $("#modal").find("footer").empty();
        $("#modal").find('.body').empty();
        var confirm = "<h3 class='my-6 text-xl font-semibold text-gray-700 dark:text-gray-200'>Are You Sure You Want To <strong class='text-green-600'>Approve</strong> All Pending Clients??</h3>"
            var yes = "<button  class='appallyes w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple'>Yes</button>"
            var no = "<button @click='closeModal' class='cemodals w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray'>Cancel</button>"

$("#modal").find("footer").append(no);
$("#modal").find("footer").append(yes);
$("#modal").find('.body').append(confirm);
$('#modalButton').click()

    $(".appallyes").click(function(){

        $('#mainBox').load("home/?first=allapprove")
        $("#modal").find('.cemodals').click()

        })
    }
function changeStatus(status,id)
{

$("#modal").find('.body').empty();
var confirm = "<h3 class='my-6 text-xl font-semibold text-gray-700 dark:text-gray-200'>Are You Sure You Want To Perform This Action?</h3>"
$("#modal").find('.body').append(confirm);
if (status == "APPROVED")
{
    var yes = "<button id="+id+" class='yeshhh w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple'>Yes</button>"
}
else if (status=="BLOCKED")
{
var yes = "<button id="+id+" class='nopee w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-purple'>Yes</button>"
}
var no = "<button @click='closeModal' class='cemodals w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray'>Cancel</button>"

$("#modal").find("footer").empty();
$("#modal").find("footer").append(no);
$("#modal").find("footer").append(yes);


$('#modalButton').click()
$(".yeshhh").click(function(){
        $("#modal").find('.cemodals').click()
        status="APPROVED"
        id = $(this).attr('id')
        $('#mainBox').load("home/?first="+status+"&id="+id)
        })

$(".nopee").click(function(){
        $("#modal").find('.cemodals').click()
        status="BLOCKED"
        id = $(this).attr('id')
        $('#mainBox').load("home/?first="+status+"&id="+id)
        })
    }
  /*  var current document.getElementById("currentHeading").innerHTML;
    if (current =="All Members")
    {
        $("#memberCard").load("/branchMembers/?clicked=all",success("All Members")).fadeIn("slow");
    }
    else if (current =="Total Members")
    {

    }*/
