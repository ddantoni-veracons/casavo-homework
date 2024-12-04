# React Autocomplete Component

Un componente autocomplete in React + TypeScript che permette di cercare città con 
un menu a tendina, basato su input dell'utente.

---

# Descrizione del Progetto

Questo progetto è un componente React sviluppato con **Next.js** e **TypeScript** che offre un'autocomplete per la ricerca di città. Mostra un elenco di risultati filtrati da un'API remota e consente all'utente di selezionare una città. Il componente invia l'UUID della città selezionata al componente padre.

---

# Caratteristiche Principali

- **Ricerca dinamica**: Mostra i risultati corrispondenti mentre l'utente digita almeno 2 caratteri.

- **Selezione città**: Cliccando su una città, il valore viene riempito nell'input e l'UUID viene passato al genitore.

- **Dropdown interattivo**: Si chiude automaticamente cliccando all'esterno del componente.

- **Stile semplice**: Usato CSS vanilla.

- **React e Hooks**: Componente costruito solo con funzioni e Hook.

- **Gestione tipizzazione**: Dati e componenti tipizzati con TypeScript.

---

## Requisiti del Progetto

- Node.js v20 o superiore.
- NPM.
- **Next.js** come framework.

---

## Installazione

### 1. Clona il Repository
git clone https://github.com/ddantoni-veracons/casavo-homework.git

### 2. Installa dipendenze
npm install

### 3. Avvia il Progetto
npm run dev

---

## Struttura del progetto
```bash
react-autocomplete/
├── api/                    
│   ├── fetchCities.ts      # Chiamata principale per prendere le città
├── components/
│   ├── AutoComplete.tsx    # Componente principale autocomplete
├── module/
│   ├── city.interface.ts   # Interfaccia città
├── pages/
│   ├── index.tsx           # Pagina iniziale che utilizza AutoComplete
│   ├── _app.tsx            # Configurazione globale
├── styles/
│   ├── global.css          # Stile globale del progetto
├── public/                 # File statici
├── package.json            # Dipendenze e script
├── tsconfig.json           # Configurazione TypeScript
└── README.md               # Documentazione del progetto
```
---

## Come Utilizzare il Componente
### 1. Props
- **onSelectCity: Una funzione che riceve l'UUID della città selezionata.**

### 2. Esempio:
<AutoComplete onSelectCity={(cityUUID) => console.log(cityUUID)} />

---

## API Endpoint
### 1. L'app utilizza un'API remota per ottenere la lista delle città:

```bash
GET /v1/cities # Restituisce tutte le città.
GET /v1/cities?search=<value> # Filtra i risultati in base al nome o al paese.
```

---

## Tecnologie Utilizzate

### 1. Next.js: Framework React.
### 2. TypeScript: Tipizzazione statica.
### 3. CSS: Stile semplice senza librerie esterne.
### 4. Fetch API: Per chiamare l'API remota.
