export async function fetchDrupalCollection({
  type = "node/article",
  include = "",
  sort = "-created",
  page = { limit: 20 },
  filters = {},
} = {}) {
  const params = new URLSearchParams();
  if (include) params.set("include", include);
  if (sort) params.set("sort", sort);
  if (page.limit) params.set("page[limit]", page.limit);
  Object.entries(filters).forEach(([key, value]) => {
    params.set(`filter[${key}][value]`, value);
  });
  const url = `https://nodehive-ce.ddev.site/jsonapi/${type}?${params.toString()}`;
  try {
    const res = await fetch(url, { headers: { Accept: "application/vnd.api+json" } });
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching from Drupal:", error);
    return null;
  }
}