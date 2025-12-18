# ElevenLabs Escape Room

Prosty OnePage do rozmowy z AI agentem przez mikrofon w Escape Room.

## Uruchomienie lokalne

Kliknij dwukrotnie **`START.bat`** lub:

```bash
npm install
npm start
```

Otwórz: http://localhost:4444

## Deploy na Railway

1. Push na GitHub
2. Połącz repo z Railway
3. Ustaw zmienne środowiskowe:
   - `ELEVENLABS_API_KEY`
   - `ELEVENLABS_AGENT_ID`

## Struktura

```
├── server.js       # Express server
├── public/
│   ├── index.html  # Strona główna
│   ├── styles.css  # Style (niebieski gradient)
│   └── app.js      # Integracja ElevenLabs
├── .env            # Klucze API (nie commitować!)
└── START.bat       # Szybki start
```
