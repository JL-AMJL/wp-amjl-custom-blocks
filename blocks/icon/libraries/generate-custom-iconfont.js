const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { SVGIcons2SVGFontStream } = require('svgicons2svgfont'); // Import the correct class

// Paths
const filteredIconsPath = path.resolve('./blocks/icon/libraries/filtered-icons.min.json'); // Path to your filtered icons JSON
const svgSourcePath = './node_modules/@fortawesome/fontawesome-free/svgs'; // Font Awesome SVG source
const customIconsPath = './blocks/icon/libraries/custom-icons'; // Temporary folder for selected SVGs
const outputFontPath = './blocks/icon/libraries/fonts'; // Output folder for the generated font

// Load filtered icons
const filteredIcons = JSON.parse(fs.readFileSync(filteredIconsPath, 'utf8')).icons;

// Ensure custom-icons and output font folders exist
if (!fs.existsSync(customIconsPath)) {
    fs.mkdirSync(customIconsPath, { recursive: true });
}
if (!fs.existsSync(outputFontPath)) {
    fs.mkdirSync(outputFontPath, { recursive: true });
}

// Step 1: Copy SVGs for filtered icons
console.log('Copying SVG files for filtered icons...');
Object.keys(filteredIcons).forEach((iconName) => {
    const styles = filteredIcons[iconName].s; // Styles (e.g., solid, regular)
    styles.forEach((style) => {
        const svgFilePath = path.join(svgSourcePath, style, `${iconName}.svg`);
        if (fs.existsSync(svgFilePath)) {
            const destPath = path.join(customIconsPath, `${iconName}-${style}.svg`);
            fs.copyFileSync(svgFilePath, destPath);
            console.log(`Copied: ${iconName} (${style})`);
        } else {
            console.warn(`SVG not found for: ${iconName} (${style})`);
        }
    });
});

// Step 2: Generate SVG font
console.log('Generating SVG font...');
const svgFontStream = fs.createWriteStream(path.join(outputFontPath, 'wp-amjl-custom-iconfont.svg')); // Updated file name
const fontStream = new SVGIcons2SVGFontStream({
    fontName: 'wp-amjl-custom-iconfont', // Updated font name
    normalize: true,
    fontHeight: 1000,
});

// Pipe the font stream to the SVG font file
fontStream.pipe(svgFontStream);

// Write glyphs to the font stream
fs.readdirSync(customIconsPath).forEach((file, index) => {
    if (file.endsWith('.svg')) {
        const glyph = fs.createReadStream(path.join(customIconsPath, file));
        const name = file.replace('.svg', ''); // Use the full filename without the extension
        const unicode = String.fromCharCode(0xe000 + index); // Generate a unique unicode value

        glyph.metadata = { unicode: [unicode], name };
        console.log('Writing glyph:', glyph.metadata);
        fontStream.write(glyph);
    }
});

// End the font stream
fontStream.end();

// Add event listeners to debug the process
fontStream.on('error', (err) => {
    console.error('Error during font generation:', err);
});

svgFontStream.on('error', (err) => {
    console.error('Error writing SVG font file:', err);
});

svgFontStream.on('finish', () => {
    console.log('SVG font file successfully written!');

    // Step 3: Convert SVG font to TTF, WOFF, and WOFF2
    console.log('Converting SVG font to TTF, WOFF, and WOFF2...');
    const ttfFile = path.join(outputFontPath, 'wp-amjl-custom-iconfont.ttf');
    const woffFile = path.join(outputFontPath, 'wp-amjl-custom-iconfont.woff');
    const woff2File = path.join(outputFontPath, 'wp-amjl-custom-iconfont.woff2');

    // Convert SVG to TTF
    execSync(`npx svg2ttf ${path.join(outputFontPath, 'wp-amjl-custom-iconfont.svg')} ${ttfFile}`);
    console.log('TTF font generated:', ttfFile);

    // Convert TTF to WOFF
    execSync(`npx ttf2woff ${ttfFile} ${woffFile}`);
    console.log('WOFF font generated:', woffFile);

    // Convert TTF to WOFF2 using fonttools
    try {
        console.log('Converting TTF to WOFF2 using fonttools...');
        execSync(`pyftsubset ${ttfFile} --output-file=${woff2File} --flavor=woff2 --layout-features='*' --glyphs='*' --unicodes='*' --no-subset`);
        console.log('WOFF2 font generated:', woff2File);
    } catch (err) {
        console.error('Failed to convert TTF to WOFF2 using fonttools:', err.message);
        console.warn('Skipping WOFF2 conversion...');
    }

    console.log('Custom webfont generation completed successfully!');
});