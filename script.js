const voiceNote = document.getElementById('voiceNote');
const playToggle = document.getElementById('playToggle');
const playerContainer = document.getElementById('playerContainer');
const buttonImage = document.getElementById('buttonImage');
const statusText = document.getElementById('statusText');

// Safely captures connection dropouts or corrupted audio path errors
voiceNote.addEventListener('error', (e) => {
    console.error("Audio error details:", voiceNote.error);
    statusText.innerText = "Error: File not found or broken";
    statusText.style.color = "#ff4d4d";
});

playToggle.addEventListener('click', () => {
    if (voiceNote.paused) {
        voiceNote.play()
            .then(() => {
                // Adds the animation triggers and hot-swaps asset source instantly
                playerContainer.classList.add('playing');
                buttonImage.src = 'flower-play.png'; 
                statusText.innerText = 'Now Playing...';
                statusText.style.color = '#90e0ef';
            })
            .catch(error => {
                console.error("Browser playback blocked:", error);
                statusText.innerText = "Click again to play";
            });
    } else {
        // Pauses playback and rolls everything back down to default rest state
        voiceNote.pause();
        playerContainer.classList.remove('playing');
        buttonImage.src = 'flower-pause.png'; 
        statusText.innerText = 'Paused';
    }
});

// Catches when your reassurance clip finishes natively to reset back to starting bud
voiceNote.addEventListener('ended', () => {
    playerContainer.classList.remove('playing');
    buttonImage.src = 'flower-pause.png'; 
    statusText.innerText = 'Listen Again';
});
