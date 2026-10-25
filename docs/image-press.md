# Image Press implementation

Image Press combines an Anatomy SVG mechanism with a browser Canvas renderer. It processes one photograph locally, previews a two-ink impression, and exports the same image as a PNG.

## Mechanism

The tabletop proofing press has three transverse rollers. Paper travels along the x axis beneath the print train. An upper service cover lifts away to expose the rollers and ink plates. Halftone size, contrast, and registration drive the proof, emerging sheet, plate offset, and knob indicators.

The generated drawing contains 76 solids grouped into a base, frame, feed, print train, inking system, cover, delivery bed, and controls. Parts include bearing caps, shaft ends, roller hubs, paper guides, rails, hinges, screws, a latch, and index pointers. Moving assemblies use the same recorded geometry as the depth-order audit.

The casing uses exponential following with a 0.22-second time constant. A print cycle lasts 2.4 seconds. Animations stop when idle, hidden, or offscreen. Reduced motion resolves the requested state immediately.

## Image model

The renderer crops one photograph into a portrait print window, samples luminance at halftone cell centres, applies contrast about mid-grey, and draws circular carbon and vermilion separations. The export canvas is 1600 × 2000 pixels.

Halftone size and registration are measured in export pixels. Registration is the horizontal displacement of the vermilion separation. Its vertical displacement is -0.55 times that value. The proof and the machine sheet share the same rendered image. The effects are graphic interpretations rather than a calibrated commercial printing simulation.

Uploads stay in browser memory. JPEG, PNG, WebP, and AVIF images are limited to 30 MB and 64 megapixels. Decoded uploads are resized to at most 2400 pixels on their longest side before processing. Invalid uploads retain the previous source.

## Interface

The Swiss print-specimen layout combines oversized Archivo lettering, carbon rules, physical dials, and an upright proof on a vermilion field. Native ranges provide keyboard access to the same settings as the dials. The registration target beside the title follows the current plate offset.

The desktop layout uses a 7:5 split. At 800 pixels and below, the machine, controls, and proof form a single column. Phone sliders have a 44-pixel input area. [DESIGN.md](../DESIGN.md) records the implemented design system.

## Validation

Reviewed 25 October 2026.

- Three Node tests pass for central cropping, luminance, transparency, contrast, and bounded dot radii.
- The Anatomy audit passes across 55 depth states with zero reported geometry, clearance, support, or depth-order failures.
- Open and closed casing checks report zero floating ends on 29 lines.
- Chromium checks cover all three controls, keyboard input, dial dragging, reset, a generated 600 × 900 PNG upload, long filenames, corrupt-image recovery, and normal and reduced-motion printing.
- The exported 1600 × 2000 PNG matches the proof canvas's PNG bytes by SHA-256.
- Responsive checks cover widths from 320 to 1920 pixels, with no horizontal overflow. Browser console output is clean.
- Hover text provides 5.42:1 contrast against paper. Text on the red proof field provides 4.80:1. The registration target clears its labels at the maximum 28-pixel offset.

Browser evidence is Chromium-only. Safari and Firefox have not been verified. Local captures and manual review records remain outside the public source tree. The repository includes a [desktop screenshot](images/image-press.png).

## Sources

The sample photograph was retrieved on 25 October 2026 from [Unsplash](https://images.unsplash.com/photo-1470770841072-f978cf4d019e). User uploads replace it.

The drawing kit comes from [Anatomy](https://github.com/wheresryan22/anatomy), with its MIT license retained at [vendor/anatomy/LICENSE](../vendor/anatomy/LICENSE). Font licenses are retained in [assets/fonts](../assets/fonts/).
