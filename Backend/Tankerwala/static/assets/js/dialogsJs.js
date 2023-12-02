
$(document).ready(function() {
var plus="true"

    $("#openPkgBox").click(function() {
        if(plus=="true")
        {
          plus="false";
          $("#minus").show()
          $("#plus").hide();
        }
        else{
          plus="true";
          $("#plus").show()
          $("#minus").hide()
        }
        $("#pkgBox").toggle();
        
        
      });

      $("#openBrnchBox").click(function() {
        if(plus=="true")
        {
          plus="false";
          $("#minus").fadeIn('500');
          $("#plus").hide();
        }
        else{
          plus="true";
          $("#plus").fadeIn('500');
          $("#minus").hide()
        }
        $("#branchBox").toggle("slow");
        
        
      });
      $("#openStaffBox").click(function() {
        if(plus=="true")
        {
          plus="false";
          $("#minus").show();
          $("#plus").hide();
          $("#staffBox").show("fast");
        }
        else{
          plus="true";
          $("#plus").show()
          $("#minus").hide()
          $("#staffBox").hide("fast");
          }
        
      });
      $("#openStaffAttendance").click(function() {
            $("#staffboxDiv").hide()
           $("#staffTable").hide()
           $("#backDiv").show()
           $("#attDiv").hide()
           $("#staffAttendanceBox").load("staffAttendance/?clicked=today")



       });

       $("#backToStaff").click(function() {
            $("#staffboxDiv").show()
           $("#staffTable").show()
           $("#backDiv").hide()
           $("#attDiv").show()
           $("#staffAttendanceBox").empty()
       })
      $('.genReport').click(function() {
        var date = $('#start').val()
        if (date == '')
        {
        var link = "<a id='Report' href = 'genRep/' class='Report w-full flex items-center justify-between px-2 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-black border border-transparent rounded-full active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-green' > &#10149; Download</a>"
        }
        else
        {
        var sort = $('#by').val();
        var link = "<a id='Report' href = 'genRep/?date="+date+"&by="+sort+"' class='Report w-full flex items-center justify-between px-2 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-black border border-transparent rounded-full active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-green' > &#10149; Download</a>"
        }
        $('#reportDiv').empty();
        $('#reportDiv').append(link);

      })
});
function loadCurrentDate()
{
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
$("#doj").val(today);
}
function viewMem(obj)
{

    var id = obj.id

    $('#mainBox').load("details/?type=mem&id="+id)
}
function edit(obj)
{
      var id = obj.id

      $('#mainBox').load("details/?type=staff&id="+id)
}function viewDetails(obj,date)
{
      var id = obj.id
      $("#memberCard").load("detailAtt/?date="+date+"&id="+id)
      //$('#mainBox').load("details/?type=mem&id="+id)
}