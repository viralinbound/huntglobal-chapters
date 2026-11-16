# Hunt Global — redesign concept

A static redesign of [huntglobal.co](https://www.huntglobal.co) as a scroll journey: each chapter has its own
background, one real NASA Earth travels down the home page to the city each chapter is about, and every
portfolio company is explained in plain words. Redesigned websites for Biltflow, Replaice, HuntJobs and Tribe
live under `/ventures/`.

All copy comes from the live Hunt Global and portfolio company websites. Imagery is the companies' own
photography, product screens and films, plus NASA Blue Marble textures for the Earth.

## Build

The HTML is generated — edit the data in `build.mjs` / `ventures.mjs`, then run:

```bash
node build.mjs
```

Serve the folder root with any static server (paths are root-absolute), for example:

```bash
python -m http.server 3080
```
