// ElevenLabs Conversational AI Integration
// Escape Room OnePage - 18.12.2025

let conversation = null;

// DOM Elements
const startBtn = document.getElementById('start-btn');
const endBtn = document.getElementById('end-btn');
const statusIndicator = document.getElementById('status-indicator');
const errorMsg = document.getElementById('error-msg');

// Fetch agent config from server
async function getConfig() {
    const response = await fetch('/api/config');
    return response.json();
}

// Show error message
function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove('hidden');
    setTimeout(() => {
        errorMsg.classList.add('hidden');
    }, 5000);
}

// Update UI based on connection state
function updateUI(state) {
    switch (state) {
        case 'idle':
            startBtn.classList.remove('hidden', 'connecting');
            endBtn.classList.add('hidden');
            statusIndicator.classList.add('hidden');
            startBtn.disabled = false;
            endBtn.disabled = false; // Reset for next session
            break;
        case 'connecting':
            startBtn.classList.add('connecting');
            startBtn.disabled = true;
            break;
        case 'connected':
            startBtn.classList.add('hidden');
            startBtn.classList.remove('connecting');
            endBtn.classList.remove('hidden');
            endBtn.disabled = false; // Ensure button is clickable
            statusIndicator.classList.remove('hidden');
            break;
        case 'disconnecting':
            endBtn.disabled = true;
            break;
    }
}

// Start conversation with ElevenLabs Agent
async function startConversation() {
    try {
        updateUI('connecting');

        // Request microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });

        // Get agent ID from server
        const config = await getConfig();

        // Dynamically import ElevenLabs SDK
        const { Conversation } = await import('https://cdn.jsdelivr.net/npm/@11labs/client@latest/+esm');

        // Start session with agent
        conversation = await Conversation.startSession({
            agentId: config.agentId,
            onConnect: () => {
                console.log('✅ Connected to ElevenLabs Agent');
                updateUI('connected');
            },
            onDisconnect: () => {
                console.log('🔌 Disconnected from ElevenLabs Agent');
                updateUI('idle');
                conversation = null;
            },
            onError: (error) => {
                console.error('❌ Error:', error);
                showError('Błąd połączenia. Spróbuj ponownie.');
                updateUI('idle');
            },
            onModeChange: (mode) => {
                console.log('🔄 Mode changed:', mode);
            }
        });

    } catch (error) {
        console.error('Failed to start conversation:', error);

        if (error.name === 'NotAllowedError') {
            showError('Wymagany dostęp do mikrofonu!');
        } else {
            showError('Nie udało się połączyć. Spróbuj ponownie.');
        }

        updateUI('idle');
    }
}

// End conversation
async function endConversation() {
    if (conversation) {
        try {
            updateUI('disconnecting');
            await conversation.endSession();
        } catch (error) {
            console.error('Error ending conversation:', error);
        }
        conversation = null;
        updateUI('idle');
    }
}

// Event listeners
startBtn.addEventListener('click', startConversation);
endBtn.addEventListener('click', endConversation);

// Initialize
updateUI('idle');
console.log('🎙️ ElevenLabs Escape Room Ready');
