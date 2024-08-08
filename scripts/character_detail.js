document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const character = urlParams.get('name');
    if (character) {
        loadCharacterDetail(character);
    } else {
        alert('Character not specified.');
    }
});

function loadCharacterDetail(character) {
    fetch('data/character_list.json')
        .then(response => response.json())
        .then(data => {
            const characterData = data.characters[character];
            if (characterData) {
                document.getElementById('character-name').textContent = character;
                document.getElementById('character-image').src = `assets/characters/full/${characterData.image}`;
                document.getElementById('normal-attack-name').textContent = `Normal Attack: ${characterData["Normal Attack"]}`;
                document.getElementById('elemental-skill-name').textContent = `Elemental Skill: ${characterData["Elemental Skill"]}`;
                document.getElementById('elemental-burst-name').textContent = `Elemental Burst: ${characterData["Elemental Burst"]}`;
                document.getElementById('edit-normal-attack-name').textContent = `Normal Attack: ${characterData["Normal Attack"]}`;
                document.getElementById('edit-elemental-skill-name').textContent = `Elemental Skill: ${characterData["Elemental Skill"]}`;
                document.getElementById('edit-elemental-burst-name').textContent = `Elemental Burst: ${characterData["Elemental Burst"]}`;
                
                // Ustawienie tła na podstawie elementu
                setCharacterBackground(characterData);

                loadCharacterFromLocalStorage(character);
            } else {
                alert('Character data not found.');
            }
        })
        .catch(error => console.error('Error loading character data:', error));
}

function setCharacterBackground(character) {
    const element = character.element.toLowerCase();
    const backgroundMap = {
        "anemo": { file: "ANEMO BG Blank.webp", author: "ANEMO BG Blank by Kaerralind" },
        "cryo": { file: "CRYO BG Blank.webp", author: "CRYO BG Blank by Kaerralind" },
        "dendro": { file: "DENDRO BG Blank.webp", author: "DENDRO BG Blank by Kaerralind" },
        "electro": { file: "ELECTRO BG Blank.webp", author: "ELECTRO BG Blank by Kaerralind" },
        "geo": { file: "GEO BG Blank.webp", author: "GEO BG Blank by Kaerralind" },
        "hydro": { file: "HYDRO BG Blank.webp", author: "HYDRO BG Blank by Kaerralind" },
        "pyro": { file: "PYRO BG Blank.webp", author: "PYRO BG Blank by Kaerralind" },
        "unaligned": { file: "UNALIGNED BG Blank.webp", author: "UNALIGNED BG Blank by Kaerralind" }
    };

    const backgroundData = backgroundMap[element] || backgroundMap["unaligned"];
    document.body.style.backgroundImage = `url('backgrounds/${backgroundData.file}')`;

    const backgroundAuthor = document.getElementById("background-author");
    backgroundAuthor.innerText = backgroundData.author;
}

function loadCharacterFromLocalStorage(character) {
    const characterData = JSON.parse(localStorage.getItem(`character_${character}`) || '{}');
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
        removeButton.style.display = 'block';
    } else {
        addRemoveButton.textContent = 'Add Character';
    }

    addRemoveButton.addEventListener('click', () => {
        if (characterData.level) {
            localStorage.removeItem(`character_${character}`);
            window.location.reload();
        } else {
            characterData.level = 1;
            characterData.normalAttack = 1;
            characterData.elementalSkill = 1;
            characterData.elementalBurst = 1;
            localStorage.setItem(`character_${character}`, JSON.stringify(characterData));
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
        localStorage.setItem(`character_${character}`, JSON.stringify(characterData));
        window.location.reload();
    });

    removeButton.addEventListener('click', () => {
        if (confirmRemove.checked) {
            localStorage.removeItem(`character_${character}`);
            window.location.reload();
        }
    });

    confirmRemove.addEventListener('change', () => {
        removeButton.disabled = !confirmRemove.checked;
    });
}
