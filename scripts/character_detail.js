document.addEventListener('DOMContentLoaded', () => {
    const character = document.querySelector('h1').textContent.trim();
    loadCharacterDetail(character);
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
