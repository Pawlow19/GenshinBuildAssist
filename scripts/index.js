document.addEventListener('DOMContentLoaded', loadCharacterIcons);

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
