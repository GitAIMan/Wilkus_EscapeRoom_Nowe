require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get agent config (without exposing API key)
app.get('/api/config', (req, res) => {
    res.json({
        agentId: process.env.ELEVENLABS_AGENT_ID
    });
});

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🎙️ ElevenLabs Escape Room Server`);
    console.log(`🌐 http://localhost:${PORT}`);
    console.log(`📅 Data: 18.12.2025`);
});
