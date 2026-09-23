// db/populateDb.js
import pool from "./pool.js";

async function main() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS category (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(255) NOT NULL,
      description VARCHAR(255)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS torrefactors (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(255) NOT NULL,
      country VARCHAR(255) NOT NULL,
      website VARCHAR(255) NOT NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      price NUMERIC(10,2) NOT NULL CHECK (price > 0),
      quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
      category_id INTEGER REFERENCES category(id) ON DELETE RESTRICT,
      torrefactor_id INTEGER REFERENCES torrefactors(id) ON DELETE RESTRICT
    )
  `);

  await pool.query(`TRUNCATE category, torrefactors, items RESTART IDENTITY CASCADE`)

  await pool.query(`
    INSERT INTO category (name, description) VALUES
    ('Café', 'Grains et moutures'),
    ('Brewer', 'Méthodes d extraction'),
    ('Accessoire', 'Tout le reste')
  `);

  await pool.query(`
    INSERT INTO torrefactors (name, country, website) VALUES
    ('People Possession', 'France', 'https://peoplepossession.com'),
    ('Muda', 'France', 'https://cafesmuda.fr/')
  `)

  await pool.query(
    `INSERT INTO items (name, description, price, quantity, category_id, torrefactor_id) VALUES
      ('Gesha Aponte', 'Lemongrass, Sichuan pepper and Black tea, ORIGIN: COLOMBIA', 26.50, 0, 1, 1),
      ('NBA New Berry Addiction{Blend}', 'WILD STRAWBERRIES, CANDIED LEMON, RED FRUITS', 17.9, 0, 1, 1),
      ($1, $2, 10.90, 2, 1, 2)`,
    [
      'ENDLESS SUMMER - MYANMAR',
      "Et si l'été ne se terminait jamais ? Endless Summer est le fruit d'une collaboration entre Cafés MUDA et le Paddo Café, l'ambassadeur de l'art de vivre à l'Australienne dans le Vieux-Lille."
    ]
  );
  
  console.log("Cooffee Shop is up !");
  await pool.end();
}

main();
// node db/initDb.js