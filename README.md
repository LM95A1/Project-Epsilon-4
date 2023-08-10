# PokeStat Guide Project

## PokeStat Guide Interface

The Pokedex Interface is a web application that allows users to browse and explore information about various Pokemon species. It provides features such as searching for specific Pokemon, filtering by type, comparing Pokemon, and displaying detailed information about individual Pokemon.

# Pokedex Database Generator and Flask Web Application

This README provides an overview and instructions for setting up a Pokedex Database Generator using SQLite and Flask. The generator populates a database with Pokemon data from a JSON file and provides a web application to interact with the data.

## Pokedex Database Generator

### Dependencies

The Pokedex Database Generator script requires the following dependencies:

- Python 3
- SQLite3
- pandas

### Database Setup

1. Create a new SQLite database named `pokedex.db`.
2. Run the provided code snippet from the "Pokedex Database Generator" section to create tables for Pokemon, Abilities, Types, and Stats, and populate the database with data from the `pokemon.json` file.

### Data Loading

1. Load Pokemon data from the `pokemon.json` file into the SQLite database using the script provided in the "Pokedex Database Generator" section.

### Querying the Database

You can query the database using SQL commands or pandas queries. Sample code is provided in the script to load data from the database into pandas DataFrames.

## Flask Web Application

### Setting Up Flask

1. Install Flask using `pip install Flask`.
2. Use the provided code snippets from the "Flask Web Application" section to set up routes and endpoints for your web application.

### Routes and Endpoints

- `/init_db`: Initializes the SQLite database with Pokemon data.
- `/`: Home page route that displays Pokemon data.
- `/pokemon/<name>`: Route to display specific Pokemon data.
- `/pokemon/type/<type>`: Route to display Pokemon of a specific type.

### Running the Web Application

1. Run the Flask application using `python app.py` in the terminal.
2. Access the web application by opening a web browser and navigating to `http://localhost:5000`.

## CORS-Enabled File Server

The CORS-Enabled File Server script uses the `http.server` module to serve files from a directory with CORS headers.

### Usage

1. Place the `cors_file_server.py` script in the directory containing the files you want to serve.
2. Run the script using `python cors_file_server.py`.
3. Access the served files by navigating to `http://localhost:8000` in a web browser.

### Configuration

You can configure the CORS-Enabled File Server script by editing the `CORSRequestHandler` class to modify CORS headers.

### Access-Control-Allow-Origin Header

By default, the server adds the `Access-Control-Allow-Origin` header with a value of `*`. Customize it to restrict access to specific origins.

## Authors

Debbie Kabir
Elias Hagos
Lester Molinares
Surender Raman
08/09/2023
---