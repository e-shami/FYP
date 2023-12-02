$(document).ready(function() {

    $(".profile").click(function(){
    var imgSrc = $(this).attr('src')
    var cont = document.getElementById("modal");
    var all_img = cont.getElementsByTagName('img');
    all_img[0].src=imgSrc;

    $('#modalButton').click();
    });
    $("#allMemberCard").click(function() {
        $("#basicMemberCard").hide();
        $("#memberCard").load("/branchMembers/?clicked=all",success("All Members")).fadeIn("slow");
        $("#backBtn").show();
    });
         $(".branch").find("#active").click(function(){
            var id = $(this).parent().attr('id')

            $("#basicMemberCard").hide();
            $("#backBtn").show();
            $("#memberCard").load("/branchMembers/?bra="+id+"&clicked=total",success("Active Members")).fadeIn("slow");
        });
        $(".branch").find("#att").click(function(){
            var Id = $(this).parent().attr('id')

            $("#basicMemberCard").hide();
            $("#backBtn").show();
            $("#memberCard").load("/attendance/?bra="+Id+"&clicked=att",success("Daily Attendance")).fadeIn("slow");

        });
     $("#datePicker").on("change",function(){
        var selected = $(this).val();
        alert(selected);
    });

});
function back()
{
$("#basicMemberCard").show('slow');
        $("#memberCard").fadeOut();
        $("#memberCard").empty();
        $("#backBtn").hide();
        success("Members");
}
    function success(id){

        var update =document.getElementById("currentHeading");
        update.innerHTML = id;
    }
