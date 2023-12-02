function putActive(id)
{
    var activeclasses="text-gray-800 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100";
    var inactiveClasses="hover:text-gray-800 dark:hover:text-gray-200";
    var nowActiveParentLi = document.getElementById("activeClass").parentElement;
    var active = document.getElementById("activeClass").innerHTML;
    document.getElementById("activeClass").remove();
    var NowActive = document.createElement('span');
    NowActive.innerHTML = active;
    NowActive.id="activeClass";
    var toBeActve = document.getElementById(id)
    toBeActve.appendChild(NowActive);
    var btn = toBeActve.children[0];
    var preActivebtn = nowActiveParentLi.children[0];
    preActivebtn.classList.remove("text-gray-800");
    preActivebtn.classList.remove("dark:text-gray-100");
    preActivebtn.classList.add("hover:text-gray-800");
    preActivebtn.classList.add("dark:hover:text-gray-100");
    btn.classList.remove("hover:text-gray-800");    
    btn.classList.add("text-gray-800");
    btn.classList.remove("dark:hover:text-gray-100");   
    btn.classList.add("dark:text-gray-100");   
    

}
function putActiveM(id)
{
    var activeclasses="text-gray-800 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100";
    var inactiveClasses="hover:text-gray-800 dark:hover:text-gray-200";
    var nowActiveParentLi = document.getElementById("activeClassM").parentElement;
    var active = document.getElementById("activeClassM").innerHTML;
    document.getElementById("activeClassM").remove();
    var NowActive = document.createElement('span');
    NowActive.innerHTML = active;
    NowActive.id="activeClassM";
    var toBeActve = document.getElementById(id)
    toBeActve.appendChild(NowActive);
    var btn = toBeActve.children[0];
    var preActivebtn = nowActiveParentLi.children[0];
    preActivebtn.classList.remove("text-gray-800");
    preActivebtn.classList.remove("dark:text-gray-100");
    preActivebtn.classList.add("hover:text-gray-800");
    preActivebtn.classList.add("dark:hover:text-gray-100");
    
    btn.classList.remove("hover:text-gray-800");    
    btn.classList.add("text-gray-800");   
    btn.classList.remove("dark:hover:text-gray-100");   
    btn.classList.add("dark:text-gray-100");   
    

}

$(document).ready(function() {

    $( "#mainBox" ).load( "home/").fadeIn('500');
    $('#searchMem').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
            var search = $(this).val();
            search = encodeURIComponent(search.trim())
            $("#mainBox").hide().load("/search/?search="+search).show('');
        }
   /* if(search == '')
            {
                putActive("loadHome");
                putActiveM("MloadHome");
                $( "#mainBox" ).hide().load("/home").show('');
            } */

    })
    $("#loadHome").click(function() {
        putActive("loadHome");
        putActiveM("MloadHome");
        $( "#mainBox" ).hide().load("home/").show('');

    }
    );
    $("#loadMembers").click(function() {
        putActive("loadMembers");
        putActiveM("MloadMembers");
        $( "#mainBox" ).hide().load("members/").show('');
    }
    );
    $("#loadBranches").click(function() {
        putActive("loadBranches");
        putActiveM("MloadBranches");
        $( "#mainBox" ).hide().load("branches/").show('');
    }
    );
    $("#loadStats").click(function() {
        putActive("loadStats");
        putActiveM("MloadStats");
        $( "#mainBox" ).hide().load("stats/").show('');
    }
    );
    $("#loadPkgs").click(function() {
        putActive("loadPkgs");
        putActiveM("MloadPkgs");
        $( "#mainBox" ).hide().load( "packages/").show('');
    }
    );
    $("#loadStaff").click(function() {
      putActive("loadStaff");
      putActiveM("MloadStaff");
      $( "#mainBox" ).hide().load( "staff/").show('');
  }
  );
  $("#loadToken").click(function() {
      putActive("loadToken");
      putActiveM("MloadToken");
      $( "#mainBox" ).hide().load( "token/").show('');
  }
  );
    ////////////////////////////////////////////
    /// MOBILE VIEW
    ////////////////////////////////////////////
    $("#MloadHome").click(function() {
        putActive("loadHome");
        putActiveM("MloadHome");
        $( "#mainBox" ).hide().load("home").show('');

    }
    );
    $("#MloadMembers").click(function() {
        putActive("loadMembers");
        putActiveM("MloadMembers");
        $( "#mainBox" ).hide().load("members").show('');
    }
    );
    $("#MloadBranches").click(function() {
        putActive("loadBranches");
        putActiveM("MloadBranches");
        $( "#mainBox" ).hide().load("branches").show('');
    }
    );
    $("#MloadStats").click(function() {
        putActive("loadStats");
        putActiveM("MloadStats");
        $( "#mainBox" ).hide().load("stats").show('');
    }
    );
    $("#MloadPkgs").click(function() {
        putActive("loadPkgs");
        putActiveM("MloadPkgs");
        $( "#mainBox" ).hide().load( "packages").show('');
    }
    );
    $("#MloadStaff").click(function() {
      putActive("loadStaff");
      putActiveM("MloadStaff");
      $( "#mainBox" ).hide().load( "staff").show('');
  });
  $("#MloadToken").click(function() {
      putActive("loadToken");
      putActiveM("MloadToken");
      $( "#mainBox" ).hide().load( "token").show('');
  });
    //////////////////////////////////////////
});

