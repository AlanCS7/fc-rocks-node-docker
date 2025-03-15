const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "mysqldb",
  user: "root",
  password: "root",
  database: "mysqldb",
});

const createTable = `
    CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );
`;

db.query(createTable, (err) => {
  if (err) {
    console.error("Erro ao criar a table:", err);
    process.exit(1);
  }
  console.log("Tabela people criada com sucesso no banco de dados");

  db.query("DELETE FROM people;", (err) => {
    if (err) {
      console.error("Erro ao limpar a tabela:", err);
      process.exit(1);
    }
    console.log("Tabela people limpa com sucesso");
  });

  const names = ["Wesley", "Luiz", "Alan", "Carlos", "Willians"];
  names.forEach((name) => {
    db.query(`INSERT INTO people (name) VALUES ('${name}');`, (err) => {
      if (err) {
        console.error(`Erro ao inserir o nome ${name}:`, err);
        process.exit(1);
      }
      console.log(`Nome ${name} inserido com sucesso na tabela people`);
    });
  });
});

app.get("/", (req, res) => {
  db.query("SELECT name FROM people;", (err, rows) => {
    if (err) {
      return res.status(500).send("Erro ao buscar nomes");
    }

    const names = rows.map((row) => row.name).join("<br>");

    res.send(`
        <h1>Full Cycle Rocks!</h1><br>
        <h2>Lista de nomes cadastrados:</h2>
        ${names}   
    `);
  });
});

app.listen(port, () => {
  console.log("Aplicação rodando na porta " + port);
});
