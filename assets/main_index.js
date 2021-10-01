
$(function () {
    $(".card-movie .card").on('click', function() {
        
    });

    $(".basicAutoComplete").autocomplete({
        source: "http://local.we-movies.com/ajax/autocomplete"
    });

});