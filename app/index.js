const express = require('express');
const { Pool } = require('pg');
const os = require('os');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS logs (
      id SERIAL PRIMARY KEY,
      uptime_seconds FLOAT,
      free_memory_mb FLOAT,
      total_memory_mb FLOAT,
      logged_at TIMESTAMP DEFAULT NOW()
    )
  `);
  console.log('Tabela logs je spremna.');
}

app.get('/status', async (req, res) => {
  const stats = {
    uptime_seconds: os.uptime(),
    free_memory_mb: (os.freemem() / 1024 / 1024).toFixed(2),
    total_memory_mb: (os.totalmem() / 1024 / 1024).toFixed(2),
  };

  await pool.query(
    'INSERT INTO logs (uptime_seconds, free_memory_mb, total_memory_mb) VALUES ($1, $2, $3)',
    [stats.uptime_seconds, stats.free_memory_mb, stats.total_memory_mb]
  );

  res.json({ status: 'ok', ...stats });
});

app.get('/history', async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM logs ORDER BY logged_at DESC LIMIT 10'
  );
  res.json(result.rows);
});

init().then(() => {
  app.listen(3000, () => console.log('Monitor API radi na portu 3000'));
});
