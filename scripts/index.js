document.addEventListener('DOMContentLoaded', () => {
    loadCharacterIcons();
    preloadImages().then(() => {
        rotateBackgrounds();
    }).catch((error) => {
        console.error(error);
    });
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
            const characterListContainer = document.querySelector('.character-list-container');
            characterListContainer.innerHTML = '';
            Object.keys(data.characters).forEach(character => {
                const div = document.createElement('div');
                div.classList.add('character-icon');
                div.dataset.name = character.toLowerCase();
                div.innerHTML = `<a href="character_details.html?name=${character}"><img src="assets/characters/icon/${character}_Icon.webp" alt="${character}"><br>${character}</a>`;
                characterListContainer.appendChild(div);
            });
            adjustContentHeight(); // Adjust content height after loading characters
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
    adjustContentHeight(); // Adjust content height after filtering
}

function showCharacterList() {
    // document.getElementById('searchBar').style.display = 'block';
    loadCharacterIcons();
}

function showOwnedCharacters() {
    // document.getElementById('searchBar').style.display = 'block';
    const content = document.getElementById('content');
    const characterListContainer = document.querySelector('.character-list-container');
    characterListContainer.innerHTML = '';

    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('character_')) {
            const character = key.replace('character_', '');
            const div = document.createElement('div');
            div.classList.add('character-icon');
            div.dataset.name = character.toLowerCase();
            div.innerHTML = `<a href="character_details.html?name=${character}"><img src="assets/characters/icon/${character}_Icon.webp" alt="${character}"><br>${character}</a>`;
            characterListContainer.appendChild(div);
        }
    });

    if (!characterListContainer.hasChildNodes()) {
        characterListContainer.innerHTML = '<p>Brak posiadanych postaci.</p>';
    }
    adjustContentHeight(); // Adjust content height after loading owned characters
}

function showMaterialList() {
    // document.getElementById('searchBar').style.display = 'none';
    const content = document.getElementById('content');
    const characterListContainer = document.querySelector('.character-list-container');
    characterListContainer.innerHTML = '<p>Funkcja w budowie...</p>';
    adjustContentHeight(); // Adjust content height after showing material list
}

function showOwnedMaterials() {
    // document.getElementById('searchBar').style.display = 'none';
    const content = document.getElementById('content');
    const characterListContainer = document.querySelector('.character-list-container');
    characterListContainer.innerHTML = '<p>Funkcja w budowie...</p>';
    adjustContentHeight(); // Adjust content height after showing owned materials
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
