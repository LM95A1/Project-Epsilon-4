async function fetchData() {
  try {
    const response = await fetch('http://localhost:8000/static/data/pokemon.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching JSON data:', error);
    throw error;
  }
}

async function processJSONData() {
  try {
    const jsonData = await fetchData();
    if (jsonData) {
      // Use the 'jsonData' variable containing the parsed JSON data here
      //console.log(jsonData);

      // Get the keys of the JSON object
      const keys = Object.keys(jsonData);

      console.log(keys);
      // Add the pokemon names to drop down number 1
      const dropdown1 = document.getElementById('pokemon-dropdown-1');
      const dropdown2 = document.getElementById('pokemon-dropdown-2');

      // Clear existing options in the dropdowns
      dropdown1.innerHTML = '';
      dropdown2.innerHTML = '';

      // Create and add options to the dropdowns
      keys.forEach((key) => {
        const option1 = document.createElement('option');
        option1.value = key;
        option1.textContent = key;
        dropdown1.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = key;
        option2.textContent = key;
        dropdown2.appendChild(option2);
      });

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
  //createBarChart(pokemon1Data, selectedPokemon1);
  addImage(selectedPokemon1, "pokemon-image1");
  PlotlyBarChart(pokemon1Data, selectedPokemon1, "bar-chart1"); 
  addImage(selectedPokemon2, "pokemon-image2");
  PlotlyBarChart(pokemon2Data, selectedPokemon2, "bar-chart2"); 

});

function createBarChart(data, pokemonName){

  const margin = { top: 40, right: 20, bottom: 30, left: 40 };
  const width = 400 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  // Create an SVG element
  const svg = d3.select('#bar-chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Add title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', -20)
    .attr('text-anchor', 'middle')
    .attr('font-weight', 'bold')
    .text(pokemonName);
  
  console.log(typeof pokemonName); 

  // Create scales for x and y axes
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, height])
    .padding(0.1);

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.base_stat)])
    .range([0, width]);

  // Create bars
  svg.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('y', d => yScale(d.name))
    .attr('height', yScale.bandwidth())
    .attr('x', 0)
    .attr('width', d => xScale(d.base_stat));

  // Add y-axis
  svg.append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(yScale));

  // Add x-axis
  svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(xScale));

}

function PlotlyBarChart(data, name, divId){
    const barData = [{
      y: data.map(d => d.name),
      x: data.map(d => d.base_stat),
      type: 'bar',
      orientation: 'h'
    }];
  
  const layout = {
    title: name,
    margin: { t: 40, r: 20, b: 30, l: 100 },
    xaxis: { title: 'Base Stat' },
    yaxis: { title: 'Attributes' }
  };
  
  Plotly.newPlot(divId, barData, layout);
}

// add image 

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

// search bar 
const searchInput = document.getElementById('search-bar');
const autocompleteList = document.getElementById('autocomplete-list');

searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.toLowerCase();
  const matchedPokemons = pokemonNames.filter(pokemon => pokemon.toLowerCase().includes(searchText));

  autocompleteList.innerHTML = '';

  matchedPokemons.forEach(pokemon => {
      const option = document.createElement('div');
      option.textContent = pokemon;
      option.classList.add('autocomplete-option');
      option.addEventListener('click', () => {
          searchInput.value = pokemon;
          autocompleteList.innerHTML = '';
      });
      autocompleteList.appendChild(option);
  });
});

// update pokemon details 

const pokemonHeightElement = document.getElementById('pokemon-height');
const pokemonWeightElement = document.getElementById('pokemon-weight');
const dynamicListElement = document.getElementById('dynamic-list');

// press enter after selecting pokemon 
let height; 
let weight; 
let dynamicListData;

searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
      dynamicListElement.innerHTML = ''; 
      height = jsonData[searchInput.value]['height'];
      weight = jsonData[searchInput.value]['weight'];
      dynamicListData = jsonData[searchInput.value]['abilities'];
      
      // Set height and weight values
      pokemonHeightElement.textContent = `${height} m`;
      pokemonWeightElement.textContent = `${weight} kg`;

      // Populate the dynamic list
      dynamicListData.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        dynamicListElement.appendChild(li);
      });
  }
});
 
// Hide autocomplete list when clicked outside
document.addEventListener('click', event => {
  if (!searchInput.contains(event.target)) {
      autocompleteList.innerHTML = '';
  }
});
