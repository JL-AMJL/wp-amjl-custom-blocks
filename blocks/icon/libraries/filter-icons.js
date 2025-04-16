const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Load categories.yml and icons.json
const categories = yaml.load(fs.readFileSync('./scripts/categories.yml', 'utf8'));
const icons = require('./icons.json');

// Define the categories you want to include
const includedCategories = [
  'business',
  'communication',
  'shopping',
  'files',
  'charts-diagrams',
  'food-beverage',
  'medical-health',
  'users-people',
  'devices-hardware',
  'writing',
  'time',
  'maps'
];

// Create a combined icons object
const filteredIcons = {};

includedCategories.forEach((category) => {
  if (categories[category]) {
    const categoryIcons = categories[category].icons; // Access the `icons` property
    if (Array.isArray(categoryIcons)) {
      categoryIcons.forEach((iconName) => {
        const icon = icons[iconName];
        if (icon) {
          if (!filteredIcons[iconName]) {
            // Initialize the icon entry with shortened property names
            filteredIcons[iconName] = {
              u: icon.unicode,
              l: icon.label,
              s: icon.styles,
              c: [],
              k: (icon.search?.terms || []).slice(0, 5) // Limit keywords to max 5
            };
          }
          // Add the category to the icon's categories
          if (!filteredIcons[iconName].c.includes(category)) {
            filteredIcons[iconName].c.push(category);
          }
        }
      });
    }
  }
});

// Save the combined icons to both minified and readable JSON files
const outputDir = './scripts/output';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Save minified version
fs.writeFileSync(
  path.join(outputDir, 'filtered-icons.min.json'),
  JSON.stringify({ icons: filteredIcons })
);

// Save readable (pretty-printed) version
fs.writeFileSync(
  path.join(outputDir, 'filtered-icons.json'),
  JSON.stringify({ icons: filteredIcons }, null, 2) // Pretty-print with 2 spaces
);

console.log('Minified and readable combined icons saved to output directory.');