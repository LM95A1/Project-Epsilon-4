// Function to fetch Pokémon data from a local JSON file
const fetchPokemonData = () => {
  fetch('static/data/pokemon.json')
    .then(response => response.json())
    .then(data => {
      populatePokemonDropdown(Object.values(data), 'pokemon-dropdown-1');
      populatePokemonDropdown(Object.values(data), 'pokemon-dropdown-2'); // Populate the second dropdown as well
    })
    .catch(error => console.error('Error fetching Pokémon data:', error));
};

// Function to populate the Pokémon dropdown
const populatePokemonDropdown = (pokemons, dropdownId) => {
  const dropdown = document.getElementById(dropdownId);
  pokemons.forEach(pokemon => {
    const option = document.createElement('option');
    option.value = pokemon.name;
    option.textContent = pokemon.name;
    dropdown.appendChild(option);
  });
};

const displayPokemonDetails = (pokemon, idSuffix) => {
  document.getElementById(`pokemon-name-${idSuffix}`).textContent = pokemon.name;
  document.getElementById(`pokemon-image-${idSuffix}`).src = pokemon.image_url;
  const pokemonType = document.getElementById(`pokemon-type-${idSuffix}`);
  pokemonType.src = 'path-to-type-image'; // Adjust based on how you're handling type images

  // Radar Chart configuration
  const radarData = {
    labels: pokemon.stats.map(stat => stat.name),
    datasets: [{
      label: pokemon.name,
      data: pokemon.stats.map(stat => stat.base_stat),
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
      borderColor: 'rgba(255, 0, 0, 1)',
      borderWidth: 3
    }]
  };
  
  const radarConfig = {
    type: 'radar',
    data: radarData,
    options: {
      scales: {
        r: {
          beginAtZero: true
        }
      }
    },
  };

  const radarCtx = document.getElementById(`radarChart${idSuffix}`).getContext('2d');
  if (window[`radarChart${idSuffix}`]) {
    window[`radarChart${idSuffix}`].destroy();
  }
  window[`radarChart${idSuffix}`] = new Chart(radarCtx, radarConfig);
};

// Event listener for the first dropdown selection
document.getElementById('pokemon-dropdown-1').addEventListener('change', (event) => {
  const selectedPokemonName = event.target.value;
  fetch('static/data/pokemon.json')
    .then(response => response.json())
    .then(data => displayPokemonDetails(data[selectedPokemonName], '1'))
    .catch(error => console.error('Error fetching Pokemon data:', error));
});

// Event listener for the second dropdown selection
document.getElementById('pokemon-dropdown-2').addEventListener('change', (event) => {
  const selectedPokemonName = event.target.value;
  fetch('static/data/pokemon.json')
    .then(response => response.json())
    .then(data => displayPokemonDetails(data[selectedPokemonName], '2'))
    .catch(error => console.error('Error fetching Pokemon data:', error));
});

// Fetch the initial Pokemon data when the page loads
fetchPokemonData();
