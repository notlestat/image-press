---
name: Image Press
description: A Swiss print specimen with a working two-ink press.
colors:
  paper: "#f1f1ed"
  carbon: "#20211f"
  secondary: "#62635d"
  rule: "#c9cac3"
  vermilion: "#d93c29"
  vermilion-deep: "#b72e1e"
  proof-field: "#e34b35"
  proof-ink: "#10110f"
  error: "#a32417"
typography:
  display:
    fontFamily: "Archivo, Helvetica, Arial, sans-serif"
    fontSize: "clamp(70px, 13.55vw, 244px)"
    fontWeight: 650
    lineHeight: 0.88
    letterSpacing: "-0.04em"
  section:
    fontFamily: "Archivo, Helvetica, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 550
    lineHeight: 1.3
  label:
    fontFamily: "Archivo, Helvetica, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 400
  measurement:
    fontFamily: "Roboto Mono, monospace"
    fontSize: "29px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  primary-action:
    fontFamily: "Archivo, Helvetica, Arial, sans-serif"
    fontSize: "19px"
    fontWeight: 500
rounded:
  square: "0px"
  round: "50%"
spacing:
  small: "8px"
  group: "12px"
  medium: "16px"
  inset: "20px"
  section: "24px"
  large: "32px"
  gutter: "clamp(20px, 3.2vw, 64px)"
components:
  button-primary:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.paper}"
    typography: "{typography.primary-action}"
    rounded: "{rounded.square}"
    padding: "14px 20px"
    height: "62px"
  button-primary-hover:
    backgroundColor: "{colors.vermilion-deep}"
    textColor: "{colors.paper}"
  button-upload:
    backgroundColor: "transparent"
    textColor: "{colors.carbon}"
    rounded: "{rounded.square}"
    padding: "0 16px"
    height: "48px"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.carbon}"
    typography: "{typography.label}"
    height: "44px"
  proof-panel:
    backgroundColor: "{colors.proof-field}"
    textColor: "{colors.proof-ink}"
    rounded: "{rounded.square}"
    padding: "0 32px 24px"
---

# Image Press design system

## Overview

The current direction is a Swiss print specimen. Oversized red lettering, carbon rules and an upright photographic proof establish the page. The illustration is the existing Anatomy machine, with working controls and a casing that opens.

This records the implemented version for creative review. It does not establish a universal style for future projects or imply final visual approval.

## Colors

Paper is a cool light ground; carbon carries text and structure. Vermilion owns the title and the proof field. The deeper vermilion is the small-text hover colour and primary-action hover background, with 5.42:1 contrast against paper. Proof text uses a darker ink with 4.80:1 contrast against its red background. Secondary text has 5.36:1 contrast on paper.

The machine has its own four-tone neutral shading and red ink-assembly shading in `src/style.css`. These depict the mechanism rather than additional interface colour roles.

## Typography

Archivo is a locally served variable grotesk. The display uses 90% width, weight 650 and the size in the frontmatter. At 800px and below, it changes to 14.4vw. Section headings use 13px; labels and explanatory text use at least 11px. Filenames truncate when space is limited.

Roboto Mono is reserved for quantities, edition counts and export dimensions. Readouts use tabular digits. Their sizes are 29px normally, 26px at medium widths and on phones, 30px on tablets, and 34px from 1600px. The source stylesheet resolves overlapping media rules.

## Layout

The workspace is at most 1920px wide with fluid outside gutters. A narrow masthead precedes the title. The bench uses a 7:5 split: machine, source and controls on the left; live proof and export on the right. Rules align the regions without rounded cards.

At 1190px and below, controls place dials above sliders. At 800px and below, the bench becomes one column and the title ink key is hidden. Tablet controls return to a horizontal arrangement; at 540px and below they stack again. Phone sliders have a 44px input area, and buttons have at least 44px height. The proof follows the controls in mobile reading order.

The registration mark reserves enough space for a full 28px offset. Its gap is 34px normally and 24px at medium widths. The machine stage scales independently of the fixed 4:5 print ratio.

## Elevation & Depth

The interface is flat. Depth is reserved for the actual mechanism, the dial and the print sheet. The dial shadow is `0 2px 3px #20211f25`; the paper shadow is `3px 9px 15px #71221538`. Surrounding panels use rules and colour fields.

## Shapes

Structural regions and actions are square. Circles identify dials, print targets and ink swatches. Authored SVG icons use a consistent 1.5px stroke and remain hidden from assistive technology when decorative.

## Components

The primary print action is a full-width carbon bar. Upload is an outlined action with an explicit label. Casing and reset are text buttons. Export has a top rule, a download icon and dimensions directly below its action label. Hover changes the relevant ink or adds an underline; keyboard focus uses a 2px outline with 5px offset, carbon on the red proof field and vermilion elsewhere.

Each dial is a pointer-drag alternative to a labelled native range. The native range remains the keyboard and assistive-technology control. Both update the same setting, measured output, proof and machine indicators.

The print cycle lasts 2.4 seconds, with an eased emerging sheet and moving roller markers. The casing uses exponential following with a 0.22-second time constant. Motion stops when idle, hidden or offscreen; reduced motion resolves the requested state immediately. Status and image-loading errors appear in a polite live region. User photographs stay in browser memory.

## Do's and Don'ts

- Do keep the photograph, proof and machine as the visual content.
- Do preserve the squared grid, real measurement readouts and native input path.
- Do retain local fonts, original image attribution and upstream licences.
- Do verify the long-filename, error, keyboard and reduced-motion states after changes.
- Don't restore the introductory taglines removed by the user.
- Don't treat this project's Swiss direction as a requirement for unrelated work.
- Don't introduce a GPU or component framework solely to demonstrate an installed tool.
