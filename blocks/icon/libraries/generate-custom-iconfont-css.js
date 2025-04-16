const fs = require('fs');
const path = require('path');

// File paths
const jsonFilePath = path.join(__dirname, 'filtered-icons.min.json');
const cssFilePath = path.join(__dirname, 'wp-amjl-iconfont.css');

// Read the JSON file
const iconData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

// Start the CSS content
let cssContent = `
/* Define the font-face */
@font-face {
    font-family: 'wp-amjl-iconfont';
    src: url('./fonts/wp-amjl-custom-iconfont.woff2') format('woff2'),
         url('./fonts/wp-amjl-custom-iconfont.woff') format('woff'),
         url('./fonts/wp-amjl-custom-iconfont.ttf') format('truetype'),
         url('./fonts/wp-amjl-custom-iconfont.svg#wp-amjl-iconfont') format('svg');
    font-weight: normal;
    font-style: normal;
}

/* Base class for the icon font */
.amjl-icon {
    font-family: 'wp-amjl-iconfont';
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

// Generate CSS classes for each icon with the new prefix
const prefix = 'amjl-';
for (const [iconName, iconDetails] of Object.entries(iconData.icons)) {
    const unicode = iconDetails.u;
    cssContent += `
.${prefix}${iconName}:before {
    content: '\\${unicode}';
}
`;
}

// Write the CSS file
fs.writeFileSync(cssFilePath, cssContent, 'utf8');
console.log(`CSS file generated at: ${cssFilePath}`);