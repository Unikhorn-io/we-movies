
$(document).ready(function(){
    console.log("Script working properly");
    $(".basicAutoComplete").autocomplete({
        source: "http://local.we-movies.com/ajax/autocomplete"
    });
});