var day,month,year,branch,data;
    $("#graphArea").load("graph/");

    $("#filterCard").change(function(){

        start = $("#start").val();
        by = $("#by").val();
        branch = $("#branch").val();
        $("#graphArea").load("graph/?start="+start+"&by="+by+"&branch="+branch);

    });

