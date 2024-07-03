const backgrounds = [
    'assets/backgrounds/BG_Fontaine.webp',
    'assets/backgrounds/BG_Inazuma.webp',
    'assets/backgrounds/BG_Liyue.webp',
    'assets/backgrounds/BG_Mond.webp',
    'assets/backgrounds/BG_Starry.webp',
    'assets/backgrounds/BG_Sumeru_Desert.webp',
    'assets/backgrounds/BG_Sumeru_Rainforest.webp'
];

backgrounds.forEach(imageUrl => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
        console.log(`Preloaded: ${imageUrl}`);
    };
});
