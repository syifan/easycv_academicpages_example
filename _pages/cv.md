---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

<div id="cv-root">
  <p>Loading CV...</p>
</div>

<noscript>
  JavaScript is required to view the EasyCV layout. You can download the raw data at
  <a href="{{ '/files/cv_data.yml' | relative_url }}">cv_data.yml</a>.
</noscript>

<script type="module">
  import { renderCv } from "https://cdn.jsdelivr.net/npm/easycv/+esm";
  import { load as loadYaml } from "https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/+esm";

  const target = "#cv-root";
  const dataUrl = "{{ '/files/cv_data.yml' | relative_url }}";

  async function mountCv() {
    const response = await fetch(dataUrl, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const yaml = await response.text();
    const data = loadYaml(yaml);

    renderCv(target, data, {
      titleTemplate: "%s | CV",
      actions: true,
    });
  }

  mountCv().catch((error) => {
    const root = document.querySelector(target);
    if (root) {
      root.innerHTML = "<p>Sorry, we couldn't load the CV right now.</p>";
    }
    console.error("EasyCV failed to render", error);
  });
</script>
