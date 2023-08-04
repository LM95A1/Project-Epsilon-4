from flask import Flask, jsonify, render_template
import sqlite3
import json

app = Flask(__name__)

@app.route('/init_db')
def init_db():
    # Connect to SQLite database
    conn = sqlite3.connect('pokedex.db')
    cursor = conn.cursor()

    # Create main Pokemon table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Pokemon (
        id INTEGER PRIMARY KEY,
        name TEXT,
        height INTEGER,
        weight INTEGER,
        xp INTEGER,
        image_url TEXT,
        pokemon_url TEXT
    )
    """)

    # Create abilities, types and stats tables
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Abilities (
        id INTEGER PRIMARY KEY,
        name TEXT,
        is_hidden INTEGER,
        pokemon_id INTEGER,
        FOREIGN KEY(pokemon_id) REFERENCES Pokemon(id)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Types (
        id INTEGER PRIMARY KEY,
        name TEXT,
        pokemon_id INTEGER,
        FOREIGN KEY(pokemon_id) REFERENCES Pokemon(id)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Stats (
        id INTEGER PRIMARY KEY,
        name TEXT,
        base_stat INTEGER,
        pokemon_id INTEGER,
        FOREIGN KEY(pokemon_id) REFERENCES Pokemon(id)
    )
    """)

    # Load Pokemon data from JSON file
    with open('static/data/pokemon.json') as f:
        pokemon_data = json.load(f)

    # Insert Pokemon data into SQLite database
    for pokemon in pokemon_data.values():
        cursor.execute("""
        INSERT OR IGNORE INTO Pokemon (id, name, height, weight, xp, image_url, pokemon_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (pokemon['id'], pokemon['name'], pokemon['height'], pokemon['weight'], pokemon['xp'], pokemon['image_url'], pokemon['pokemon_url']))

        # Insert abilities
        for ability in pokemon['abilities']:
            cursor.execute("""
            INSERT INTO Abilities (name, is_hidden, pokemon_id)
            VALUES (?, ?, ?)
            """, (ability['name'], int(ability['is_hidden']), pokemon['id']))

        # Insert types
        for type_ in pokemon['types']:
            cursor.execute("""
            INSERT INTO Types (name, pokemon_id)
            VALUES (?, ?)
            """, (type_['name'], pokemon['id']))

        # Insert stats
        for stat in pokemon['stats']:
            cursor.execute("""
            INSERT INTO Stats (name, base_stat, pokemon_id)
            VALUES (?, ?, ?)
            """, (stat['name'], stat['base_stat'], pokemon['id']))

    # Commit changes and close connection
    conn.commit()
    conn.close()

    return 'Conversion process complete! Pokedex Database Generator now active.'

@app.route('/')
def home():
    # Connect to SQLite database
    conn = sqlite3.connect('pokedex.db')
    cursor = conn.cursor()

    # Select all Pokemon
    cursor.execute("SELECT * FROM Pokemon")
    pokemon_all = cursor.fetchall()

    # Close connection
    conn.close()

    # Render home page with all Pokemon data
    #return render_template('index.html', pokemon=pokemon_all)

@app.route('/pokemon/<name>')
def pokemon(name):
    # Connect to SQLite database
    conn = sqlite3.connect('pokedex.db')
    cursor = conn.cursor()

    # Select Pokemon by name
    cursor.execute("""
    SELECT * FROM Pokemon
    JOIN Abilities ON Abilities.pokemon_id = Pokemon.id
    JOIN Types ON Types.pokemon_id = Pokemon.id
    JOIN Stats ON Stats.pokemon_id = Pokemon.id
    WHERE Pokemon.name = ?
    """, (name,))

    pokemon = cursor.fetchall()

    # Close connection
    conn.close()

    # Render Pokemon page with specific Pokemon data
    #return render_template('pokemon.html', pokemon=pokemon)


@app.route('/pokemon/type/<type>')
def type(type):
    # Connect to SQLite database
    conn = sqlite3.connect('pokedex.db')
    cursor = conn.cursor()

    # Select Pokemon by type
    cursor.execute("""
    SELECT * FROM Pokemon
    JOIN Abilities ON Abilities.pokemon_id = Pokemon.id
    JOIN Types ON Types.pokemon_id = Pokemon.id
    JOIN Stats ON Stats.pokemon_id = Pokemon.id
    WHERE Types.name = ?
    """, (type,))

    pokemon_by_type = cursor.fetchall()

    # Close connection
    conn.close()

    # Render type page with specific Pokemon data
    #return render_template('type.html', pokemon=pokemon_by_type)


if __name__ == '__main__':
    app.run(debug=True)
