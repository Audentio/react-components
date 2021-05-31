# Deprecated

Updated component library can be found here:

npm: [@audentio/stuff](https://www.npmjs.com/package/@audentio/stuff)

github: https://github.com/Audentio/components

------

## Usage

`yarn add @audentio/components`

```jsx
import { Button } from '@audentio/components/Button';

const App = () => <Button>Hello world</Button>;
```

## Setup (ignore if using kinetic):

#### 1. Allow audentio scoped components to be transpiled

This involved adding an `exclude` key in your loader config

```js
module: {
    rules: [
        {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules\/(?!(@audentio)\/).*/,
            ...
```

#### 2. Setup sass variables

These components expect certain variable keys to be available globally. To do this:

1. Install sass-resource-loader: `yarn add sass-resource-loader`

2. Add sass-resource-loader in your webpack config _after_ sass-loader:

```js
module: {
    rules: [{
        test: /\.scss$/,
        use: [
            'style-loader',
            'sass-loader',
            {
                loader: 'sass-resources-loader',
                options: {
                    resources: [path.resolve(process.cwd(), 'src/theme.scss')],
                },
            },
        ],
        ...
```

3. Add the following variables to theme.scss (and modify as required)

```scss
$gutter: 15px;
$gutter-sm: 10px;

$color-backdropBg: rgba(0, 0, 0, 0.5);

// brand colors
$color-primary: #4b67f6;
$color-secondary: #00d7d2;

// state
$color-info: #26b3f7;
$color-danger: #cc5757;
$color-warning: #ffbc2c;
$color-success: #399e66;

$color-contentBg: #1d223d; // page content
$color-cardBg: #282e4d; // cards, containers inside page content

$color-highlightBg: #303658; // table headers, table row highlights, tertiary or otherwise important content, filterbars and some header/sub header backgrounds
$color-pillBg: intensify($color-cardBg, 5%);
$color-border: rgba(85, 80, 128, 0.5);

// input
$color-inputBg: $color-pillBg;
$color-inputBgLight: lighten($color-inputBg, 5%);

// text colors
$color-contentText: #b4b9d2;
$color-emphasisText: white;
$color-secondaryText: #919fb9;
$color-faintText: #5c6388;

// contentwrap
$contentWidth: 1100px;
$contentWidth_narrow: 700px;
```
