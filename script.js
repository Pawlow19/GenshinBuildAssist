document.addEventListener('DOMContentLoaded', () => {
    const characterForm = document.getElementById('character-form');
    const materialsCalculator = document.getElementById('materials-calculator');
    const result = document.getElementById('result');

    document.getElementById('save-character').addEventListener('click', () => {
        const name = document.getElementById('character-name').value;
        const currentLevel = parseInt(document.getElementById('current-level').value);
        const targetLevel = parseInt(document.getElementById('target-level').value);

        if (!name || isNaN(currentLevel) || isNaN(targetLevel)) {
            alert('Please enter valid character data.');
            return;
        }

        const characters = JSON.parse(localStorage.getItem('characters') || '{}');
        characters[name] = { currentLevel, targetLevel };
        localStorage.setItem('characters', JSON.stringify(characters));
        alert('Character saved!');
    });

    document.getElementById('calculate-materials').addEventListener('click', () => {
        const characters = JSON.parse(localStorage.getItem('characters') || '{}');
        fetch('data/characters.json')
            .then(response => response.json())
            .then(data => {
                let missingMaterials = {};
                for (let name in characters) {
                    let { currentLevel, targetLevel } = characters[name];
                    for (let level = currentLevel + 1; level <= targetLevel; level++) {
                        let ascensionMaterials = data[name]?.ascension_materials[level];
                        let talentMaterials = data[name]?.talent_materials[level];
                        if (ascensionMaterials) {
                            for (let material in ascensionMaterials) {
                                missingMaterials[material] = (missingMaterials[material] || 0) + ascensionMaterials[material];
                            }
                        }
                        if (talentMaterials) {
                            for (let material in talentMaterials) {
                                missingMaterials[material] = (missingMaterials[material] || 0) + talentMaterials[material];
                            }
                        }
                    }
                }
                result.textContent = JSON.stringify(missingMaterials, null, 2);
            })
            .catch(error => console.error('Error fetching character data:', error));
    });
});
