project-root/
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── tsconfig.json
├── public/
├── src/
│   ├── components/
│   │   └── DrupalCard.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   └── fetchDrupalCollection.js
│   ├── pages/
│   │   ├── neighbourhood_note/
│   │   │   └── [id].astro
│   │   └── neighbourhood_note.astro
│   └── styles/
│       └── global.css

// src/components/DrupalCard.astro
---
const { title, excerpt, date, type = "note", link = "#" } = Astro.props;
const bgClass = type === "planning" ? "bg-accent-100" : "bg-base-100";
---
<article class={`p-4 rounded-lg border shadow-sm hover:shadow-md transition ${bgClass}`}>
  <h2 class="text-xl font-semibold text-base-800 mb-1">
    <a href={link} class="hover:underline">{title}</a>
  </h2>
  <time class="text-sm text-base-500 block mb-2">{date}</time>
  <p class="text-base text-base-700">{excerpt}</p>
</article>

// src/lib/fetchDrupalCollection.js
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

// src/pages/neighbourhood_note.astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import DrupalCard from "../components/DrupalCard.astro";
import { fetchDrupalCollection } from "../lib/fetchDrupalCollection.js";

const response = await fetchDrupalCollection({ type: "node/neighbourhood_note" });
const notes = response?.data || [];
---
<BaseLayout>
  <h1 class="text-3xl font-bold mb-6">Neighbourhood Notes</h1>
  <div class="space-y-6">
    {notes.map(note => (
      <DrupalCard
        title={note.attributes.title}
        excerpt={note.attributes.body?.summary || note.attributes.body?.value?.slice(0, 120)}
        date={new Date(note.attributes.created).toLocaleDateString()}
        link={`/neighbourhood_note/${note.id}`}
      />
    ))}
  </div>
</BaseLayout>

// src/pages/neighbourhood_note/[id].astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";

const { id } = Astro.params;
const response = await fetch(`https://nodehive-ce.ddev.site/jsonapi/node/neighbourhood_note/${id}`);
const note = await response.json();
const item = note.data;
---
<BaseLayout>
  <article class="prose max-w-2xl mx-auto">
    <h1>{item.attributes.title}</h1>
    <p class="text-sm text-gray-500">{new Date(item.attributes.created).toLocaleDateString()}</p>
    <div innerHTML={item.attributes.body?.processed}></div>
  </article>
</BaseLayout>

// src/styles/global.css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@plugin "@tailwindcss/forms";
@plugin "tailwind-scrollbar-hide";
/* Additional theme vars remain as you had them */