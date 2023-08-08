// Function to fetch Pokemon data from a local JSON file
const fetchPokemonData = () => {
    fetch('static/data/pokemon.json')
      .then(response => response.json())
      .then(data => {
        populatePokemonList(Object.values(data));
        populatePokemonDropdown(Object.values(data));
      })
      .catch(error => console.error('Error fetching Pokemon data:', error));
  };
  
  // Function to populate the Pokemon list
  const populatePokemonList = (pokemons) => {
    const pokemonList = document.getElementById('pokemon-list');
    // Iterate through the Pokemon data and create list items
    pokemons.forEach(pokemon => {
      const listItem = document.createElement('li');
      listItem.textContent = pokemon.name;
      listItem.addEventListener('click', () => displayPokemonDetails(pokemon));
      pokemonList.appendChild(listItem);
    });
  };
  
  // Function to populate the Pokemon dropdown
  const populatePokemonDropdown = (pokemons) => {
    const dropdown = document.getElementById('type-dropdown'); // Adjust the ID to match your dropdown
    pokemons.forEach(pokemon => {
      const option = document.createElement('option');
      option.value = pokemon.name;
      option.textContent = pokemon.name;
      dropdown.appendChild(option);
    });
  };
  
  // Function to filter Pokemon by name from the search bar
  const filterPokemonByName = () => {
    const searchBar = document.getElementById('search-bar').value.toLowerCase();
    fetch('static/data/pokemon.json')
      .then(response => response.json())
      .then(data => {
        const pokemons = Object.values(data);
        const filteredPokemon = pokemons.find(p => p.name.toLowerCase() === searchBar);
        if (filteredPokemon) {
          displayPokemonDetails(filteredPokemon);
        }
      })
      .catch(error => console.error('Error fetching Pokemon data:', error));
  };
  
  // Function to display Pokemon details including the radar chart
  const displayPokemonDetails = (pokemon) => {
    // Display details
    document.getElementById('pokemon-name').textContent = pokemon.name;
    document.getElementById('pokemon-image').src = pokemon.image_url;
    const pokemonType = document.getElementById('pokemon-type');
    pokemonType.innerHTML = '';
    pokemon.types.forEach(type => {
      pokemonType.innerHTML += `${type.name} `;
    });
    const pokemonDescription = document.getElementById('pokemon-description');
    pokemonDescription.innerHTML = '';
    pokemon.stats.forEach(stat => {
      pokemonDescription.innerHTML += `${stat.name}: ${stat.base_stat}<br>`;
    });
  
    // Radar Chart configuration
    const data = {
      labels: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
      datasets: [{
        label: pokemon.name,
        data: pokemon.stats.map(stat => stat.base_stat),
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderColor: 'rgba(255, 0, 0, 1)',
        borderWidth: 3
      }]
    };
  
    const config = {
      type: 'radar',
      data: data,
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        }
      },
    };
  
    // Update or create the chart
    const ctx = document.getElementById('stat-chart').getContext('2d');
    if (window.chart) {
      window.chart.destroy(); // Destroy existing chart if there is one
    }
    window.chart = new Chart(ctx, config);
  
    // Link to Pokemon's official website
    const pokemonLink = document.createElement('a');
    pokemonLink.href = pokemon.pokemon_url;
    pokemonLink.textContent = "Visit Pokémon's official website";
    document.getElementById('pokemon-details').appendChild(pokemonLink);
  };
  
  // Event listener for the dropdown selection
  document.getElementById('type-dropdown').addEventListener('change', (event) => {
    const selectedPokemonName = event.target.value;
    fetch('static/data/pokemon.json')
      .then(response => response.json())
      .then(data => displayPokemonDetails(data[selectedPokemonName]))
      .catch(error => console.error('Error fetching Pokemon data:', error));
  });
  
  // Event listener for the search bar
  document.getElementById('search-bar').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      filterPokemonByName();
    }
  });
  
  // Event listener for the reset button
  document.getElementById('reset-button').addEventListener('click', () => {
    // Reset the interface to its initial state
    document.getElementById('pokemon-list').innerHTML = '';
    fetchPokemonData();
  });
  
  // Fetch the initial Pokemon data when the page loads
  fetchPokemonData();
  