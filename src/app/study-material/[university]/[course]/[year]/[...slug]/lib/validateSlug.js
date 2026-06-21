export function validateSlug(slug) {
  return slug.every((item) => item.length > 0);
}