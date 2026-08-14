function renderMembers(list) {
  const grid = document.getElementById("memberGrid");
  const empty = document.getElementById("emptyState");

  grid.innerHTML = "";

  if (list.length === 0) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  list.forEach((m) => {
    const card = document.createElement("article");
    card.className = "member-card";

    const fields = [];
    if (m.email) fields.push(`<div class="member-field"><span class="label">Email</span><a href="mailto:${m.email}">${m.email}</a></div>`);
    if (m.phone) fields.push(`<div class="member-field"><span class="label">Phone</span><span>${m.phone}</span></div>`);
    if (m.location) fields.push(`<div class="member-field"><span class="label">Loc</span><span>${m.location}</span></div>`);

    card.innerHTML = `
      <div class="member-id">ICE-18 / ${m.id}</div>
      <h3 class="member-name">${m.name}</h3>
      ${fields.join("")}
    `;
    grid.appendChild(card);
  });
}

function updateStats(list) {
  document.getElementById("memberCount").textContent = String(list.length).padStart(2, "0");
  const uniqueLocations = new Set(list.map((m) => m.location).filter(Boolean));
  document.getElementById("countryCount").textContent = String(uniqueLocations.size).padStart(2, "0");
}

function init() {
  updateStats(MEMBERS);
  renderMembers(MEMBERS);

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    const filtered = MEMBERS.filter((m) =>
      [m.name, m.email, m.phone, m.location].join(" ").toLowerCase().includes(q)
    );
    renderMembers(filtered);
  });
}

document.addEventListener("DOMContentLoaded", init);
