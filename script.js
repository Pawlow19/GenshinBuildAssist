document.addEventListener('DOMContentLoaded', () => {
    loadCharacterIcons();
});

function loadCharacterIcons() {
    fetch('data/characters.json')
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('content');
            content.innerHTML = '';
            for (let character in data) {
                const div = document.createElement('div');
                div.className = 'character-icon';
                div.innerHTML = `<img src="assets/characters/icons/${character}_Icon.webp" alt="${character}"><br>${character}`;
                div.onclick = () => showCharacterDetail(character);
                content.appendChild(div);
            }
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

function showCharacterDetail(character) {
    window.location.href = `characters/${character.toLowerCase()}.html`;
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const character = urlParams.get('character');
    if (character) {
        loadCharacterDetail(character);
    }
});

function loadCharacterDetail(character) {
    const characterData = JSON.parse(localStorage.getItem(character) || '{}');
    const addRemoveButton = document.getElementById('add-remove-character');
    const characterDetail = document.getElementById('character-data');
    const editCharacterForm = document.getElementById('edit-character-form');
    const removeButton = document.getElementById('remove-character');
    const confirmRemove = document.getElementById('confirm-remove');

    if (characterData.level) {
        addRemoveButton.textContent = 'Remove Character';
        characterDetail.style.display = 'block';
        document.getElementById('level-value').textContent = characterData.level;
        document.getElementById('normal-attack-level').textContent = characterData.normalAttack || 1;
        document.getElementById('elemental-skill-level').textContent = characterData.elementalSkill || 1;
        document.getElementById('elemental-burst-level').textContent = characterData.elementalBurst || 1;
    } else {
        addRemoveButton.textContent = 'Add Character';
    }

    addRemoveButton.addEventListener('click', () => {
        if (characterData.level) {
            localStorage.removeItem(character);
            window.location.reload();
        } else {
            characterData.level = 1;
            characterData.normalAttack = 1;
            characterData.elementalSkill = 1;
            characterData.elementalBurst = 1;
            localStorage.setItem(character, JSON.stringify(characterData));
            window.location.reload();
        }
    });

    document.getElementById('edit-character').addEventListener('click', () => {
        editCharacterForm.style.display = 'block';
        characterDetail.style.display = 'none';
        document.getElementById('edit-level-value').value = characterData.level;
        document.getElementById('edit-normal-attack-level').value = characterData.normalAttack;
        document.getElementById('edit-elemental-skill-level').value = characterData.elementalSkill;
        document.getElementById('edit-elemental-burst-level').value = characterData.elementalBurst;
    });

    document.getElementById('save-character').addEventListener('click', () => {
        characterData.level = parseInt(document.getElementById('edit-level-value').value);
        characterData.normalAttack = parseInt(document.getElementById('edit-normal-attack-level').value);
        characterData.elementalSkill = parseInt(document.getElementById('edit-elemental-skill-level').value);
        characterData.elementalBurst = parseInt(document.getElementById('edit-elemental-burst-level').value);
        localStorage.setItem(character, JSON.stringify(characterData));
        window.location.reload();
    });

    removeButton.addEventListener('click', () => {
        if (confirmRemove.checked) {
            localStorage.removeItem(character);
            window.location.reload();
        }
    });

    confirmRemove.addEventListener('change', () => {
        removeButton.disabled = !confirmRemove.checked;
    });
}
