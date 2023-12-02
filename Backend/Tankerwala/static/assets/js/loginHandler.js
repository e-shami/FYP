
$(document).ready(function() {
    $("#loginForm").submit(function(e){
        var loading = "<div  style='margin-left:45%'><div class='loader'></div></div>"
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "#",
            data: $("#loginForm").serialize(), // serializes form input
            success: function(data){
                console.log(data)
                window.location.replace("../");
            },
            error: function(data){
                document.getElementById('loginBtn').innerHTML = "Log In";
                $("#errors").text("Authorization Failed")
        }
       });
        });
        $('.form').keyup(function(){
        $("#errors").empty()
    })
});