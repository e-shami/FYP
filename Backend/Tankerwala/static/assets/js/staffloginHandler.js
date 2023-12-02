function setCookie(cname, cvalue, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function loadToNext(){
    if (getCookie("Token").length > 0){
    console.log("")
        $("#token").val(getCookie("Token"));
        var  form =  document.getElementById("tokenForm");
        $("#loginBtn").click();
    }
}

$(document).ready(function() {

    $("#tokenForm").submit(function(e){
        var loading = "<div  style='margin-left:45%'><div class='loader'></div></div>"
        document.getElementById('loginBtn').innerHTML = loading;
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "#",
            data: $("#tokenForm").serialize(), // serializes form input
            success: function(response){
                AutToken = response.msg;
                setCookie("Token",AutToken,1);
                $.ajaxSetup({
                headers: {
                    'Authorization':'Token '+AutToken,
                }
                });
                $( "html" ).load("index/",function(){
                    AuthToken =  AutToken;
                })
            },
            error: function(xhr, ajaxOptions, thrownError){
            setCookie("Token","",1);
            document.getElementById('loginBtn').innerHTML = "Log In";
            $("#errors").text(JSON.parse(xhr.responseText).msg)
        }
       });
        });
    $('.form').keyup(function(){
        
        $("#errors").empty()
    })
    $("#help").click(function()
    {
        $("#modalButton").click()
    })

    loadToNext();

});