const API = 'http://localhost:3000';

document.getElementById('btn-save').addEventListener('click', async () => {
  const msg = document.getElementById('message');
  msg.textContent = 'Snimanje...';
  try {
    const res = await fetch(`${API}/status`);
    const data = await res.json();
    msg.textContent = `✅ Stanje sačuvano — uptime: ${Math.round(data.uptime_seconds)}s, slobodna memorija: ${data.free_memory_mb} MB`;
  } catch (e) {
    msg.textContent = '❌ Greška: ne mogu da dosegnem API.';
  }
});

document.getElementById('btn-history').addEventListener('click', async () => {
  const msg = document.getElementById('message');
  msg.textContent = 'Učitavanje...';
  try {
    const res = await fetch(`${API}/history`);
    const rows = await res.json();

    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    if (rows.length === 0) {
      msg.textContent = 'Baza je prazna — klikni prvo "Memorisi trenutno stanje".';
      document.getElementById('table-wrapper').style.display = 'none';
      return;
    }

    rows.forEach((row, i) => {
      tbody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${Math.round(row.uptime_seconds)}</td>
          <td>${row.free_memory_mb}</td>
          <td>${row.total_memory_mb}</td>
          <td>${new Date(row.logged_at).toLocaleString('sr-RS')}</td>
        </tr>`;
    });

    document.getElementById('table-wrapper').style.display = 'block';
    msg.textContent = `Prikazano ${rows.length} zapisa.`;
  } catch (e) {
    msg.textContent = '❌ Greška: ne mogu da dosegnem API.';
  }
});