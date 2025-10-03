let player;
let currentTrack = 0;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    height: '0',
    width: '0',
    playerVars: {
      listType: 'playlist',
      list: 'YOUR_PLAYLIST_ID', // Replace with your YouTube playlist ID
      autoplay: 0,
      controls: 0,
      loop: 1,
      playsinline: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  player.setVolume(20);
  document.querySelector('.begin-btn').addEventListener('click', () => {
    player.playVideo();
    updateTrackUI();
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    currentTrack = (currentTrack + 1) % 12;
    updateTrackUI();
  }
}

function updateTrackUI() {
  const trackListItems = document.querySelectorAll('#track-list li');
  trackListItems.forEach((item, index) => {
    item.classList.toggle('active', index === currentTrack);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.begin-btn, .next-btn');
  const unlockButtons = document.querySelectorAll('.unlock-btn');
  const copyButtons = document.querySelectorAll('.copy-btn');
  const muteBtn = document.getElementById('mute-btn');

  // Toggle mute
  muteBtn.addEventListener('click', () => {
    if (player.isMuted()) {
      player.unMute();
      muteBtn.textContent = 'Mute';
    } else {
      player.mute();
      muteBtn.textContent = 'Unmute';
    }
  });

  // Slide-up navigation
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const nextSectionId = button.getAttribute('data-next');
      if (nextSectionId) {
        document.querySelector('.section.active').classList.remove('active');
        document.querySelector(`#${nextSectionId}`).classList.add('active');
      }
    });
  });

  // Gift unlocks with confetti
  unlockButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-unlock');
      document.getElementById(targetId).style.display = 'block';
      confetti({
        particleCount: targetId === 'future-gift' ? 150 : 50, // More confetti for Act 5
        spread: targetId === 'future-gift' ? 80 : 50,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#ffd700', '#ffffff']
      });
    });
  });

  // Copy codes
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-code');
      navigator.clipboard.writeText(code);
      alert('Code copied, my queen Ashari! Shine on!');
    });
  });
});
