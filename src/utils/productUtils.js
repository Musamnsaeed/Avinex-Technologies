/**
 * Utility functions for parsing and cleanly formatting product details,
 * specifications, and descriptions.
 */

export function parseProductDetails(rawText, existingSpecs = []) {
  // Normalize existingSpecs into standard [key, value] tuples
  const specList = [];
  if (Array.isArray(existingSpecs)) {
    for (const item of existingSpecs) {
      if (Array.isArray(item)) {
        specList.push([String(item[0] || ''), String(item[1] || '')]);
      } else if (item && typeof item === 'object') {
        const k = item.key ?? item.label ?? item.name ?? '';
        const v = item.value ?? '';
        if (k || v) {
          specList.push([String(k), String(v)]);
        }
      }
    }
  } else if (existingSpecs && typeof existingSpecs === 'object') {
    for (const [k, v] of Object.entries(existingSpecs)) {
      specList.push([String(k), String(v)]);
    }
  }

  if (!rawText || typeof rawText !== 'string') {
    return {
      intro: '',
      bullets: [],
      details: specList,
      cleanTagline: '',
    };
  }

  let text = rawText.trim();

  // Strip conversational AI boilerplate
  text = text
    .replace(
      /^(?:It looks like you are viewing[^:]*:\s*|Here are (?:some )?details[^:]*:\s*|Based on (?:the )?[^:]*:\s*|Product details:\s*)+/i,
      ''
    )
    .trim();

  // Keyword-aware attribute regex
  const detailRegex =
    /(?:^|\s+)(Product Name|Model Number\s*(?:\/\s*Code)?|Model(?:\s*Number)?|Category|Manufacturer\s*(?:\/\s*Brand)?|Brand|Partnership\s*Level|Type|Specifications?|Frequency(?:\s*Range)?|Power(?:\s*Output)?|Channels|Compliance|Standards?|Dimensions|Weight|Voltage|Operating Temp(?:erature)?|Battery|Antenna|Lead Time|Warranty)\s*:\s*/gi;

  const matches = [];
  let m;
  while ((m = detailRegex.exec(text)) !== null) {
    matches.push({
      key: m[1].trim(),
      index: m.index,
      length: m[0].length,
    });
  }

  let intro = '';
  const extracted = [];

  if (matches.length > 0) {
    intro = text.slice(0, matches[0].index).trim();
    for (let i = 0; i < matches.length; i++) {
      const cur = matches[i];
      const nextIndex =
        i + 1 < matches.length ? matches[i + 1].index : text.length;
      const val = text
        .slice(cur.index + cur.length, nextIndex)
        .trim()
        .replace(/[,;.]$/, '');
      if (cur.key && val) {
        extracted.push([cur.key, val]);
      }
    }
  } else {
    // Check if multi-line or bullet separated
    const lines = text
      .split(/[\n\r]+|[•·]\s+/)
      .map((l) => l.trim().replace(/^[-*]\s*/, ''))
      .filter(Boolean);
    if (lines.length > 1) {
      return {
        intro: '',
        bullets: lines,
        details: specList,
        cleanTagline: lines[0],
      };
    }
    intro = text;
  }

  // Combine extracted specs with existingSpecs, avoiding duplicate keys
  const existingKeys = new Set(
    specList.map((entry) => (Array.isArray(entry) ? String(entry[0] || '') : '').toLowerCase()).filter(Boolean)
  );

  for (const [k, v] of extracted) {
    if (!existingKeys.has(k.toLowerCase())) {
      specList.push([k, v]);
      existingKeys.add(k.toLowerCase());
    }
  }

  // Create a clean one-line tagline for short card previews
  let cleanTagline = intro;
  if (!cleanTagline && extracted.length > 0) {
    cleanTagline = extracted
      .filter(([k]) => k.toLowerCase() !== 'product name')
      .slice(0, 3)
      .map(([k, v]) => `${k}: ${v}`)
      .join(' · ');
  }

  return { intro, bullets: [], details: specList, cleanTagline };
}
