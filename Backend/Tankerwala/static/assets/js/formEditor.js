
    
    $('#SnEeditBtn').click(function()
    {
        $(this).html("Edit Allowed")
        $(this).prop('disabled', true);
        $("#info").css("user-select", "auto")
        $("#info").css("pointer-events", "auto")
        
    })
    $(".memberRow").click(function(){
     var search = $(this).attr("id")
    $("#search").val(search)
        if(search == "")
        {
            $('#resultBox').empty()
        }
        else
        {
         $.ajaxSetup({
                headers: {
                    'Authorization':'Token '+AutToken,
                }
                });
            search = encodeURIComponent(search.trim())
            $('#resultBox').load("results/?search="+search)
        }
    })
    $(".openRenew").click(function(){
     var search = $(this).attr("id")
    $("#searchRenew").val(search)
        if(search == "")
        {
            $('#renewBox').empty()
        }
        else
        {
         $.ajaxSetup({
                headers: {
                    'Authorization':'Token '+AutToken,
                }
                });
            search = encodeURIComponent(search.trim())
            $('#renewBox').load("renewalresult/?open="+search)
        }
    })