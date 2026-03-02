// Shared auth: fetch current user and render nav
async function getCurrentUser() {
  const res = await fetch('/api/me', { credentials: 'include' });
  const data = await res.json();
  return data.user || null;
}

function renderNav(user, dueSoonCount) {
  const nav = document.getElementById('nav-links');
  if (!nav) return;
  if (user) {
    const dueBadge = (dueSoonCount && dueSoonCount > 0)
      ? `<a href="/my-reservations" class="nav-due-badge" title="Books due soon">⏰ ${dueSoonCount}</a>`
      : '';
    nav.innerHTML = `
      <span class="nav-user">Hello, ${escapeHtml(user.name)}</span>
      ${user.isAdmin ? '<a href="/admin">Admin</a>' : ''}
      <a href="/books">Books</a>
      <a href="/my-reservations">My Reservations</a>${dueBadge}
      <a href="/reserve">Reserve</a>
      <button type="button" id="btn-logout">Log out</button>
    `;
    const btn = document.getElementById('btn-logout');
    if (btn) btn.addEventListener('click', logout);
  } else {
    nav.innerHTML = `
      <a href="/books">Books</a>
      <a href="/login">Log in</a>
      <a href="/signup">Sign up</a>
    `;
  }
}

async function logout() {
  await fetch('/api/logout', { method: 'POST', credentials: 'include' });
  window.location.href = '/';
}

function escapeHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

async function getDueSoonCount() {
  try {
    const res = await fetch('/api/due-soon?days=3', { credentials: 'include' });
    if (!res.ok) return 0;
    const rows = await res.json();
    return rows.length || 0;
  } catch { return 0; }
}

document.addEventListener('DOMContentLoaded', async () => {
  const navEl = document.getElementById('nav-links');
  if (!navEl) return;
  const user = await getCurrentUser();
  const dueSoon = user ? await getDueSoonCount() : 0;
  renderNav(user, dueSoon);
});
