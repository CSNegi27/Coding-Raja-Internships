document.addEventListener('DOMContentLoaded', () => {
    const songs = {
        'Travis Scott': 'travis_scott_song.mp3',
        'Karan Aujla': 'audio/karan_aujla_song.mp3',
        'Dua Lipa': 'dua_lipa_song.mp3',
        'KR$NA': 'krna_song.mp3',
        'Eminem': 'audio/eminem_song.mp3',
        'Billie Eilish': 'billie_eilish_song.mp3'
    };

    function createAudioPlayer(src) {
        const audioPlayer = document.createElement('audio');
        audioPlayer.controls = true;
        audioPlayer.style.display = 'none'; 
        document.body.appendChild(audioPlayer);

        const audioSource = document.createElement('source');
        audioSource.src = src;
        audioSource.type = 'audio/mpeg';
        audioPlayer.appendChild(audioSource);

        return audioPlayer;
    }

    const audioPlayers = {};
    for (const artist in songs) {
        if (songs.hasOwnProperty(artist)) {
            audioPlayers[artist] = createAudioPlayer(songs[artist]);
        }
    }

    let lastClickTime = 0;

    document.querySelectorAll('.play-button').forEach(button => {
        button.addEventListener('click', () => {
            const currentTime = new Date().getTime();
            const artistName = button.parentElement.querySelector('h3').textContent;

            if (currentTime - lastClickTime < 300) {
                if (audioPlayers[artistName]) {
                    audioPlayers[artistName].pause();
                    audioPlayers[artistName].style.display = 'none'; 
                }
            } else {
                document.querySelectorAll('audio').forEach(player => player.pause());

                if (audioPlayers[artistName]) {
                    audioPlayers[artistName].style.display = 'block'; 
                    audioPlayers[artistName].play();
                }
            }

            lastClickTime = currentTime;
        });
    });

    document.querySelectorAll('audio').forEach(player => {
        player.addEventListener('ended', () => {
            player.style.display = 'none';
        });
    });
});
