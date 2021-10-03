
$(function () {
    $(".card-movie .card").on('click', function() {
        $('.loading').show();
        $('body').css('overflow', 'hidden');

        let movieId = parseInt($(this).data('id'));
        $.ajax({
            type: "POST",
            url: Routing.generate('main_ajax_movie', { id: movieId }),
            data: {
               
            },
            dataType: "json",
            success: function(response) {
                cleanModal();

                $('#movie-modal h4').append(response.details.title);
                
                $.each(response.videos.results, function(i, ele) {
                    $('#movie-modal #accordion-video').append('<div class="accordion-item"><h2 class="accordion-header" id="heading-' + ele.id + '"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-' + ele.id + '" aria-expanded="true" aria-controls="collapse-' + ele.id + '"> ' + ele.name + '</button></h2><div id="collapse-' + ele.id + '" class="accordion-collapse collapse" aria-labelledby="heading-' + ele.id + '" data-bs-parent="#accordion-video"><div class="accordion-body"><iframe width="560" height="315" src="https://www.youtube.com/embed/' + ele.key + '" title="' + ele.name + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div></div>');
                    
                    if (i == 0) {
                        $('#movie-modal #accordion-video #heading-' + ele.id + ' button').attr('class', 'accordion-button');
                        $('#movie-modal #accordion-video #collapse-' + ele.id).attr('class', 'accordion-collapse collapse show');
                    }
                });

                $('#movie-modal .description').append(response.details.overview);
                
                $('.loading').hide();
                $('body').css('overflow', 'auto');
                $("#movie-modal").modal('show');
            }
        });
    });

    function cleanModal() {
        $('#movie-modal h4').empty();
        $('#movie-modal #accordion-video').empty();
        $('#movie-modal .description').empty();
    }

    $(".basicAutoComplete").autocomplete({
        source: "http://local.we-movies.com/ajax/autocomplete"
    });

});