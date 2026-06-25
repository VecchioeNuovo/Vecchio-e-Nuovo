# Bottega Antico — Sito Web

Sito vetrina/catalogo statico, pubblicabile **gratis** su GitHub Pages.

---

## Struttura dei file
```
bottega-antico/
├── index.html          ← la pagina principale
├── prodotti.json       ← il catalogo (modificalo per aggiungere/rimuovere prodotti)
├── css/
│   └── stile.css       ← tutto il design (colori, font, layout)
├── js/
│   └── main.js         ← logica interattiva (filtri, modal, WhatsApp)
└── img/
    ├── logo.png       
    └── prodotti/       ← metti qui le foto dei prodotti
        ├── prodotto1/
        │   ├── 1.jpg
        │   ├── 2.jpg
        │   └── 2.jpg
        ├── prodotto1/
        │   ├── 1.jpg
        │   └── 2.jpg
        └── ...
```

---

## Come aggiungere un prodotto
Apri `prodotti.json` e aggiungi un oggetto alla lista:

```json
{
  "id": 10,
  "nome": "Nome del pezzo",
  "categoria": "mobili",        ← mobili / oggettistica / ceramiche / quadri
  "periodo": "XIX sec.",
  "descrizione": "Descrizione dettagliata del pezzo.",
  "prezzo": "850",              ← solo il numero, senza €. Scrivi null per "Su richiesta"
  "foto": "img/prodotti/nome-file.jpg",
  "disponibile": true           ← metti false per nasconderlo dal catalogo
}
```

Per la foto: metti il file JPG nella cartella `img/prodotti/` e scrivi il percorso nel campo `foto`.

---

## Come cambiare i dati del negozio
Apri `js/main.js` e modifica la sezione CONFIG in cima al file:

```javascript
const CONFIG = {
  nomeNegozio:   "Il vero nome del negozio",
  telefono:      "+39 123 456 7890",
  whatsapp:      "39123456789",   ← numero senza + e senza spazi
  email:         "vera@email.it",
  facebook:      "https://facebook.com/pagina-reale",
  indirizzo:     "Via Vera 1, Massa Carrara",
  orari:         "Lun–Sab 9:00–19:00",
  mercati:       "Ogni domenica in Piazza Aranci",
};
```

---

## Come pubblicare su GitHub Pages (gratis)

### 1. Crea un account GitHub
Vai su https://github.com e registrati (è gratuito).

### 2. Crea un repository
- Clicca il `+` in alto a destra → "New repository"
- Nome repository: `bottega-antico` (o quello che vuoi)
- Spunta "Public"
- Clicca "Create repository"

### 3. Carica i file
Nel tuo nuovo repository:
- Clicca "uploading an existing file"
- Trascina TUTTI i file e cartelle del progetto
- Clicca "Commit changes"

> ⚠️ Importante: mantieni la struttura delle cartelle (css/, js/, img/)

### 4. Attiva GitHub Pages
- Vai in "Settings" (il tasto in alto nel repository)
- Sezione "Pages" nel menu a sinistra
- Source: seleziona "main" branch e cartella "/ (root)"
- Clicca "Save"

### 5. Il sito è online!
Dopo 1-2 minuti il sito sarà raggiungibile all'indirizzo:
```
https://tuo-username.github.io/bottega-antico/
```

---

## Come aggiornare il sito dopo la pubblicazione

Per aggiornare (ad esempio aggiungendo prodotti):
1. Modifica il file in locale
2. Vai su GitHub, apri il file
3. Clicca l'icona matita (modifica)
4. Incolla le modifiche
5. "Commit changes" → il sito si aggiorna in pochi secondi

Oppure scarica GitHub Desktop per gestire i file dal computer come una cartella normale.

---

## Dominio personalizzato (opzionale, ~10€/anno)

Se vuoi un indirizzo tipo `www.bottegaantico.it` invece di `.github.io`:
1. Compra il dominio su Aruba o Register.it (~10€/anno)
2. In GitHub Pages → Custom domain, inserisci il dominio
3. Nelle impostazioni DNS del dominio, aggiungi un record CNAME che punta a `tuo-username.github.io`

---

## Problemi comuni

**Le foto non appaiono**: controlla che il nome file in `prodotti.json` corrisponda esattamente al file in `img/prodotti/` (maiuscole e minuscole contano).

**I prodotti non si caricano in locale**: apri il sito con un server locale invece di fare doppio clic su index.html. Con Python: `python -m http.server 8000` nella cartella del progetto, poi apri `http://localhost:8000`.

**Il WhatsApp non funziona**: controlla che il numero in `js/main.js` sia scritto senza + e senza spazi (es. `393471234567`).
