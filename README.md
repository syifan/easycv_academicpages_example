# EasyCV on Academic Pages

This repo is a fork of [Academic Pages](https://academicpages.github.io/) that demos how to drop EasyCV into the template. The original README.md content is preserved in `academic_pages_readme.md`.


## What's here
- `_pages/cv.md`: EasyCV-powered CV page that loads EasyCV v0.3.0 from the CDN.
- `assets/css/customize_easycv.css`: Local overrides for EasyCV styling (matches the upstream example).
- `files/cv_data.yml`: Sample EasyCV data file to drive the page.
- `academic_pages_readme.md`: The original Academic Pages README for reference.

## Use EasyCV in your own Academic Pages site
1. Copy this repo's `_pages/cv.md` into your Academic Pages site, replacing the default version.
2. Copy `files/cv_data.yml` into your site's `files/` directory.
3. Edit `files/cv_data.yml` to match your details; EasyCV will render based on that data.
4. Build or serve your site as usual (e.g., `bundle exec jekyll serve`). No other template changes are required.

## How our CV differs from the upstream Academic Pages CV
- The upstream `_pages/cv.md` is a static markdown page with hand-written sections plus Jekyll loops for publications, talks, and teaching pulled from collections.
- Our `_pages/cv.md` keeps a small HTML stub (`#cv-root`) and loads `easycv@0.3.0` and `js-yaml@4.1.0` from the CDN, plus a local `customize_easycv.css` with sample overrides.
- On page load it fetches `/files/cv_data.yml` (no-cache), parses the YAML, and calls `renderCv` to build the CV UI with a title template and action buttons.
- Styles come from the EasyCV CSS on the CDN; if loading fails, the page shows a fallback message, and the raw data link remains available for no-JS browsers.

## Notes
- The upstream instructions and setup docs now live in `academic_pages_readme.md` for easy reference.
