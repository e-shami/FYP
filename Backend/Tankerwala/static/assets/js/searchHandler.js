
    $("#search").keyup(function() {

        var search = $(this).val();
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
    $("#searchRenew").keyup(function() {

        var search = $(this).val();
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
            $('#renewBox').load("renewalresult/?search="+search)
        }
    })
