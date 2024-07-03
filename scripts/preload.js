const backgrounds = [
    { file: 'BG_Fontaine.webp', author: 'Party BG_Fontaine_cleaned & upscaled by asddzr' },
    { file: 'BG_Inazuma.webp', author: 'Party BG_Inazuma_cleaned & upscaled by asddzr' },
    { file: 'BG_Liyue.webp', author: 'Party BG_Liyue_cleaned & upscaled by asddzr' },
    { file: 'BG_Mond.webp', author: 'Party BG_Mond_cleaned & upscaled by asddzr' },
    { file: 'BG_Starry.webp', author: 'Party BG_Starry_cleaned & upscaled by asddzr' },
    { file: 'BG_Sumeru_Desert.webp', author: 'Party BG_Sumeru (Desert)_cleaned & upscaled by asddzr' },
    { file: 'BG_Sumeru_Rainforest.webp', author: 'Party BG_Sumeru (Rainforest)_cleaned & upscaled by asddzr' }
];

// Preload images and store them in an array
const preloadedImages = [];

backgrounds.forEach(bg => {
    const img = new Image();
    img.src = `assets/backgrounds/${bg.file}`;
    img.onload = () => {
        preloadedImages.push({ img, author: bg.author });
        console.log(`Preloaded: ${bg.file}`);
    };
});
