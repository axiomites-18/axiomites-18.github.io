(function () {
  const grid = document.getElementById("grid");
  const overlay = document.getElementById("overlay");
  const dialog = document.getElementById("dialog");
  const mPhoto = document.getElementById("m-photo");
  const mName = document.getElementById("m-name");
  const mDetails = document.getElementById("m-details");
  const closeBtn = document.getElementById("close");
  let current = -1;
  let lastFocus = null;

  document.getElementById("count").textContent = STUDENTS.length;

  function initials(name) {
    const parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
  }

  function photoNode(s) {
    if (s.photo) {
      const img = document.createElement("img");
      img.src = s.photo;
      img.alt = "Photo of " + s.name;
      img.loading = "lazy";
      return img;
    }
    const d = document.createElement("div");
    d.className = "initials";
    d.textContent = initials(s.name);
    d.setAttribute("aria-hidden", "true");
    return d;
  }

  STUDENTS.forEach(function (s, i) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "card";
    btn.setAttribute("aria-label", "Open profile of " + s.name);
    const thumb = document.createElement("span");
    thumb.className = "thumb";
    thumb.appendChild(photoNode(s));
    const n = document.createElement("span");
    n.className = "cname";
    n.textContent = s.name;
    const r = document.createElement("span");
    r.className = "croll";
    r.textContent = "Roll " + s.roll;
    btn.append(thumb, n, r);
    btn.addEventListener("click", function () { open(i); });
    li.appendChild(btn);
    grid.appendChild(li);
  });

  function row(label, value, href) {
    const wrap = document.createElement("div");
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    if (href) {
      const a = document.createElement("a");
      a.href = href;
      a.textContent = value;
      dd.appendChild(a);
    } else {
      dd.textContent = value;
    }
    wrap.append(dt, dd);
    mDetails.appendChild(wrap);
  }

  function fill(i) {
    const s = STUDENTS[i];
    current = i;
    mPhoto.replaceChildren(photoNode(s));
    mName.textContent = s.name;
    mDetails.replaceChildren();
    row("Roll", s.roll);
    row("Blood group", s.blood);
    row("Home district", s.zilla);
    if (s.address) row("Present address", s.address);
    if (SHOW_PHONE && s.phone) row("Phone", s.phone, "tel:" + s.phone);
    dialog.scrollTop = 0;
  }

  function open(i) {
    lastFocus = document.activeElement;
    fill(i);
    overlay.hidden = false;
    document.body.classList.add("modal-open");
    closeBtn.focus();
  }

  function close() {
    overlay.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus();
  }

  function step(d) {
    fill((current + d + STUDENTS.length) % STUDENTS.length);
  }

  closeBtn.addEventListener("click", close);
  document.getElementById("prev").addEventListener("click", function () { step(-1); });
  document.getElementById("next").addEventListener("click", function () { step(1); });
  overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });

  document.addEventListener("keydown", function (e) {
    if (overlay.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "Tab") {
      const f = dialog.querySelectorAll("button, a[href]");
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
