// Small (480 px) version of a site photo, generated next to it as "<name>-thumb.jpg".
// Used wherever a photo is shown small (grids, carousel thumbnails, cards) so the
// page doesn't download full-size photos just to display them at ~100–350 px.
// Anything else (PNGs, logos, external URLs) is returned unchanged.
export function thumb(src) {
  if (!src || !src.startsWith('/photos/') || !/\.jpg$/i.test(src) || /-thumb\.jpg$/i.test(src)) return src
  return src.replace(/\.jpg$/i, '-thumb.jpg')
}
