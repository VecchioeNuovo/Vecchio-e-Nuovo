# Vecchio e Nuovo

Sito ufficiale del negozio di antiquariato e modernariato **Vecchio e Nuovo**, a Carrara.

Catalogo prodotti, informazioni di contatto e dettagli sui mercati settimanali dove trovarci.

🔗 **Sito online:** https://vecchioenuovo.github.io/Vecchio-e-Nuovo/

---

## Note tecniche (per la gestione del sito)

Sito statico (HTML/CSS/JS), nessun backend necessario.

### Struttura dei file
```
Vecchio-e-Nuovo/
├── index.html          ← la pagina principale
├── prodotti.json       ← il catalogo (modificalo per aggiungere/rimuovere prodotti)
├── css/
│   └── stile.css       ← tutto il design (colori, font, layout)
├── js/
│   └── main.js         ← logica interattiva (filtri, modal, WhatsApp)
└── img/
    ├── logo_navbar.png
    └── prodotti/        ← foto dei prodotti, una sottocartella per pezzo
        ├── nome-prodotto-1/
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
  "categoria": "mobili",
  "periodo": "XIX sec.",
  "descrizione": "Descrizione dettagliata del pezzo.",
  "prezzo": "850",
  "foto": [
    "img/prodotti/nome-prodotto/1.jpg",
    "img/prodotti/nome-prodotto/2.jpg"
  ],
  "disponibile": true
}
```

Categorie disponibili: `mobili`, `oggettistica`, `ceramiche`, `quadri`.
Per "Su richiesta" invece del prezzo, scrivi `null`.

---

## Come cambiare i dati del negozio

Apri `js/main.js` e modifica il blocco `CONFIG` in cima al file — telefono, WhatsApp, email, indirizzo, orari, mercati. Da lì si aggiorna tutto il sito automaticamente.

---

## Come pubblicare una modifica

1. Modifica il file che ti serve
2. Su GitHub, apri quel file nel repository
3. Clicca l'icona matita (modifica)
4. Incolla le modifiche
5. "Commit changes" → il sito si aggiorna in pochi secondi

---

## Problemi comuni

**Le foto non appaiono**: controlla che il nome file nel JSON corrisponda esattamente al file nella cartella (maiuscole/minuscole contano).

**Le modifiche non si vedono**: prova a ricaricare la pagina forzando lo svuotamento della cache (Ctrl+Shift+R su Windows, Cmd+Shift+R su Mac).

**Il WhatsApp non funziona**: controlla che il numero in `CONFIG` sia scritto senza + e senza spazi.
