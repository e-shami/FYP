
$("#resetPass").submit(function(e){
   e.preventDefault();
    var p1 = $("#password").val()

    var p2 = $("#password2").val()
    if(p1!="")
    {
        if(p1==p2)
        {
            var formData = new FormData(this);
            console.log(formData)
            $.ajax({
            type: "POST",
            url: "passreset/",
            data:formData,
            cache:false,
             headers: {
                    'Authorization':'Token '+AuthToken,
                },
            contentType: false,
            processData: false, // serializes form input
            success: function(data){
            $('.error').html("")
             $('.success').html("Password Successfully Changed")
            },
            error: function(xhr, ajaxOptions, thrownError){
            $("#modal").find("footer").empty();
                            $("#modal").find('.body').empty();
                                         var ok = "<button @click='closeModal' class='cemodals w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray'>Ok</button>"
                           $("#modal").find("footer").append(ok);
            $("#modal").find('.body').append(JSON.parse(xhr.responseText).msg)
            console.log(data)
            $('#modalButton').click()
            }
       });
        }
        else{
        $('.error').html("Passwords do not match.")
        }

    }
    else{
        $('.error').html("Passwords can not be empty.")
    }
    });

    $('input').keyup(function(){
  $('.error').html("")
  $('.success').html("")
 })
 $('#backtohome').click(function(){
  $.ajaxSetup({
                headers: {
                    'Authorization':'Token '+AuthToken,
                }
                });
        putActive("loadRegistration");
        putActiveM("MloadRegistration");
        $( "#mainBox" ).hide().load("registration/").show('');
 })

