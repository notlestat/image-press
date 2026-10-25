# Image Press

An experimental two-ink photo press built with [Anatomy](https://github.com/wheresryan22/anatomy). Upload a photograph, adjust halftone size, contrast, and registration, then pull a print or save a PNG. The casing opens to reveal the rollers and ink plates.

## Run locally

Use Node.js 22.20 or later. The project has no npm dependencies.

```sh
npm run build
npm run dev
```

Open [localhost:4173](http://localhost:4173). The server listens on the local machine. Set `PORT` to use another port.

## Make an impression

1. Select **Feed a photograph**, or drop one photograph onto the page.
2. Adjust the three sliders. Drag a dial vertically, or focus a slider and use the arrow keys.
3. Select **Open casing** to inspect the mechanism.
4. Select **Pull a print** to feed the sheet through the press.
5. Select **Save impression** to download the current proof as a 1600 × 2000 PNG.

JPEG, PNG, WebP, and AVIF files are supported, up to 30 MB and 64 megapixels. Photographs remain in browser memory. The print uses a centred portrait crop. The ink effects are graphic interpretations rather than calibrated print simulations.

## Check changes

```sh
npm test
npm run audit
```

The tests cover image cropping, luminance, transparency, contrast, and halftone radius. The Anatomy audit checks the machine's recorded geometry and depth order during the cover movement. Browser checks and design evidence are recorded in [the build brief](docs/image-press.md).

## Sources

The drawing kit is vendored from Anatomy under its [MIT license](vendor/anatomy/LICENSE). The [demonstration photograph](https://images.unsplash.com/photo-1470770841072-f978cf4d019e) is supplied by Unsplash. Google Fonts supplies DM Sans and IBM Plex Mono, with system fonts as fallbacks. No paid service is required.
