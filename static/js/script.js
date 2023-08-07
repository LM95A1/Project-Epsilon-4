  
// async function fetchData() {
//     try {
//       const response = await fetch('http://localhost:8000/static/data/pokemon.json');
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching JSON data:', error);
//       throw error;
//     }
//   }
  
//   async function processJSONData() {
//     try {
//       const jsonData = await fetchData();
//       if (jsonData) {
//         // Use the 'jsonData' variable containing the parsed JSON data here
//         //console.log(jsonData);
  
//         // Get the keys of the JSON object
//         const keys = Object.keys(jsonData);
  
//         console.log(keys);
//         // Add the pokemon names to drop down number 1
//         const dropdown1 = document.getElementById('pokemon-dropdown-1');
//         const dropdown2 = document.getElementById('pokemon-dropdown-2');
  
//         // Clear existing options in the dropdowns
//         dropdown1.innerHTML = '';
//         dropdown2.innerHTML = '';
  
//         // Create and add options to the dropdowns
//         keys.forEach((key) => {
//           const option1 = document.createElement('option');
//           option1.value = key;
//           option1.textContent = key;
//           dropdown1.appendChild(option1);
  
//           const option2 = document.createElement('option');
//           option2.value = key;
//           option2.textContent = key;
//           dropdown2.appendChild(option2);
//         });
  
//         // Perform any further operations with the JSON data here
  
//         return jsonData;
//       }
//     } catch (error) {
//       // Handle errors from fetchData() here
//       console.error('Error processing JSON data:', error);
//       throw error;
//     }
//   }
  
//   function comparePokemon() {
//     const dropdown1 = document.getElementById('pokemon-dropdown-1');
//     const dropdown2 = document.getElementById('pokemon-dropdown-2');
  
//     const selectedPokemon1 = dropdown1.value;
//     const selectedPokemon2 = dropdown2.value;
  
//     if (selectedPokemon1 === selectedPokemon2) {
//       console.log('The same Pokemon is selected in both dropdowns:', selectedPokemon1);
//     } else {
//       console.log('Different Pokemon selected in each dropdown:');
//       console.log('Dropdown 1:', selectedPokemon1);
//       console.log('Dropdown 2:', selectedPokemon2);
//     }
//   }

//   // Call the function to start fetching and processing the JSON data
//   processJSONData()
//     .then((jsonData) => {
//       // You can use the jsonData variable here or do further processing
//       console.log('JSON Data:', jsonData);
//     })
//     .catch((error) => {
//       console.error('Error processing JSON data:', error);
//     });


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
  
        // Add event listeners to both dropdowns to handle comparison
        dropdown1.addEventListener('change', () => {
          comparePokemons();
        });
  
        dropdown2.addEventListener('change', () => {
          comparePokemons();
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
  
    // Your comparison logic goes here
  
    // For demonstration purposes, we'll just log the selected Pokémon names
    console.log('Selected Pokémon 1:', selectedPokemon1);
    console.log('Selected Pokémon 2:', selectedPokemon2);
  }
  
  // Call the function to start fetching and processing the JSON data
  processJSONData()
    .then((jsonData) => {
      // You can use the jsonData variable here or do further processing
      console.log('JSON Data:', jsonData);
    })
    .catch((error) => {
      console.error('Error processing JSON data:', error);
    });
  