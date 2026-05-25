# Changelog

## 0.2.0 - 2026-05-25

No breaking changes.

### Added

- Added `workbench.motion.touchReleaseReturn` so consumers can tune how long touch interactions hold their final tilt and how quickly the workbench returns to idle.
- Added inline TypeScript documentation for the public prop types so editor hovers and autocomplete explain the component API in-place.

### Improved

- Pointer tracking is smoothed across mouse and touch input, giving mobile interaction a more fluid follow response while keeping the workbench snappy.
- The demo now uses a natural `Showcase Hero` title break and includes page-end breathing room for more comfortable mobile inspection.
- Workbench wheel handling is scoped to the scrollable item list so page-level scrolling remains under the host page's control.

### Upgrade

```sh
npm install @petesmithofficial/showcase-hero@latest
```

Existing implementations continue to work. To tune mobile touch release behavior, add the optional motion block:

```tsx
motion: {
  maxTiltDegrees: 12,
  touchReleaseReturn: {
    holdMs: 220,
    durationMs: 760,
  },
}
```
