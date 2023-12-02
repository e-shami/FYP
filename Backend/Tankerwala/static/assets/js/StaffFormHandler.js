
 $("#registrationForm").submit(function(e){
    e.preventDefault();
    var diseases = jQuery.map($(':checkbox[name=diseases\\[\\]]:checked'), function (n, i) {
    console.log(n.value)
    return n.value;
}).join(',');
    var formData = new FormData(this);
    console.log(formData)
    formData.append("Diseases",diseases)
    $.ajax({
            type: "POST",
            url: "registration/",
            data:formData,
            cache:false,
             headers: {
                    'Authorization':'Token '+AuthToken,
                },
            contentType: false,
            processData: false, // serializes form input
            success: function(data){
             $("#registrationForm").trigger("reset");
                $("#modal").find("footer").empty();
            $("#modal").find('.body').empty();
             var ok = "<button @click='closeModal' class='cemodals w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray'>Ok</button>"
               $("#modal").find("footer").append(ok);
                      var confirm = "<h3 class='my-6 text-xl font-semibold text-gray-700 dark:text-gray-200'>Client <strong class='text-green-600'>Registered</strong></h3>"
                $("#modal").find('.body').append(confirm);
                $('#modalButton').click()

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

    });

    /////////////////////////////////////////////////////////////////

 $("#registrationForm2").submit(function(e){
    e.preventDefault();
    var diseases = jQuery.map($(':checkbox[name=diseases\\[\\]]:checked'), function (n, i) {
    console.log(n.value)
    return n.value;
}).join(',');
    var formData = new FormData(this);
    console.log(formData)
    formData.append("Diseases",diseases)
    $.ajax({
            type: "POST",
            url: "sne/",
            data:formData,
            cache:false,
             headers: {
                    'Authorization':'Token '+AuthToken,
                },
            contentType: false,
            processData: false, // serializes form input
            success: function(data){
             $("#resultBox").empty();
  $("#modal").find("footer").empty();
            $("#modal").find('.body').empty();
             var ok = "<button @click='closeModal' class='cemodals w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray'>Ok</button>"
               $("#modal").find("footer").append(ok);
                      var confirm = "<h3 class='my-6 text-xl font-semibold text-gray-700 dark:text-gray-200'>Client <strong class='text-green-600'>Updated</strong></h3>"
                $("#modal").find('.body').append(confirm);
                $('#modalButton').click()

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

    });

   $("#submitRenewal").click(function(){
   var pkgId = $('#pkg').find(":selected").val();
                pkgId = encodeURIComponent(pkgId.trim())
   var cnic = $("#cnic").val();
               cnic = encodeURIComponent(cnic.trim())
   var date = $('#startDate').val();
               date = encodeURIComponent(date.trim())
   $.ajaxSetup({
                headers: {
                    'Authorization':'Token '+AutToken,
                }
                });
    $('#renewBox').load("renewalresult/?cnic="+cnic+"&pkgid="+pkgId+"&date="+date,function(){
    $('#renewBox').empty()
    $("#modal").find("footer").empty();
    $("#modal").find('.body').empty();
    var ok = "<button @click='closeModal' class='cemodals w-full px-5 py-3 text-sm font-medium leading-5 text-white text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray'>Ok</button>"
                           $("#modal").find("footer").append(ok);
               var pk=           "<h3 class='my-6 text-xl font-semibold text-green-700 dark:text-green-200'>Request Entered</h3>"
    $("#modal").find('.body').append(pk);
            $('#modalButton').click()
    })
   })