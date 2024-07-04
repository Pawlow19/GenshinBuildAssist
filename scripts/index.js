document.addEventListener('DOMContentLoaded', () => {
    loadCharacterIcons();
    rotateBackgrounds();
    adjustContentHeight();
});

window.addEventListener('resize', adjustContentHeight);

function adjustContentHeight() {
    const content = document.getElementById('content');
    const characterListContainer = document.querySelector('.character-list-container');
    content.style.height = `${characterListContainer.offsetHeight}px`;
}

function loadCharacterIcons() {
    fetch('data/character_list.json')
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('content');
            content.innerHTML = '';
            Object.keys(data.characters).forEach(character => {
                const div = document.createElement('div');
                div.classList.add('character-icon');
                div.dataset.name = character.toLowerCase();
                div.innerHTML = `<a href="character_details.html?name=${character}"><img src="assets/characters/icon/${character}_Icon.webp" alt="${character}"><br>${character}</a>`;
                content.appendChild(div);
            });
        })
        .catch(error => console.error('Error loading character icons:', error));
}

function filterCharacters() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const characterIcons = document.getElementsByClassName('character-icon');

    Array.from(characterIcons).forEach(icon => {
        const name = icon.dataset.name;
        if (name.includes(input)) {
            icon.style.display = 'inline-block';
        } else {
            icon.style.display = 'none';
        }
    });
}

function showCharacterList() {
    document.getElementById('searchBar').style.display = 'block';
    loadCharacterIcons();
}

function showOwnedCharacters() {
    document.getElementById('searchBar').style.display = 'block';
    const content = document.getElementById('content');
    content.innerHTML = '';

    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('character_')) {
            const character = key.replace('character_', '');
            const div = document.createElement('div');
            div.classList.add('character-icon');
            div.dataset.name = character.toLowerCase();
            div.innerHTML = `<a href="character_details.html?name=${character}"><img src="assets/characters/icon/${character}_Icon.webp" alt="${character}"><br>${character}</a>`;
            content.appendChild(div);
        }
    });

    if (!content.hasChildNodes()) {
        content.innerHTML = '<p>Brak posiadanych postaci.</p>';
    }
}

function showMaterialList() {
    // Placeholder for material list functionality
    document.getElementById('searchBar').style.display = 'none';
    const content = document.getElementById('content');
    content.innerHTML = '<p>Funkcja w budowie...</p>';
}

function showOwnedMaterials() {
    // Placeholder for owned materials functionality
    document.getElementById('searchBar').style.display = 'none';
    const content = document.getElementById('content');
    content.innerHTML = '<p>Funkcja w budowie...</p>';
}

const backgrounds = [
    { file: 'BG_Fontaine.webp', author: 'Party BG_Fontaine_cleaned & upscaled by asddzr' },
    { file: 'BG_Inazuma.webp', author: 'Party BG_Inazuma_cleaned & upscaled by asddzr' },
    { file: 'BG_Liyue.webp', author: 'Party BG_Liyue_cleaned & upscaled by asddzr' },
    { file: 'BG_Mond.webp', author: 'Party BG_Mond_cleaned & upscaled by asddzr' },
    { file: 'BG_Starry.webp', author: 'Party BG_Starry_cleaned & upscaled by asddzr' },
    { file: 'BG_Sumeru_Desert.webp', author: 'Party BG_Sumeru (Desert)_cleaned & upscaled by asddzr' },
    { file: 'BG_Sumeru_Rainforest.webp', author: 'Party BG_Sumeru (Rainforest)_cleaned & upscaled by asddzr' }
];

const preloadedImages = [];
let currentBackgroundIndex = 0;

function preloadImages() {
    return new Promise((resolve, reject) => {
        let loadedCount = 0;
        backgrounds.forEach((bg, index) => {
            const img = new Image();
            img.src = `assets/backgrounds/${bg.file}`;
            img.onload = () => {
                preloadedImages[index] = { img, author: bg.author };
                loadedCount++;
                if (loadedCount === backgrounds.length) {
                    resolve();
                }
            };
            img.onerror = () => {
                reject(new Error(`Failed to load image: ${bg.file}`));
            };
        });
    });
}

function rotateBackgrounds() {
    const appElement = document.getElementById('app');
    const authorElement = document.getElementById('background-author');

    function updateBackground() {
        if (preloadedImages.length === 0) return;

        const bg = preloadedImages[currentBackgroundIndex];
        const nextIndex = (currentBackgroundIndex + 1) % preloadedImages.length;
        const nextBg = preloadedImages[nextIndex];

        appElement.style.transition = 'none';
        appElement.style.backgroundImage = `url(${bg.img.src})`;
        authorElement.textContent = `OG File: ${bg.author}`;

        setTimeout(() => {
            appElement.style.transition = 'background-image 3s ease-in-out';
            appElement.style.backgroundImage = `url(${nextBg.img.src})`;
            authorElement.textContent = `OG File: ${nextBg.author}`;

            currentBackgroundIndex = nextIndex;
            setTimeout(updateBackground, 57000); // Zmiana co 60 sekund
        }, 3000); // 3 sekundy na zaciemnienie
    }

    updateBackground();
}

document.addEventListener('DOMContentLoaded', () => {
    preloadImages().then(() => {
        rotateBackgrounds();
    }).catch((error) => {
        console.error(error);
    });
});
