# Image Press build brief

Reviewed 25 October 2026. Source: the user's Image Press concept and focused first-version brief in this conversation. Implementation is local and experimental.

Anatomy Figure: a tabletop two-ink proofing press. Paper travels along the x axis, beneath three transverse rollers. An upper service cover lifts away to expose the rollers and printing plates. The same halftone size, contrast and registration model drives the print preview, the emerging sheet, plate offset and machine indicators.

Warm off-white paper, graphite linework and one vermilion ink. Fine manual typography around a large machine, with a flat print proof beside it. No external image processing, account or API.

Image model: crop one photo into a portrait print window, sample luminance at halftone cell centres, apply contrast about mid-grey, and draw circular black and vermilion ink separations. Halftone size and registration are measured in pixels in the 1600 × 2000 export. Registration is the horizontal displacement of the vermilion separation. Its vertical displacement is -0.55 times that value. These are experimental graphic effects, not a calibrated commercial printing simulation. The preview and export use the same rendered canvas. Uploads stay in browser memory.

Parts planned before geometry, grouped by assembly:

- Base: one cast plinth, four rubber feet, four foot collars, four corner screws, one inset groove, one serial plate and two plate rivets.
- Frame: two side rails, four bearing pedestals, four bearing caps, four cap screws and two end stops.
- Feed: one input bed, two paper guides, one feed sheet and two stop screws.
- Print train: three roller barrels, six end discs, six shaft ends, three drive hubs and three phase markers.
- Inking: two thin plate carriers, one black plate and one vermilion plate, two plate rails and four rail screws.
- Cover: one service lid, two hinges, one handle bridge, two handle mounts, four lid screws, six vent slots and one latch.
- Delivery: one output bed, two side runners, one moving print sheet and two alignment stops.
- Controls: three knob bodies, three index pointers, one status lamp and its bezel.

The exact generated solid count is reported by the build. The cover and print train use separate named assemblies. Shape records use the actual drawing geometry for clearance and painter-order verification.

Sample image: https://images.unsplash.com/photo-1470770841072-f978cf4d019e . Retrieved 25 October 2026, supplied by Unsplash as a local demonstration photograph. User-uploaded images replace it. No rights claim is made for user images.

Anatomy source: https://github.com/wheresryan22/anatomy . Kit vendored under its MIT license, retained at vendor/anatomy/LICENSE.

## Local verification

The build generates 76 solids. The Anatomy geometry audit passes with zero clearance, support, depth-order, intersection, shape-coverage, or line-end failures. The cover motion is checked across 55 depth states. Closed and open casing line checks both pass with zero floating ends on 29 checked lines.

Three Node tests cover central cropping, contrast, transparent pixels, and bounded dot radii. Chromium checks confirm that all three controls change the rendered pixels, that the machine sheet matches the proof, and that a real PNG download is 1600 × 2000. The downloaded PNG's SHA-256 matched the proof canvas's PNG bytes.

Browser interaction checks cover a 600 × 900 PNG upload, corrupt-image recovery while retaining the previous source, the print cycle, keyboard controls, mobile layout at 390 pixels, and reduced motion. Desktop and mobile screenshots show no horizontal scrolling or console errors. Local evidence is kept in the ignored artifacts directory.

Status: local working prototype on feature/image-press. Visual approval remains with the user. There is no published deployment or remote pull request for this implementation.
