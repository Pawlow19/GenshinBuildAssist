document.addEventListener('DOMContentLoaded', () => {
    loadCharacterIcons();
});

function loadCharacterIcons() {
    fetch('data/character_list.json')
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('content');
            content.innerHTML = '';
            Object.keys(data.characters).forEach(character => {
                const div = document.createElement('div');
                div.className = 'character-icon';
                div.innerHTML = `<a href="character_details.html?name=${character}"><img src="assets/characters/icon/${character}_Icon.webp" alt="${character}"><br>${character}</a>`;
                content.appendChild(div);
            });
        })
        .catch(error => console.error('Error loading character icons:', error));
}


function showCharacterList() {
    loadCharacterIcons();
}

function showOwnedCharacters() {
    // Implementacja wyświetlania posiadanych postaci
}

function showMaterialList() {
    // Implementacja wyświetlania listy materiałów
}

function showOwnedMaterials() {
    // Implementacja wyświetlania posiadanych materiałów
}
