// PokeStat Project Logic Script
// "What a f*ckin' amalgamation."

async function fetchData() {
  try {
    const response = await fetch('static/data/pokemon.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching JSON data:', error);
    throw error;
  }
}

// Function for Dropdown Options
function createDropdownOptions(keys) {
  const fragment = document.createDocumentFragment();
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select a Pokémon';
  fragment.appendChild(defaultOption);
  
  keys.forEach((key) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key;
    fragment.appendChild(option);
  });

  return fragment;
}

async function processJSONData() {
  try {
    const jsonData = await fetchData();
    if (jsonData) {
      // Get the keys of the JSON object
      const keys = Object.keys(jsonData);

      // Add the pokemon names to dropdowns
      const dropdown1 = document.getElementById('pokemon-dropdown-1');
      const dropdown2 = document.getElementById('pokemon-dropdown-2');

      // Create and add options to the dropdowns
      const options = createDropdownOptions(keys);
      dropdown1.appendChild(options.cloneNode(true));
      dropdown2.appendChild(options.cloneNode(true));
      
      // Perform any further operations with the JSON data here
      return jsonData;
    }
  } catch (error) {
    // Handle errors from fetchData() here
    console.error('Error processing JSON data:', error);
    throw error;
  }
}


// Function to compare the selected Pokémon in both dropdowns and log results in the bar chart
function comparePokemons() {
  const dropdown1 = document.getElementById('pokemon-dropdown-1');
  const dropdown2 = document.getElementById('pokemon-dropdown-2');

  const selectedPokemon1 = dropdown1.value;
  const selectedPokemon2 = dropdown2.value;

// For demonstration purposes, we'll just log the selected Pokémon names
  console.log('Selected Pokémon 1:', selectedPokemon1);
  console.log('Selected Pokémon 2:', selectedPokemon2);
}

let jsonData; // Variable to store the JSON data
let pokemonNames; // Variable to store the names of the Pokémon
// Call the function to start fetching and processing the JSON data
processJSONData()
  .then((data) => {
    // You can use the jsonData variable here or do further processing
    jsonData = data; 
    // Get the keys of the JSON object
    pokemonNames = Object.keys(jsonData);
    console.log('JSON Data:', data);
    console.log('pokemonNames:', pokemonNames);
  })
  .catch((error) => {
    console.error('Error processing JSON data:', error);
  });

// const when compare button is clicked subset pokemon data to the two pokenames

const button = document.getElementById('compare-button');

  // Declare variables outside of the function to hold references to the charts
  let chart1, chart2;

// Add an event listener to the button
  button.addEventListener('click', function() {
  // Code to be executed when the button is clicked
  const dropdown1 = document.getElementById('pokemon-dropdown-1');
  const dropdown2 = document.getElementById('pokemon-dropdown-2');

  const selectedPokemon1 = dropdown1.value;
  const selectedPokemon2 = dropdown2.value;

  console.log(selectedPokemon1); 

  // filter data to just selectpokemon1 
  const pokemon1Data = jsonData[selectedPokemon1]['stats'];
  const pokemon2Data = jsonData[selectedPokemon2]['stats'];

  console.log(pokemon1Data);
  console.log(pokemon2Data);

addImage(selectedPokemon1, "pokemon-image1"); 
addImage(selectedPokemon2, "pokemon-image2");
chart1 = ChartJsBarChart(pokemon1Data, selectedPokemon1, "canvas-bar-chart1", chart1); 
chart2 = ChartJsBarChart(pokemon2Data, selectedPokemon2, "canvas-bar-chart2", chart2);

});


// Chart.js Bar Chart Function
function ChartJsBarChart(data, name, canvasId, existingChart) {
  // Check if there is an existing chart and destroy it
  if (existingChart) {
    existingChart.destroy();
  }

  // Pastel color palette
  const colors = [
    '#A8E6CF', '#DCE8B4', '#FFD3B6', '#FFAAA5', '#D46A6A',
    '#AA96DA', '#7EB5A6', '#FFC3A7', '#D4A5A5', '#7795A1',
  ];

  var ctx = document.getElementById(canvasId).getContext('2d');
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.name),
      datasets: [{
        label: name,
        data: data.map(d => d.base_stat),
        backgroundColor: data.map((_, index) => colors[index % colors.length]),
        borderColor: data.map((_, index) => colors[index % colors.length]),
        borderWidth: 1,
        borderRadius: 5 // Adding a little border radius to soften the look
      }]
    },
    options: {
      indexAxis: 'y', // Make the chart horizontal
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Base Stat'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Attributes'
          }
        }
      },
      plugins: {
        legend: {
          display: false // Hide legend if you don't want it
        }
      }
    }
  });
}

// Pokemon Image Function
async function addImage(pokemonname, imageDivId) {
  
  // get the image 
  // Fetch Pokemon data from PokeAPI
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonname}`);
    const data = await response.json();

    // Get the front default sprite image URL
    const imageUrl = data.sprites.front_default;

     // Update the image source
     const imageElement1 = document.getElementById(imageDivId);
     imageElement1.src = imageUrl;
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
}

const reset = document.getElementById('reset-button');

// Add an event listener to the button
reset.addEventListener('click', function() {
  // Clear the contents of the bar chart divs
  document.getElementById('bar-chart1').innerHTML = '';
  document.getElementById('bar-chart2').innerHTML = '';
  // Clear the contents of image divs 
  // Clear the contents of the image divs
  document.getElementById('pokemon-image1').src = '';
  document.getElementById('pokemon-image2').src = '';
})

// Search Bar Function
const searchInput = document.getElementById('search-bar');
const autocompleteList = document.getElementById('autocomplete-list');

searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.toLowerCase();
  const matchedPokemons = pokemonNames.filter(pokemon => pokemon.toLowerCase().includes(searchText));

  autocompleteList.innerHTML = '';

  matchedPokemons.forEach(pokemon => {
    const originalPokemonName = pokemon; // Preserve the original casing
    const option = document.createElement('div');
    option.textContent = pokemon;
    option.classList.add('autocomplete-option');
    option.addEventListener('click', () => {
        searchInput.value = originalPokemonName; // Use the original casing to set the value
        autocompleteList.innerHTML = '';

        // Add this line to populate the sprite card with the selected Pokemon's image
        addImage(originalPokemonName, 'pokemon-sprite');

        // Update the card title with the selected Pokemon's name
        document.getElementById('pokemon-name').textContent = originalPokemonName;
    });
    autocompleteList.appendChild(option);
  });
});

 // Comment or uncomment the following block to enable or disable the Enter key functionality
searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    // Get the current value of the search input
    const originalPokemonName = searchInput.value;

    // Clears the search input on Enter press
    searchInput.value = ''; 
    autocompleteList.innerHTML = '';

    // Add this line to populate the sprite card with the selected Pokemon's image
    addImage(originalPokemonName.toLowerCase(), 'pokemon-sprite');

    // Update the card title with the selected Pokemon's name
    document.getElementById('pokemon-name').textContent = originalPokemonName;
  }
});



// Single Pokemon Data

// Assume you have retrieved the Pokémon data and have height, weight, and dynamicListData available

const pokemonHeightElement = document.getElementById('pokemon-height');
const pokemonWeightElement = document.getElementById('pokemon-weight');
const dynamicListElement = document.getElementById('dynamic-list');
const pokemonTypesElement = document.getElementById('pokemon-types'); // Add this line

// press enter after selecting pokemon 
let height; 
let weight; 
let dynamicListData;
let types; // Add this line

searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
      dynamicListElement.innerHTML = '';
      pokemonTypesElement.innerHTML = ''; // Add this line
      height = jsonData[searchInput.value]['height'];
      weight = jsonData[searchInput.value]['weight'];
      dynamicListData = jsonData[searchInput.value]['abilities'];
      types = jsonData[searchInput.value]['types']; // Add this line

      // Set height and weight values
      pokemonHeightElement.textContent = `${height} m`;
      pokemonWeightElement.textContent = `${weight} kg`;
      const pokemonStats = []

      for (let i = 0; i < 6; i++) {
        pokemonStats.push(jsonData[searchInput.value]["stats"][i]["base_stat"])
      }

      makeRadarChart(pokemonStats,searchInput.value);

      // Populate the abilities list
      dynamicListData.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        dynamicListElement.appendChild(li);
      });

      // Populate the types list
      types.forEach(item => {
       const li = document.createElement('li');
        const img = document.createElement('img'); // Create an image element
        img.src = `static/icons/${item.name}.png`; // Set the source path using the type name
        img.alt = item.name; // Set an alternative text for accessibility
        img.width = 32; // You can set the dimensions
        img.height = 32;
        li.appendChild(img); // Append the image to the list item
        pokemonTypesElement.appendChild(li);
      });

  }
});

// Hide autocomplete list when clicked outside
document.addEventListener('click', event => {
  if (!searchInput.contains(event.target)) {
      autocompleteList.innerHTML = '';
  }
});

// Radar Chart Function

const makeRadarChart = function (stats,pokemonName){
  // Radar Chart configuration
  const data = {
    labels: ['HP', 'Atk', 'Def', 'Sp. Atk', 'Sp. Def', 'Speed'],
    datasets: [{
      label: pokemonName,
      data: stats,
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
      borderColor: 'rgba(255, 0, 0, 1)',
      borderWidth: 3
    }]
  };

  const config = {
    type: 'radar',
    data: data,
    options: {
      scales: {
        r: {
          ticks: {
            stepSize: 10,
            max: 255, // Max value
          }
        }
      },
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
}