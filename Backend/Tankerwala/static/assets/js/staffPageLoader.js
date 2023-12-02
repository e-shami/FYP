var AuthToken = "";
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
function setCookie(cname, cvalue, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function logout()
{
   setCookie("Token","",1);
   location.reload();
}


$(document).ready(function() {


    $( "#mainBox" ).load( "registration/").fadeIn('1500');
    $("#loadRegistration").click(function() {
   $.ajaxSetup({
                headers: {
                    'Authorization':'Token '+AuthToken,
                }
                });
        putActive("loadRegistration");
        putActiveM("MloadRegistration");
        $( "#mainBox" ).hide().load("registration/").show('');
    }
    );
    $("#loadSnE").click(function() {
       $.ajaxSetup({
                headers: {
                    'Authorization':'Token '+AuthToken,
                }
                });
        putActive("loadSnE");
        putActiveM("MloadSnE");
        $( "#mainBox" ).hide().load("sne/").show('');
    }
    );
    $("#loadRenewal").click(function() {
   $.ajaxSetup({
                headers: {
                    'Authorization':'Token '+AuthToken,
                }
                });
        putActive("loadRenewal");
        putActiveM("MloadRenewal");
        $( "#mainBox" ).hide().load("renewal/").show('');
    }
    );
    
    ////////////////////////////////////////////
    /// MOBILE VIEW
    ////////////////////////////////////////////
    $("#MloadRegistration").click(function() {   $.ajaxSetup({
                headers: {
                    'Authorization':'Token '+AuthToken,
                }
                });
      putActive("loadRegistration");
      putActiveM("MloadRegistration");
        $( "#mainBox" ).hide().load("registration/").show('');

    }
    );
    $("#MloadSnE").click(function() {   $.ajaxSetup({
                headers: {
                    'Authorization':'Token '+AuthToken,
                }
                });
      putActive("loadSnE");
      putActiveM("MloadSnE");
        $( "#mainBox" ).hide().load("sne/").show('');
    }
    );
    $("#MloadRenewal").click(function() {   $.ajaxSetup({
                headers: {
                    'Authorization':'Token '+AuthToken,
                }
                });

      putActive("loadRenewal");
      putActiveM("MloadRenewal");
        $( "#mainBox" ).hide().load("renewal/").show('');
    }
    );




});
function passChange()
{
$.ajaxSetup({
                headers: {
                    'Authorization':'Token '+AuthToken,
                }
                });
                $( "#mainBox" ).hide().load("passreset/").show('');
}
