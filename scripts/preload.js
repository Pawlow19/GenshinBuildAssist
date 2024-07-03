const backgrounds = [
    'BG_Fontaine.webp',
    'BG_Inazuma.webp',
    'BG_Liyue.webp',
    'BG_Mond.webp',
    'BG_Starry.webp',
    'BG_Sumeru_Desert.webp',
    'BG_Sumeru_Rainforest.webp'
];

function preloadImages() {
    backgrounds.forEach(bg => {
        const img = new Image();
        img.src = `assets/backgrounds/${bg}`;
    });
}

preloadImages();
