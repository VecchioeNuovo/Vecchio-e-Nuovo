/* ============================================
   VECCHIO & NUOVO  — Logica principale
   ============================================ */

/* === CONFIGURAZIONE ===
   Modifica questi valori con i dati reali */
const CONFIG = {
  nomeNegozio:   "Vecchio & Nuovo",
  telefono:      "+39 348 55 02 680",        // ← metti il vero numero
  whatsapp:      "393271007446",             // ← numero senza + e senza spazi
  email:         "francescavatteroni@yahoo.it",   // ← vera email
  facebook:      "https://www.facebook.com/VecchioeNuovo2018?locale=it_IT", // ← vera pagina
  indirizzo:     "Viale Turigliano n. 2 Avenza , Carrara, Italy, 54033",
  orari:         "Mar–Sab 9:00–13:00 / 15:30–19:00",
  mercati:       "Ogni 1° domenica del mese - La Spezia, Piazza Cavour<br>Ogni 3° weekend (sab-dom) del mese - Lucca, Piazza San Giovanni",
};

/* Icone placeholder per categoria (quando non c'è la foto) */
const ICONE = {
  mobili:        "🪑",
  oggettistica:  "🕰️",
  ceramiche:     "🏺",
  quadri:        "🖼️",
};

/* === STATO APPLICAZIONE === */
let tuttiProdotti = [];
let categoriaAttiva = "tutti";
let prodottoAperto = null;

/* === AVVIO === */
document.addEventListener("DOMContentLoaded", () => {
  caricaProdotti();
  impostaNav();
  popolaContatti();
});

/* === POPOLA SEZIONE CONTATTI DAL CONFIG === */
function popolaContatti() {
  const campi = {
    "info-indirizzo": CONFIG.indirizzo.replace(/,\s*/g, "<br>"),
    "info-orari":     CONFIG.orari,
    "info-telefono":  `<a href="tel:${CONFIG.telefono.replace(/\s/g, "")}">${CONFIG.telefono}</a>`,
    "info-email":     `<a href="mailto:${CONFIG.email}">${CONFIG.email}</a>`,
    "info-facebook":  `<a href="${CONFIG.facebook}" target="_blank" rel="noopener">Seguici sulla pagina Facebook →</a>`,
    "info-mercati":   CONFIG.mercati,
  };

  for (const [id, html] of Object.entries(campi)) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  // Bottoni WhatsApp ed email nella barra CTA
  const btnWA = document.getElementById("cta-btn-wa");
  if (btnWA) {
    const msg = encodeURIComponent("Ciao! Ho visto il vostro catalogo e vorrei informazioni.");
    btnWA.href = `https://wa.me/${CONFIG.whatsapp}?text=${msg}`;
  }
  const btnEmail = document.getElementById("cta-btn-email");
  if (btnEmail) btnEmail.href = `mailto:${CONFIG.email}`;

  // Footer
  const footer = document.getElementById("footer-nome");
  if (footer) footer.textContent = `© 2025 ${CONFIG.nomeNegozio}`;
}

/* === CARICA PRODOTTI DAL JSON === */
async function caricaProdotti() {
  try {
    const risposta = await fetch("prodotti.json");
    tuttiProdotti = await risposta.json();
    renderGriglia();
  } catch (err) {
    console.error("Errore nel caricare prodotti.json:", err);
    document.getElementById("griglia").innerHTML =
      '<p class="stato-vuoto">Impossibile caricare il catalogo. Riprova più tardi.</p>';
  }
}

/* === RENDER GRIGLIA === */
function renderGriglia() {
  const griglia = document.getElementById("griglia");

  const prodottiFiltrati = categoriaAttiva === "tutti"
    ? tuttiProdotti.filter(p => p.disponibile)
    : tuttiProdotti.filter(p => p.disponibile && p.categoria === categoriaAttiva);

  if (prodottiFiltrati.length === 0) {
    griglia.innerHTML = '<p class="stato-vuoto">Nessun pezzo in questa categoria al momento.</p>';
    return;
  }

  griglia.innerHTML = prodottiFiltrati.map(p => cardHTML(p)).join("");

  // Aggiungi listener click su ogni card
  griglia.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      const id = parseInt(card.dataset.id);
      apriModal(id);
    });
  });
}

/* === HTML DI UNA CARD === */
function cardHTML(p) {
  const prezzoTxt = p.prezzo ? `€ ${parseInt(p.prezzo).toLocaleString("it-IT")}` : "Su richiesta";
  const icona = ICONE[p.categoria] || "🏛️";
  const primaFoto = Array.isArray(p.foto) ? p.foto[0] : p.foto;

  const imgHTML = primaFoto
    ? `<img src="${primaFoto}" alt="${p.nome}" loading="lazy">`
    : `<div class="card-placeholder" aria-hidden="true">${icona}</div>`;

  return `
    <article class="card" data-id="${p.id}" role="button" tabindex="0"
             aria-label="Vedi dettagli: ${p.nome}">
      <div class="card-img">
        <div class="card-tag">${p.categoria}</div>
        ${imgHTML}
      </div>
      <div class="card-body">
        <div class="card-nome">${p.nome}</div>
        <div class="card-meta">${p.periodo}</div>
        <div class="card-prezzo">${prezzoTxt}</div>
      </div>
    </article>
  `;
}

/* === FILTRI === */
document.addEventListener("DOMContentLoaded", () => {
  const contenitoreFiltri = document.getElementById("filtri");
  if (!contenitoreFiltri) return;

  contenitoreFiltri.addEventListener("click", e => {
    const btn = e.target.closest(".filtro-btn");
    if (!btn) return;

    contenitoreFiltri.querySelectorAll(".filtro-btn").forEach(b => b.classList.remove("attivo"));
    btn.classList.add("attivo");
    categoriaAttiva = btn.dataset.cat;
    renderGriglia();
  });
});

/* === MODAL SCHEDA PRODOTTO === */
let fotoCorrente = 0;
let fotoTotali = [];

function apriModal(id) {
  prodottoAperto = tuttiProdotti.find(p => p.id === id);
  if (!prodottoAperto) return;

  const p = prodottoAperto;
  const prezzoTxt = p.prezzo ? `€ ${parseInt(p.prezzo).toLocaleString("it-IT")}` : "Su richiesta";
  const icona = ICONE[p.categoria] || "🏛️";

  // Normalizza foto: accetta sia stringa che array
  fotoTotali = Array.isArray(p.foto) ? p.foto : (p.foto ? [p.foto] : []);
  fotoCorrente = 0;

  // Link WhatsApp precompilato col nome del pezzo
  const msgWA = encodeURIComponent(
    `Ciao! Sono interessato/a al pezzo: "${p.nome}". È ancora disponibile?`
  );
  const linkWA = `https://wa.me/${CONFIG.whatsapp}?text=${msgWA}`;

  // Link email precompilato
  const soggetto = encodeURIComponent(`Info su: ${p.nome}`);
  const corpo = encodeURIComponent(`Buongiorno,\n\nSono interessato/a al pezzo: "${p.nome}" (${p.periodo}).\n\nPotreste darmi maggiori informazioni?\n\nGrazie`);
  const linkEmail = `mailto:${CONFIG.email}?subject=${soggetto}&body=${corpo}`;

  document.getElementById("modal-tag").textContent = p.categoria;
  document.getElementById("modal-nome").textContent = p.nome;
  document.getElementById("modal-meta").textContent = p.periodo;
  document.getElementById("modal-desc").textContent = p.descrizione;
  document.getElementById("modal-prezzo").textContent = prezzoTxt;
  document.getElementById("modal-btn-wa").href = linkWA;
  document.getElementById("modal-btn-email").href = linkEmail;

  aggiornaFotoModal(icona);

  const overlay = document.getElementById("modal-overlay");
  overlay.classList.add("aperto");
  document.body.style.overflow = "hidden";
  document.getElementById("modal-chiudi").focus();
}

function aggiornaFotoModal(icona) {
  const contenitore = document.getElementById("modal-img");
  const p = prodottoAperto;
  icona = icona || ICONE[p.categoria] || "🏛️";

  if (fotoTotali.length === 0) {
    contenitore.innerHTML = `<div class="card-placeholder" style="font-size:4rem;opacity:.3">${icona}</div>`;
    return;
  }

  const mostraFrecce = fotoTotali.length > 1;
  contenitore.innerHTML = `
    <img src="${fotoTotali[fotoCorrente]}" alt="${p.nome} — foto ${fotoCorrente + 1}">
    ${mostraFrecce ? `
      <button class="carosello-btn carosello-prev" aria-label="Foto precedente">&#8249;</button>
      <button class="carosello-btn carosello-next" aria-label="Foto successiva">&#8250;</button>
      <div class="carosello-dots">
        ${fotoTotali.map((_, i) => `<span class="carosello-dot ${i === fotoCorrente ? 'attivo' : ''}" data-i="${i}"></span>`).join("")}
      </div>
    ` : ""}
  `;

  if (mostraFrecce) {
    contenitore.querySelector(".carosello-prev").addEventListener("click", e => {
      e.stopPropagation();
      fotoCorrente = (fotoCorrente - 1 + fotoTotali.length) % fotoTotali.length;
      aggiornaFotoModal();
    });
    contenitore.querySelector(".carosello-next").addEventListener("click", e => {
      e.stopPropagation();
      fotoCorrente = (fotoCorrente + 1) % fotoTotali.length;
      aggiornaFotoModal();
    });
    contenitore.querySelectorAll(".carosello-dot").forEach(dot => {
      dot.addEventListener("click", e => {
        e.stopPropagation();
        fotoCorrente = parseInt(dot.dataset.i);
        aggiornaFotoModal();
      });
    });
  }
}

function chiudiModal() {
  document.getElementById("modal-overlay").classList.remove("aperto");
  document.body.style.overflow = "";
  prodottoAperto = null;
}

// Chiudi cliccando fuori dal modal
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("modal-overlay")?.addEventListener("click", e => {
    if (e.target === e.currentTarget) chiudiModal();
  });

  // Chiudi con Escape
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") chiudiModal();
  });

  // Tasto chiudi
  document.getElementById("modal-chiudi")?.addEventListener("click", chiudiModal);

  // Card accessibili da tastiera
  document.getElementById("griglia")?.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      const card = e.target.closest(".card");
      if (card) {
        e.preventDefault();
        apriModal(parseInt(card.dataset.id));
      }
    }
  });
});

/* === MENU MOBILE === */
function impostaNav() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    links.classList.toggle("aperto");
  });

  // chiudi menu quando si clicca un link
  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => links.classList.remove("aperto"));
  });
}
