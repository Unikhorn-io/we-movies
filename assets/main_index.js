
$(function () {
    $(document).on('click', '.card-movie .card, #results-search ul li', function() {
        $('.loading').show();
        $('body').css('overflow', 'hidden');

        let movieId = parseInt($(this).data('id'));
        $.ajax({
            type: 'POST',
            url: Routing.generate('main_ajax_movie', { id: movieId }),
            data: {
               
            },
            dataType: 'JSON',
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
                $('#movie-modal').modal('show');
            }
        });
    });

    $('#search-input').on('keyup', function() {
        let inputValue = $(this).val();
        if (inputValue.length < 2) {
            return;
        }

        $('.loading').show();

        $.ajax({
            type: 'POST',
            url: Routing.generate('main_ajax_autocomplete'),
            data: {
               'search': inputValue,
            },
            dataType: 'JSON',
            success: function(response) {
                cleanSearch();
                console.log(response);

                $.each(response.results, function(i, ele) {
                    $('#results-search ul').append('<li data-id="' + ele.id + '">' + ele.title + '</li>');
                });

                $('.loading').hide();

                if (response.results == '') {
                    return;
                }
                
                $('#results-search').show();
            }
        });
    });

    function cleanModal() {
        $('#movie-modal h4').empty();
        $('#movie-modal #accordion-video').empty();
        $('#movie-modal .description').empty();
    }

    function cleanSearch() {
        $('#results-search ul').empty();
    }

    $('#search-input').on('focus', function() {
        $('#results-search').show();
    });

    $('#search-input').on('focusout', function() {
        $('#results-search').hide();
    });

});