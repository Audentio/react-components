/**
 * Icon map generator
 * Run this after upgrading mdi
 */

const fs = require('fs');
const path = require('path');

const variables_scss = fs.readFileSync(
    path.resolve(process.cwd(), 'node_modules/@mdi/font/scss/_variables.scss'),
    'utf8'
);

const vars_string = variables_scss.substr(variables_scss.indexOf('$mdi-icons: ('), variables_scss.length);
const variableRegex = /"((?:[a-z0-9-]*))": ((?:[a-z0-9]*))/i;
const iconmap = {};

vars_string.split('\n').forEach(line => {
    const match = line.trim().match(variableRegex);

    if (match) iconmap[match[1]] = String.fromCharCode('0x' + match[2]);
});

let map = '/* eslint-disable */ \n';
map += `export type iconType = `;

Object.keys(iconmap).forEach((icon, index) => {
    if (index === 0) {
        map += `'${icon}'`;
    } else {
        map += `\n    | '${icon}'`;
        if (index === Object.keys(iconmap).length - 1) {
            map += ';';
        }
    }
});

map += `\n\nexport const iconmap = ${JSON.stringify(iconmap, null, 4)};`;

fs.writeFileSync(path.join(__dirname, './map.ts'), map);
