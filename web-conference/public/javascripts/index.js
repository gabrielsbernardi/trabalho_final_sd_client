(function() {
    $("button").click(function() {        
        $(location).attr('href', '/room?room=' + $('#sala-input').val());
    });
})()