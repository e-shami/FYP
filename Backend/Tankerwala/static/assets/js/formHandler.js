$(document).ready(function() {

    $("#branchForm").submit(function(e){
        e.preventDefault();
        var msg = "";
    var branchName = document.getElementById("branchName");
    var branchAddress = document.getElementById("branchAddress");
    var branchPassword = document.getElementById("branchPassword");
    var passLength = branchPassword.value;
    if(branchName.value == "")
    {
        msg = msg + "| Enter Branch Name |";
    }
    if(branchAddress.value == "")
    {
        msg = msg + "| Enter Branch Address |";
    }
    if(branchPassword.value == "")
    {
        msg = msg + "| Enter Branch number |";
        
    }
    else if(passLength.length < 6 )
    {
        msg = msg + "| Incorrect number |";
    }
    
    if(msg == "")
    {
    var write = document.getElementById("messages");
        write.innerHTML = msg;
        $.ajax({
            type: "POST",
            url: "/branches/",
            data: $("#branchForm").serialize(), // serializes form input
            success: function(){

                $("#mainBox").load("/branches/");
            },
            error: function(data){
                if(data.status==320)
                {
                $('#messages').text("Branch Already Exists")
                }

        }
       });
    }
    else
    {
        var write = document.getElementById("messages");
        write.innerHTML = msg;
    }
    });
   $("#pkgForm").submit(function(e){
    e.preventDefault();

    var msg = "";
    var pkgName = document.getElementById("pkgName");
    var pkgPrice = document.getElementById("pkgPrice");
    var branchName = document.getElementById("branchName");
    if(pkgName.value == "")
    {
        msg = msg + "| Enter A Package Name |";
    }
    if(pkgPrice.value == "")
    {
        msg = msg + "| Enter Package Price |";
    }
    if(branchName.value == "")
    {
        msg = msg + "| Select Branch |";
    }
    
    if(msg == "")
    {
    var write = document.getElementById("messages");
        write.innerHTML = msg;
        $.ajax({
            type: "POST",
            url: "/packages/",
            data: $("#pkgForm").serialize(), // serializes form input
            success: function(data){
                $("#mainBox").load("/packages/");
            }
       });
    }
    else
    {
        var write = document.getElementById("messages");
        write.innerHTML = msg;
    }

   });
        
    
    $("#staffForm").submit(function(e){
    e.preventDefault();
    var formData = new FormData(this);
    console.log(formData)
    $.ajax({
            type: "POST",
            url: "staff/",
            data:formData,
            cache:false,
            contentType: false,
            processData: false, // serializes form input
            success: function(data){
                $("#mainBox").load("/staff");
            }
       });

    });
    $("#tokenForm").submit(function(e){
    e.preventDefault();
    var formData = new FormData(this);
    console.log(formData)
    $.ajax({
            type: "POST",
            url: "token/",
            data:formData,
            cache:false,
            contentType: false,
            processData: false, // serializes form input
            success: function(data){
                $('#viewToken').show();
                $('#showHere').html(data);
            }
       });

    });

});