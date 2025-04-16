const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, 'filtered-icons.min.json');
const cssFilePath = path.join(__dirname, 'wp-amjl-iconfont.css');
const iconData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

const styleMap = {
    solid: 's',
    regular: 'r',
    brands: 'b',
};

let cssContent = '';

Object.entries(styleMap).forEach(([style, short]) => {
    const fontFileName = `amjl-icon-${short}`;

    cssContent += `
@font-face {
    font-family: '${fontFileName}';
    src: url('./fonts/${fontFileName}.woff2') format('woff2'),
         url('./fonts/${fontFileName}.woff') format('woff'),
         url('./fonts/${fontFileName}.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

.amjl-${short} {
    font-family: '${fontFileName}';
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    display: inline-block;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
`;
});

for (const [iconName, iconDetails] of Object.entries(iconData.icons)) {
    const unicode = iconDetails.u;
    if (!unicode) continue;

    cssContent += `
.amjl-${iconName}:before {
    content: '\\${unicode}';
}
`;
}

fs.writeFileSync(cssFilePath, cssContent, 'utf8');
console.log(`CSS file generated at: ${cssFilePath}`);
