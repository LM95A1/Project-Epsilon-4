// Pokedex Script Setup
// "D-Von! Get the tables!"

$(document).ready(function(){
    let chart;

    // Load initial Pokemon list
    $.ajax({
        url: '/pokemon',
        type: 'GET',
        success: function(pokemonList) {
            displayPokemonList(pokemonList);
        }
    });

    // Search bar functionality
    $('#search-bar').on('input', function() {
        let query = $(this).val();
        if(query.length > 0){
            $.ajax({
                url: '/pokemon/' + query,
                type: 'GET',
                success: function(pokemon) {
                    displayPokemonDetails(pokemon);
                }
            });
        }
    });

    // Dropdown menu functionality
    $('#type-dropdown').on('change', function() {
        let type = $(this).val();
        $.ajax({
            url: '/pokemon/type/' + type,
            type: 'GET',
            success: function(pokemonList) {
                displayPokemonList(pokemonList);
            }
        });
    });

    // Function to display Pokemon details, including chart
    function displayPokemonDetails(pokemon) {
        $('#pokemon-name').text(pokemon.name);
        $('#pokemon-type').text(pokemon.type);
        $('#pokemon-description').text(pokemon.description);
        $('#pokemon-image').attr('src', pokemon.image);

        if(chart) {
            chart.destroy();
        }
        chart = new Chart($('#stat-chart'), {
            type: 'bar',
            data: {
                labels: Object.keys(pokemon.stats),
                datasets: [{
                    label: 'Stats',
                    data: Object.values(pokemon.stats),
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Function to display a list of Pokemon (e.g., after filtering by type)
    function displayPokemonList(pokemonList) {
        $('#pokemon-list').empty();
        pokemonList.forEach(pokemon => {
            $('#pokemon-list').append($('<li>').text(pokemon.name));
        });
    }

    // Comparison feature
    $('#compare-button').on('click', function() {
        let pokemon1 = $('#pokemon-dropdown-1').val();
        let pokemon2 = $('#pokemon-dropdown-2').val();

        $.ajax({
            url: '/pokemon/' + pokemon1,
            type: 'GET',
            success: function(pokemon1Data) {
                $.ajax({
                    url: '/pokemon/' + pokemon2,
                    type: 'GET',
                    success: function(pokemon2Data) {
                        comparePokemon(pokemon1Data, pokemon2Data);
                    }
                });
            }
        });
    });

    // Function to compare two Pokemon
    function comparePokemon(pokemon1, pokemon2) {
        // Comparison logic...
        // Let's say for simplicity we're just comparing HP
        let comparisonText = `${pokemon1.name} has ${pokemon1.stats.hp} HP, while ${pokemon2.name} has ${pokemon2.stats.hp} HP.`;
        $('#comparison-result').text(comparisonText);
    }
});
