
document.addEventListener('DOMContentLoaded', () => {
    // Audio
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    if (musicBtn && bgMusic) {
        // Estado inicial
        musicBtn.innerHTML = '🔇';

        const playMusic = () => {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = '🎵';
            }).catch(e => console.log("Autoplay bloqueado por el navegador"));
        };

        const pauseMusic = () => {
            bgMusic.pause();
            isPlaying = false;
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = '🔇';
        };

        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar disparar el evento del body
            if (isPlaying) {
                pauseMusic();
            } else {
                playMusic();
            }
        });
        
        // Autoplay workaround: Intentar reproducir con la primera interacción en la página
        document.body.addEventListener('click', () => {
            if (!isPlaying) {
                playMusic();
            }
        }, { once: true });
    }

    // Countdown
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        const weddingDate = new Date("2026-12-25 17:00").getTime();
        setInterval(() => {
            const now = new Date().getTime();
            const dist = weddingDate - now;
            if (dist < 0) return;
            document.getElementById("days").innerText = Math.floor(dist / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            document.getElementById("hours").innerText = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            document.getElementById("minutes").innerText = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            document.getElementById("seconds").innerText = Math.floor((dist % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }, 1000);
    }

    // Fade-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
