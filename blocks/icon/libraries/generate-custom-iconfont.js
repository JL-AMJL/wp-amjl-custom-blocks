const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { SVGIcons2SVGFontStream } = require('svgicons2svgfont');

const filteredIconsPath = path.resolve('./blocks/icon/libraries/filtered-icons.min.json');
const svgSourcePath = './node_modules/@fortawesome/fontawesome-free/svgs';
const customIconsPath = './blocks/icon/libraries/custom-icons';
const outputFontPath = './blocks/icon/libraries/fonts';

const filteredIcons = JSON.parse(fs.readFileSync(filteredIconsPath, 'utf8')).icons;

if (!fs.existsSync(customIconsPath)) fs.mkdirSync(customIconsPath, { recursive: true });
if (!fs.existsSync(outputFontPath)) fs.mkdirSync(outputFontPath, { recursive: true });

const styles = ['solid', 'regular', 'brands'];

styles.forEach((style) => {
    const fontName = `amjl-icon-${style[0]}`;
    const svgFontPath = path.join(outputFontPath, `${fontName}.svg`);
    const ttfFontPath = path.join(outputFontPath, `${fontName}.ttf`);

    console.log(`Generating ${style} font...`);
    const svgFontStream = fs.createWriteStream(svgFontPath);
    const fontStream = new SVGIcons2SVGFontStream({
        fontName,
        normalize: true,
        fontHeight: 1000,
    });

    fontStream.pipe(svgFontStream);

    Object.keys(filteredIcons).forEach((iconName) => {
        const icon = filteredIcons[iconName];
        if (!icon.s.includes(style) || !icon.u) return;

        const svgFilePath = path.join(svgSourcePath, style, `${iconName}.svg`);
        if (!fs.existsSync(svgFilePath)) {
            console.warn(`Missing SVG: ${iconName} (${style})`);
            return;
        }

        const glyph = fs.createReadStream(svgFilePath);
        const baseName = `${iconName}-${style}`;
        const unicode = String.fromCharCode(parseInt(icon.u, 16));
        glyph.metadata = { unicode: [unicode], name: baseName };
        fontStream.write(glyph);
        console.log(`Added ${baseName}`);
    });

    fontStream.end();

    svgFontStream.on('finish', () => {
        console.log(`${style} SVG font written.`);
        execSync(`npx svg2ttf ${svgFontPath} ${ttfFontPath}`);
        execSync(`npx ttf2woff ${ttfFontPath} ${ttfFontPath.replace(/\.ttf$/, '.woff')}`);
        console.log(`${style} TTF generated.`);
    });

    fontStream.on('error', (err) => {
        console.error(`Font stream error (${style}):`, err);
    });

    svgFontStream.on('error', (err) => {
        console.error(`SVG write error (${style}):`, err);
    });
});
